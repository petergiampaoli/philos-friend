import { describe, expect, it } from "vitest";
import { advise } from "@/lib/advise";

describe("conversation amalgam", () => {
  it("folds a new detail into the earlier question and uses new voices", async () => {
    const first = await advise("Why do I need to win to have fun?");
    const detail = "I think it is really about my brother being better than me";
    const second = await advise(detail, {
      history: ["Why do I need to win to have fun?"],
      excludeThinkerIds: first.trace.chosenIds,
    });

    expect(second.question).toBe(detail);
    expect(second.trace.notes.join(" ")).toContain("amalgam of 2 questions");
    expect(second.trace.notes.join(" ")).toContain("excluded 3 prior voices");
    expect(second.trace.chosenIds).toHaveLength(3);
    expect(second.trace.chosenIds.some((id) => first.trace.chosenIds.includes(id))).toBe(false);
    expect(second.answer.lenses.every((lens) => Boolean(lens.quoteId))).toBe(true);
    expect(second.answer.lenses.every((lens) => Boolean(lens.affirmation))).toBe(true);
  });

  it("does not reuse the curated flagship fixture when history exists", async () => {
    const response = await advise("I think it is really about my brother", {
      history: ["Why do I need to win to have fun?"],
    });
    expect(response.trace.notes).not.toContain("curated demo answer");
    expect(response.answer.lenses.every((lens) => Boolean(lens.quoteId))).toBe(true);
    expect(response.answer.lenses.every((lens) => Boolean(lens.affirmation))).toBe(true);
  });
});
