import { THEME_IDS, type ThemeId, type Thinker, type Lineage } from "./schema";
import { THEME_TRIGGERS, THEME_LINEAGES } from "./themes";
import { LINEAGES, getLineage, lineagesForThinker } from "./taxonomy";
import { THINKERS, THINKER_BY_ID } from "@/data/thinkers";

export type ThemeHit = { id: ThemeId; score: number; direct: boolean };

export type Retrieval = {
  prompt: string;
  themes: ThemeId[];
  themeHits: ThemeHit[];
  lineages: Lineage[];
  candidates: Thinker[];
  scores: Record<string, number>;
};

export type RetrieveOptions = {
  excludeThinkerIds?: string[];
};

const RELATED_THEMES: Partial<Record<ThemeId, ThemeId[]>> = {
  competition: ["status", "recognition", "validation", "comparison", "winning", "envy"],
  winning: ["status", "recognition", "validation", "excellence"],
  play: ["fun", "joy", "freedom", "pleasure"],
  fun: ["joy", "pleasure", "play"],
  recognition: ["status", "validation", "comparison", "love"],
  status: ["competition", "recognition", "power", "money"],
  desire: ["attachment", "pleasure", "joy", "boredom"],
  attachment: ["desire", "impermanence", "control"],
  control: ["anxiety", "fate", "freedom", "attention"],
  effort: ["excellence", "habit", "courage", "work"],
  comparison: ["envy", "status", "validation", "competition"],
  validation: ["recognition", "self", "status", "comparison"],
  meaning: ["boredom", "death", "hope"],
  boredom: ["meaning", "desire", "attention", "fun"],
  anxiety: ["control", "death", "freedom", "impermanence"],
  freedom: ["authenticity", "control", "power", "duty"],
  authenticity: ["self", "freedom", "recognition"],
  excellence: ["effort", "competition", "wisdom"],
  community: ["care", "justice", "loneliness", "friendship"],
  work: ["money", "effort", "power", "technology"],
  money: ["status", "work", "power", "envy"],
  love: ["care", "friendship", "recognition", "desire"],
  death: ["meaning", "impermanence", "anxiety", "fate"],
  anger: ["envy", "justice", "care"],
  envy: ["comparison", "status", "anger", "desire"],
  habit: ["attention", "technology", "freedom", "effort"],
  attention: ["habit", "technology", "art", "mind"],
  impermanence: ["attachment", "death", "boredom"],
  self: ["authenticity", "recognition", "mind", "community"],
  duty: ["care", "justice", "freedom", "work"],
  pleasure: ["joy", "fun", "desire", "art"],
  friendship: ["love", "care", "community", "loneliness"],
  power: ["status", "competition", "justice", "freedom"],
  justice: ["care", "power", "community", "duty"],
  care: ["love", "community", "justice", "duty"],
  courage: ["anxiety", "freedom", "effort", "duty"],
  wisdom: ["meaning", "attention", "self", "education"],
  fate: ["control", "death", "meaning", "freedom"],
  hope: ["meaning", "anxiety", "freedom", "community"],
  loneliness: ["friendship", "community", "love", "self"],
  education: ["wisdom", "habit", "attention", "freedom"],
  nature: ["attention", "community", "meaning", "impermanence"],
  technology: ["attention", "habit", "work", "power"],
  language: ["meaning", "mind", "wisdom"],
  science: ["wisdom", "meaning", "power"],
  mind: ["self", "attention", "anxiety"],
  art: ["pleasure", "meaning", "attention", "play"],
  joy: ["fun", "pleasure", "play", "hope"],
};

const LINEAGE_KEYWORDS: Record<string, string[]> = {
  stoicism: ["stoic", "stoicism", "stoics"],
  "epicureanism-skepticism": ["epicurean", "epicurus"],
  existentialism: ["existential", "existentialism", "existentialist"],
  absurdism: ["absurd", "absurdism", "camus"],
  daoism: ["daoist", "daoism", "taoist", "taoism", "wu wei", "wuwei"],
  buddhist: ["buddhist", "buddhism", "nagarjuna", "emptiness"],
  confucianism: ["confucian", "confucianism"],
  vedanta: ["vedanta", "advaita", "upanishad"],
  "zen-kyoto": ["zen", "kyoto school"],
  pragmatism: ["pragmatist", "pragmatism", "dewey", "james"],
  "care-ethics": ["care ethics", "ethic of care"],
  feminist: ["feminist", "feminism", "patriarchy"],
  "africana": ["ubuntu", "african philosophy", "africana"],
  "marxism-critical-theory": ["marxist", "marxism", "capitalism", "alienation"],
  play: ["philosophy of play", "lusory"],
  "competition-status": ["status", "recognition", "competition"],
};

