import { THINKERS } from "../data/thinkers";
import { GENRES, SUBGENRES, LINEAGES } from "../lib/taxonomy";
import { THEME_LINEAGES } from "../lib/themes";
import { thinkerSchema, lineageSchema } from "../lib/schema";

type Issue = { level: "error" | "warning"; message: string };

const issues: Issue[] = [];
const error = (message: string) => issues.push({ level: "error", message });
const warning = (message: string) => issues.push({ level: "warning", message });

const ids = new Set<string>();
const quoteIds = new Set<string>();

for (const thinker of THINKERS) {
  const parsed = thinkerSchema.safeParse(thinker);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      error(`${thinker.id}: ${issue.path.join(".")} — ${issue.message}`);
    }
  }
  if (ids.has(thinker.id)) error(`duplicate thinker id: ${thinker.id}`);
  ids.add(thinker.id);

  for (const quote of thinker.quotes) {
    if (quoteIds.has(quote.id)) error(`duplicate quote id: ${quote.id}`);
    quoteIds.add(quote.id);
    if (quote.text.split(/\s+/).length > 25) {
      warning(`${quote.id}: ${quote.text.split(/\s+/).length} words (keep excerpts short)`);
    }
  }
}

for (const lineage of LINEAGES) {
  const parsed = lineageSchema.safeParse(lineage);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      error(`${lineage.id}: ${issue.path.join(".")} — ${issue.message}`);
    }
  }
  if (lineage.five.length !== 5) error(`${lineage.id}: has ${lineage.five.length} entries`);
  if (new Set(lineage.five).size !== lineage.five.length) {
    error(`${lineage.id}: duplicate thinker in top five`);
  }
  for (const id of lineage.five) {
    if (!ids.has(id)) error(`${lineage.id}: unknown thinker "${id}"`);
  }
  for (const id of lineage.alsoConsider ?? []) {
    if (!ids.has(id)) error(`${lineage.id}: unknown alsoConsider "${id}"`);
  }
}

for (const genre of GENRES) {
  if (genre.kind !== "genre") error(`${genre.id}: expected genre`);
  if (genre.parent) error(`${genre.id}: genre should not have a parent`);
}

for (const sub of SUBGENRES) {
  if (sub.kind !== "subgenre") error(`${sub.id}: expected subgenre`);
  if (!sub.parent) error(`${sub.id}: missing parent genre`);
  else if (!GENRES.some((genre) => genre.id === sub.parent)) {
    error(`${sub.id}: unknown parent ${sub.parent}`);
  }
}

const lineageIds = new Set(LINEAGES.map((lineage) => lineage.id));
for (const [theme, ids] of Object.entries(THEME_LINEAGES)) {
  for (const id of ids ?? []) {
    if (!lineageIds.has(id)) error(`theme "${theme}" routes to unknown lineage "${id}"`);
  }
}

const used = new Set<string>();
for (const lineage of LINEAGES) {
  for (const id of lineage.five) used.add(id);
  for (const id of lineage.alsoConsider ?? []) used.add(id);
}
for (const id of ids) {
  if (!used.has(id)) warning(`thinker "${id}" is not in any lineage`);
}

const quotes = THINKERS.reduce((sum, thinker) => sum + thinker.quotes.length, 0);

console.log(`Thinkers: ${THINKERS.length}`);
console.log(`Genres: ${GENRES.length}`);
console.log(`Subgenres: ${SUBGENRES.length}`);
console.log(`Top-five seats: ${LINEAGES.length * 5}`);
console.log(`Verified quotes: ${quotes}`);
console.log(`Issues: ${issues.filter((issue) => issue.level === "error").length} errors, ${issues.filter((issue) => issue.level === "warning").length} warnings`);

for (const issue of issues) {
  console.log(`${issue.level === "error" ? "ERR" : "WARN"} ${issue.message}`);
}

if (issues.some((issue) => issue.level === "error")) {
  process.exit(1);
}
