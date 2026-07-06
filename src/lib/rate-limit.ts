/**
 * In-memory sliding-window rate limiter for API routes.
 *
 * Scope: per serverless instance — adequate spam friction for a Hobby-plan
 * lead form (an attacker still hits the per-instance window on warm
 * invocations). Swap for Upstash/Redis when traffic justifies it; the call
 * site contract stays the same.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return { allowed: false };
  }
  recent.push(now);
  hits.set(key, recent);
  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= windowStart)) hits.delete(k);
    }
  }
  return { allowed: true };
}