const DEFAULT_LINEAGES = ["existentialism", "stoicism", "play", "joy-pleasure"];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countWord(text: string, word: string): number {
  if (word.includes(" ")) {
    let count = 0;
    let index = text.indexOf(word);
    while (index !== -1) {
      count += 1;
      index = text.indexOf(word, index + word.length);
    }
    return count;
  }
  const matches = text.match(new RegExp(`\\b${escapeRegExp(word)}\\b`, "g"));
  return matches?.length ?? 0;
}

export function extractThemeHits(prompt: string): ThemeHit[] {
  const text = prompt.toLowerCase();
  const directHits: ThemeHit[] = [];

  for (const theme of THEME_IDS) {
    let score = 0;
    for (const trigger of THEME_TRIGGERS[theme]) {
      score += countWord(text, trigger);
    }
    if (theme === "love" && /\b(do not|don't|does not|doesn't|not|never)\s+love\b/.test(text)) {
      score = 0;
    }
    if (score > 0) directHits.push({ id: theme, score, direct: true });
  }

  directHits.sort((a, b) => b.score - a.score);
  const directIds = new Set(directHits.map((hit) => hit.id));

  const expanded = new Map<ThemeId, ThemeHit>();
  for (const hit of directHits) {
    expanded.set(hit.id, { ...hit });
    const relatives = RELATED_THEMES[hit.id] ?? [];
    for (const relative of relatives) {
      if (!THEME_IDS.includes(relative)) continue;
      const existing = expanded.get(relative);
      if (existing) {
        expanded.set(relative, {
          ...existing,
          score: existing.score + hit.score * 0.35,
          direct: existing.direct || directIds.has(relative),
        });
      } else {
        expanded.set(relative, {
          id: relative,
          score: hit.score * 0.35,
          direct: directIds.has(relative),
        });
      }
    }
  }

  return [...expanded.values()].sort((a, b) => b.score - a.score).slice(0, 14);
}

function thinkerAliases(thinker: Thinker): string[] {
  const aliases = new Set<string>();
  const name = thinker.name.toLowerCase();
  aliases.add(name);
  const cleaned = name.replace(/\([^)]*\)/g, " ");
  for (const token of cleaned.split(/[^a-z0-9'-]+/)) {
    if (token.length >= 4 && !["the", "and", "von", "van", "der", "ibn"].includes(token)) {
      aliases.add(token);
    }
  }
  if (thinker.id.includes("-")) {
    aliases.add(thinker.id.replace(/-/g, " "));
  }
  return [...aliases];
}

function findMentionedThinkers(prompt: string): Thinker[] {
  const text = prompt.toLowerCase();
  const found: Thinker[] = [];
  for (const thinker of THINKERS) {
    const aliases = thinkerAliases(thinker);
    if (aliases.some((alias) => alias.length >= 4 && countWord(text, alias) > 0)) {
      found.push(thinker);
    }
  }
  return found;
}

export function routeLineages(prompt: string, themeHits: ThemeHit[]): Lineage[] {
  const scores = new Map<string, number>();

  for (const hit of themeHits) {
    const ids = THEME_LINEAGES[hit.id] ?? [];
    ids.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + hit.score * (3 - index * 0.35));
    });
  }

  const text = prompt.toLowerCase();
  for (const [id, keywords] of Object.entries(LINEAGE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (countWord(text, keyword) > 0) {
        scores.set(id, (scores.get(id) ?? 0) + 12);
      }
    }
  }

  const mentioned = findMentionedThinkers(prompt);
  for (const thinker of mentioned) {
    for (const lineage of lineagesForThinker(thinker.id)) {
      scores.set(lineage.id, (scores.get(lineage.id) ?? 0) + 9);
    }
  }

  const ranked = [...scores.entries()]
    .map(([id, score]) => ({ lineage: getLineage(id), score }))
    .filter((entry): entry is { lineage: Lineage; score: number } => Boolean(entry.lineage))
    .filter((entry) => entry.lineage.kind === "subgenre")
    .sort((a, b) => b.score - a.score);

  const picked: Lineage[] = [];
  const perParent = new Map<string, number>();

  for (const entry of ranked) {
    if (picked.length >= 5) break;
    const parent = entry.lineage.parent ?? "none";
    if ((perParent.get(parent) ?? 0) >= 3) continue;
    picked.push(entry.lineage);
    perParent.set(parent, (perParent.get(parent) ?? 0) + 1);
  }

  if (picked.length < 3) {
    for (const id of DEFAULT_LINEAGES) {
      if (picked.length >= 4) break;
      const lineage = getLineage(id);
      if (lineage && !picked.some((existing) => existing.id === lineage.id)) {
        picked.push(lineage);
      }
    }
  }

  return picked;
}

type ScoredThinker = { thinker: Thinker; score: number };

