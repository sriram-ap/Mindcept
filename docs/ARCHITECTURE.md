# Architecture

## Principles

1. **Content ≠ presentation.** Every word of marketing copy lives in
   `src/content/` as typed structured data. Components only render. Adopting a
   headless CMS later means swapping the data source behind the same types
   (`src/types/content.ts`) — no component changes.
2. **Static by default.** Every page is prerendered (SSG). The only dynamic
   surface is `/api/enquiry`. This keeps the site fast, free on Vercel Hobby,
   and resilient.
3. **Thin routes.** Pages under `src/app/` compose sections and declare
   metadata; business logic lives in `src/lib/`.
4. **AI-ready seams.** `src/lib/ai/assistant.ts` defines the interface the
   production AI search will implement; the UI already consumes the demo
   implementation shape.

## Layout

| Path | Responsibility |
|---|---|
| `src/app/` | Routes, metadata, robots/sitemap, API |
| `src/app/services/[slug]/` | 12 service landing pages (`generateStaticParams`, `dynamicParams=false`) |
| `src/app/api/enquiry/` | Single lead endpoint for all forms (discriminated by `kind`) |
| `src/components/layout/` | Header (mega-menu + drawer), Footer, floating WhatsApp/call |
| `src/components/home/` | Home sections; `Hero`, `Calculators`, `AISearch` are client components |
| `src/components/forms/` | `EnquiryForm`, `ListPropertyForm` (client, Zod-validated) |
| `src/components/ui/` | `Icon`, `Reveal`, `SectionHeading`, `SocialIcons` |
| `src/content/` | `site.ts` (identity/contact/nav), `services.ts` (4 pillars, 12 services), `home.ts` (hero, stats, milestones, diffs, steps, clients, research, AI demo, about narrative) |
| `src/lib/` | `seo.ts` (metadata + JSON-LD), `leads.ts` (Zod schemas), `format.ts` (INR), `ai/assistant.ts` |
| `src/types/` | Content types |
| `docs/` | Canonical business documents + this file |

## Brand system

Tokens are defined once in `src/app/globals.css` (`@theme`) and exposed as
Tailwind utilities: `ink #0E0E10`, `slate #1E1E24`, `jewel #14403A` (deep
green), `ember #C6A45C` (+bright/deep variants), `paper`, `line`, `muted`.
Fonts: Archivo (display, `font-display`) + Inter (text) via `next/font`
(self-hosted, zero layout shift). Source: `docs/design-prototype.html`.

## Lead flow

```
Form (client, zod parse) → POST /api/enquiry (zod re-parse, server)
  → LEAD_WEBHOOK_URL set?  forward JSON → CRM / Apps Script / Zapier
  → not set?               log lead (visible in Vercel function logs)
```

One endpoint, one schema file (`src/lib/leads.ts`) shared by both sides.

## SEO

- `pageMetadata()` builds title/description/canonical/OG/Twitter per page.
- JSON-LD: Organization (root layout), Service + BreadcrumbList (service pages).
- `robots.ts` + `sitemap.ts` generate from the same content data —
  adding a service automatically updates the sitemap.

## Accessibility

Semantic landmarks, skip-to-content link, labelled inputs with error text,
`aria-invalid`/`role=alert|status` on form states, keyboard-focus outline,
`prefers-reduced-motion` disables animation, no-JS fallback keeps
scroll-reveal content visible.

## Future modules (architected for, not built)

- **Property listings** — add `src/content/properties.ts` (or MongoDB-backed
  service in `src/services/`), route `app/properties/[slug]`, reuse card/grid
  components. Filters per the client requirement doc.
- **CMS** — map `src/types/content.ts` to Sanity/Contentful schemas.
- **AI search** — implement `Assistant` in `src/lib/ai/` with an API route.
- **Analytics** — env slots exist (`NEXT_PUBLIC_GA4_ID`, GTM, Meta Pixel).
