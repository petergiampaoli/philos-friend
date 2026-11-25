import type { Answer, PacketThinker, PromptAnalysis, ThemeId } from "../schema";
import { validateAnswer, validateAffirmation } from "../validate";
import { affirmationFor } from "../affirmations";
import type { QuoteCatalogEntry } from "../quote-search";
import { getProviderConfig, type ProviderUsage } from "./providers";
import { generateAnswer, reviseAnswer } from "./answer";
import { critiqueAnswer, critiqueSummary } from "./quality";
import { generateAffirmations } from "./affirmation";

export type LlmSynthesis = {
  answer: Answer;
  provider: string;
  model: string;
  notes: string[];
  usage?: ProviderUsage;
};

function addUsage(a?: ProviderUsage, b?: ProviderUsage): ProviderUsage | undefined {
  if (!a && !b) return undefined;
  return {
    inputTokens: (a?.inputTokens ?? 0) + (b?.inputTokens ?? 0),
    outputTokens: (a?.outputTokens ?? 0) + (b?.outputTokens ?? 0),
    reasoningTokens: (a?.reasoningTokens ?? 0) + (b?.reasoningTokens ?? 0),
  };
}

export async function synthesizeWithLlm(args: {
  prompt: string;
  history?: string[];
  packet: PacketThinker[];
  themes: ThemeId[];
  analysis?: PromptAnalysis | null;
  catalog: QuoteCatalogEntry[];
}): Promise<LlmSynthesis | null> {
  const config = getProviderConfig("writer");
  if (!config) return null;
  if (args.catalog.length < 3) {
    console.warn("[philos-friend] live synthesis skipped: fewer than three quoted candidates");
    return null;
  }

  const history = args.history ?? [];
  const notes: string[] = [];
  let usage: ProviderUsage | undefined;

  let draft: Answer;
  try {
    const writerStarted = Date.now();
    const writer = await generateAnswer({
      prompt: args.prompt,
      history,
      packet: args.packet,
      themes: args.themes,
      analysis: args.analysis,
      catalog: args.catalog,
    });
    draft = writer.answer;
    usage = addUsage(usage, writer.usage);
    notes.push(`writer ${Date.now() - writerStarted}ms`, ...writer.notes);
  } catch (error) {
    console.warn(
      `[philos-friend] live writer failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return null;
  }

  let answer = draft;
  try {
    const criticStarted = Date.now();
    const reviewed = await critiqueAnswer({
      prompt: args.prompt,
      history,
      packet: args.packet,
      themes: args.themes,
      analysis: args.analysis,
      catalog: args.catalog,
      answer: draft,
    });

    if (reviewed) {
      usage = addUsage(usage, reviewed.usage);
      notes.push(`critic ${Date.now() - criticStarted}ms`, critiqueSummary(reviewed.critique));

      if (reviewed.critique.shouldRevise) {
        try {
          const revisionStarted = Date.now();
          const revised = await reviseAnswer({
            prompt: args.prompt,
            history,
            packet: args.packet,
            themes: args.themes,
            analysis: args.analysis,
            catalog: args.catalog,
            previous: draft,
            critique: reviewed.critique,
          });
          answer = revised.answer;
          usage = addUsage(usage, revised.usage);
          notes.push(`revision ${Date.now() - revisionStarted}ms`, ...revised.notes);
        } catch (revisionError) {
          console.warn(
            `[philos-friend] editor revision failed: ${
              revisionError instanceof Error ? revisionError.message : String(revisionError)
            }`,
          );
          notes.push("editor revision unavailable");
        }
      }
    }
  } catch (criticError) {
    console.warn(
      `[philos-friend] critic error: ${
        criticError instanceof Error ? criticError.message : String(criticError)
      }`,
    );
    notes.push("critic unavailable");
  }

  try {
    const affirmationStarted = Date.now();
    const green = await generateAffirmations({
      prompt: args.prompt,
      history,
      analysis: args.analysis,
      answer,
      packet: args.packet,
      catalog: args.catalog,
    });
    answer = {
      ...answer,
      lenses: answer.lenses.map((lens) => ({
        ...lens,
        affirmation: green.affirmations[lens.thinkerId] ?? lens.affirmation,
      })),
    };
    usage = addUsage(usage, green.usage);
    notes.push(`affirmation ${Date.now() - affirmationStarted}ms`, ...green.notes);
  } catch (affirmationError) {
    console.warn(
      `[philos-friend] affirmation pass failed: ${
        affirmationError instanceof Error ? affirmationError.message : String(affirmationError)
      }`,
    );
    answer = {
      ...answer,
      lenses: answer.lenses.map((lens) => {
        if (validateAffirmation(lens.affirmation).ok) return lens;
        const thinker = args.packet.find((item) => item.id === lens.thinkerId);
        return {
          ...lens,
          affirmation: affirmationFor(
            thinker?.tags ?? [],
            args.analysis?.themes[0] ?? "meaning",
          ),
        };
      }),
    };
    notes.push("affirmation fallback");
  }

  const finalValidation = validateAnswer(answer, args.packet, args.prompt);
  if (!finalValidation.ok) {
    notes.push(`final validation: ${finalValidation.errors.length} issue(s)`);
  }

  return {
    answer,
    provider: config.provider,
    model: config.model,
    notes,
    usage,
  };
}
