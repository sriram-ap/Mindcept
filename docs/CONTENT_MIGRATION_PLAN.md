# CONTENT_MIGRATION_PLAN.md

Goal: move every mindcept.in content asset worth keeping into this
platform's content/DB/R2 structure — modernised, never blindly copied.

## Already migrated (V1.0 + V1.1)

About narrative (verbatim intent, cleaned grammar) · 4 practice areas /
12 service lines · client relationships (30, incl. the logo-wall five) ·
Our Reach cities (10) · contact channels · brand tagline.

## Migration queue (needs founder-supplied assets)

| Asset | Source | Destination | Priority |
|---|---|---|---|
| Client logo files | founder / brand kits (permission required) | R2 `client-logos/` → `clients.logoUrl` | Critical |
| Company brochure PDF | mindcept.in header "Company Brochure" | R2 `documents/` + header link | Important |
| Office/project photography | founder | R2 `images/` | Important |
| Research reports (PDF) | founder | R2 `reports/` + insights pages, `ENABLE_REPORTS` | Important |
| Testimonials (attributed) | founder | `testimonials` collection + home section | Important |
| Team profiles + photos | founder | `team` collection + About | Optional |
| International imagery (Dubai/Singapore/Sydney) | licensed stock or own | R2 `images/` + Reach global row | Optional |
| Existing blog posts | mindcept.in / Wix export | `insights` collection | Optional |

## SEO migration (execute at DNS cutover)

1. Crawl mindcept.in for indexed URLs (Search Console → Pages).
2. Map each to its successor; add permanent redirects in `next.config.ts`
   (`redirects()`) for any URL with backlinks/impressions.
3. Verify canonical/metadata/schema per page (already dynamic here).
4. Submit sitemap.xml in Search Console; monitor Coverage for 404 spikes.
5. Keep the Wix site up until index transfer completes (~2–4 weeks).

## Rules

Never overwrite source material — archive originals (R2 `_archive/`).
Keep a migration log (media collection). Placeholders only where no
approved asset exists (current state of logos/photos/PDFs).
