import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  getProviderConfig,
  type ProviderUsage,
} from "./llm/providers";
import { callStructured } from "./llm/structured";
import { AFFIRMATION_SYSTEM_PROMPT } from "./llm/affirmation";
import { analyzePrompt } from "./analysis";
import { retrieve } from "./retrieve";
import { buildPacket } from "./packet";
import {
  rankPacketQuotes,
  type QuoteCatalogEntry,
} from "./quote-search";
import type {
  Conversation,
  ConversationPairView,
  PairTimings,
} from "./conversation";
import { resolveConversationPair } from "./conversation";
import {
  lensSchema,
  type Lens,
  type PacketThinker,
  type PromptAnalysis,
  type Quote,
  type ThemeId,
  type Trace,
} from "./schema";
import { validateAffirmation } from "./validate";
import { affirmationFor } from "./affirmations";
import { estimateCost } from "./cost";

export type QuoteCandidate = {
  entry: QuoteCatalogEntry;
  thinker: PacketThinker;
  quote: Quote;
};

const PAIR_LENS_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: [
    "thinkerId",
    "quoteId",
    "claim",
    "theory",
    "application",
    "quoteReason",
    "affirmation",
  ],
  properties: {
    thinkerId: { type: "string" },
    quoteId: { type: "string" },
    claim: { type: "string" },
    theory: { type: "string" },
    application: { type: "string" },
    quoteReason: { type: "string" },
    affirmation: { type: "string" },
  },
};

const PAIR_AFFIRMATION_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["thinkerId", "quoteId", "affirmation"],
  properties: {
    thinkerId: { type: "string" },
    quoteId: { type: "string" },
    affirmation: { type: "string" },
  },
};

const PAIR_SYSTEM_PROMPT = `You are writing one message in a phone conversation for Philos-Friend.

The quote is already chosen from a verified catalog. Never choose another quote and never write quotation text yourself. Your job is to make this one quote do real work for the person.

RULES
- Use the exact thinkerId and quoteId provided.
- Claim: one sharp, arguable sentence, max 12 words.
- Theory: 45–90 words. Explain the quote's actual argument in plain English, using its own image or distinction.
- Application: 25–60 words. Name one concrete thing the person can notice, try, or stop doing. Include a detail from their question.
- QuoteReason: one sentence explaining why this quote fits this specific person.
- Affirmation: a warm, specific, non-judgmental draft green line, 12–25 words. A dedicated pass will replace it.
- Be warm, concrete, and unsentimental. Do not sound academic, therapeutic, or impressed with yourself.
- Never judge the person. Challenge the idea, premise, or strategy — not their worth.
- If the prompt analysis says safety is "care", be gentle and direct. Do not romanticize self-harm or isolation. Encourage contact with a trusted person or local crisis service.
- No throat-clearing and no stock phrases.

NEVER USE THESE STOCK PHRASES
- "You are allowed to…"
- "It's okay to…"
- "Give yourself permission…"
- "Remember that…"
- "Your feelings are valid."
- "You deserve…"
- "At the end of the day…"
- "Be kind to yourself."
- "You are enough."
- "Trust the process."
- "Hold space."
- "You've got this."

Return JSON only.`;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function familyOf(tradition: string): string {
  return tradition.split("/")[0].trim().toLowerCase();
}

function addUsage(a?: ProviderUsage, b?: ProviderUsage): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

function mergeUsage(
  a: ProviderUsage | undefined,
  b: ProviderUsage | undefined,
): ProviderUsage | undefined {
  return addUsage(a, b);
}

