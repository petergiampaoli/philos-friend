import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { THINKERS } from "@/data/thinkers";
import { PORTRAITS, getPortrait } from "@/lib/portraits";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");

describe("portraits", () => {
  it("keeps every portrait local, not hotlinked", () => {
    for (const [id, portrait] of Object.entries(PORTRAITS)) {
      expect(portrait.src, `${id} must use a local path`).toMatch(/^\/portraits\/[a-z0-9-]+\.webp$/);
      expect(portrait.src.startsWith("http"), `${id} must not hotlink`).toBe(false);
    }
  });

  it("ships the file behind every manifest entry", () => {
    for (const [id, portrait] of Object.entries(PORTRAITS)) {
      expect(
        existsSync(path.join(PUBLIC_DIR, portrait.src)),
        `${id} is missing ${portrait.src}`,
      ).toBe(true);
    }
  });

  it("only references known thinkers", () => {
    const ids = new Set(THINKERS.map((thinker) => thinker.id));
    for (const id of Object.keys(PORTRAITS)) {
      expect(ids.has(id), `portrait for unknown thinker ${id}`).toBe(true);
    }
  });

  it("covers every thinker with a local portrait", () => {
    for (const thinker of THINKERS) {
      expect(PORTRAITS[thinker.id], `${thinker.id} has no portrait`).toBeDefined();
    }
  });

  it("keeps attribution for every portrait", () => {
    for (const [id, portrait] of Object.entries(PORTRAITS)) {
      expect(
        Boolean(portrait.pageTitle || portrait.sourceUrl),
        `${id} has no attribution trail`,
      ).toBe(true);
    }
  });

  it("provides a fallback silhouette", () => {
    expect(existsSync(path.join(PUBLIC_DIR, "portraits", "fallback.svg"))).toBe(true);
    expect(getPortrait("definitely-not-a-thinker")).toBeUndefined();
  });

  it("caps the stored portrait size", () => {
    for (const [id, portrait] of Object.entries(PORTRAITS)) {
      const file = path.join(PUBLIC_DIR, portrait.src);
      if (!existsSync(file)) continue;
      const { size } = statSync(file);
      expect(size, `${id} portrait is too large`).toBeLessThan(80 * 1024);
    }
  });
});
