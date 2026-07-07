# REPOSITORY_AUDIT_V1_2.md

Audit date: 2026-07-07, before V1.2 implementation.
Baseline: branch `claude/strategy-alignment-gap-analysis-d6zpk2`
(V1.0 + V1.1 `93ad604`; V1.1 committed locally, push blocked by a
wrong-account GitHub credential — infra issue, not code).

## Method

Every feedback item in `Website_Feedback_07July2026.docx` mapped to the
exact existing file(s) it touches. Reuse-first confirmed: no new component
duplicates an existing one; forms extend the existing form + API + R2 +
data-access layers already built in V1.1.

## Feedback → existing code map

| # | Feedback | Existing site | V1.2 action |
|---|---|---|---|
| 1 | Services dropdown stays open on scroll | `Header.tsx` (`megaOpen` state, scroll listener already present for `solid`) | Extend: close on scroll / outside-click / route change / Escape |
| 2 | "20+" → "Aggregated 30+ Years of Experience" | `content/home.ts` (hero stat + milestone), copy in `Sections.tsx`, `CredibilitySections.tsx`, `clients/page.tsx`, `about/page.tsx` | Update stat=30 + aggregated label; reconcile headline "two decades"→"three decades (aggregated)" |
| 3 | "Tool" → "Calculator" | nav label (`content/site.ts`), section eyebrow + `id="tools"` (`Calculators.tsx`), footer link | Rename visible labels; rename anchor `tools`→`calculator`, update all refs |
| 4 | AI Search — architecture only, no ChatGPT yet | `lib/ai/assistant.ts` (interface exists), `AISearch.tsx` (demo) | Keep demo; extend interface + `docs/AI_SEARCH_ARCHITECTURE.md`; no key |
| 5 | Trusted Partners — keep, real logos when available | `CredibilitySections.tsx#TrustedBy` + `ClientMark` (R2-ready) | Already R2-ready; wire `logoUrl` slots + document logo drop-in |
| 6 | Forms — document uploads (PDF/DOC/DOCX/DWG/DXF/PNG/JPEG/ZIP) + icon + progress + validation + max size; store in R2, URLs in Mongo | `EnquiryForm.tsx`, `ListPropertyForm.tsx`, `api/enquiry`, `lib/storage/r2.ts`, `lib/leads.ts` | New `FileUpload` component + `/api/upload` route (R2-backed) + `uploadedFiles` repo; extend lead schema with attachment URLs |
| 7 | Cities — India + Dubai, multi-country ready | `content/locations.ts` (already has `region` field incl. "Middle East") | Add Dubai; render an international-reach block beside the India map |
| 8 | Contact — approved India values; Dubai "Address Coming Soon" | `content/site.ts`, `Sections.tsx#ContactSection`, `contact/page.tsx` | Update site contact model; add offices model; Dubai placeholder |

## Inventory confirmed present (reused, not rebuilt)

Routes (25, +3 flag): home, about, clients, contact, insights,
services/[slug]×12, properties, property/[slug], api/enquiry, robots,
sitemap. Data-access layer (`lib/data`: content + mongo providers, switch
on `MONGODB_URI`). R2 layer (`lib/storage/r2.ts`). Feature flags. Rate
limiting + honeypot. `ClientMark` (R2-ready logos), `CountUp`, `IndiaMap`,
`Reveal`, `SectionHeading`, `Icon`.

## New files V1.2 will add (no duplicates)

`components/ui/FileUpload.tsx`, `app/api/upload/route.ts`,
`lib/uploads.ts` (upload validation schema + allowed types),
`content/offices.ts` (structured office directory),
`lib/data` additions for `uploadedFiles`, and the six V1.2 docs.

## Decisions carried

- WhatsApp number changes to **+91 9527540100** per feedback (was
  ...40404, which becomes the Mobile number). Landline +91 20-48626172 and
  Sales@mindcept.in are new.
- "30+ aggregated years" is the **team's combined** experience (the
  feedback's exact words). Practice-specific "two decades in land" copy on
  the land-services page is a distinct narrower claim and is left as-is to
  avoid misstating a single practice's tenure (noted in the report).
- Uploads: without R2 credentials the `/api/upload` route validates and
  returns a clear "storage not configured" response; with
  `NEXT_PUBLIC_R2_PUBLIC_URL` + R2 keys it stores to `/uploads` and returns
  the URL. No fabricated storage.
