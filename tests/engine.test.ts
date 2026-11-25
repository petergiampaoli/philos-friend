import { describe, expect, it } from "vitest";
import { retrieve } from "@/lib/retrieve";
import { buildPacket } from "@/lib/packet";
import { getFixture, composeTemplateAnswer } from "@/lib/compose";
import { validateAnswer } from "@/lib/validate";

describe("retrieval", () => {
  it("routes the flagship question to play, competition, and desire", () => {
    const result = retrieve("Why do I need to Win to have fun?");
    expect(result.themes).toContain("competition");
    expect(result.themes).toContain("play");
    expect(result.themes).toContain("fun");
    expect(result.lineages.map((lineage) => lineage.id)).toContain("play");
    expect(result.lineages.map((lineage) => lineage.id)).toContain("competition-status");
    expect(result.candidates.length).toBe(10);
    const ids = result.candidates.map((thinker) => thinker.id);
    expect(ids).toContain("suits");
    expect(ids).toContain("beauvoir");
    expect(ids).toContain("epicurus");
  });

  it("returns a diverse packet", () => {
    const result = retrieve("Why do I need to Win to have fun?");
    const families = new Set(result.candidates.map((thinker) => thinker.tradition.split("/")[0].trim()));
    expect(families.size).toBeGreaterThanOrEqual(3);
  });
});

describe("composition", () => {
  it("uses the curated fixture for the flagship question", () => {
    const retrieval = retrieve("Why do I need to Win to have fun?");
    const packet = buildPacket(retrieval);
    const fixture = getFixture("Why do I need to Win to have fun?", packet);
    expect(fixture).not.toBeNull();
    expect(fixture?.lenses.map((lens) => lens.thinkerId)).toEqual(["suits", "beauvoir", "epicurus"]);
    expect(validateAnswer(fixture!, packet, "Why do I need to Win to have fun?").ok).toBe(true);
  });

  it("matches a paraphrase of the flagship question when the packet supports it", () => {
    const packet = buildPacket(retrieve("Why do I need to Win to have fun?"));
    const fixture = getFixture(
      "Why do I feel like I need to win before I can have fun?",
      packet,
    );
    expect(fixture).not.toBeNull();
    expect(fixture?.lenses.map((lens) => lens.thinkerId)).toEqual(["suits", "beauvoir", "epicurus"]);
  });

  it("produces a valid template answer for a question with no fixture", () => {
    const question = "How do I stop comparing myself to everyone?";
    const retrieval = retrieve(question);
    const packet = buildPacket(retrieval);
    const answer = composeTemplateAnswer(retrieval, packet);
    const validation = validateAnswer(answer, packet, question);
    expect(validation.ok, validation.errors.join("; ")).toBe(true);
    expect(answer.lenses).toHaveLength(3);
  });
});

describe("validation", () => {
  it("rejects a quote assigned to the wrong thinker", () => {
    const retrieval = retrieve("Why do I need to Win to have fun?");
    const packet = buildPacket(retrieval);
    const answer = structuredClone(getFixture("Why do I need to Win to have fun?", packet)!);
    answer.lenses[0].quoteId = "q_beauvoir_1";
    const validation = validateAnswer(answer, packet, "Why do I need to Win to have fun?");
    expect(validation.ok).toBe(false);
    expect(validation.errors.join(" ")).toContain("does not belong");
  });

  it("rejects a thinker outside the packet", () => {
    const retrieval = retrieve("Why do I need to Win to have fun?");
    const packet = buildPacket(retrieval);
    const answer = structuredClone(getFixture("Why do I need to Win to have fun?", packet)!);
    answer.lenses[0].thinkerId = "kant";
    const validation = validateAnswer(answer, packet, "Why do I need to Win to have fun?");
    expect(validation.ok).toBe(false);
  });

  it("rejects an unsupported name-drop", () => {
    const retrieval = retrieve("Why do I need to Win to have fun?");
    const packet = buildPacket(retrieval);
    const answer = structuredClone(getFixture("Why do I need to Win to have fun?", packet)!);
    answer.synthesis += " As Kant would say, this is a categorical imperative.";
    const validation = validateAnswer(answer, packet, "Why do I need to Win to have fun?");
    expect(validation.ok).toBe(false);
    expect(validation.errors.join(" ")).toContain("unsupported thinker");
  });
});