export function selectNextQuote(args: {
  packet: PacketThinker[];
  catalog: QuoteCatalogEntry[];
  usedThinkerIds: Iterable<string>;
  usedQuoteIds?: Iterable<string>;
  usedFamilies: Iterable<string>;
  pairIndex: number;
}): QuoteCandidate | null {
  const usedThinkers = new Set(args.usedThinkerIds);
  const usedQuotes = new Set(args.usedQuoteIds ?? []);
  const usedFamilies = new Set(args.usedFamilies);
  const candidates = args.catalog.filter(
    (entry) => !usedThinkers.has(entry.thinkerId) && !usedQuotes.has(entry.quoteId),
  );

  if (candidates.length === 0) return null;

  function resolve(entry: QuoteCatalogEntry): QuoteCandidate | null {
    const thinker = args.packet.find((item) => item.id === entry.thinkerId);
    const quote = thinker?.quotes.find((item) => item.id === entry.quoteId);
    return thinker && quote ? { entry, thinker, quote } : null;
  }

  const needsNewFamily =
    args.pairIndex === 1 || (args.pairIndex >= 2 && usedFamilies.size < 2);

  if (needsNewFamily) {
    for (const entry of candidates) {
      const candidate = resolve(entry);
      if (candidate && !usedFamilies.has(familyOf(candidate.thinker.tradition))) {
        return candidate;
      }
    }
  }

  for (const entry of candidates) {
    const candidate = resolve(entry);
    if (candidate) return candidate;
  }

  return null;
}

function fallbackLens(
  thinker: PacketThinker,
  quote: Quote,
  analysis?: PromptAnalysis | null,
): Lens {
  const idea = thinker.ideas[0];
  const theme: ThemeId = analysis?.themes[0] ?? thinker.tags[0] ?? "meaning";
  const theory =
    idea.summary.length >= 40
      ? idea.summary
      : `${thinker.name}'s idea is this: ${idea.summary}`;

  return {
    thinkerId: thinker.id,
    quoteId: quote.id,
    claim: idea.title,
    theory,
    application: `${thinker.name} offers this as a lens on the question, not a verdict. Notice where the quote describes a choice you are already making.`,
    affirmation: affirmationFor(thinker.tags, theme),
    quoteReason: `This quote connects the question to ${thinker.name}'s account of ${idea.title.toLowerCase()}.`,
  };
}

function pairLensValidation(thinker: PacketThinker, quote: Quote) {
  return z
    .object({
      thinkerId: z.literal(thinker.id),
      quoteId: z.literal(quote.id),
      claim: z.string().min(3).max(160),
      theory: z.string().min(40).max(1000),
      application: z.string().min(20).max(700),
      quoteReason: z.string().min(3).max(300),
      affirmation: z.string().min(20).max(500),
    })
    .superRefine((value, ctx) => {
      if (wordCount(value.claim) > 18) {
        ctx.addIssue({
          code: "custom",
          path: ["claim"],
          message: "claim must be 18 words or fewer",
        });
      }
      if (wordCount(value.theory) > 140) {
        ctx.addIssue({
          code: "custom",
          path: ["theory"],
          message: "theory must be 140 words or fewer",
        });
      }
      if (wordCount(value.application) > 95) {
        ctx.addIssue({
          code: "custom",
          path: ["application"],
          message: "application must be 95 words or fewer",
        });
      }
      if (wordCount(value.quoteReason) > 40) {
        ctx.addIssue({
          code: "custom",
          path: ["quoteReason"],
          message: "quoteReason must be 40 words or fewer",
        });
      }
    });
}

function pairAffirmationValidation(thinker: PacketThinker, quote: Quote) {
  return z
    .object({
      thinkerId: z.literal(thinker.id),
      quoteId: z.literal(quote.id),
      affirmation: z.string().min(10).max(400),
    })
    .superRefine((value, ctx) => {
      const check = validateAffirmation(value.affirmation);
      for (const error of check.errors) {
        ctx.addIssue({ code: "custom", path: ["affirmation"], message: error });
      }
    });
}

