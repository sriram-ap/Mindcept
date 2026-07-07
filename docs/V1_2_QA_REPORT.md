# V1_2_QA_REPORT.md

Date: 2026-07-07 · Production build (`next build` + `next start`),
Chromium (Playwright) + Lighthouse 12.

## Build gates

`npm run lint` ✅ zero · `npm run typecheck` ✅ clean · `npm run build` ✅
(26 routes prerendered; 29 with `ENABLE_PROPERTIES`). Client shared JS
unchanged at **102 kB** (AWS SDK is server-only, dynamically imported).

## Lighthouse (production parity)

| Page | Perf | A11y | Best Practices | SEO | CLS |
|---|---|---|---|---|---|
| `/` | 97 | 100 | 100 | 100 | 0 |
| `/contact` | 98 | 100 | 100 | 100 | 0 |

All targets met (Perf > 95, A11y > 95, BP > 95, SEO = 100). Accessibility
**improved**: deepening the `ember-deep` token fixed a latent 3.9:1 gold
small-text contrast to ~5.3:1 site-wide.

## Feedback behaviour tests (Playwright)

- Services mega menu: open→scroll = **closed**; open→Escape = **closed**;
  open→outside-click = **closed**; `aria-expanded` = true when open. ✅
- Upload API: no R2 → **503** (graceful, form still submits); enquiry with
  `attachments` URLs → **200 {ok:true}**. ✅
- Upload UI: icon + "Click to upload or drag & drop" + accepted-formats hint
  + 25 MB cap present on enquiry and list-property forms. ✅
- Rate limit / honeypot (unchanged from V1.1): still enforced. ✅

## Runtime / responsive

Routes `/`, `/clients`, `/contact`, `/about`, `/services/warehousing`:
**zero console errors, zero page/hydration errors, zero horizontal
overflow** at 375 / 768 / 1280 / 1600 / 2560. First Tab focus = skip link.

## Accessibility specifics

FileUpload: labelled input, keyboard-operable trigger button, progress bar
with `role="progressbar"` + aria values, remove buttons `aria-label`ed.
Office directory uses `<address>` + `<dl>`. Dubai "Opening soon" badge is
`bg-ember text-ink` (7.7:1).

## Screenshots

`docs/qa/v12-reach-dubai.png` · `docs/qa/v12-contact-offices.png` ·
`docs/qa/v12-upload.png`.

## Deployment readiness

Vercel-ready. New env (all optional, documented in `.env.example`,
`R2_SETUP.md`, `MONGODB_SETUP.md`): `R2_*`, `NEXT_PUBLIC_R2_PUBLIC_URL`,
`MONGODB_URI/DB`. With an empty env the site runs fully from content
modules and uploads degrade to a clear "not enabled" message — no crash,
no fabricated storage.

**Not verified from this environment:** the live vercel.app deployment
(sandbox network policy blocks *.vercel.app) and live R2 uploads (no
credentials). Re-run upload E2E once R2 keys exist.
