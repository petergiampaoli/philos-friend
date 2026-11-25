import type { z } from "zod";
import {
  callProvider,
  type CallOptions,
  type ProviderConfig,
  type ProviderUsage,
} from "./providers";

export function parseJson(raw: unknown): unknown {
  if (typeof raw === "string") {
    const stripped = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    return JSON.parse(stripped);
  }
  return raw;
}

export type StructuredResult<T> = {
  data: T;
  provider: string;
  model: string;
  usage?: ProviderUsage;
};

export async function callStructured<T>(args: {
  config: ProviderConfig;
  system: string;
  user: string;
  schema: Record<string, unknown>;
  zodSchema: z.ZodType<T>;
  options?: CallOptions;
  label: string;
}): Promise<StructuredResult<T>> {
  const { config, system, user, schema, zodSchema, options, label } = args;
  const schemaHint = `\n\nReturn JSON only. It must match this JSON schema exactly:\n${JSON.stringify(
    schema,
    null,
    2,
  )}`;

  let lastErrors = "The response was not valid JSON.";
  let previous: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const repair =
      attempt === 0
        ? ""
        : `\n\nYour previous ${label} response failed validation:\n- ${lastErrors}\n\nPrevious response:\n${JSON.stringify(
            previous,
          ).slice(0, 4000)}\n\nReturn a corrected JSON object.`;

    const result = await callProvider(
      config,
      `${system}${schemaHint}`,
      `${user}${repair}`,
      schema,
      { ...options, stage: config.stage },
    );

    let parsed: unknown;
    try {
      parsed = parseJson(result.raw);
    } catch {
      previous = String(result.raw).slice(0, 2000);
      lastErrors = "The response was not valid JSON.";
      continue;
    }

    const validated = zodSchema.safeParse(parsed);
    if (validated.success) {
      return {
        data: validated.data,
        provider: result.provider,
        model: result.model,
        usage: result.usage,
      };
    }

    previous = parsed;
    lastErrors = validated.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
  }

  throw new Error(`${label} failed validation: ${lastErrors}`);
}