function pairUserMessage(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  thinker: PacketThinker;
  quote: Quote;
  usedPairs: Array<{ thinkerName: string; claim: string }>;
}): string {
  const { prompt, history, analysis, thinker, quote, usedPairs } = args;
  const earlier = history.length
    ? `EARLIER QUESTIONS\n${history.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n`
    : "";

  return `${earlier}CURRENT QUESTION
${prompt}

PROMPT ANALYSIS
${analysis ? JSON.stringify(analysis, null, 2) : "No model analysis available. Infer the real question from the message, but stay close to what was actually asked."}

CHOSEN THINKER
${JSON.stringify(
  {
    id: thinker.id,
    name: thinker.name,
    dates: thinker.dates,
    tradition: thinker.tradition,
    tags: thinker.tags,
    oneLine: thinker.oneLine,
    ideas: thinker.ideas,
  },
  null,
  2,
)}

CHOSEN QUOTE
${JSON.stringify(
  {
    id: quote.id,
    text: quote.text,
    work: quote.work,
    locator: quote.locator,
    translator: quote.translator,
    paraphrase: quote.paraphrase,
    context: quote.context,
  },
  null,
  2,
)}

ALREADY USED VOICES
${
  usedPairs.length
    ? usedPairs.map((pair) => `- ${pair.thinkerName}: ${pair.claim}`).join("\n")
    : "(none)"
}

Write exactly one lens for this chosen quote and thinker. Return JSON only.`;
}

function pairAffirmationUserMessage(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  thinker: PacketThinker;
  quote: Quote;
  lens: Lens;
}): string {
  const { prompt, history, analysis, thinker, quote, lens } = args;

  return `USER MESSAGE
${prompt}

EARLIER QUESTIONS
${history.length ? history.map((item, index) => `${index + 1}. ${item}`).join("\n") : "(none)"}

PROMPT ANALYSIS
${analysis ? JSON.stringify(analysis, null, 2) : "(none)"}

THE THINKER AND QUOTE
${JSON.stringify(
  {
    thinkerId: thinker.id,
    thinkerName: thinker.name,
    quoteId: quote.id,
    quote: quote.text,
    work: quote.work,
    locator: quote.locator,
    paraphrase: quote.paraphrase,
    context: quote.context,
  },
  null,
  2,
)}

THE LENS
${JSON.stringify(
  {
    claim: lens.claim,
    theory: lens.theory,
    application: lens.application,
    draft: lens.affirmation,
  },
  null,
  2,
)}

Write one new green line for this lens. Replace the draft. Use the exact thinkerId and quoteId. Return JSON only.`;
}

async function generatePairLens(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  thinker: PacketThinker;
  quote: Quote;
  usedPairs: Array<{ thinkerName: string; claim: string }>;
}): Promise<{ lens: Lens; usage?: ProviderUsage; notes: string[] }> {
  const config = getProviderConfig("writer");
  if (!config) throw new Error("No pair writer is configured.");

  const result = await callStructured({
    config,
    system: PAIR_SYSTEM_PROMPT,
    user: pairUserMessage(args),
    schema: PAIR_LENS_JSON_SCHEMA,
    zodSchema: pairLensValidation(args.thinker, args.quote),
    label: "pair lens",
    options: { temperature: 0.65, maxTokens: 8_000 },
  });

  return {
    lens: result.data as Lens,
    usage: result.usage,
    notes: [],
  };
}

async function generatePairAffirmation(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  thinker: PacketThinker;
  quote: Quote;
  lens: Lens;
}): Promise<{ affirmation: string; usage?: ProviderUsage; notes: string[] }> {
  const config = getProviderConfig("affirmation");
  if (!config) throw new Error("No pair affirmation model is configured.");

  const result = await callStructured({
    config,
    system: AFFIRMATION_SYSTEM_PROMPT,
    user: pairAffirmationUserMessage(args),
    schema: PAIR_AFFIRMATION_JSON_SCHEMA,
    zodSchema: pairAffirmationValidation(args.thinker, args.quote),
    label: "pair green line",
    options: { temperature: 0.9, maxTokens: 2_000 },
  });

  return {
    affirmation: result.data.affirmation,
    usage: result.usage,
    notes: [],
  };
}

