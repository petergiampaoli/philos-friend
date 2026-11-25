import { describe, expect, it } from "vitest";
import { advise } from "@/lib/advise";
import { retrieve } from "@/lib/retrieve";
import { buildPacket } from "@/lib/packet";
import { validateAnswer } from "@/lib/validate";

describe("advise", () => {
  it("answers the flagship question in demo mode", async () => {
    const response = await advise("Why do I need to Win to have fun?");
    expect(response.mode).toBe("demo");
    expect(response.trace.valid).toBe(true);
    expect(response.trace.chosenIds).toEqual(["suits", "beauvoir", "epicurus"]);
    expect(response.answer.question.toLowerCase()).toContain("score");
    expect(response.answer.lenses.every((lens) => lens.quoteId)).toBe(true);
    expect(response.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(response.question).toBe("Why do I need to Win to have fun?");
  });

  it("returns a valid answer for an arbitrary question", async () => {
    const question = "Why am I so afraid of being average?";
    const response = await advise(question);
    expect(response.trace.valid).toBe(true);
    expect(response.answer.lenses).toHaveLength(3);
    expect(response.packet.length).toBe(16);
  });

  it("keeps answers inside the source packet", async () => {
    const question = "How do I stop chasing status?";
    const response = await advise(question);
    const retrieval = retrieve(question);
    const packet = buildPacket(retrieval);
    const validation = validateAnswer(response.answer, packet, question);
    expect(validation.ok, validation.errors.join("; ")).toBe(true);
  });
});
