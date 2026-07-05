# MASTER_PLAN.md

Aligned to the canonical business documents on 2026-07-04 (see GAP_ANALYSIS.md
for the alignment decision record).

## The business

Mindcept Consulting LLP — real estate advisory (industrial, warehousing, land,
residential, commercial office, retail) with two decades of consolidated
expertise, Pune-based, pan-India mandates. New domain:
**mindceptconsulting.com** (replacing the Wix site at mindcept.in).

**Website mission:** generate high-quality leads and executive-grade trust.
Every page serves lead generation, trust, authority, conversion, relationship
building or thought leadership.

## Milestones

### Milestone 1 — Launch-critical foundation ✅ COMPLETE
- [x] Brand system from approved prototype (ink/jewel/ember, Archivo+Inter)
- [x] Home (hero slides, stats, differentiators, pillars, milestones, process,
      calculators, AI search demo, clients, social, research, list-property,
      contact, CTA)
- [x] 12 service landing pages (`/services/[slug]`, SSG)
- [x] About (founder narrative from requirement doc)
- [x] Contact / book consultation
- [x] Insights structure
- [x] Navigation (mega-menu + mobile drawer), footer, floating WhatsApp/call
- [x] Lead capture: enquiry + list-property forms → `/api/enquiry` (Zod)
- [x] SEO: dynamic metadata, canonicals, OG/Twitter, JSON-LD, robots, sitemap
- [x] Accessibility: WCAG AA practices, reduced-motion, skip link
- [x] Responsive layouts
- [x] CI (lint + typecheck + build), security headers, vercel.json, .env.example
- [x] `npm run build` / `lint` / `typecheck` all pass

### Milestone 2 — Understand & enquire (NEXT)
- [ ] Deploy to Vercel Hobby + connect mindceptconsulting.com DNS
- [ ] Wire LEAD_WEBHOOK_URL to a real inbox/CRM (Google Apps Script is the
      zero-cost path) — leads currently log to function logs
- [ ] Property listings module (client doc §4): data model exists as a plan in
      docs/ARCHITECTURE.md; needs `/properties` grid + detail + filters
- [ ] Testimonials + trusted-clients proof (replace text marquee with logos
      once client provides assets)
- [ ] FAQ page with FAQ schema
- [ ] Real research reports (PDF upload / download-gated form)
- [ ] GA4 + GTM + Meta Pixel + Search Console (env slots ready)

### Milestone 3 — Scale (time permitting)
- [ ] Blog authoring via headless CMS (Sanity/Contentful) mapped to
      src/types/content.ts
- [ ] Live AI search implementing src/lib/ai/assistant.ts
- [ ] Admin panel for properties/blogs/leads (client doc §9; MongoDB per §10)
- [ ] Unit/component/E2E test suites
- [ ] Newsletter subscription

## Deferred (see POST_LAUNCH_BACKLOG.md)

Anything that delays launch without increasing business value today.
