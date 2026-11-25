import type { Thinker } from "@/lib/schema";
import { ancientThinkers } from "./ancient";
import { modernThinkers } from "./modern";
import { nineteenthThinkers } from "./nineteenth";
import { analyticThinkers } from "./analytic-ethics";
import { africanaThinkers } from "./africana";
import { asianThinkers } from "./asian";
import { lifeThinkers } from "./life";
import { EXTRA_QUOTES } from "../quotes";

const SEED_THINKERS: Thinker[] = [
  ...ancientThinkers,
  ...modernThinkers,
  ...nineteenthThinkers,
  ...analyticThinkers,
  ...africanaThinkers,
  ...asianThinkers,
  ...lifeThinkers,
];

export const THINKERS: Thinker[] = SEED_THINKERS.map((thinker) => ({
  ...thinker,
  quotes: [...thinker.quotes, ...(EXTRA_QUOTES[thinker.id] ?? [])],
}));

export const THINKER_BY_ID = new Map(THINKERS.map((thinker) => [thinker.id, thinker]));

export function getThinker(id: string): Thinker | undefined {
  return THINKER_BY_ID.get(id);
}
