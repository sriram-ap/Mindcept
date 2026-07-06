# FINAL_QA_V1_1.md

Date: 2026-07-05 · Production build, Chromium (Playwright) + Lighthouse 12.

## Build status

`npm run lint` ✅ · `npm run typecheck` ✅ · `npm run build` ✅
(25 routes production-parity; 28 with ENABLE_PROPERTIES=1).
Client bundle: shared JS unchanged at 102kB; home 6.2kB page JS
(forms/calculators/AI/map split into lazy chunks).

## Lighthouse (home, production parity — targets maintained, no regression)

| Category | V1.0 | V1.1 |
|---|---|---|
| Performance | 95 | **95** |
| Accessibility | 100 | **100** |
| Best Practices | 100 | **100** |
| SEO | 100 | **100** |

CLS **0** · TBT 90ms · LCP 2.8s (lab) · FCP 1.2s.
Perf work during QA: CountUp reserved-width fix (CLS 0.007 → 0), initial
hero slide no longer animates (LCP element), five below-fold client
components code-split (TBT 150 → 90ms).

## Console / hydration / requests

Zero console errors, warnings, page errors and failed requests on
`/`, `/clients`, `/about`, `/insights`, `/contact`, `/services/warehousing`
(+ `/properties`, `/property/[slug]` in the flag-enabled build).

## Responsive

Zero horizontal overflow at 375 / 768 / 1280 / 1600 / 2560 on all sampled
routes (flag-on and flag-off builds).

## Accessibility

Skip link first Tab stop · IndiaMap: decorative SVG `aria-hidden`, city
data delivered through an accessible focusable card list · ClientDirectory
filter uses tablist semantics + result count `role="status"` · CountUp
renders final values for reduced-motion/no-JS · Lighthouse a11y 100.

## API tests

Valid enquiry → `{"ok":true}` · valid listing → `{"ok":true}` ·
invalid fields → 422 with per-field errors · malformed JSON → 400 ·
**honeypot filled → silently dropped** · **6th request in a minute → 429**.

## Broken links

All internal hrefs resolve (nav, footer, breadcrumbs, section CTAs
re-verified after restructure); flag-off build emits no links to gated
routes.

## Screenshots

`docs/qa/v11-trustedby.png` · `docs/qa/v11-reach.png` ·
`docs/qa/v11-clients.png` (+ V1.0 set retained).

## Deployment readiness

Vercel-ready as before. New env vars documented in `.env.example`
(MONGODB_URI/DB, R2 vars, feature flags). Nothing requires infrastructure
to exist: with an empty env the site runs entirely from the content layer.

**Not verified from this environment:** the live vercel.app deployment
(network policy) — re-run this QA against the production URL after merge.
