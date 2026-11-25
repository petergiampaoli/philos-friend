import { randomUUID } from "node:crypto";
import type { AdviseResponse, Answer, PacketThinker, Trace } from "./schema";
import { retrieve } from "./retrieve";
import { buildPacket } from "./packet";
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
  const retrieval = retrieve(context, { excludeThinkerIds: excluded });
  const packet = buildPacket(retrieval);
  const config = getProviderConfig();
  const providerName = config?.provider ?? "demo";
  const modelName = config?.model ?? "library";
  const key = cacheKey({
    prompt: context,
    packetIds: packet.map((thinker) => thinker.id),
    provider: providerName,
    model: modelName,
    exclude: excluded,
  });

  const cached = getCached(key);
  if (cached) return cached;

  const notes: string[] = [];
  let answer: AdviseResponse["answer"] | null = null;
  let mode: "demo" | "llm" = "demo";
  let provider = "demo";
  let model = "library";
  let usage: ProviderUsage | undefined;

  if (history.length > 0) notes.push(`amalgam of ${history.length + 1} questions`);
  if (excluded.length > 0) notes.push(`excluded ${excluded.length} prior voices`);

  if (config) {
    const live = await synthesizeWithLlm({
      prompt: question,
      history,
      packet,
      themes: retrieval.themes,
    });

    if (live) {
      answer = live.answer;
      mode = "llm";
      provider = live.provider;
      model = live.model;
      usage = live.usage;
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

  let validation = validateAnswer(answer, packet, context);

  if (!validation.ok && mode === "llm") {
    notes.push("live answer failed validation; used library composition");
    const fixture = canUseFixture ? getFixture(question, packet) : null;
    answer = fixture ?? composeTemplateAnswer(retrieval, packet);
    mode = "demo";
    provider = "demo";
    model = "library";
    validation = validateAnswer(answer, packet, context);
  }

  const guaranteed = ensureQuotedLenses(answer, packet);
  if (guaranteed.swapped > 0) {
    answer = guaranteed.answer;
    notes.push(`quote guarantee: swapped ${guaranteed.swapped} lens(es)`);
    validation = validateAnswer(answer, packet, context);
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
  };

  if (validation.ok) setCached(key, response);
  return response;
}
