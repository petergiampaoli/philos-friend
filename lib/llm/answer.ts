import {
  answerSchema,
  type Answer,
  type PacketThinker,
  type PromptAnalysis,
} from "../schema";
import { validateAnswer } from "../validate";
import { callProvider, type ProviderUsage } from "./providers";
import { getProviderConfig } from "./providers";
import { parseJson } from "./structured";
import type { QuoteCatalogEntry } from "../quote-search";
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
        required: [
          "thinkerId",
          "quoteId",
          "claim",
          "theory",
          "application",
          "affirmation",
          "quoteReason",
        ],
        properties: {
          thinkerId: STRING,
          quoteId: { anyOf: [{ type: "string" }, { type: "null" }] },
          claim: STRING,
          theory: STRING,
          application: STRING,
          affirmation: STRING,
          quoteReason: STRING,
        },
      },
    },
    synthesis: STRING,
    practice: STRING,
    question: STRING,
  },
};

const SYSTEM_PROMPT = `You are the editor of Philos-Friend, a philosophy advice column.

The user is asking for advice about their life, not for a history lecture. You are a wise, direct friend who has read widely and has no interest in sounding academic, therapeutic, or impressive.

MAXIMUM-QUALITY RULES
- Read the PROMPT ANALYSIS before anything else. Answer the real question underneath the surface question.
- Do not merely validate the user. If the analysis identifies a self-defeating belief, name it plainly and kindly.
- Never judge the person. Challenge the idea, the premise, or the strategy — not their worth.
- Be concrete. If the application could be pasted under another quote, it has failed.
- No throat-clearing, no "in today's world," no "it is important to remember."

QUOTE RULES
- Use exactly three lenses, each from a different thinker in the PACKET.
- The three thinkers must come from at least two different traditions.
- Choose quote IDs only from the QUOTE CATALOG. Never write quotation text yourself. Never invent a quote.
- A quote must do real work in the answer. Do not pick it because it shares a keyword with the question.
- For each lens, quoteReason must explain, in one sentence, why this specific quote fits this specific person. No generic reasons.
- If EARLIER QUESTIONS are present, answer the amalgam of those questions and the current question. Do not answer only the latest sentence.
- Do not mention any thinker, book, or quotation that is not in the PACKET or CATALOG.

STYLE
- Thesis: 1–3 sentences, max 50 words. Make a definite claim about the situation.
- Claim: max 12 words. A sharp, arguable claim, not a summary.
- Theory: 45–90 words. Explain the quote's actual argument in plain English, using its own image or distinction. Do not just paraphrase the surface.
- Application: 25–60 words. Name one concrete thing the person can notice, try, or stop doing. Include a detail from their question.
- Affirmation: this is a placeholder draft. Write one warm, specific, non-judgmental sentence, 12–25 words. It must be grounded in the quote or the person's situation, not in therapy language.
- Synthesis: 60–120 words. Put the three lenses in tension. Show what they disagree about. Do not summarize them one by one.
- Practice: one concrete action, max 40 words.
- Question: one question back to the user, max 25 words.
- Warm, concrete, unsentimental. The user can take a joke and does not need to be managed.

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
- "Everything happens for a reason."
- "Hold space."
- "You've got this."

IF SAFETY IS "care"
- Drop the debate-club tone. Be gentle, direct, and non-judgmental.
- Do not romanticize self-harm or isolation.
- Encourage the person to contact a trusted person or local emergency/crisis service.
- Do not pretend the quotes are a substitute for care.

VOICE EXEMPLAR
A good application sounds like: "You are not short of discipline. You are using a scoreboard to answer a question about whether you are allowed to want what you want." That is specific. It could not be said about every question.

Return JSON only, matching the provided schema. Include quoteReason for every lens.`;

function themesText(themes: ThemeId[]): string {
  return themes.map((theme) => THEME_LABELS[theme] ?? theme).join(", ");
}

function compactPacket(packet: PacketThinker[]) {
  return packet.map((thinker) => ({
    id: thinker.id,
    name: thinker.name,
    dates: thinker.dates,
    tradition: thinker.tradition,
    region: thinker.region,
    tags: thinker.tags,
    oneLine: thinker.oneLine,
    ideas: thinker.ideas,
  }));
}

function compactCatalog(catalog: QuoteCatalogEntry[]) {
  return catalog.map((entry) => ({
    thinkerId: entry.thinkerId,
    thinkerName: entry.thinkerName,
    quoteId: entry.quoteId,
    text: entry.text,
    work: entry.work,
    locator: entry.locator,
    translator: entry.translator,
    paraphrase: entry.paraphrase,
    context: entry.context,
    score: entry.score,
  }));
}

function buildUserMessage(args: {
  prompt: string;
  history: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
  analysis?: PromptAnalysis | null;
  catalog: QuoteCatalogEntry[];
}): string {
  const { prompt, history, packet, themes, analysis, catalog } = args;
  const earlier = history.length
    ? `EARLIER QUESTIONS (context for the amalgam)
${history.map((item, index) => `${index + 1}. ${item}`).join("\n")}

`
    : "";

  const analysisText = analysis
    ? JSON.stringify(analysis, null, 2)
    : "No model analysis available. Infer the real question from the message, but stay close to what was actually asked.";

  return `${earlier}CURRENT QUESTION
${prompt}

${history.length ? "Answer the amalgam of the earlier questions and the current question. Do not answer only the latest sentence.\n\n" : ""}PROMPT ANALYSIS
${analysisText}

MATCHED THEMES
${themesText(themes)}

PACKET (thinkers you may use; use their ideas for the theory)
${JSON.stringify(compactPacket(packet), null, 2)}

QUOTE CATALOG (the only quote IDs you may use)
${JSON.stringify(compactCatalog(catalog), null, 2)}

Return the JSON object now. Include quoteReason for every lens.`;
}

