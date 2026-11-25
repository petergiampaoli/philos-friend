import type { PacketThinker, PromptAnalysis, Quote, ThemeId } from "./schema";

export type QuoteCatalogEntry = {
  thinkerId: string;
  thinkerName: string;
  quoteId: string;
  text: string;
  work: string;
  locator: string;
  translator?: string;
  paraphrase?: string;
  context?: string;
  sourceUrl?: string;
  score: number;
  quote: Quote;
};

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "been",
  "before",
  "being",
  "between",
  "could",
  "does",
  "doing",
  "from",
  "have",
  "just",
  "like",
  "more",
  "most",
  "much",
  "only",
  "over",
  "really",
  "should",
  "some",
  "than",
  "that",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "thing",
  "this",
  "very",
  "want",
  "what",
  "when",
  "where",
  "which",
  "while",
  "will",
  "with",
  "would",
  "your",
  "you",
]);

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9'-]+/)
    .filter((word) => word.length >= 4 && !STOP_WORDS.has(word));
}

function quoteTextForSearch(quote: Quote, thinker: PacketThinker): string {
  return [
    quote.text,
    quote.paraphrase ?? "",
    quote.context ?? "",
    quote.work,
    thinker.oneLine,
    ...thinker.ideas.map((idea) => `${idea.title} ${idea.summary}`),
  ]
    .join(" ")
    .toLowerCase();
}

function scoreQuote(
  quote: Quote,
  thinker: PacketThinker,
  analysis: PromptAnalysis | null | undefined,
  themes: ThemeId[],
): number {
  const requestedThemes = new Set<ThemeId>([...(analysis?.themes ?? []), ...themes]);
  let score = 0;

  for (const theme of thinker.tags) {
    if (requestedThemes.has(theme)) score += 2.4;
  }
  for (const theme of quote.themes ?? []) {
    if (requestedThemes.has(theme)) score += 3.2;
  }

  const haystack = quoteTextForSearch(quote, thinker);
  for (const term of analysis?.quoteSearchTerms ?? []) {
    const clean = term.toLowerCase().trim();
    if (clean.length >= 3 && haystack.includes(clean)) score += 3.5;
  }

  if (analysis) {
    const analysisWords = new Set(
      words(
        [
          analysis.surfaceQuestion,
          analysis.realQuestion,
          analysis.stakes,
          analysis.underlyingBelief,
          analysis.avoidedTruth,
        ].join(" "),
      ),
    );
    for (const word of words(quoteTextForSearch(quote, thinker))) {
      if (analysisWords.has(word)) score += 0.18;
    }
  }

  if (quote.paraphrase) score += 0.4;
  if (quote.context) score += 0.3;
  if (quote.sourceUrl) score += 0.2;

  const length = quote.text.trim().split(/\s+/).length;
  if (length >= 8 && length <= 32) score += 0.35;

  return score;
}

function quoteOrder(quote: Quote): number {
  const match = quote.id.match(/_(\d+)$/);
  return match ? Number(match[1]) : 99;
}

export function rankPacketQuotes(
  packet: PacketThinker[],
  analysis?: PromptAnalysis | null,
  themes: ThemeId[] = [],
): { packet: PacketThinker[]; catalog: QuoteCatalogEntry[] } {
  const catalog: QuoteCatalogEntry[] = [];

  const rankedPacket = packet.map((thinker) => {
    const quotes = thinker.quotes
      .map((quote) => ({
        quote,
        score: scoreQuote(quote, thinker, analysis, themes),
      }))
      .sort((a, b) => b.score - a.score || quoteOrder(a.quote) - quoteOrder(b.quote))
      .map((entry) => entry.quote);

    for (const quote of quotes) {
      catalog.push({
        thinkerId: thinker.id,
        thinkerName: thinker.name,
        quoteId: quote.id,
        text: quote.text,
        work: quote.work,
        locator: quote.locator,
        translator: quote.translator,
        paraphrase: quote.paraphrase,
        context: quote.context,
        sourceUrl: quote.sourceUrl,
        score: Number(scoreQuote(quote, thinker, analysis, themes).toFixed(2)),
        quote,
      });
    }

    return { ...thinker, quotes };
  });

  catalog.sort((a, b) => b.score - a.score);

  return { packet: rankedPacket, catalog: catalog.slice(0, 80) };
}
