# V1_1_CHANGELOG.md

Version 1.1 — Business Credibility, Property Platform & Storage foundations.
Date: 2026-07-05. Branch: `claude/strategy-alignment-gap-analysis-d6zpk2`.

## Business credibility (P0)

- **Homepage restructured** to the approved trust-first sequence:
  Hero → Trusted By → Our Reach → Track Record → Practice Areas →
  [Featured Properties] → Research → Why MindCept → Process → Calculators →
  AI Search → Social → List Property → Contact → CTA.
- **Trusted By** (`#clients`, position 2): 8 featured client relationship
  cards (TATA, Kubota, IndoSpace, MTU, Amar Builders, Blackstone, Amazon,
  Mercedes-Benz — per the mindcept.in logo wall) + "View all clients →" +
  the marquee strip retained as texture. Logo tiles are R2-ready
  (`ClientMark`): real logos drop in with zero code change.
- **Our Reach** (`#reach`): interactive India map (stylised halftone
  silhouette, 10 pinned cities with hover/focus sync to an accessible city
  card list) from `content/locations.ts`; model is global-office-ready.
- **Experience counters**: hero stat strip now animates (`CountUp` —
  IntersectionObserver + rAF, reduced-motion/no-JS safe, zero CLS via
  reserved tabular-numeral width).
- **/clients**: dedicated client-showcase page, category-filterable
  (Industrial / Warehousing / Developers / Institutional Investors /
  Manufacturing / Corporate Occupiers), 30 client relationships with
  engagement, industry and description.

## Property platform foundation (P1)

- **/properties** and **/property/[slug]** — SSG, breadcrumbed,
  RealEstateListing JSON-LD, key-facts panel, amenities, documents, broker
  contact (call / WhatsApp / callback). 3 representative seed listings,
  clearly labelled. Gated behind `ENABLE_PROPERTIES` (off in production
  until live inventory is approved); sitemap/nav follow the flag.

## Data & storage architecture (P1)

- **Data-access layer** (`src/lib/data/`): repository interfaces; content
  provider (default) and **MongoDB provider** selected purely by
  `MONGODB_URI` (Community locally ↔ Atlas in production, no code change);
  per-collection fallback so a half-seeded DB never blanks the site.
  `scripts/seed-db.mjs` seeds all collections from the content modules.
- **Cloudflare R2 layer** (`src/lib/storage/r2.ts`): URL resolution for the
  namespaced bucket layout; DB/content stores keys or URLs only.
- **Feature flags** (`src/lib/flags.ts`): ENABLE_PROPERTIES,
  ENABLE_AI_SEARCH, ENABLE_REPORTS, ENABLE_ADMIN.
- New dependency: `mongodb` (documented in docs/ARCHITECTURE_DECISIONS.md).

## Security hardening (P2, partial)

- `/api/enquiry`: per-IP sliding-window rate limiting (5/min, verified
  429s) + honeypot field on both forms (verified silent drop).

## Performance work

- Below-fold interactive components code-split (`next/dynamic`):
  Calculators, AISearch, IndiaMap, both forms (moves Zod off the critical
  path). Initial hero slide no longer animates (it is the LCP element).
- **Lighthouse (home, production parity): 95 / 100 / 100 / 100 — no
  regression vs V1.0** (CLS 0, TBT 90ms, LCP 2.8s lab).

## Docs

REPOSITORY_AUDIT_V1_1, BUSINESS_CREDIBILITY_AUDIT, CONTENT_GAP_REPORT,
CONTENT_MIGRATION_PLAN, DATABASE_ARCHITECTURE, IMAGE_STORAGE_ARCHITECTURE,
PROPERTY_PLATFORM_PLAN, ARCHITECTURE_DECISIONS, FINAL_QA_V1_1 (all under
docs/ except this changelog).
