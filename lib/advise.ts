import { randomUUID } from "node:crypto";
import type { AdviseResponse, Answer, PacketThinker, Trace } from "./schema";
import { retrieve } from "./retrieve";
import { buildPacket } from "./packet";
import { analyzePrompt } from "./analysis";
import { rankPacketQuotes } from "./quote-search";
import { composeTemplateAnswer, getFixture } from "./compose";
import { validateAnswer } from "./validate";
import { synthesizeWithLlm } from "./llm";
import { getProviderConfig, type ProviderUsage } from "./llm/providers";
import { estimateCost } from "./cost";
import { affirmationFor } from "./affirmations";
import { cacheKey, getCached, setCached } from "./cache";

export type AdviseOptions = {
  history?: string[];
  excludeThinkerIds?: string[];
};

function familyOf(tradition: string): string {
  return tradition.split("/")[0].trim().toLowerCase();
}

function mergeUsage(
  a: ProviderUsage | undefined,
  b: ProviderUsage | undefined,
): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

/**
 * The quote-only web surface needs three real quotations. If the live model
 * selects a thinker with no verified quote, replace that lens with the best
 * unused quoted candidate from the same packet. Never synthesize a quote.
 */
function ensureQuotedLenses(
  answer: Answer,
  packet: PacketThinker[],
): { answer: Answer; swapped: number } {
  const used = new Set(answer.lenses.map((lens) => lens.thinkerId));
  const families = new Set(
    answer.lenses
      .map((lens) => packet.find((thinker) => thinker.id === lens.thinkerId)?.tradition)
      .filter((tradition): tradition is string => Boolean(tradition))
      .map(familyOf),
  );
  let swapped = 0;

  const lenses = answer.lenses.map((lens) => {
    const current = packet.find((thinker) => thinker.id === lens.thinkerId);
    const hasQuote =
      Boolean(current) &&
      Boolean(lens.quoteId) &&
      Boolean(current?.quotes.some((quote) => quote.id === lens.quoteId));

    if (hasQuote) {
      return lens.affirmation
        ? lens
        : { ...lens, affirmation: affirmationFor(current?.tags ?? []) };
    }

    const candidates = packet
      .filter((thinker) => thinker.quotes.length > 0 && !used.has(thinker.id))
      .sort((a, b) => {
        const aKnown = families.has(familyOf(a.tradition)) ? 1 : 0;
        const bKnown = families.has(familyOf(b.tradition)) ? 1 : 0;
        return aKnown - bKnown;
      });

    const replacement = candidates[0];
    if (!replacement) return lens;

    used.add(replacement.id);
    families.add(familyOf(replacement.tradition));
    swapped += 1;
    const idea = replacement.ideas[0];

    return {
      thinkerId: replacement.id,
      quoteId: replacement.quotes[0].id,
      claim: idea.title,
      theory: idea.summary,
      application: `${replacement.name} offers this as a lens on the question, not a verdict.`,
      affirmation: affirmationFor(replacement.tags),
    };
  });

  return { answer: { ...answer, lenses }, swapped };
}

export async function advise(prompt: string, options: AdviseOptions = {}): Promise<AdviseResponse> {
  const startedAt = Date.now();
  const question = prompt.trim();
  const history = (options.history ?? [])
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(-5);
  const excluded = (options.excludeThinkerIds ?? [])
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
  const context = [...history, question].filter(Boolean).join("\n");
  const config = getProviderConfig("writer");
  const providerName = config?.provider ?? "demo";
  const modelName = config?.model ?? "library";
  const key = cacheKey({
    prompt: context,
    packetIds: [],
    provider: providerName,
    model: modelName,
    exclude: excluded,
  });

  const cached = getCached(key);
  if (cached) return cached;

  const notes: string[] = [];
  let usage: ProviderUsage | undefined;
  const analyzed = config ? await analyzePrompt({ prompt: question, history }) : null;
  const analysis = analyzed?.analysis ?? null;
  usage = analyzed?.usage;
  if (!analysis && config) notes.push("analysis unavailable");

  const retrieval = retrieve(context, {
    excludeThinkerIds: excluded,
    limit: 16,
    extraThemes: analysis?.themes,
  });
  const basePacket = buildPacket(retrieval);

  const ranked = rankPacketQuotes(basePacket, analysis, retrieval.themes);
  const packet = ranked.packet;
  const catalog = ranked.catalog;

  let answer: AdviseResponse["answer"] | null = null;
  let mode: "demo" | "llm" = "demo";
  let provider = "demo";
  let model = "library";

  if (history.length > 0) notes.push(`amalgam of ${history.length + 1} questions`);
  if (excluded.length > 0) notes.push(`excluded ${excluded.length} prior voices`);

  if (config) {
    const live = await synthesizeWithLlm({
      prompt: question,
      history,
      packet,
      themes: retrieval.themes,
      analysis,
      catalog,
    });

    if (live) {
      answer = live.answer;
      mode = "llm";
      provider = live.provider;
      model = live.model;
      usage = mergeUsage(usage, live.usage);
      notes.push(...live.notes);
    } else {
      notes.push("live synthesis unavailable");
    }
  }

  const canUseFixture = history.length === 0 && excluded.length === 0;

  if (!answer) {
    const fixture = canUseFixture ? getFixture(question, packet) : null;
    if (fixture) {
      answer = fixture;
      notes.push("curated demo answer");
    } else {
      answer = composeTemplateAnswer(retrieval, packet);
      notes.push("retrieved library composition");
    }
  }

  let validation = validateAnswer(answer, packet, context, { checkAffirmation: false });

  if (!validation.ok && mode === "llm") {
    notes.push("live answer failed validation; used library composition");
    const fixture = canUseFixture ? getFixture(question, packet) : null;
    answer = fixture ?? composeTemplateAnswer(retrieval, packet);
    mode = "demo";
    provider = "demo";
    model = "library";
    validation = validateAnswer(answer, packet, context, { checkAffirmation: false });
  }

  const guaranteed = ensureQuotedLenses(answer, packet);
  if (guaranteed.swapped > 0) {
    answer = guaranteed.answer;
    notes.push(`quote guarantee: swapped ${guaranteed.swapped} lens(es)`);
    validation = validateAnswer(answer, packet, context, { checkAffirmation: false });
  }

  if (!validation.ok) {
    notes.push(`answer has ${validation.errors.length} validation issue(s)`);
  }

  const chosenTraditions = answer.lenses
    .map((lens) => packet.find((thinker) => thinker.id === lens.thinkerId)?.tradition)
    .filter((tradition): tradition is string => Boolean(tradition));

  const trace: Trace = {
    themes: retrieval.themes,
    lineageIds: retrieval.lineages.map((lineage) => lineage.id),
    candidateIds: packet.map((thinker) => thinker.id),
    chosenIds: validation.chosenIds,
    traditions: chosenTraditions,
    mode,
    provider,
    model,
    latencyMs: Date.now() - startedAt,
    valid: validation.ok,
    notes,
    inputTokens: usage?.inputTokens,
    outputTokens: usage?.outputTokens,
    estimatedCostUsd: estimateCost(usage),
  };

  const response: AdviseResponse = {
    id: randomUUID(),
    question,
    answer,
    packet,
    trace,
    mode,
    analysis: analysis ?? undefined,
  };

  if (validation.ok) setCached(key, response);
  return response;
}
