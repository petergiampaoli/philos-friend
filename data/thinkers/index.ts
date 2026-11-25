import type { Thinker } from "@/lib/schema";
import { ancientThinkers } from "./ancient";
import { modernThinkers } from "./modern";
import { nineteenthThinkers } from "./nineteenth";
import { analyticThinkers } from "./analytic-ethics";
import { africanaThinkers } from "./africana";
import { asianThinkers } from "./asian";
import { lifeThinkers } from "./life";
import { EXTRA_QUOTES } from "../quotes";
import { EXPANDED_QUOTES } from "../quotes-expanded";

const SEED_THINKERS: Thinker[] = [
  ...ancientThinkers,
  ...modernThinkers,
  ...nineteenthThinkers,
  ...analyticThinkers,
  ...africanaThinkers,
  ...asianThinkers,
  ...lifeThinkers,
];

export const THINKERS: Thinker[] = SEED_THINKERS.map((thinker) => {
  const quotes = [
    ...thinker.quotes,
    ...(EXTRA_QUOTES[thinker.id] ?? []),
    ...(EXPANDED_QUOTES[thinker.id] ?? []),
  ];
  const byId = new Map(quotes.map((quote) => [quote.id, quote]));
  return { ...thinker, quotes: [...byId.values()] };
});

export const THINKER_BY_ID = new Map(THINKERS.map((thinker) => [thinker.id, thinker]));

export function getThinker(id: string): Thinker | undefined {
  return THINKER_BY_ID.get(id);
}
