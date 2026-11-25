export type ProviderName = "openai" | "anthropic" | "ollama" | "deepseek" | "opencode";

export type ProviderStage = "analysis" | "writer" | "critic" | "revision" | "affirmation";

export type ProviderConfig = {
  provider: ProviderName;
  model: string;
  apiKey?: string;
  baseUrl: string;
  stage: ProviderStage;
  reasoningEffort?: "none" | "low" | "high" | "max";
};

export type ProviderUsage = {
  inputTokens?: number;
  outputTokens?: number;
  reasoningTokens?: number;
};

export type ProviderResult = {
  provider: ProviderName;
  model: string;
  raw: unknown;
  usage?: ProviderUsage;
};

export type CallOptions = {
  temperature?: number;
  maxTokens?: number;
  stage?: ProviderStage;
  json?: boolean;
};

const STAGE_MODEL_ENV: Record<ProviderStage, string> = {
  analysis: "LLM_ANALYSIS_MODEL",
  writer: "LLM_MODEL",
  critic: "LLM_CRITIC_MODEL",
  revision: "LLM_REVISION_MODEL",
  affirmation: "LLM_AFFIRMATION_MODEL",
};

const STAGE_EFFORT_ENV: Record<ProviderStage, string> = {
  analysis: "LLM_ANALYSIS_EFFORT",
  writer: "LLM_WRITER_EFFORT",
  critic: "LLM_CRITIC_EFFORT",
  revision: "LLM_REVISION_EFFORT",
  affirmation: "LLM_AFFIRMATION_EFFORT",
};

function validEffort(value: string | undefined): "none" | "low" | "high" | "max" | undefined {
  if (value === "none" || value === "low" || value === "high" || value === "max") return value;
  return undefined;
}

export function getProviderConfig(stage: ProviderStage = "writer"): ProviderConfig | null {
  const raw = (process.env.LLM_PROVIDER ?? "").trim().toLowerCase();
  if (!raw || raw === "demo") return null;
  if (raw !== "openai" && raw !== "anthropic" && raw !== "ollama" && raw !== "deepseek" && raw !== "opencode") {
    return null;
  }

  const apiKey =
    raw === "deepseek"
      ? process.env.DEEPSEEK_API_KEY?.trim() || process.env.LLM_API_KEY?.trim()
      : raw === "opencode"
        ? process.env.OPENCODE_API_KEY?.trim() || process.env.LLM_API_KEY?.trim()
        : process.env.LLM_API_KEY?.trim();

  if (raw !== "ollama" && !apiKey) return null;

  const stageModel = process.env[STAGE_MODEL_ENV[stage]]?.trim();
  const fallbackModel =
    raw === "anthropic"
      ? "claude-sonnet-4-5"
      : raw === "openai"
        ? "gpt-4.1-mini"
        : raw === "deepseek" || raw === "opencode"
          ? "deepseek-v4-pro"
          : "llama3.3";
  const model = stageModel || process.env.LLM_MODEL?.trim() || fallbackModel;

  const baseUrl =
    process.env.LLM_BASE_URL?.trim().replace(/\/+$/, "") ||
    (raw === "anthropic"
      ? "https://api.anthropic.com/v1"
      : raw === "openai"
        ? "https://api.openai.com/v1"
        : raw === "deepseek"
          ? "https://api.deepseek.com"
          : raw === "opencode"
            ? "https://opencode.ai/inference/go/openai/v1"
            : "http://127.0.0.1:11434");

  const defaultEffort = stage === "writer" || stage === "critic" ? "max" : "high";
  const reasoningEffort =
    validEffort(process.env[STAGE_EFFORT_ENV[stage]]?.trim()) ??
    (raw === "deepseek" || raw === "opencode" ? defaultEffort : undefined);

  return { provider: raw, model, apiKey, baseUrl, stage, reasoningEffort };
}

function usageFromOpenAi(data: unknown): ProviderUsage | undefined {
  if (data && typeof data === "object" && "usage" in data) {
    const usage = (
      data as {
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          completion_tokens_details?: { reasoning_tokens?: number };
        };
      }
    ).usage;
    if (usage) {
      return {
        inputTokens: usage.prompt_tokens,
        outputTokens: usage.completion_tokens,
        reasoningTokens: usage.completion_tokens_details?.reasoning_tokens,
      };
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
  options: CallOptions = {},
): Promise<ProviderResult> {
  const signal = AbortSignal.timeout(120_000);
  const temperature = options.temperature ?? 0.7;
  const maxTokens = options.maxTokens ?? 6000;

  if (config.provider === "deepseek") {
    // DeepSeek's Chat Completions endpoint supports JSON mode, not JSON Schema.
    // The prompt and local Zod validation carry the structural contract.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: "POST",
        signal,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${config.apiKey ?? ""}`,
        },
        body: JSON.stringify({
          model: config.model,
          max_tokens: maxTokens,
          temperature,
          stream: false,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
          thinking: { type: "enabled" },
          reasoning_effort: config.reasoningEffort ?? "high",
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek ${response.status}: ${(await response.text()).slice(0, 300)}`);
      }

      const data = await response.json();
      const raw = textFromOpenAi(data);
      if (raw.trim().length > 0) {
        return {
          provider: config.provider,
          model: config.model,
          raw,
          usage: usageFromOpenAi(data),
        };
      }

      // DeepSeek's JSON mode can return blank content. Retry once with a
      // sharper reminder before falling back to the repair path.
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    throw new Error("DeepSeek returned an empty JSON response.");
  }

  if (config.provider === "opencode") {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      signal,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.apiKey ?? ""}`,
        "user-agent": "philos-friend/1.0",
        "x-opencode-session": process.env.LLM_SESSION_ID?.trim() || "philos-friend",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: maxTokens,
        temperature,
        stream: false,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "philos_friend_response",
            strict: true,
            schema,
          },
        },
        ...(config.reasoningEffort
          ? { reasoning_effort: config.reasoningEffort }
          : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenCode Go ${response.status}: ${(await response.text()).slice(0, 300)}`,
      );
    }

    const data = await response.json();
    return {
      provider: config.provider,
      model: config.model,
      raw: textFromOpenAi(data),
      usage: usageFromOpenAi(data),
    };
  }

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
        max_tokens: maxTokens,
        temperature,
        system,
        messages: [{ role: "user", content: user }],
        tools: [
          {
            name: "emit_json",
            description: "Emit the requested structured JSON object.",
            input_schema: schema,
          },
        ],
        tool_choice: { type: "tool", name: "emit_json" },
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
        options: { temperature, num_predict: maxTokens },
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
      max_tokens: maxTokens,
      temperature,
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
