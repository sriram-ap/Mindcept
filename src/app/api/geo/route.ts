import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Same-origin geo hint for the city selector. Reads the edge geo headers the
 * hosting platform injects per request (Vercel: x-vercel-ip-*) — no external
 * API call, so there is no third-party latency or console noise, and it
 * resolves cleanly (empty when unknown) rather than erroring. The client
 * matches the result to a listed market and falls back to Dubai.
 */
export async function GET(request: Request) {
  const h = request.headers;
  const dec = (v: string | null) =>
    v ? decodeURIComponent(v).trim() : undefined;

  const city =
    dec(h.get("x-vercel-ip-city")) ?? dec(h.get("cf-ipcity")) ?? undefined;
  const region = dec(h.get("x-vercel-ip-country-region")) ?? undefined;
  const country =
    dec(h.get("x-vercel-ip-country")) ?? dec(h.get("cf-ipcountry")) ?? undefined;

  return NextResponse.json(
    { city, region, country },
    { headers: { "cache-control": "no-store" } },
  );
}
