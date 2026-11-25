import { z } from "zod";
import type { Answer, PacketThinker, PromptAnalysis } from "../schema";
import type { QuoteCatalogEntry } from "../quote-search";
import { validateAffirmation } from "../validate";
import { callStructured } from "./structured";
import { getProviderConfig, type ProviderUsage } from "./providers";

export const AFFIRMATION_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["affirmations"],
  properties: {
    affirmations: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["thinkerId", "quoteId", "affirmation"],
        properties: {
          thinkerId: { type: "string" },
          quoteId: { type: "string" },
          affirmation: { type: "string" },
        },
      },
    },
  },
};

const affirmationSchema = z.object({
  affirmations: z
    .array(
      z.object({
        thinkerId: z.string().min(1),
        quoteId: z.string().min(1),
        affirmation: z.string().min(10).max(400),
      }),
    )
    .min(3)
    .max(3),
});

const AFFIRMATION_SYSTEM_PROMPT = `You write the green line for Philos-Friend: the life-affirming sentence that appears above the quote.

This line is not a summary and not therapy. It is a short, non-judgmental, genuinely useful sentence that helps the person carry the quote into their situation.

RULES
- One sentence, 12–25 words. No semicolon chains.
- Always helpful. Never shaming, diagnosing, moralizing, or scolding.
- Challenge an idea if needed, never the person's worth.
- Ground it in one concrete image from the quote or one concrete detail from the question.
- It must be specific enough that it could not be pasted under a different quote.
- Vary the syntax. Do not start every line the same way.
- No commands. No "you should," "you must," "you need to."
- No therapy-speak or stock phrases.

BANNED PHRASES
"You are allowed to", "It's okay to", "Give yourself permission", "Remember that", "Your feelings are valid", "You deserve", "At the end of the day", "Be kind to yourself", "You are enough", "Trust the process", "Everything happens for a reason", "Hold space", "You've got this."

The line can be a permission, a reframe, a clean observation, or a small challenge. It should feel like something a wise friend would actually say.

Return JSON only.`;

function addUsage(a?: ProviderUsage, b?: ProviderUsage): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

function lensContext(
  answer: Answer,
  packet: PacketThinker[],
  catalog: QuoteCatalogEntry[],
): Array<{
  thinkerId: string;
  thinkerName: string;
  quoteId: string;
  quote: string;
  work: string;
  locator: string;
  paraphrase?: string;
  context?: string;
  claim: string;
  theory: string;
  application: string;
  draft: string;
}> {
  return answer.lenses.map((lens) => {
    const thinker = packet.find((item) => item.id === lens.thinkerId);
    const entry =
      catalog.find((item) => item.quoteId === lens.quoteId) ??
      catalog.find((item) => item.thinkerId === lens.thinkerId);

    return {
      thinkerId: lens.thinkerId,
      thinkerName: thinker?.name ?? lens.thinkerId,
      quoteId: lens.quoteId ?? entry?.quoteId ?? "",
      quote: entry?.text ?? "",
      work: entry?.work ?? "",
      locator: entry?.locator ?? "",
      paraphrase: entry?.paraphrase,
      context: entry?.context,
      claim: lens.claim,
      theory: lens.theory,
      application: lens.application,
      draft: lens.affirmation,
    };
  });
}

export async function generateAffirmations(args: {
  prompt: string;
  history: string[];
  analysis?: PromptAnalysis | null;
  answer: Answer;
  packet: PacketThinker[];
  catalog: QuoteCatalogEntry[];
}): Promise<{ affirmations: Record<string, string>; usage?: ProviderUsage; notes: string[] }> {
  const config = getProviderConfig("affirmation");
  if (!config) throw new Error("No affirmation model is configured.");

  const lenses = lensContext(args.answer, args.packet, args.catalog);
  const base = `USER MESSAGE
${args.prompt}

EARLIER QUESTIONS
${args.history.length ? args.history.map((item, index) => `${index + 1}. ${item}`).join("\n") : "(none)"}

PROMPT ANALYSIS
${args.analysis ? JSON.stringify(args.analysis, null, 2) : "(none)"}

THE THREE LENSES
${JSON.stringify(lenses, null, 2)}

Write one new green line for each lens. Replace the draft. Use the exact thinkerId and quoteId. Return three affirmations in the same order.`;

  let usage: ProviderUsage | undefined;
  let feedback = "";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const user = feedback ? `${base}\n\n${feedback}` : base;
    const result = await callStructured({
      config,
      system: AFFIRMATION_SYSTEM_PROMPT,
      user,
      schema: AFFIRMATION_JSON_SCHEMA,
      zodSchema: affirmationSchema,
      label: "affirmation",
      options: { temperature: 0.9, maxTokens: 4000 },
    });
    usage = addUsage(usage, result.usage);

    const problems: string[] = [];
    const map: Record<string, string> = {};
    for (const item of result.data.affirmations) {
      const check = validateAffirmation(item.affirmation);
      if (!check.ok) {
        problems.push(`${item.thinkerId}: ${check.errors.join("; ")}`);
      } else {
        map[item.thinkerId] = item.affirmation;
      }
    }

    if (Object.keys(map).length === 3) {
      return {
        affirmations: map,
        usage,
        notes: attempt ? ["affirmation pass after one correction"] : ["affirmation pass"],
      };
    }

    feedback = `Some lines failed the non-generic/non-judgment check:
${problems.map((problem) => `- ${problem}`).join("\n")}

Rewrite all three lines. Keep the same thinkerId and quoteId. No stock phrases.`;
  }

  throw new Error("Affirmation pass failed after correction.");
}

export { addUsage as addAffirmationUsage };
