# PROPERTY_PLATFORM_PLAN.md

## Shipped in V1.1 (foundation)

- Routes: `/properties` (grid) and `/property/[slug]` (detail) — SSG,
  breadcrumbs, RealEstateListing + BreadcrumbList JSON-LD, key facts,
  amenities, documents, broker contact (call / WhatsApp / callback).
- Typed model (`types/content.ts#Property`): title, description, city,
  state, price, type, status, area, images[], documents[], coordinates,
  broker, amenities, featured, SEO description.
- Repository-backed (`PropertyRepository`) — content seed now, MongoDB via
  `MONGODB_URI`, no page changes.
- Flag-gated (`ENABLE_PROPERTIES`, off in production): pages 404, nav link
  and sitemap entries disappear, home Featured Properties section hides.
- 3 representative seed listings, labelled as representative in the UI.

## Next increments (in order)

1. **Live inventory** — founder supplies real listings; enter via seed
   script or (later) Admin CMS; flip both ENABLE_PROPERTIES vars.
2. **Filters** (client requirement doc §4): city, type, budget, area,
   availability — client-side over repository data (same pattern as
   ClientDirectory), URL-synced for shareable searches.
3. **Per-property enquiry** — `/api/property-enquiry` (extend `leadSchema`
   discriminated union with `kind: "property"` + slug) + WhatsApp deep link
   with pre-filled property reference.
4. **Media** — property photo galleries + brochure downloads from R2
   (`properties/<slug>/…`), download-gated brochure form for lead capture.
5. **Map** — embed static map (or Google Maps iframe) from `coordinates`.
6. **ISR** — switch property routes from full SSG to
   `revalidate: 300` once listings change frequently (one-line change).

## Definition of done for public launch of the module

Real inventory ≥ 5 listings · filters working · property enquiry wired to
CRM webhook · photos in R2 · founder approval → set ENABLE_PROPERTIES=1 +
NEXT_PUBLIC_ENABLE_PROPERTIES=1 in Vercel and redeploy.
