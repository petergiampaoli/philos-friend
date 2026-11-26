import { describe, expect, it } from "vitest";
import {
  conversationFromAnswer,
  conversationPairViews,
  resolveConversationPair,
} from "@/lib/conversation";
import { selectNextQuote } from "@/lib/pair";
import type { QuoteCatalogEntry } from "@/lib/quote-search";
import type {
  AdviseResponse,
  Lens,
  PacketThinker,
  Quote,
} from "@/lib/schema";

function quote(id: string, text: string): Quote {
  return {
    id,
    text,
    work: "Test Work",
    locator: "Book 1",
    status: "verified",
  };
}

function thinker(
  id: string,
  name: string,
  tradition: string,
  quoteId: string,
): PacketThinker {
  const entry = quote(quoteId, `${name} says something worth thinking about.`);
  return {
    id,
    name,
    dates: "1900–1970",
    tradition,
    region: "Europe",
    tags: ["meaning"],
    oneLine: `${name} offers a distinct way to think about the question.`,
    ideas: [
      { title: "An idea", summary: "A sufficiently long summary of the thinker's idea." },
      { title: "Another idea", summary: "Another sufficiently long summary of an idea." },
    ],
    quotes: [entry],
  };
}

function catalogEntry(item: PacketThinker, score: number): QuoteCatalogEntry {
  const source = item.quotes[0];
  return {
    thinkerId: item.id,
    thinkerName: item.name,
    quoteId: source.id,
    text: source.text,
    work: source.work,
    locator: source.locator,
    score,
    quote: source,
  };
}

describe("pair flow", () => {
  const first = thinker("first", "First Thinker", "Ancient/Greek", "q_first_1");
  const second = thinker("second", "Second Thinker", "Modern/German", "q_second_1");
  const third = thinker("third", "Third Thinker", "Modern/German", "q_third_1");
  const packet = [first, second, third];
  const catalog = [
    catalogEntry(third, 9),
    catalogEntry(first, 8),
    catalogEntry(second, 7),
  ];

  it("selects the highest-ranked unused quote first", () => {
    const candidate = selectNextQuote({
      packet,
      catalog,
      usedThinkerIds: [],
      usedFamilies: [],
      pairIndex: 0,
    });
    expect(candidate?.thinker.id).toBe("third");
  });

  it("prefers a new tradition for the second pair", () => {
    const candidate = selectNextQuote({
      packet,
      catalog,
      usedThinkerIds: [third.id],
      usedFamilies: ["modern"],
      pairIndex: 1,
    });
    expect(candidate?.thinker.id).toBe("first");
  });

  it("forces a second tradition for the final pair when needed", () => {
    const candidate = selectNextQuote({
      packet,
      catalog: [catalogEntry(third, 9), catalogEntry(second, 8)],
      usedThinkerIds: [first.id],
      usedFamilies: ["ancient"],
      pairIndex: 2,
    });
    expect(candidate?.thinker.id).toBe("third");
  });

  it("converts legacy answers into conversation pairs", () => {
    const lens = (thinkerId: string, quoteId: string): Lens => ({
      thinkerId,
      quoteId,
      claim: "A claim",
      theory: "A sufficiently long theory that explains the quote in plain language.",
      application: "A concrete application for this person to try this week.",
      affirmation: "The score can be real without becoming the verdict on your worth.",
      quoteReason: "It fits.",
    });
    const answer = {
      thesis: "A thesis long enough to pass the shape of the legacy answer object.",
      lenses: [lens(first.id, "q_first_1"), lens(second.id, "q_second_1")],
      synthesis: "A synthesis long enough to pass the shape of the legacy answer object.",
      practice: "A practice.",
      question: "A question back?",
    };
    const response = {
      id: "11111111-1111-4111-8111-111111111111",
      question: "What should I do?",
      answer,
      packet,
      trace: {
        themes: ["meaning"],
        lineageIds: [],
        candidateIds: packet.map((item) => item.id),
        chosenIds: [first.id, second.id],
        traditions: [first.tradition, second.tradition],
        mode: "demo",
        latencyMs: 1,
        valid: true,
        notes: [],
      },
      mode: "demo",
    } as AdviseResponse;

    const conversation = conversationFromAnswer(response);
    expect(conversation.pairs).toHaveLength(2);
    expect(conversationPairViews(conversation)).toHaveLength(2);
  });

  it("resolves a stored pair back to its thinker and quote", () => {
    const conversation = {
      id: "11111111-1111-4111-8111-111111111111",
      question: "What should I do?",
      history: [],
      packet,
      pairs: [
        {
          lens: {
            thinkerId: first.id,
            quoteId: "q_missing",
            claim: "A claim",
            theory: "A long enough theory about the quote and its argument.",
            application: "A concrete action the person can try this week.",
            affirmation: "The score can be real without becoming the verdict on your worth.",
          },
          createdAt: new Date().toISOString(),
        },
      ],
      mode: "demo" as const,
      provider: "demo",
      model: "library",
      trace: {
        themes: ["meaning" as const],
        lineageIds: [],
        candidateIds: packet.map((item) => item.id),
        chosenIds: [first.id],
        traditions: [first.tradition],
        mode: "demo" as const,
        latencyMs: 1,
        valid: true,
        notes: [],
      },
      timings: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const view = resolveConversationPair(conversation, conversation.pairs[0]);
    expect(view?.thinker.id).toBe(first.id);
    expect(view?.quote.id).toBe("q_first_1");
  });
});

