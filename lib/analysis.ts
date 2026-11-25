import { z } from "zod";
import {
  promptAnalysisSchema,
  THEME_IDS,
  themeIdSchema,
  type PromptAnalysis,
} from "./schema";
import { extractThemeHits } from "./retrieve";
import { callStructured } from "./llm/structured";
import { getProviderConfig } from "./llm/providers";

function clampTone(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const text = value.trim();
  if (text.length <= 160) return text;
  const cut = text.slice(0, 160);
  const boundary = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
  return (boundary > 96 ? cut.slice(0, boundary) : cut).trim();
}

function clampThemes(value: unknown): unknown {
  if (!Array.isArray(value)) return value;
  const seen = new Set<string>();
  const themes: string[] = [];
  for (const item of value) {
    if (typeof item !== "string" || seen.has(item)) continue;
    if (!THEME_IDS.includes(item as (typeof THEME_IDS)[number])) continue;
    seen.add(item);
    themes.push(item);
    if (themes.length === 8) break;
  }
  return themes;
}

const analysisResponseSchema = promptAnalysisSchema.extend({
  themes: z.preprocess(clampThemes, z.array(themeIdSchema).max(8)),
  tone: z.preprocess(clampTone, z.string().min(3).max(160)),
});

export const ANALYSIS_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: [
    "surfaceQuestion",
    "realQuestion",
    "emotionalTone",
    "stakes",
    "underlyingBelief",
    "avoidedTruth",
    "whatWouldHelp",
    "themes",
    "quoteSearchTerms",
    "tone",
    "safety",
  ],
  properties: {
    surfaceQuestion: { type: "string" },
    realQuestion: { type: "string" },
    emotionalTone: { type: "array", items: { type: "string" } },
    stakes: { type: "string" },
    underlyingBelief: { type: "string" },
    avoidedTruth: { type: "string" },
    whatWouldHelp: {
      type: "string",
      enum: ["challenge", "consolation", "clarification", "permission", "practice"],
    },
    themes: { type: "array", items: { type: "string", enum: THEME_IDS } },
    quoteSearchTerms: { type: "array", items: { type: "string" } },
    tone: { type: "string" },
    safety: { type: "string", enum: ["normal", "care"] },
  },
};

const ANALYSIS_SYSTEM_PROMPT = `You are the listening editor for a philosophy advice app called Philos-Friend.

Before any philosopher is chosen, analyse what the person is actually asking. Do not answer the question. Do not give advice. Only return JSON matching the schema.

Be specific, concrete, and non-judgmental. Distinguish:
- the surface question,
- the real question underneath it,
- the emotional stakes,
- the belief that is making the question feel urgent,
- the truth the person may be circling but not saying,
- the kind of response that would actually help: challenge, consolation, clarification, permission, or practice.

The tone field should describe how a wise friend would speak to this person: direct but kind, gentle but unsentimental, playful, grave, etc. Keep it to a short phrase under 20 words.

Choose at most six themes from the library's theme list, and no more than four emotional tones.

If the message suggests acute crisis or self-harm, set safety to "care". Otherwise use "normal". Never diagnose.

quoteSearchTerms should be concrete words or images a quote might contain, not abstract therapy language.`;

function careDetected(text: string): boolean {
  return /\b(kill myself|killing myself|suicide|suicidal|end my life|self[- ]harm|hurt myself|want to die|don't want to live|do not want to live)\b/i.test(
    text,
  );
}

export async function analyzePrompt(args: {
  prompt: string;
  history?: string[];
  themes?: string[];
}): Promise<{ analysis: PromptAnalysis; usage?: import("./llm/providers").ProviderUsage } | null> {
  const config = getProviderConfig("analysis");
  const history = args.history ?? [];
  const suggestedThemes =
    args.themes ??
    extractThemeHits([...history, args.prompt].filter(Boolean).join("\n"))
      .slice(0, 6)
      .map((hit) => hit.id);

  if (!config) return null;

  const user = `EARLIER QUESTIONS
${history.length ? history.map((item, index) => `${index + 1}. ${item}`).join("\n") : "(none)"}

CURRENT MESSAGE
${args.prompt}

SUGGESTED THEMES FROM THE LIBRARY
${suggestedThemes.join(", ") || "(none)"}

Analyse the person's actual situation and return the JSON object.`;

  try {
    const result = await callStructured({
      config,
      system: ANALYSIS_SYSTEM_PROMPT,
      user,
      schema: ANALYSIS_JSON_SCHEMA,
      zodSchema: analysisResponseSchema,
      label: "prompt analysis",
      options: { temperature: 0.2, maxTokens: 4000 },
    });

    if (careDetected(args.prompt) || careDetected(history.join(" "))) {
      return { analysis: { ...result.data, safety: "care" }, usage: result.usage };
    }

    return { analysis: result.data, usage: result.usage };
  } catch (error) {
    console.warn(
      `[philos-friend] prompt analysis failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }
}
