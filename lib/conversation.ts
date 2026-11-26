import type {
  AdviseResponse,
  Lens,
  PacketThinker,
  PromptAnalysis,
  Quote,
  Trace,
} from "./schema";

export type ConversationPair = {
  lens: Lens;
  createdAt: string;
};

export type ConversationPairView = {
  lens: Lens;
  thinker: PacketThinker;
  quote: Quote;
};

export type PairTimings = {
  pairIndex: number;
  analysisMs?: number;
  selectionMs: number;
  writerMs: number;
  greenMs: number;
  totalMs: number;
  model: string;
  fallback: boolean;
};

export type Conversation = {
  id: string;
  question: string;
  history: string[];
  analysis?: PromptAnalysis;
  packet: PacketThinker[];
  pairs: ConversationPair[];
  mode: "demo" | "llm";
  provider: string;
  model: string;
  trace: Trace;
  timings: PairTimings[];
  createdAt: string;
  updatedAt: string;
};

export type PairResponse = {
  conversationId: string;
  question: string;
  pair: ConversationPairView;
  pairIndex: number;
  remaining: number;
  shareUrl?: string;
  timings: PairTimings;
  mode: "demo" | "llm";
  provider: string;
  model: string;
};

export function resolveConversationPair(
  conversation: Conversation,
  pair: ConversationPair,
): ConversationPairView | null {
  const thinker = conversation.packet.find((item) => item.id === pair.lens.thinkerId);
  const quote =
    thinker?.quotes.find((item) => item.id === pair.lens.quoteId) ?? thinker?.quotes[0] ?? null;

  if (!thinker || !quote) return null;
  return { lens: pair.lens, thinker, quote };
}

export function conversationPairViews(conversation: Conversation): ConversationPairView[] {
  return conversation.pairs
    .map((pair) => resolveConversationPair(conversation, pair))
    .filter((pair): pair is ConversationPairView => Boolean(pair));
}

export function conversationFromAnswer(response: AdviseResponse): Conversation {
  const now = new Date().toISOString();

  return {
    id: response.id,
    question: response.question,
    history: [],
    analysis: response.analysis,
    packet: response.packet,
    pairs: response.answer.lenses.map((lens) => ({ lens, createdAt: now })),
    mode: response.mode,
    provider: response.trace.provider ?? "demo",
    model: response.trace.model ?? "library",
    trace: response.trace,
    timings: [],
    createdAt: now,
    updatedAt: now,
  };
}
