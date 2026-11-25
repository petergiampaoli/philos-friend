import { z } from "zod";
import type { Answer, PacketThinker, PromptAnalysis, ThemeId } from "../schema";
import type { QuoteCatalogEntry } from "../quote-search";
import { callStructured } from "./structured";
import { getProviderConfig, type ProviderUsage } from "./providers";

export const CRITIQUE_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["scores", "issues", "shouldRevise"],
  properties: {
    scores: {
      type: "object",
      additionalProperties: false,
      required: [
        "promptFit",
        "quoteFit",
        "specificity",
        "nonGeneric",
        "nonJudgment",
        "fidelity",
      ],
      properties: {
        promptFit: { type: "integer", minimum: 1, maximum: 5 },
        quoteFit: { type: "integer", minimum: 1, maximum: 5 },
        specificity: { type: "integer", minimum: 1, maximum: 5 },
        nonGeneric: { type: "integer", minimum: 1, maximum: 5 },
        nonJudgment: { type: "integer", minimum: 1, maximum: 5 },
        fidelity: { type: "integer", minimum: 1, maximum: 5 },
      },
    },
    issues: { type: "array", items: { type: "string" } },
    shouldRevise: { type: "boolean" },
  },
};

const critiqueSchema = z.object({
  scores: z.object({
    promptFit: z.number().int().min(1).max(5),
    quoteFit: z.number().int().min(1).max(5),
    specificity: z.number().int().min(1).max(5),
    nonGeneric: z.number().int().min(1).max(5),
    nonJudgment: z.number().int().min(1).max(5),
    fidelity: z.number().int().min(1).max(5),
  }),
  issues: z.array(z.string().min(3).max(300)).max(20),
  shouldRevise: z.boolean(),
});

export type Critique = z.infer<typeof critiqueSchema>;

const CRITIC_SYSTEM_PROMPT = `You are the toughest editor at Philos-Friend.

Review the draft answer against the user's actual message and the prompt analysis. You are not here to be encouraging. You are here to catch:
- an answer that addresses the surface question but not the real one,
- a quote that is merely keyword-matched, decorative, or misread,
- generic advice that could be pasted under any quote,
- therapy-speak, moralizing, or judgment of the person,
- a synthesis that summarizes instead of putting the lenses in tension,
- unsupported claims about a thinker or quotation,
- a missing concrete detail from the user's situation.

Score each category from 1 to 5:
1 = bad, 2 = weak, 3 = acceptable, 4 = strong, 5 = exceptional.

Be exact about what is wrong. If the answer is merely competent, say so and revise it. Return JSON only.`;

function addUsage(a?: ProviderUsage, b?: ProviderUsage): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

export async function critiqueAnswer(args: {
  prompt: string;
  history: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
  analysis?: PromptAnalysis | null;
  catalog: QuoteCatalogEntry[];
  answer: Answer;
}): Promise<{ critique: Critique; usage?: ProviderUsage } | null> {
  const config = getProviderConfig("critic");
  if (!config) return null;

  const selectedIds = new Set(args.answer.lenses.flatMap((lens) => [lens.quoteId, lens.thinkerId]));
  const relevantQuotes = args.catalog.filter(
    (entry) => selectedIds.has(entry.quoteId) || selectedIds.has(entry.thinkerId),
  );

  const user = `USER MESSAGE
${args.prompt}

EARLIER QUESTIONS
${args.history.length ? args.history.map((item, index) => `${index + 1}. ${item}`).join("\n") : "(none)"}

PROMPT ANALYSIS
${args.analysis ? JSON.stringify(args.analysis, null, 2) : "(none)"}

THINKERS IN THE PACKET
${JSON.stringify(
  args.packet.map((thinker) => ({
    id: thinker.id,
    name: thinker.name,
    tradition: thinker.tradition,
    tags: thinker.tags,
    oneLine: thinker.oneLine,
  })),
  null,
  2,
)}

QUOTES AVAILABLE TO THIS ANSWER
${JSON.stringify(
  relevantQuotes.map((entry) => ({
    thinkerId: entry.thinkerId,
    quoteId: entry.quoteId,
    text: entry.text,
    work: entry.work,
    locator: entry.locator,
    paraphrase: entry.paraphrase,
    context: entry.context,
  })),
  null,
  2,
)}

DRAFT ANSWER
${JSON.stringify(args.answer, null, 2)}

Return the JSON critique now.`;

  try {
    const result = await callStructured({
      config,
      system: CRITIC_SYSTEM_PROMPT,
      user,
      schema: CRITIQUE_JSON_SCHEMA,
      zodSchema: critiqueSchema,
      label: "critique",
      options: { temperature: 0.2, maxTokens: 6000 },
    });

    const weak = Object.values(result.data.scores).some((score) => score < 4);
    return {
      critique: {
        ...result.data,
        shouldRevise: result.data.shouldRevise || weak || result.data.issues.length > 0,
      },
      usage: result.usage,
    };
  } catch (error) {
    console.warn(
      `[philos-friend] critic failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }
}

export function critiqueSummary(critique: Critique): string {
  const scores = Object.entries(critique.scores)
    .map(([key, value]) => `${key} ${value}`)
    .join(", ");
  return `critic ${scores}${critique.issues.length ? `; ${critique.issues.length} issue(s)` : ""}`;
}

export { addUsage };
