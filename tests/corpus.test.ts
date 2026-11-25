import { describe, expect, it } from "vitest";
import { THINKERS } from "@/data/thinkers";
import { GENRES, LINEAGES, SUBGENRES } from "@/lib/taxonomy";
import { THEME_LINEAGES } from "@/lib/themes";
import { lineageSchema, thinkerSchema } from "@/lib/schema";

describe("corpus", () => {
  it("has the expected shape", () => {
    expect(THINKERS.length).toBeGreaterThanOrEqual(180);
    expect(GENRES).toHaveLength(9);
    expect(SUBGENRES).toHaveLength(50);
    expect(LINEAGES.length * 5).toBe(295);
  });

  it("validates every thinker profile", () => {
    for (const thinker of THINKERS) {
      const parsed = thinkerSchema.safeParse(thinker);
      if (!parsed.success) {
        throw new Error(`${thinker.id}: ${parsed.error.issues.map((issue) => issue.message).join("; ")}`);
      }
    }
  });

  it("gives every lineage exactly five unique, real thinkers", () => {
    const ids = new Set(THINKERS.map((thinker) => thinker.id));
    for (const lineage of LINEAGES) {
      const parsed = lineageSchema.safeParse(lineage);
      expect(parsed.success, `${lineage.id} failed schema`).toBe(true);
      expect(lineage.five, `${lineage.id} does not have five`).toHaveLength(5);
      expect(new Set(lineage.five).size, `${lineage.id} has duplicates`).toBe(5);
      for (const id of lineage.five) {
        expect(ids.has(id), `${lineage.id} references missing ${id}`).toBe(true);
      }
    }
  });

  it("keeps quote ids unique and quotes sourced", () => {
    const quoteIds = new Set<string>();
    for (const thinker of THINKERS) {
      for (const quote of thinker.quotes) {
        expect(quoteIds.has(quote.id), `duplicate quote ${quote.id}`).toBe(false);
        quoteIds.add(quote.id);
        expect(quote.work.length).toBeGreaterThan(0);
        expect(quote.locator.length).toBeGreaterThan(0);
        expect(quote.status).toBe("verified");
        expect(quote.text.trim().split(/\s+/).length).toBeLessThanOrEqual(30);
      }
    }
  });

  it("routes every theme to real lineages", () => {
    const ids = new Set(LINEAGES.map((lineage) => lineage.id));
    for (const [theme, lineages] of Object.entries(THEME_LINEAGES)) {
      for (const id of lineages ?? []) {
        expect(ids.has(id), `${theme} routes to unknown lineage ${id}`).toBe(true);
      }
    }
  });

  it("places every thinker somewhere in the library", () => {
    const used = new Set(LINEAGES.flatMap((lineage) => lineage.five));
    for (const thinker of THINKERS) {
      expect(used.has(thinker.id), `${thinker.id} is orphaned`).toBe(true);
    }
  });
});
