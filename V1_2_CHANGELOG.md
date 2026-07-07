# V1_2_CHANGELOG.md

Version 1.2 — Customer Feedback Implementation & Production Refinement.
Date: 2026-07-07. Source: `Website_Feedback_07July2026.docx`.
Baseline: V1.1 (`93ad604`). No rebuild — every change extends existing code.

## Feedback implemented (all 8 items)

- **fix: Services mega menu closes on scroll / outside-click / Escape /
  route change** (`Header.tsx`). Previously it lingered over the page while
  scrolling. `aria-expanded` and keyboard focus preserved.
- **feat: "Aggregated 30+ Years of Experience"** replaces "20+" — hero stat
  (`30+ / Aggregated years of experience`), milestone, and reconciled
  headline copy on home, clients and track-record sections.
- **refactor: "Tools" → "Calculator"** — nav label, section eyebrow, footer
  link; anchor `#tools` → `#calculator` with all references updated.
- **docs: AI Search architecture** — interface kept, no ChatGPT integration,
  no API key; future path documented in `docs/AI_SEARCH_ARCHITECTURE.md`.
- **feat: Trusted Partners logos R2-ready** — `ClientMark` already renders
  approved `logoUrl`s from R2, monogram placeholders until then; logo
  drop-in path documented. No invented logos.
- **feat: enquiry-form document uploads** — new `FileUpload` component
  (upload icon, drag-and-drop, per-file progress, validation, 25 MB cap)
  on the enquiry and list-property forms. Accepts PDF/DOC/DOCX/DWG/DXF/
  PNG/JPEG/ZIP. New `/api/upload` route stores to Cloudflare R2 `/uploads`
  and returns the URL; only URLs are persisted (lead schema extended with
  `attachments`). Degrades gracefully (503) when R2 isn't configured.
- **feat: Dubai location + international reach** — `locations.ts` adds Dubai
  (region "Middle East"); the Our Reach section now shows an International
  block beside the India map. Multi-country ready.
- **feat: approved contact details** — `site.ts` contact model updated
  (info@ + sales@ emails, WhatsApp +91 95275 40100, Mobile +91 95275 40404,
  Phone +91 20 4862 6172); new `offices` directory renders India (full
  address) and Dubai ("Address Coming Soon") on the contact page.

## Infrastructure (Phases 2–3)

- **R2**: upload capability added to `lib/storage/r2.ts` (`uploadToR2`,
  server-only, S3 API via dynamically-imported `@aws-sdk/client-s3`);
  folders extended with `/logos /uploads /forms`. `docs/R2_SETUP.md`.
- **MongoDB**: `uploadedFiles` collection + repository added; provider
  switch unchanged (MONGODB_URI). `docs/MONGODB_SETUP.md`.

## Quality

- **a11y improvement**: deepened the `ember-deep` gold token
  (#9c7c32 → #86671c) so every small gold label clears WCAG AA 4.5:1 on
  white. Fixes a latent borderline-contrast issue site-wide.
- **Lighthouse (production parity): home 97/100/100/100, contact
  98/100/100/100, CLS 0 — targets maintained, accessibility improved.**
- New dependency: `@aws-sdk/client-s3` (server-only, dynamic import —
  client bundle unchanged at 102 kB). Rationale in ARCHITECTURE_DECISIONS.

## Docs

REPOSITORY_AUDIT_V1_2, FEEDBACK_IMPLEMENTATION_REPORT, V1_2_QA_REPORT,
UPDATED_ARCHITECTURE, R2_SETUP, MONGODB_SETUP, AI_SEARCH_ARCHITECTURE;
ARCHITECTURE_DECISIONS (ADR-9/10), PROGRESS/TODO updated.
