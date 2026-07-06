# ARCHITECTURE_DECISIONS.md

Format: Decision · Alternatives · Reason · Trade-offs · Future impact.

## ADR-1 (V1.0) — Typed content modules over hardcoded copy or CMS

Alternatives: copy in components; headless CMS from day one.
Reason: launch speed with a clean CMS seam; types double as CMS schemas.
Trade-offs: content edits require a deploy until CMS phase.
Impact: enabled V1.1's repository layer with zero page rewrites.

## ADR-2 (V1.1) — Repository interfaces + provider switch on MONGODB_URI

Alternatives: direct MongoDB calls in pages; an ORM (Prisma/Mongoose).
Reason: pages stay storage-agnostic (content ↔ Community ↔ Atlas with an
env var); no ORM weight for read-mostly marketing data; Zod already owns
validation at the write path.
Trade-offs: hand-written providers per collection (small, mechanical).
Impact: Admin CMS and future collections plug into the same seam.

## ADR-3 (V1.1) — `mongodb` driver as the only new dependency

Alternatives: Mongoose (schema layer, +bundle), Prisma (codegen, cold-start
weight on serverless), REST Data API (deprecated by Atlas).
Reason: official driver, smallest surface, dynamic-imported server-side
only (zero client-bundle impact — verified: shared JS unchanged at 102kB).
Trade-offs: no schema enforcement in DB (Zod at boundaries instead).

## ADR-4 (V1.1) — Cloudflare R2 with URL-only persistence

Alternatives: Vercel Blob (egress-billed on Hobby scale-up), Cloudinary
(free tier caps transforms), committing assets to the repo.
Reason: zero egress fees, S3-compatible, custom-domain CDN; keeps the DB
in Atlas M0's 512MB.
Trade-offs: uploads need presigned-URL plumbing (Admin CMS phase).

## ADR-5 (V1.1) — Feature flags via env, evaluated at build

Alternatives: runtime flag service (LaunchDarkly etc.), DB-stored flags.
Reason: static site — flags choose what gets *built*; production exposes
only finished features; free.
Trade-offs: flag flips require a redeploy (seconds on Vercel).

## ADR-6 (V1.1) — In-memory rate limiting

Alternatives: Upstash Redis, Vercel WAF rules.
Reason: zero-dependency spam friction adequate for a lead form at launch
scale; per-instance scope is the accepted limitation.
Impact: call-site contract fixed — swap to Redis without touching routes.

## ADR-7 (V1.1) — Monogram placeholders instead of unlicensed logo images

Alternatives: hotlinking brand logos found online.
Reason: client logos are trademarks; shipping them without approval is a
legal and credibility risk. `ClientMark` renders real logos the moment an
approved `logoUrl` lands in R2.
Impact: zero-code-change asset drop-in; founder owns the permission step.

## ADR-8 (V1.1) — No invented metrics

The requested extra counters (institutional mandates, industrial projects,
warehouse projects) are not shipped because no sourced figures exist.
Fabricated numbers on a credibility page are a trust liability. Add to
`content/home.ts` when the founder supplies them.
