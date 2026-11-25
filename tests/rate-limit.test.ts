import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("rate limit", () => {
  it("allows requests up to the limit and then blocks", () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    expect(checkRateLimit(key, 2).ok).toBe(true);
    expect(checkRateLimit(key, 2).ok).toBe(true);
    const blocked = checkRateLimit(key, 2);
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("resets after the window", async () => {
    const key = `test-${Date.now()}-${Math.random()}`;
    expect(checkRateLimit(key, 1, 10).ok).toBe(true);
    expect(checkRateLimit(key, 1, 10).ok).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 15));
    expect(checkRateLimit(key, 1, 10).ok).toBe(true);
  });
});
