export type ProviderName = "openai" | "anthropic" | "ollama";

export type ProviderConfig = {
  provider: ProviderName;
  model: string;
  apiKey?: string;
  baseUrl: string;
};

export type ProviderUsage = {
  inputTokens?: number;
  outputTokens?: number;
};

export type ProviderResult = {
  provider: ProviderName;
  model: string;
  raw: unknown;
  usage?: ProviderUsage;
};

export function getProviderConfig(): ProviderConfig | null {
  const raw = (process.env.LLM_PROVIDER ?? "").trim().toLowerCase();
  if (!raw || raw === "demo") return null;
  if (raw !== "openai" && raw !== "anthropic" && raw !== "ollama") return null;

  const apiKey = process.env.LLM_API_KEY?.trim();
  if (raw !== "ollama" && !apiKey) return null;

  const model =
    process.env.LLM_MODEL?.trim() ||
    (raw === "anthropic" ? "claude-sonnet-4-5" : raw === "openai" ? "gpt-4.1-mini" : "llama3.3");

  const baseUrl =
    process.env.LLM_BASE_URL?.trim().replace(/\/+$/, "") ||
    (raw === "anthropic"
      ? "https://api.anthropic.com/v1"
      : raw === "openai"
        ? "https://api.openai.com/v1"
        : "http://127.0.0.1:11434");

  return { provider: raw, model, apiKey, baseUrl };
}

function usageFromOpenAi(data: unknown): ProviderUsage | undefined {
  if (data && typeof data === "object" && "usage" in data) {
    const usage = (data as { usage?: { prompt_tokens?: number; completion_tokens?: number } }).usage;
    if (usage) {
      return { inputTokens: usage.prompt_tokens, outputTokens: usage.completion_tokens };
    }
  }
  return undefined;
}

function usageFromAnthropic(data: unknown): ProviderUsage | undefined {
  if (data && typeof data === "object" && "usage" in data) {
    const usage = (data as { usage?: { input_tokens?: number; output_tokens?: number } }).usage;
    if (usage) {
      return { inputTokens: usage.input_tokens, outputTokens: usage.output_tokens };
    }
  }
  return undefined;
}

function usageFromOllama(data: unknown): ProviderUsage | undefined {
  if (data && typeof data === "object") {
    const record = data as { prompt_eval_count?: number; eval_count?: number };
    if (record.prompt_eval_count !== undefined || record.eval_count !== undefined) {
      return { inputTokens: record.prompt_eval_count, outputTokens: record.eval_count };
    }
  }
  return undefined;
}

function textFromOpenAi(data: unknown): string {
  if (
    data &&
    typeof data === "object" &&
    "choices" in data &&
    Array.isArray((data as { choices: unknown[] }).choices)
  ) {
    const first = (data as { choices: Array<{ message?: { content?: string } }> }).choices[0];
    return first?.message?.content ?? "";
  }
  return "";
}

function jsonFromAnthropic(data: unknown): unknown {
  if (
    data &&
    typeof data === "object" &&
    "content" in data &&
    Array.isArray((data as { content: unknown[] }).content)
  ) {
    const block = (
      data as { content: Array<{ type?: string; input?: unknown }> }
    ).content.find((item) => item.type === "tool_use");
    return block?.input ?? null;
  }
  return null;
}

function textFromOllama(data: unknown): string {
  if (
    data &&
    typeof data === "object" &&
    "message" in data &&
    typeof (data as { message?: { content?: unknown } }).message?.content === "string"
  ) {
    return (data as { message: { content: string } }).message.content;
  }
  return "";
}

export async function callProvider(
  config: ProviderConfig,
  system: string,
  user: string,
  schema: Record<string, unknown>,
): Promise<ProviderResult> {
  const signal = AbortSignal.timeout(45_000);

  if (config.provider === "anthropic") {
    const response = await fetch(`${config.baseUrl}/messages`, {
      method: "POST",
      signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": config.apiKey ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 1400,
        temperature: 0.75,
        system,
        messages: [{ role: "user", content: user }],
        tools: [
          {
            name: "emit_philosophy_answer",
            description:
              "Emit the structured philosophy answer. The quote text is rendered by the app from quote IDs, never by the model.",
            input_schema: schema,
          },
        ],
        tool_choice: { type: "tool", name: "emit_philosophy_answer" },
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic ${response.status}: ${(await response.text()).slice(0, 300)}`);
    }

    const data = await response.json();
    return {
      provider: config.provider,
      model: config.model,
      raw: jsonFromAnthropic(data),
      usage: usageFromAnthropic(data),
    };
  }

  if (config.provider === "ollama") {
    const response = await fetch(`${config.baseUrl}/api/chat`, {
      method: "POST",
      signal,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        stream: false,
        format: schema,
        options: { temperature: 0.75, num_predict: 1200 },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama ${response.status}: ${(await response.text()).slice(0, 300)}`);
    }

    const data = await response.json();
    return {
      provider: config.provider,
      model: config.model,
      raw: textFromOllama(data),
      usage: usageFromOllama(data),
    };
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    signal,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${config.apiKey ?? ""}`,
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 1200,
      temperature: 0.75,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "philosophy_answer",
          strict: true,
          schema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI-compatible ${response.status}: ${(await response.text()).slice(0, 300)}`);
  }

  const data = await response.json();
  return {
    provider: config.provider,
    model: config.model,
    raw: textFromOpenAi(data),
    usage: usageFromOpenAi(data),
  };
}
