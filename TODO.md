# TODO.md

## V1.1 asset & credential queue (founder input needed)

- [ ] Approved client logo files → R2 `client-logos/` → `clients.logoUrl`
- [ ] Per-client engagement wording sign-off (content/clients.ts)
- [ ] Real property inventory (≥5 listings) → flip ENABLE_PROPERTIES +
      NEXT_PUBLIC_ENABLE_PROPERTIES
- [ ] MongoDB Atlas URI + Cloudflare R2 credentials in Vercel env
- [ ] Additional counters (institutional mandates / industrial / warehouse
      projects) — sourced figures only (ADR-8)
- [ ] Testimonials, research PDFs, team photos, international imagery

## Critical (launch blockers)

- [ ] Merge branch `claude/strategy-alignment-gap-analysis-d6zpk2` → `main`
- [ ] Import repo into Vercel Hobby and deploy (steps: HANDOVER.md)
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel env
- [ ] Point mindceptconsulting.com DNS (hostindia.net) at Vercel; verify SSL
- [ ] Set `LEAD_WEBHOOK_URL` so leads reach a human inbox/CRM (until then
      they only appear in Vercel function logs) — Google Apps Script
      (email + Sheet) is the zero-cost recommendation
- [ ] Post-deploy verification: submit both forms in production, confirm
      receipt

## High (first week after launch)

- [ ] Replace placeholder social URLs in `src/content/site.ts` with real
      Instagram / Facebook / LinkedIn profiles
- [ ] Google Search Console: verify domain, submit sitemap.xml
- [ ] GA4 + GTM (env slots exist; add the script component)
- [ ] Property listings module — grid, detail page, filters (city/type/
      budget/area/availability), enquiry + WhatsApp per property
      (client requirement doc §4; architecture notes in docs/ARCHITECTURE.md)
- [ ] Real client logos for the trusted-by section (licensing confirmed by
      founder) and real testimonials

## Medium

- [ ] FAQ page + FAQ JSON-LD schema
- [ ] Research report detail pages / gated PDF downloads
- [ ] Newsletter subscription capture
- [ ] Meta Pixel + Conversion API
- [ ] Hero imagery/video (prototype anticipates aerial warehouse footage)
- [ ] Unit + component tests (start with lib/leads.ts and forms), Playwright
      E2E for the two lead flows

## Low

- [ ] Blog + headless CMS integration (Sanity/Contentful)
- [ ] Live AI search implementing `src/lib/ai/assistant.ts`
- [ ] Admin panel (properties/blogs/leads; MongoDB per client doc §10)
- [ ] shadcn/ui adoption if interactive surface grows
- [ ] OG image generation (per-page `opengraph-image`)
- [ ] WhatsApp Business API (vs current wa.me deep link)
