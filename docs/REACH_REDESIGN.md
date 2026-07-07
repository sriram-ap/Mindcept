# REACH_REDESIGN.md (V1.3)

How the "Our Reach" section works after V1.3, and how to extend it.

## Structure (top → bottom)

1. **India map** (`ReachMap.tsx`, left column, sticky on desktop) — smooth
   curved SVG silhouette, ring+dot markers (ember HQ / jewel markets),
   active-marker pulse + label pill, legend. `aria-hidden` (decorative).
2. **Zone-grouped city directory** (right column) — West / Central / North /
   South / East India + International Presence. Each city is a
   keyboard-operable `<button>` (focus/hover ↔ map marker highlight).
3. **Coverage summary** — markets / regions / corridors / international.
4. **Regional capability cards** — industries + capabilities per region.
5. **Industrial corridors** — named corridors with sectors + capabilities.

## Data sources

- `content/locations.ts` — 15 India markets + Dubai (`zone`, `focus`,
  `markets`, `map{x,y}`, `kind`, `status`), `ZONE_ORDER`, `futureMarkets`.
- `content/corridors.ts` — `regionalCapabilities[]` and `corridors[]`.
- Served through the repository layer (`getRepositories().locations`), so
  MongoDB can drive locations without code change (corridor/region content
  is static today; move to a collection the same way when needed).

## Accessibility

Map is `aria-hidden`; the city buttons are the source of truth (Tab-focus
highlights the marker). Pulse + hover elevation respect
`prefers-reduced-motion` (see `globals.css`). Colour-contrast verified AA.

## How to extend

- **Add a market:** one entry in `locations.ts` (`zone`, `map{x,y}` on the
  0–100 viewBox, `focus`, `markets`). Marker, card, zone count, and coverage
  summary update automatically.
- **Add a corridor / region:** append to `corridors.ts`. The coverage
  summary counts and card grids update automatically.
- **Real client logos:** set `logoUrl` in `content/clients.ts` → `ClientMark`
  swaps the monogram for the (grayscale-to-colour) logo.

## Constraints honoured

Pure SVG, no raster images, no external map API. One component
(`ReachMap`), no duplicates. Homepage ordering untouched.
