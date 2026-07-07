# V1_2_CHANGELOG.md

## V1.2.1 — "Our Reach" section redesign (2026-07-07)

Section-level redesign (not a website redesign). Replaced the placeholder-ish
halftone map + flat list with a premium, corporate map + zone-grouped city
directory. Component `IndiaMap.tsx` replaced by `ReachMap.tsx` (no duplicate;
old file removed). Data model extended, not rebuilt.

### Cities

- **Removed Kolkata.** MindCept's East-India credibility is stronger led by
  an industrial/port market; Kolkata read as a metro placeholder with thin
  industrial-mandate relevance versus the corridors the firm actually
  advises on.
- **Added Nagpur (Central India).** India's logistical centre-point (MIHAN,
  the multi-modal hub); a genuine warehouse-park and distribution nucleus —
  core to an industrial/warehousing advisory story.
- **Added Nashik (West India).** Manufacturing and industrial-land market on
  the Mumbai–Pune–Nashik "golden triangle"; automobile and engineering
  corridor — direct fit for the firm's land + industrial mandates.
- **Added (business-justified, not blindly):**
  - **Vadodara (West)** — DMIC node, petrochem & manufacturing belt.
  - **Indore (Central)** — Pithampur industrial hub + fast-growing MP
    warehousing/distribution.
  - **Coimbatore (South)** — engineering & textiles manufacturing cluster
    (industrial estates), broadens the South beyond metros.
  - **Visakhapatnam (East)** — port-led industrial & petrochem; a stronger
    East-coast industrial anchor than a pure metro, and complements Sri City.
- Cities from the suggestion list **not** added, with reason: Surat, Jaipur,
  Lucknow, Kochi, Chandigarh, Noida/Gurugram/Faridabad — either overlapping
  an existing node (NCR already covers Noida/Gurugram/Faridabad), or weaker
  industrial/warehousing-advisory relevance today. Kept the footprint
  credible, not padded.

Result: **15 India operating markets** across 5 zones + Dubai.

### Grouping & international

- Cities grouped into **West / Central / North / South / East India**, each
  with a labelled heading + count. International shown separately under
  **International Presence** — Dubai (Opening soon) only; Singapore & Saudi
  Arabia listed as "future markets under evaluation" (**not** fabricated
  offices).

### Map & interaction

- Clean vector India silhouette (tonal gradient fill + soft shadow) —
  removed the infographic dot-halftone. Refined marker system: ring + dot,
  ember for HQ, enlarge + dark label pill on active. Legend added.
- Shared hover/focus state: hover/focus a city card → its marker highlights
  and shows its label; the map is decorative (`aria-hidden`), cards are the
  accessible, keyboard-operable source of truth. Desktop map is sticky.
- Each city card carries **City · business focus · markets-served chips**.

### How the map architecture scales

Adding a market = one entry in `content/locations.ts` (`zone`, `map{x,y}`,
`focus`, `markets`). New zones drop into `ZONE_ORDER`. International markets
add with `region !== "India"`. The same data feeds MongoDB (via the
repository layer) unchanged, so a CMS can drive it later. No component edits
needed to grow the footprint.

### QA

Lighthouse home **97 / 100 / 100 / 100**, CLS 0 — no regression. (Caught &
fixed a chip contrast miss during QA: market chips moved from
`text-muted` on a tint to the design-system `bg-jewel/10 text-jewel`.)
Zero console errors; zero overflow at 375–2560; hover + keyboard-focus
interaction verified in Chromium.

---


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
