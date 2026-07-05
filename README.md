# MindCept Consulting — mindceptconsulting.com

> Where Strategy Meets Space.

Marketing and lead-generation website for **Mindcept Consulting LLP**, a real
estate advisory firm covering industrial, warehousing, land, residential,
commercial office and retail mandates across India.

**Project status (2026-07-04): Milestone 1 complete — production build passing,
launch-ready pending deployment.** See [PROGRESS.md](./PROGRESS.md),
[HANDOVER.md](./HANDOVER.md) and [TODO.md](./TODO.md).

## Stack

- [Next.js 15](https://nextjs.org) (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS 4 (brand tokens in `src/app/globals.css`)
- Zod (lead validation, shared client/server)
- Deploy target: **Vercel Hobby** (free plan)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; defaults work for local dev
npm run dev                  # http://localhost:3000
```

Quality gates (all must pass before merging):

```bash
npm run lint
npm run typecheck
npm run build
```

## Architecture

Content is fully separated from presentation so a headless CMS can be adopted
later without refactoring (see `docs/ARCHITECTURE.md`):

```
src/
  app/                 Routes (App Router) — thin pages, no business logic
    services/[slug]/   12 statically generated service landing pages
    api/enquiry/       Lead-capture endpoint (Zod-validated, webhook-forwarding)
  components/          Presentation only (layout / home / forms / ui)
  content/             ALL marketing content as typed structured data
  lib/                 SEO builders, lead schemas, formatting, AI interface
  types/               Content-layer types
```

- **SEO:** per-page dynamic metadata, canonical URLs, OpenGraph/Twitter,
  JSON-LD (Organization, Service, BreadcrumbList), `robots.txt`, `sitemap.xml`.
- **Accessibility:** WCAG AA targets — semantic landmarks, skip link, labelled
  forms, keyboard-visible focus, `prefers-reduced-motion` respected.
- **Performance:** everything static except the lead API; ~126 kB first-load JS
  on the home page.

## Lead capture

Both forms (callback enquiry + list-your-property) POST to `/api/enquiry`.
Set `LEAD_WEBHOOK_URL` (CRM / Google Apps Script / Zapier endpoint) in the
environment to forward leads; otherwise they are logged by the route so nothing
is silently dropped.

## Deployment (Vercel Hobby)

1. Push/merge to `main` on `github.com/sriram-ap/Mindcept`.
2. In Vercel (team `srirampadmanaban-3026s-projects`): **Add New → Project →
   Import** the `Mindcept` repository. Framework auto-detects as Next.js —
   defaults are correct.
3. Set env vars: `NEXT_PUBLIC_SITE_URL=https://mindceptconsulting.com`, and
   `LEAD_WEBHOOK_URL` when the CRM endpoint exists.
4. Deploy. Then add the custom domain `mindceptconsulting.com` under
   Project → Settings → Domains and point DNS (hostindia.net) at Vercel
   (A `76.76.21.21` / CNAME `cname.vercel-dns.com`).

Deployment checklist: see [HANDOVER.md](./HANDOVER.md#deployment-status).

## Canonical business documents

The requirements live in `docs/`:
[`docs/CONTEXT.md`](./docs/CONTEXT.md) (project context; business description
superseded — see below), and the founder-supplied requirement/design documents
summarised in [GAP_ANALYSIS.md](./GAP_ANALYSIS.md). **GAP_ANALYSIS.md records
the binding decision**: Mindcept is a real estate advisory firm; the earlier
"business transformation consulting" framing was replaced per the client
requirement document and approved design prototype.
