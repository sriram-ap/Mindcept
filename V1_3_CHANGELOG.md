# V1_3_CHANGELOG.md

## V1.3.1 — Premium static India SVG (2026-07-07)

Enhancement to the map **only** — section layout, city cards, grouping,
corridors, capability cards, spacing and typography unchanged. Pure SVG:
no images, no base64, no map library, no new dependency.

- **feat(map): recognizable India silhouette** — replaced the hand-drawn
  polygon with a curved, annual-report-style outline (higher flat north,
  compact NE lobe on a neck, Gujarat/Kutch peninsula, southern taper).
  Bounding box changed (viewBox `0 0 100 112`), so the 15 marker
  coordinates were re-tuned to the new outline (`content/locations.ts`).
- **feat(map): engraved-glass treatment** — map now sits in a premium card
  (stone `#F6F6F3`, rounded, thin border, soft shadow); landmass uses a
  near-flat soft grey-green fill, muted-slate stroke, extremely subtle
  emboss shadow, and 3 faint internal contour lines (6% opacity, clipped to
  the landmass).
- **feat(map): premium markers** — dark-emerald fill + thin white border +
  soft shadow (inactive); gold fill + soft glow + expanding pulse + animated
  label (active); `1.15×` hover scale via `.reach-marker` (transform-box).
- **a11y/perf:** map stays `aria-hidden` (cards remain the source of truth);
  all motion `prefers-reduced-motion`-safe. SVG is a single ~1 KB path
  (well under the 20 KB budget); no new dependency; client bundle unchanged.

Verified: lint/typecheck/build clean; Lighthouse home **97 / 100 / 100 /
100**, CLS 0, contrast pass; zero console errors; zero overflow 375–2560;
markers land correctly and hover/pulse/label work in Chromium.
`docs/qa/v131-map3.png`.

---


Version 1.3 — "Our Reach" premium industrial-coverage experience.
Date: 2026-07-07. Enhancement release (NOT a redesign). Baseline: `2343eaa`.
All V1.1 / V1.2 functionality preserved; homepage ordering unchanged.

## What changed

- **feat(reach): premium India SVG map** — replaced the blocky straight-line
  silhouette with a smooth curved outline (bezier coastline, tonal gradient
  fill, soft shadow). Same bounding box, so all 15 markers stay accurate.
  Pure SVG — no raster, no external API, no Google Maps / Mapbox.
- **feat(reach): active-marker pulse** — a GPU-cheap scale-based pulse ring
  on the hovered/focused city; `prefers-reduced-motion` disables it.
- **feat(reach): coverage summary** — 15+ markets · 6+ regions · 7+
  corridors · 1 international, framing geography as capability.
- **feat(reach): regional capability cards** — per region (West / Central /
  North / South / East India + Middle East): cities, primary industries,
  capabilities. New data `content/corridors.ts#regionalCapabilities`.
- **feat(reach): industrial corridors view** — Mumbai–Pune, Nashik,
  Ahmedabad–Sanand, Nagpur Logistics, Delhi NCR, Hyderabad, Chennai–Sri
  City — each with sectors + capabilities. New `content/corridors.ts#corridors`.
- **feat(clients): logo polish** — `ClientMark` renders real logos grayscale
  at rest → full colour on card hover/focus; equal sizing; `card-lift`
  elevation on the featured-client cards.
- **feat(ui): micro-interactions** — shared `.card-lift` hover elevation on
  Reach + client + corridor cards; all motion-reduce safe.

## Locations

No city changes needed — Kolkata was already removed and
Nagpur/Nashik/Vadodara/Indore/Coimbatore/Visakhapatnam already added in
V1.2.1. V1.3 reviewed the candidate hubs (Chakan, Sanand, Hosur,
Aurangabad) and represents them as **corridors, not new map pins** — see
`docs/LOCATION_RATIONALE.md`. City count deliberately unchanged (15 + Dubai).

## Files touched (modified, not replaced; no duplicates)

`src/components/home/ReachMap.tsx` (extended in place),
`src/components/home/CredibilitySections.tsx` (TrustedBy card class),
`src/components/ui/ClientMark.tsx`, `src/app/globals.css` (pulse + card-lift
keyframes), **new** `src/content/corridors.ts`.
Removed: nothing. Homepage order (`app/page.tsx`): unchanged.

## QA

`lint` / `typecheck` / `build` clean. Lighthouse home (3 runs): **94 / 97 /
95 → median 95** (perf swing is LCP timing on the local Node server;
production CDN faster), **Accessibility 100, Best Practices 100, SEO 100,
CLS 0, TBT 70 ms, colour-contrast pass**. Zero console/hydration errors;
zero overflow 375–2560; keyboard focus + pulse verified in Chromium.
Details: `docs/PERFORMANCE_REPORT.md`.
