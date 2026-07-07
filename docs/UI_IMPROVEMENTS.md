# UI_IMPROVEMENTS.md (V1.3)

Presentation-only refinements. No layout ordering changed; design tokens
reused; no new dependencies.

## Map

- Blocky straight-line India polygon → smooth **bezier-curve coastline**
  with a tonal gradient fill and soft drop-shadow. Reads as a premium
  consulting map, not an infographic.
- Marker system: ring + dot; ember for HQ, jewel for markets; active state
  enlarges + adds a dark label pill.
- **Active-marker pulse** (`.reach-pulse`) — scale/opacity animation on an
  outer ring; GPU-cheap (transform/opacity only); `motion-reduce` disables.

## Cards

- **`.card-lift`** shared utility — subtle `translateY(-2px)` + soft shadow
  on hover; applied to Reach city cards, regional/corridor cards, and
  featured-client cards. `motion-reduce` disables the transform.
- Regional & corridor cards: consistent spacing, uppercase micro-labels
  (Primary industries / Capabilities), jewel chips (AA-contrast).

## Client logos

- `ClientMark`: real logos render **grayscale at rest → full colour** on
  card hover/focus (`group-hover:grayscale-0`), equal tile sizing, lazy
  loaded. Monogram fallback until approved assets exist — unchanged
  behaviour, now with the same grayscale-to-colour polish path.

## Motion & accessibility

Every animation added this release (pulse, card-lift, logo colour) is
wrapped by `@media (prefers-reduced-motion: reduce)` or Tailwind
`motion-reduce:*`. Colour-contrast re-verified (Lighthouse a11y 100).
Reveal-on-scroll and CountUp (existing) unchanged.

## Explicitly unchanged

Homepage section order, hero, navigation, footer, forms, calculator,
property platform, client directory page — untouched.
