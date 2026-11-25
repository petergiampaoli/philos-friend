import { describe, expect, it } from "vitest";
import { advise } from "@/lib/advise";

const QUESTIONS = [
  "Why do I need to win to have fun?",
  "How do I stop comparing myself to everyone?",
  "What is the point of work if I don't love it?",
  "How do I face a fear I've been avoiding?",
  "Why is boredom so unbearable?",
  "How do I stop needing everyone's approval?",
  "How do I deal with the death of someone I love?",
  "Should I stay in a relationship that feels safe but flat?",
  "How do I stop scrolling all day?",
  "Why do I feel lonely even when I'm with people?",
  "How do I make a difficult decision?",
  "What does it mean to live authentically?",
  "How do I stop being angry at my parents?",
  "Is ambition making me miserable?",
  "How do I enjoy my life more?",
  "What should I do when I feel like a failure?",
  "How do I stop caring what people think?",
  "Why does money never feel like enough?",
  "How do I find meaning in a boring job?",
  "What is the point of being good?",
];

describe("golden question set", () => {
  for (const question of QUESTIONS) {
    it(`returns a sourced, diverse answer: ${question}`, async () => {
      const response = await advise(question);
      const packetIds = new Set(response.packet.map((thinker) => thinker.id));
      const lensIds = response.answer.lenses.map((lens) => lens.thinkerId);
      const families = new Set(response.trace.traditions.map((item) => item.split("/")[0].trim()));

      expect(response.trace.valid, response.trace.notes.join("; ")).toBe(true);
      expect(response.question).toBe(question);
      expect(response.answer.lenses).toHaveLength(3);
      expect(new Set(lensIds).size).toBe(3);
      expect(families.size).toBeGreaterThanOrEqual(2);

      for (const id of lensIds) {
        expect(packetIds.has(id), `${id} is not in the packet`).toBe(true);
      }

      const quoteIds = response.answer.lenses.map((lens) => lens.quoteId);
      expect(quoteIds.every(Boolean), "every quote-surface lens needs a verified quote").toBe(
        true,
      );
      expect(new Set(quoteIds).size).toBe(3);
      expect(
        response.answer.lenses.every((lens) => lens.affirmation.trim().length > 0),
        "every lens needs an affirmation",
      ).toBe(true);

      for (const lens of response.answer.lenses) {
        const thinker = response.packet.find((item) => item.id === lens.thinkerId);
        expect(thinker?.quotes.some((quote) => quote.id === lens.quoteId)).toBe(true);
      }
    });
  }
});
