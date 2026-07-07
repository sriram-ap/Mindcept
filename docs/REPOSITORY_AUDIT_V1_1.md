# REPOSITORY_AUDIT_V1_1.md

Audit date: 2026-07-05, prior to V1.1 implementation.
Baseline: branch `claude/strategy-alignment-gap-analysis-d6zpk2`
(= `main` + unmerged QA fixes `4cdc36d` + about-page fix `4e2ddcc`).

## Repository state verified

- `origin/main` = `75ebc1b` (PR #1 merge). The QA-fix commits are on this
  branch only — **V1.1 builds on them; merging this branch ships both.**
- All planning docs read: MASTER_PLAN, GAP_ANALYSIS, HANDOVER, PROGRESS,
  FINAL_AUDIT, TODO, ARCHITECTURE (all authored/updated this project).

## Existing inventory (V1.0)

**Routes:** `/`, `/about`, `/contact`, `/insights`, `/services/[slug]`×12,
404, error boundary, robots, sitemap, `POST /api/enquiry`.

**Components:** layout (Header/Footer/FloatingActions), home (Hero,
Sections×10, Calculators, AISearch), forms (EnquiryForm, ListPropertyForm),
ui (Icon, Reveal, SectionHeading, SocialIcons).

**Content:** `site.ts`, `services.ts` (4 pillars/12 services), `home.ts`
(slides, stats, milestones, diffs, steps, clients name-lists, research,
AI demo, about narrative).

**Lib:** seo, leads (Zod), format, ai/assistant interface.
**Types:** `types/content.ts`. **Assets:** icon.svg, docs/qa screenshots.

## V1.1 feature-existence check (reuse-first)

| Requested | Exists? | Plan |
|---|---|---|
| Trusted-By emphasis | 🟡 `Clients` marquee (text chips, low on page) | Extend into featured-client cards + move to position 2; keep marquee as secondary strip |
| /clients page | ❌ | New page rendering from new `content/clients.ts` via data layer |
| Our Reach India map | ❌ | New `IndiaMap` component + `content/locations.ts` (10 cities, global-ready) |
| Experience counters | 🟡 static stat strip + milestones | Add `CountUp` enhancement (IO + rAF, reduced-motion safe); extend stats |
| Homepage hierarchy | 🟡 | Reorder per approved sequence; no section rebuilt |
| /properties, /property/[slug] | ❌ | New pages behind `ENABLE_PROPERTIES` flag, repository-backed |
| Database-ready content | 🟡 typed content modules | New data-access layer (`lib/data`): repository interfaces + content provider + Mongo provider selected by `MONGODB_URI` |
| MongoDB | ❌ | `mongodb` driver (new dependency, documented); no code-change switch local↔Atlas |
| Cloudflare R2 | ❌ | `lib/storage/r2.ts` URL layer + IMAGE_STORAGE_ARCHITECTURE.md; DB stores URLs only |
| Feature flags | ❌ | `lib/flags.ts` |
| Rate limiting / spam protection | ❌ | In-memory limiter + honeypot on `/api/enquiry` |
| SEO/a11y/responsive | ✅ verified in FINAL_AUDIT | Preserve; re-verify after changes |

**No duplicates will be created:** all new sections compose the existing
`SectionHeading`, `Reveal`, `Icon`; client/property cards are new leaf
components with no existing equivalent.

## Reference-site constraint

`https://www.mindcept.in` and `https://mindcept-vercel.vercel.app` are both
unreachable from this environment (network gateway policy denial, verified).
The credibility comparison uses the founder-supplied screenshots of
mindcept.in (client logo wall "Team Transaction Experience", "Our Reach"
India map with 10 city pins, international city imagery, Know More CTA) —
recorded in CONTENT_GAP_REPORT.md.

## Approved-asset check

The repository contains **no approved binary assets** (client logo files,
office photos, report PDFs, team photos). Per the placeholder rule, V1.1
ships structured data with logo-mark placeholders and R2-ready `logoUrl` /
`imageUrl` fields, so dropping real assets in requires zero code change.
