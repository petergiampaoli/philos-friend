import { describe, expect, it } from "vitest";
import { EXPANDED_QUOTES } from "@/data/quotes-expanded";
import { THINKERS } from "@/data/thinkers";
import { AFFIRMATIONS } from "@/lib/affirmations";
import { validateAffirmation } from "@/lib/validate";

describe("quality pass", () => {
  it("has a meaningfully expanded, annotated quote bank", () => {
    const quotes = THINKERS.flatMap((thinker) => thinker.quotes);
    expect(quotes.length).toBeGreaterThanOrEqual(120);

    for (const [thinkerId, expanded] of Object.entries(EXPANDED_QUOTES)) {
      for (const quote of expanded) {
        expect(quote.paraphrase, `${thinkerId}/${quote.id} needs a paraphrase`).toBeTruthy();
        expect(quote.context, `${thinkerId}/${quote.id} needs source context`).toBeTruthy();
        expect(quote.themes?.length, `${thinkerId}/${quote.id} needs themes`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps every fallback green line non-generic and non-judgmental", () => {
    for (const [theme, line] of Object.entries(AFFIRMATIONS)) {
      const result = validateAffirmation(line);
      expect(result.ok, `${theme}: ${result.errors.join("; ")}`).toBe(true);
    }
  });

  it("rejects stock therapy language and judgment", () => {
    expect(validateAffirmation("You are allowed to feel whatever you feel.").ok).toBe(false);
    expect(validateAffirmation("You deserve to be happy.").ok).toBe(false);
    expect(validateAffirmation("You are avoiding the real issue.").ok).toBe(false);
  });

  it("accepts a specific, non-judgmental green line", () => {
    expect(
      validateAffirmation("The score can be real without becoming the verdict on your worth.").ok,
    ).toBe(true);
  });
});