function scoreCandidates(
  prompt: string,
  themeHits: ThemeHit[],
  lineages: Lineage[],
): ScoredThinker[] {
  const text = prompt.toLowerCase();
  const themeIds = new Set(themeHits.map((hit) => hit.id));
  const topThemeIds = themeHits.slice(0, 5).map((hit) => hit.id);
  const scores = new Map<string, number>();

  lineages.forEach((lineage, index) => {
    const lineageWeight = (lineages.length - index) * 2.2;
    for (const id of lineage.five) {
      scores.set(id, (scores.get(id) ?? 0) + lineageWeight);
    }
    for (const id of lineage.alsoConsider ?? []) {
      scores.set(id, (scores.get(id) ?? 0) + lineageWeight * 0.45);
    }
  });

  for (const thinker of THINKERS) {
    let score = scores.get(thinker.id) ?? 0;

    for (const tag of thinker.tags) {
      if (themeIds.has(tag)) score += 1.6;
      if (topThemeIds.includes(tag)) score += 2.4;
    }

    if (thinker.quotes.length > 0) score += 1.6;

    const aliases = thinkerAliases(thinker);
    if (aliases.some((alias) => alias.length >= 4 && countWord(text, alias) > 0)) {
      score += 22;
    }

    const appearances = lineages.filter((lineage) => lineage.five.includes(thinker.id)).length;
    score += appearances * 0.4;

    if (score > 0) scores.set(thinker.id, score);
  }

  return [...scores.entries()]
    .map(([id, score]) => ({ thinker: THINKER_BY_ID.get(id), score }))
    .filter((entry): entry is ScoredThinker => Boolean(entry.thinker))
    .sort((a, b) => b.score - a.score);
}

function pickDiverse(
  ranked: Thinker[],
  scores: Map<string, number>,
  limit: number,
  alreadyPicked: Thinker[],
): Thinker[] {
  const picked = [...alreadyPicked];
  const familyCount = new Map<string, number>();
  for (const thinker of picked) {
    const family = thinker.tradition.split("/")[0].trim().toLowerCase();
    familyCount.set(family, (familyCount.get(family) ?? 0) + 1);
  }

  const pool = ranked.filter((thinker) => !picked.some((existing) => existing.id === thinker.id));

  while (picked.length < limit && pool.length > 0) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    pool.forEach((thinker, index) => {
      const family = thinker.tradition.split("/")[0].trim().toLowerCase();
      const repeats = familyCount.get(family) ?? 0;
      const adjusted = (scores.get(thinker.id) ?? 0) - repeats * 2.6;
      if (adjusted > bestScore) {
        bestScore = adjusted;
        bestIndex = index;
      }
    });

    const [chosen] = pool.splice(bestIndex, 1);
    picked.push(chosen);
    const family = chosen.tradition.split("/")[0].trim().toLowerCase();
    familyCount.set(family, (familyCount.get(family) ?? 0) + 1);
  }

  return picked;
}

export function retrieve(prompt: string, options: RetrieveOptions = {}): Retrieval {
  const themeHits = extractThemeHits(prompt);
  const lineages = routeLineages(prompt, themeHits);
  const allScored = scoreCandidates(prompt, themeHits, lineages);
  const excluded = new Set(options.excludeThinkerIds ?? []);

  let scored = allScored.filter((entry) => !excluded.has(entry.thinker.id));
  if (scored.length < 6) {
    // If a long conversation has excluded most of the pool, relax the exclusion
    // rather than returning too few candidates to build three quotes.
    scored = [...scored, ...allScored.filter((entry) => excluded.has(entry.thinker.id))];
  }

  const ranked = scored.map((entry) => entry.thinker);
  const scoreMap = new Map(scored.map((entry) => [entry.thinker.id, entry.score]));

  // Guarantee one strong voice from each selected genre family before filling by score.
  const anchors: Thinker[] = [];
  const anchoredParents = new Set<string>();
  for (const lineage of lineages) {
    const parent = lineage.parent ?? lineage.id;
    if (anchoredParents.has(parent)) continue;
    const best = ranked.find(
      (thinker) =>
        lineage.five.includes(thinker.id) &&
        !anchors.some((existing) => existing.id === thinker.id),
    );
    if (best) {
      anchors.push(best);
      anchoredParents.add(parent);
    }
  }

  const candidates = pickDiverse(ranked, scoreMap, 10, anchors).sort(
    (a, b) => (scoreMap.get(b.id) ?? 0) - (scoreMap.get(a.id) ?? 0),
  );

  return {
    prompt,
    themes: themeHits.slice(0, 6).map((hit) => hit.id),
    themeHits,
    lineages,
    candidates,
    scores: Object.fromEntries([...scoreMap.entries()].sort((a, b) => b[1] - a[1])),
  };
}

export function allLineages(): Lineage[] {
  return LINEAGES;
}