function validationErrors(answer: Answer, packet: PacketThinker[], prompt: string): string[] {
  const result = validateAnswer(answer, packet, prompt, { checkAffirmation: false });
  const errors = [...result.errors];
  for (const lens of answer.lenses) {
    if (!lens.quoteReason || lens.quoteReason.trim().length < 3) {
      errors.push(`${lens.thinkerId}: missing quoteReason`);
    }
  }
  return errors;
}

function addUsage(a?: ProviderUsage, b?: ProviderUsage): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

export async function generateAnswer(args: {
  prompt: string;
  history: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
  analysis?: PromptAnalysis | null;
  catalog: QuoteCatalogEntry[];
}): Promise<{ answer: Answer; usage?: ProviderUsage; notes: string[] }> {
  const config = getProviderConfig("writer");
  if (!config) throw new Error("No writer model is configured.");

  const base = buildUserMessage(args);
  let usage: ProviderUsage | undefined;
  let previous: unknown;
  let errors = ["The response did not match the required answer schema."];

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const user =
      attempt === 0
        ? base
        : `${base}

Your previous response failed validation:
${errors.map((error) => `- ${error}`).join("\n")}

Previous response:
${JSON.stringify(previous).slice(0, 6000)}

Return a corrected JSON object. Use only thinker IDs and quote IDs from the packet and catalog. Include quoteReason for every lens.`;

    const result = await callProvider(
      config,
      `${SYSTEM_PROMPT}

Return JSON only. It must match this schema:
${JSON.stringify(ANSWER_JSON_SCHEMA)}`,
      user,
      ANSWER_JSON_SCHEMA,
      { temperature: 0.7, maxTokens: 20_000, stage: "writer" },
    );

    usage = addUsage(usage, result.usage);

    let parsed: unknown;
    try {
      parsed = parseJson(result.raw);
    } catch {
      previous = String(result.raw).slice(0, 3000);
      errors = ["The response was not valid JSON."];
      continue;
    }

    const zod = answerSchema.safeParse(parsed);
    if (!zod.success) {
      previous = parsed;
      errors = zod.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      continue;
    }

    const answerErrors = validationErrors(zod.data, args.packet, args.prompt);
    if (answerErrors.length === 0) {
      return {
        answer: zod.data,
        usage,
        notes: attempt ? ["writer after one repair", "prompt analysis"] : ["prompt analysis"],
      };
    }

    previous = parsed;
    errors = answerErrors;
  }

  throw new Error(`Writer failed validation after repair: ${errors.join("; ")}`);
}

export async function reviseAnswer(args: {
  prompt: string;
  history: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
  analysis?: PromptAnalysis | null;
  catalog: QuoteCatalogEntry[];
  previous: Answer;
  critique: { scores: Record<string, number>; issues: string[] };
}): Promise<{ answer: Answer; usage?: ProviderUsage; notes: string[] }> {
  const config = getProviderConfig("revision");
  if (!config) throw new Error("No revision model is configured.");

  const base = buildUserMessage(args);
  const critiqueText = `The editor reviewed your previous answer and found these problems:
${args.critique.issues.length ? args.critique.issues.map((issue) => `- ${issue}`).join("\n") : "- The answer is not specific enough."}

Scores (1–5): ${Object.entries(args.critique.scores)
    .map(([key, value]) => `${key}=${value}`)
    .join(", ")}

Previous answer:
${JSON.stringify(args.previous).slice(0, 7000)}

Rewrite the answer. Fix every issue. Keep the same three-thinker, two-tradition constraints and use only quote IDs from the catalog. Do not explain what you changed. Return JSON only.`;

  let usage: ProviderUsage | undefined;
  let previous: unknown;
  let errors = ["The revision did not match the required answer schema."];

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const user =
      attempt === 0
        ? `${base}\n\n${critiqueText}`
        : `${base}\n\n${critiqueText}\n\nYour revision failed validation:\n${errors
            .map((error) => `- ${error}`)
            .join("\n")}\n\nPrevious revision:\n${JSON.stringify(previous).slice(
            0,
            5000,
          )}\n\nReturn a corrected JSON object.`;

    const result = await callProvider(
      config,
      `${SYSTEM_PROMPT}

Return JSON only. It must match this schema:
${JSON.stringify(ANSWER_JSON_SCHEMA)}`,
      user,
      ANSWER_JSON_SCHEMA,
      { temperature: 0.55, maxTokens: 20_000, stage: "writer" },
    );

    usage = addUsage(usage, result.usage);

    let parsed: unknown;
    try {
      parsed = parseJson(result.raw);
    } catch {
      previous = String(result.raw).slice(0, 3000);
      errors = ["The response was not valid JSON."];
      continue;
    }

    const zod = answerSchema.safeParse(parsed);
    if (!zod.success) {
      previous = parsed;
      errors = zod.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      continue;
    }

    const answerErrors = validationErrors(zod.data, args.packet, args.prompt);
    if (answerErrors.length === 0) {
      return { answer: zod.data, usage, notes: ["editor revision"] };
    }

    previous = parsed;
    errors = answerErrors;
  }

  throw new Error(`Revision failed validation: ${errors.join("; ")}`);
}

