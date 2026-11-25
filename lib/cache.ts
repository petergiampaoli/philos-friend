import { createHash } from "node:crypto";
import type { AdviseResponse } from "./schema";

type Entry = { value: AdviseResponse; expiresAt: number };

const cache = new Map<string, Entry>();
const TTL_MS = 1000 * 60 * 30;
const CACHE_ENABLED = process.env.NODE_ENV === "production";

export function cacheKey(args: {
  prompt: string;
  packetIds: string[];
  provider: string;
  model: string;
  exclude?: string[];
}): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        prompt: args.prompt.trim().toLowerCase(),
        packetIds: args.packetIds,
        provider: args.provider,
        model: args.model,
        exclude: args.exclude ?? [],
        corpus: "v2",
      }),
    )
    .digest("hex");
}

export function getCached(key: string): AdviseResponse | null {
  if (!CACHE_ENABLED) return null;
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCached(key: string, value: AdviseResponse): void {
  if (!CACHE_ENABLED) return;
  if (cache.size > 200) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, { value, expiresAt: Date.now() + TTL_MS });
}
