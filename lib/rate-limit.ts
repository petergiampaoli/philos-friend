type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "local";
}

export function checkRateLimit(
  key: string,
  limit = Number(process.env.ADVISE_RATE_LIMIT ?? 60),
  windowMs = 60 * 60 * 1000,
): { ok: boolean; limit: number; remaining: number; resetAt: number } {
  const now = Date.now();

  if (buckets.size > 5_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt < now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);
  const bucket =
    existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowMs };

  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    ok: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export function rateLimitHeaders(result: {
  limit: number;
  remaining: number;
  resetAt: number;
}): Record<string, string> {
  return {
    "x-ratelimit-limit": String(result.limit),
    "x-ratelimit-remaining": String(result.remaining),
    "x-ratelimit-reset": String(Math.ceil(result.resetAt / 1000)),
  };
}
