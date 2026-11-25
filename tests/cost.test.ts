import { afterEach, describe, expect, it, vi } from "vitest";
import { estimateCost } from "@/lib/cost";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("cost estimate", () => {
  it("stays silent when no rates are configured", () => {
    vi.stubEnv("LLM_INPUT_COST_PER_M", "");
    vi.stubEnv("LLM_OUTPUT_COST_PER_M", "");
    expect(estimateCost({ inputTokens: 1000, outputTokens: 500 })).toBeUndefined();
  });

  it("computes a per-million-token estimate", () => {
    vi.stubEnv("LLM_INPUT_COST_PER_M", "3");
    vi.stubEnv("LLM_OUTPUT_COST_PER_M", "15");
    const cost = estimateCost({ inputTokens: 1_000_000, outputTokens: 1_000_000 });
    expect(cost).toBeCloseTo(18);
  });

  it("handles missing usage fields", () => {
    vi.stubEnv("LLM_INPUT_COST_PER_M", "3");
    vi.stubEnv("LLM_OUTPUT_COST_PER_M", "15");
    expect(estimateCost({ inputTokens: 1_000_000 })).toBeCloseTo(3);
  });
});
