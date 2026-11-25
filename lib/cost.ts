import type { ProviderUsage } from "./llm/providers";

/**
 * Optional cost estimate for the trace. Set LLM_INPUT_COST_PER_M and
 * LLM_OUTPUT_COST_PER_M to your provider's USD-per-million-token rates.
 * No rates are assumed, so the trace does not report a misleading number.
 */
export function estimateCost(usage: ProviderUsage | undefined): number | undefined {
  if (!usage) return undefined;

  const inputRate = Number(process.env.LLM_INPUT_COST_PER_M ?? 0);
  const outputRate = Number(process.env.LLM_OUTPUT_COST_PER_M ?? 0);
  if (!Number.isFinite(inputRate) || !Number.isFinite(outputRate)) return undefined;
  if (inputRate <= 0 && outputRate <= 0) return undefined;

  const cost =
    ((usage.inputTokens ?? 0) * inputRate + (usage.outputTokens ?? 0) * outputRate) / 1_000_000;
  return Number.isFinite(cost) ? cost : undefined;
}
