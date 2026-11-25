import { answerSchema, type Answer, type PacketThinker } from "../schema";
import { validateAnswer } from "../validate";
import {
  getProviderConfig,
  callProvider,
  type ProviderConfig,
  type ProviderUsage,
} from "./providers";
import { THEME_LABELS } from "../themes";
import type { ThemeId } from "../schema";

const STRING = { type: "string" } as const;

export const ANSWER_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["thesis", "lenses", "synthesis", "practice", "question"],
  properties: {
    thesis: STRING,
    lenses: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["thinkerId", "quoteId", "claim", "theory", "application", "affirmation"],
        properties: {
          thinkerId: STRING,
          quoteId: { anyOf: [{ type: "string" }, { type: "null" }] },
          claim: STRING,
          theory: STRING,
          application: STRING,
          affirmation: STRING,
        },
      },
    },
    synthesis: STRING,
    practice: STRING,
    question: STRING,
  },
};

const SYSTEM_PROMPT = `You are the editor of Philos-Friend, a philosophy advice column.

The user is asking for advice about their life, not for a history lecture. Answer as a wise, direct editor who has read widely and has no interest in sounding academic.

Hard rules:
- Return JSON only, matching the provided schema.
- Use exactly three lenses. Each lens must come from a different thinker in the PACKET.
- The three lenses must come from at least two different traditions.
- Each lens makes one claim, explains the theory in plain English, then applies it to the user's situation.
- Use "quoteId" only from that thinker's quotes in the PACKET. Prefer a real quote over null; the interface shows one quotation at a time. Never write quotation text yourself. Never invent a quotation.
- If EARLIER QUESTIONS are present, answer the amalgam of those questions and the current question. Do not answer only the latest sentence.
- Do not mention any thinker, book, or quotation that is not in the PACKET.
- Thesis: 1-3 sentences, max 50 words.
- Claim: max 12 words.
- Theory: max 90 words.
- Application: max 60 words.
- Affirmation: one warm, second-person permission line, max 30 words. Ground it in the quote and the question. Do not diagnose, command, or promise.
- Synthesis: max 120 words. It must put the lenses in tension or show what they disagree about. Do not just summarize them.
- Practice: one concrete thing the user can do, max 40 words.
- Question: one question back to the user, max 25 words.
- No diagnosis, no therapy claims, no "as an AI," no bullet lists, no throat-clearing.
- If the question is outside the library's range, use the nearest lenses rather than inventing a tradition.
- Warm, concrete, unsentimental. The user can take a joke and does not need to be managed.`;

function themesText(themes: ThemeId[]): string {
  return themes.map((theme) => THEME_LABELS[theme] ?? theme).join(", ");
}

function buildUserMessage(
  prompt: string,
  packet: PacketThinker[],
  themes: ThemeId[],
  history: string[],
): string {
  const compact = packet.map((thinker) => ({
    id: thinker.id,
    name: thinker.name,
    dates: thinker.dates,
    tradition: thinker.tradition,
    region: thinker.region,
    tags: thinker.tags,
    oneLine: thinker.oneLine,
    ideas: thinker.ideas,
    quotes: thinker.quotes.map((quote) => ({
      id: quote.id,
      text: quote.text,
      work: quote.work,
      locator: quote.locator,
      translator: quote.translator,
    })),
  }));

  const earlier = history.length
    ? `EARLIER QUESTIONS (context for the amalgam)
${history.map((item, index) => `${index + 1}. ${item}`).join("\n")}

`
    : "";

  return `${earlier}CURRENT QUESTION
${prompt}

${history.length ? "Answer the amalgam of the earlier questions and the current question. Do not answer only the latest sentence.\n\n" : ""}MATCHED THEMES
${themesText(themes)}

PACKET
${JSON.stringify(compact, null, 2)}

Return the JSON object now.`;
}

function parseRaw(raw: unknown): unknown {
  if (typeof raw === "string") {
    const stripped = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    return JSON.parse(stripped);
  }
  return raw;
}

async function attempt(
  config: ProviderConfig,
  prompt: string,
  packet: PacketThinker[],
  themes: ThemeId[],
  history: string[],
  repair?: { previous: unknown; errors: string[] },
): Promise<{ answer: Answer; notes: string[]; usage?: ProviderUsage }> {
  const base = buildUserMessage(prompt, packet, themes, history);
  const user = repair
    ? `${base}

Your previous response failed validation:
${repair.errors.map((error) => `- ${error}`).join("\n")}

Previous response:
${JSON.stringify(repair.previous).slice(0, 5000)}

Return a corrected JSON object. Use only thinker IDs and quote IDs from the packet.`
    : base;

  const result = await callProvider(config, SYSTEM_PROMPT, user, ANSWER_JSON_SCHEMA);

  let parsed: unknown;
  try {
    parsed = parseRaw(result.raw);
  } catch {
    if (!repair) {
      return attempt(config, prompt, packet, themes, history, {
        previous: String(result.raw).slice(0, 2000),
        errors: ["The response was not valid JSON."],
      });
    }
    throw new Error("The response was not valid JSON after repair.");
  }

  const zod = answerSchema.safeParse(parsed);

  if (!zod.success) {
    const errors = zod.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
    if (!repair) {
      return attempt(config, prompt, packet, themes, history, { previous: parsed, errors });
    }
    throw new Error(`Invalid answer after repair: ${errors.join("; ")}`);
  }

  const validation = validateAnswer(zod.data, packet, prompt);
  if (!validation.ok) {
    if (!repair) {
      return attempt(config, prompt, packet, themes, history, {
        previous: parsed,
        errors: validation.errors,
      });
    }
    throw new Error(`Answer failed validation after repair: ${validation.errors.join("; ")}`);
  }

  return {
    answer: zod.data,
    notes: repair ? ["live synthesis after one repair"] : ["live synthesis"],
    usage: result.usage,
  };
}

export type LlmSynthesis = {
  answer: Answer;
  provider: string;
  model: string;
  notes: string[];
  usage?: ProviderUsage;
};

export async function synthesizeWithLlm(args: {
  prompt: string;
  history?: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
}): Promise<LlmSynthesis | null> {
  const config = getProviderConfig();
  if (!config) return null;

  try {
    const result = await attempt(
      config,
      args.prompt,
      args.packet,
      args.themes,
      args.history ?? [],
    );
    return {
      answer: result.answer,
      provider: config.provider,
      model: config.model,
      notes: result.notes,
      usage: result.usage,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[philos-friend] live synthesis failed: ${message}`);
    return null;
  }
}