async function composePair(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  thinker: PacketThinker;
  quote: Quote;
  usedPairs: Array<{ thinkerName: string; claim: string }>;
}): Promise<{
  lens: Lens;
  usage?: ProviderUsage;
  notes: string[];
  fallback: boolean;
  writerMs: number;
  greenMs: number;
}> {
  const notes: string[] = [];
  let lens: Lens | null = null;
  let usage: ProviderUsage | undefined;
  let fallback = false;

  const writerStarted = Date.now();
  try {
    const result = await generatePairLens(args);
    lens = result.lens;
    usage = mergeUsage(usage, result.usage);
    notes.push(...result.notes);
  } catch (error) {
    fallback = true;
    notes.push("pair lens fallback");
    console.warn(
      `[philos-friend] pair writer failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  const writerMs = Date.now() - writerStarted;

  if (!lens) {
    lens = fallbackLens(args.thinker, args.quote, args.analysis);
  }

  const greenStarted = Date.now();
  try {
    const green = await generatePairAffirmation({ ...args, lens });
    lens = { ...lens, affirmation: green.affirmation };
    usage = mergeUsage(usage, green.usage);
    notes.push(...green.notes);
  } catch (error) {
    notes.push("pair green line fallback");
    console.warn(
      `[philos-friend] pair green line failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    if (!validateAffirmation(lens.affirmation).ok) {
      lens = {
        ...lens,
        affirmation: affirmationFor(
          args.thinker.tags,
          args.analysis?.themes[0] ?? "meaning",
        ),
      };
    }
  }
  const greenMs = Date.now() - greenStarted;

  return { lens, usage, notes, fallback, writerMs, greenMs };
}

function traceNotes(args: {
  analysisMs?: number;
  analysis?: PromptAnalysis | null;
  candidate: QuoteCandidate;
  pairNotes: string[];
  writerMs: number;
  greenMs: number;
}): string[] {
  const notes = [
    args.analysisMs !== undefined
      ? args.analysis
        ? `analysis ${args.analysisMs}ms`
        : "analysis unavailable"
      : args.analysis
        ? "analysis reused"
        : "analysis unavailable",
    `selected ${args.candidate.thinker.id}:${args.candidate.quote.id}`,
    `pair lens ${args.writerMs}ms`,
    `pair green ${args.greenMs}ms`,
    ...args.pairNotes,
  ];
  return notes;
}

function initialTrace(args: {
  retrieval: ReturnType<typeof retrieve>;
  packet: PacketThinker[];
  lens: Lens;
  traditions: string[];
  mode: "demo" | "llm";
  provider: string;
  model: string;
  timing: PairTimings;
  usage?: ProviderUsage;
  notes: string[];
}): Trace {
  return {
    themes: args.retrieval.themes,
    lineageIds: args.retrieval.lineages.map((lineage) => lineage.id),
    candidateIds: args.packet.map((thinker) => thinker.id),
    chosenIds: [args.lens.thinkerId],
    traditions: args.traditions,
    mode: args.mode,
    provider: args.provider,
    model: args.model,
    latencyMs: args.timing.totalMs,
    valid: true,
    notes: args.notes,
    inputTokens: args.usage?.inputTokens,
    outputTokens: args.usage?.outputTokens,
    estimatedCostUsd: estimateCost(args.usage),
  };
}

function updatedTrace(args: {
  conversation: Conversation;
  timing: PairTimings;
  usage?: ProviderUsage;
  notes: string[];
  mode: "demo" | "llm";
  provider: string;
  model: string;
}): Trace {
  const { conversation, timing, usage, notes, mode, provider, model } = args;
  const chosenThinkers = conversation.pairs
    .map((pair) => conversation.packet.find((thinker) => thinker.id === pair.lens.thinkerId))
    .filter((thinker): thinker is PacketThinker => Boolean(thinker));

  const previousUsage: ProviderUsage | undefined =
    conversation.trace.inputTokens !== undefined || conversation.trace.outputTokens !== undefined
      ? {
          inputTokens: conversation.trace.inputTokens ?? 0,
          outputTokens: conversation.trace.outputTokens ?? 0,
          reasoningTokens: 0,
        }
      : undefined;
  const totalUsage = mergeUsage(previousUsage, usage);

  return {
    ...conversation.trace,
    chosenIds: conversation.pairs.map((pair) => pair.lens.thinkerId),
    traditions: chosenThinkers.map((thinker) => thinker.tradition),
    mode,
    provider,
    model,
    latencyMs: conversation.trace.latencyMs + timing.totalMs,
    valid: true,
    notes: [...conversation.trace.notes, ...notes].slice(-40),
    inputTokens: totalUsage?.inputTokens,
    outputTokens: totalUsage?.outputTokens,
    estimatedCostUsd: estimateCost(totalUsage),
  };
}

export async function startConversation(args: {
  question: string;
  history?: string[];
  excludedThinkerIds?: string[];
}): Promise<{ conversation: Conversation; timing: PairTimings }> {
  const startedAt = Date.now();
  const question = args.question.trim();
  const history = (args.history ?? []).map((item) => item.trim()).filter(Boolean).slice(-5);
  const excluded = (args.excludedThinkerIds ?? [])
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
  const context = [...history, question].filter(Boolean).join("\n");

  const config = getProviderConfig("writer");
  let analysis: PromptAnalysis | null = null;
  let analysisMs: number | undefined;
  let usage: ProviderUsage | undefined;

  if (config) {
    const analysisStarted = Date.now();
    const analyzed = await analyzePrompt({ prompt: question, history });
    analysisMs = Date.now() - analysisStarted;
    analysis = analyzed?.analysis ?? null;
    usage = analyzed?.usage;
  }

  const retrieval = retrieve(context, {
    excludeThinkerIds: excluded,
    limit: 16,
    extraThemes: analysis?.themes,
  });
  const basePacket = buildPacket(retrieval);
  const ranked = rankPacketQuotes(basePacket, analysis, retrieval.themes);

  const selectionStarted = Date.now();
  const candidate = selectNextQuote({
    packet: ranked.packet,
    catalog: ranked.catalog,
    usedThinkerIds: excluded,
    usedFamilies: [],
    pairIndex: 0,
  });
  const selectionMs = Date.now() - selectionStarted;

  if (!candidate) {
    throw new Error("No quoted candidate is available for this question.");
  }

  const composed = await composePair({
    prompt: question,
    history,
    analysis,
    thinker: candidate.thinker,
    quote: candidate.quote,
    usedPairs: [],
  });

  const totalMs = Date.now() - startedAt;
  const timing: PairTimings = {
    pairIndex: 0,
    analysisMs,
    selectionMs,
    writerMs: composed.writerMs,
    greenMs: composed.greenMs,
    totalMs,
    model: config?.model ?? "library",
    fallback: composed.fallback,
  };

  const mode: "demo" | "llm" = config && !composed.fallback ? "llm" : "demo";
  const provider = config?.provider ?? "demo";
  const model = config?.model ?? "library";
  const traditions = [candidate.thinker.tradition];
  const pairNotes = traceNotes({
    analysisMs,
    analysis,
    candidate,
    pairNotes: composed.notes,
    writerMs: composed.writerMs,
    greenMs: composed.greenMs,
  });

  const now = new Date().toISOString();
  const conversation: Conversation = {
    id: randomUUID(),
    question,
    history,
    analysis: analysis ?? undefined,
    packet: ranked.packet,
    pairs: [{ lens: composed.lens, createdAt: now }],
    mode,
    provider,
    model,
    trace: initialTrace({
      retrieval,
      packet: ranked.packet,
      lens: composed.lens,
      traditions,
      mode,
      provider,
      model,
      timing,
      usage: mergeUsage(usage, composed.usage),
      notes: pairNotes,
    }),
    timings: [timing],
    createdAt: now,
    updatedAt: now,
  };

  return { conversation, timing };
}

export async function addConversationPair(
  conversation: Conversation,
  requestedIndex?: number,
): Promise<{
  conversation: Conversation;
  pair: ConversationPairView;
  timing: PairTimings;
}> {
  const pairIndex = requestedIndex ?? conversation.pairs.length;

  if (pairIndex < conversation.pairs.length) {
    const existing = conversation.pairs[pairIndex];
    const view = resolveConversationPair(conversation, existing);
    const timing = conversation.timings[pairIndex] ?? {
      pairIndex,
      selectionMs: 0,
      writerMs: 0,
      greenMs: 0,
      totalMs: 0,
      model: conversation.model,
      fallback: false,
    };
    if (!view) throw new Error("The stored pair could not be resolved.");
    return { conversation, pair: view, timing };
  }

  if (pairIndex >= 3) {
    throw new Error("This conversation already has three pairs.");
  }
  if (pairIndex !== conversation.pairs.length) {
    throw new Error("The next pair must be generated in order.");
  }

  const startedAt = Date.now();
  const ranked = rankPacketQuotes(
    conversation.packet,
    conversation.analysis,
    conversation.trace.themes,
  );

  const usedThinkerIds = new Set(conversation.pairs.map((pair) => pair.lens.thinkerId));
  const usedQuoteIds = new Set(
    conversation.pairs
      .map((pair) => pair.lens.quoteId)
      .filter((quoteId): quoteId is string => Boolean(quoteId)),
  );
  const usedFamilies = new Set(
    conversation.pairs
      .map((pair) =>
        conversation.packet.find((thinker) => thinker.id === pair.lens.thinkerId),
      )
      .filter((thinker): thinker is PacketThinker => Boolean(thinker))
      .map((thinker) => familyOf(thinker.tradition)),
  );

  const selectionStarted = Date.now();
  const candidate = selectNextQuote({
    packet: ranked.packet,
    catalog: ranked.catalog,
    usedThinkerIds,
    usedQuoteIds,
    usedFamilies,
    pairIndex,
  });
  const selectionMs = Date.now() - selectionStarted;

  if (!candidate) {
    throw new Error("No unused quoted candidate is available.");
  }

  const usedPairs = conversation.pairs.map((pair) => {
    const thinker = conversation.packet.find((item) => item.id === pair.lens.thinkerId);
    return {
      thinkerName: thinker?.name ?? pair.lens.thinkerId,
      claim: pair.lens.claim,
    };
  });

  const composed = await composePair({
    prompt: conversation.question,
    history: conversation.history,
    analysis: conversation.analysis,
    thinker: candidate.thinker,
    quote: candidate.quote,
    usedPairs,
  });

  const totalMs = Date.now() - startedAt;
  const timing: PairTimings = {
    pairIndex,
    selectionMs,
    writerMs: composed.writerMs,
    greenMs: composed.greenMs,
    totalMs,
    model: conversation.model,
    fallback: composed.fallback,
  };

  const now = new Date().toISOString();
  conversation.pairs.push({ lens: composed.lens, createdAt: now });
  conversation.timings.push(timing);
  conversation.updatedAt = now;
  conversation.mode =
    conversation.mode === "llm" || !composed.fallback ? "llm" : "demo";
  conversation.trace = updatedTrace({
    conversation,
    timing,
    usage: composed.usage,
    notes: traceNotes({
      analysis: conversation.analysis,
      candidate,
      pairNotes: composed.notes,
      writerMs: composed.writerMs,
      greenMs: composed.greenMs,
    }),
    mode: conversation.mode,
    provider: conversation.provider,
    model: conversation.model,
  });

  const view = resolveConversationPair(
    conversation,
    conversation.pairs[conversation.pairs.length - 1],
  );
  if (!view) throw new Error("The generated pair could not be resolved.");

  return { conversation, pair: view, timing };
}
