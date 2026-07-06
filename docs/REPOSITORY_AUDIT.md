# REPOSITORY_AUDIT.md

Audit date: 2026-07-05. Scope: full recursive scan of the repository
(excluding `node_modules/`, `.next/`, `.git/`).

## Method

Every file inventoried; every feature in MASTER_PLAN.md and the canonical
business documents (docs/CONTEXT.md, docs/CLIENT_REQUIREMENTS.txt,
docs/design-prototype.html) classified as ✅ Complete / 🟡 Partial / ❌ Missing.
Reuse-first rule confirmed: no duplicate components, utilities, types or
styles exist (single source for icons, section headings, reveal animation,
lead schemas, SEO builders, brand tokens).

## Existing pages (routes)

| Route | Kind | Status |
|---|---|---|
| `/` | Static | ✅ 13 sections per design prototype |
| `/about` | Static | ✅ |
| `/contact` | Static | ✅ |
| `/insights` | Static | ✅ structure (3 report teasers) |
| `/services/[slug]` | SSG ×12 | ✅ all 12 service lines |
| `/not-found` | Static | ✅ |
| `/robots.txt`, `/sitemap.xml` | Generated | ✅ |
| `POST /api/enquiry` | Dynamic | ✅ both lead kinds |

## Existing components

- **layout/**: `Header` (mega-menu, mobile drawer, scroll state), `Footer`,
  `FloatingActions` (WhatsApp + call)
- **home/**: `Hero` (rotating slides + stat strip), `Sections`
  (Differentiators, Pillars, Milestones, ProcessSteps, Clients,
  SocialSection, Research, ListProperty, ContactSection, CtaBanner),
  `Calculators` (land / ROI / project value), `AISearch` (demo)
- **forms/**: `EnquiryForm`, `ListPropertyForm`
- **ui/**: `Icon` (16 line icons), `Reveal` (scroll reveal), `SectionHeading`,
  `SocialIcons` (glyphs + link row)

## Existing utilities / lib

`lib/seo.ts` (pageMetadata, Organization/Service/Breadcrumb JSON-LD),
`lib/leads.ts` (Zod lead schemas, shared client+server), `lib/format.ts`
(INR/number), `lib/ai/assistant.ts` (future-AI interface).

## Existing data models / types / content

`types/content.ts` (Pillar, Service, Stat, Milestone, Differentiator,
ProcessStep, HeroSlide, ResearchItem, SocialChannel, IconName);
`content/site.ts` (identity, contact, socials, nav),
`content/services.ts` (4 pillars, 12 services), `content/home.ts`
(slides, stats, milestones, diffs, steps, clients, research, AI demo,
about narrative).

## Existing assets & docs

`src/app/icon.svg` (favicon); `docs/` holds the canonical business docs +
ARCHITECTURE.md; project docs: README, GAP_ANALYSIS, MASTER_PLAN, PROGRESS,
HANDOVER, TODO, POST_LAUNCH_BACKLOG, FINAL_PROJECT_REPORT, RESUME_PROMPT.

## Duplicate candidates

None found. `ContactSection`/`CtaBanner` are intentionally reused by both
`/` and `/contact` (composition, not duplication).

## Feature classification vs. requirements

✅ Complete: brand system, all Milestone-1 pages, navigation, footer,
lead forms + API, calculators, AI demo, SEO suite, accessibility practices,
responsive layout, CI, deployment config.

🟡 Partial: Insights (structure only — no report detail pages);
social URLs (platform roots pending real handles); client marquee
(text chips pending logo assets); AI search (demo by design).

❌ Missing (tracked in TODO/MASTER_PLAN/backlog): property listings module,
FAQ page, testimonials, blog/CMS, admin panel, analytics integrations
(GA4/GTM/Pixel), newsletter, unit/E2E tests, live AI search.

## Defects found by this audit (fixed in the same commit)

1. `Hero.tsx` stat strip: `<dt>` carried `order-2` without a flex parent —
   labels rendered above values, inverting the design. Fixed with
   `flex flex-col`.
2. `Sections.tsx` (ListProperty stats): `<dd>` appeared before `<dt>` —
   invalid HTML element order inside `<dl>`. Fixed (dt first, visual order
   via flex).
3. No global error boundary. Added `src/app/error.tsx`.
