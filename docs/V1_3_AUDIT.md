# V1_3_AUDIT.md

Audit date: 2026-07-07, before V1.3. Scope: the "Our Reach" experience and
the adjacent credibility surfaces (Trusted By). Baseline: `2343eaa`
(V1.1 + V1.2 + V1.2.1 Reach redesign).

## Current implementation

- **`content/locations.ts`** — 15 India markets across 5 zones + Dubai; each
  has `zone`, `focus`, `markets[]`, `map{x,y}`. Kolkata already removed;
  Nagpur/Nashik/Vadodara/Indore/Coimbatore/Visakhapatnam already added
  (V1.2.1). `ZONE_ORDER`, `futureMarkets` exports.
- **`components/home/ReachMap.tsx`** — client component: SVG India silhouette
  (tonal gradient fill, `feDropShadow`) + ring/dot markers (ember HQ) +
  active label pill + legend; zone-grouped city cards with focus + market
  chips; International Presence block. Shared hover/focus `active` state;
  map `aria-hidden`, cards are the accessible source of truth.
- **`components/home/CredibilitySections.tsx#Reach`** — server component;
  fetches locations via the repository layer, renders `<ReachMap/>`.
- **Homepage order** (`app/page.tsx`): Hero → TrustedBy → Reach →
  Milestones → Pillars → … (unchanged; V1.3 preserves this).

## Weaknesses (what V1.3 fixes)

1. **India outline is a crude hand-drawn polygon** — reads as a generic
   shape, not a premium consulting map. → Replace the path with a smoother,
   more recognisable India silhouette; add a subtle marker pulse.
2. **Cities only — no "capability" framing.** A consulting firm sells
   *coverage capability*, not pins. → Add a Coverage summary (metros /
   corridors / markets), Regional capability cards (industries +
   capabilities per zone), and an Industrial Corridors view.
3. **Sub-city hubs (Chakan, Sanand, Hosur, Aurangabad) missing** but should
   NOT become map clutter. → Represent them as corridors, not new pins
   (keeps the count honest — see LOCATION_RATIONALE.md).
4. **Trusted By cards feel like placeholders** — logo tiles lack equal
   sizing / elevation / grayscale-to-colour polish. → Refine `ClientMark`
   + card interaction (Phase 7).
5. **Micro-interactions** thin on the map. → Pulse on active marker, hover
   elevation on cards, all `prefers-reduced-motion`-safe.

## Improvement plan (reuse-first, no rebuild)

| Phase | Change | Files (modify, not replace) |
|---|---|---|
| 2 | Premium India SVG + pulse | `ReachMap.tsx`, `globals.css` |
| 4 | Coverage summary + regional capability cards | new `content/corridors.ts`, `ReachMap.tsx` |
| 5 | Industrial corridors view | `content/corridors.ts`, `ReachMap.tsx` |
| 7 | Client logo polish | `ui/ClientMark.tsx`, `CredibilitySections.tsx#TrustedBy` |
| 8 | Micro-interactions | `globals.css`, `ReachMap.tsx` |
| 6 | Homepage sequence | **unchanged** (verified) |

No new pages, no removed components, no duplicate components. `ReachMap` is
extended in place; corridor/region data is new content (no existing
equivalent). Homepage ordering untouched.
