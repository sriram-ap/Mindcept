# IMAGE_STORAGE_ARCHITECTURE.md

Store: **Cloudflare R2** (S3-compatible, zero egress fees — fits the
free/low-cost mandate). Database and content modules store **keys or URLs
only**, never binary data.

## Bucket layout

```
r2://mindcept-assets/
  images/           general site imagery
  client-logos/     approved client logos (SVG preferred)
  properties/       property photos (per-slug subfolders)
  team/             team photographs
  reports/          research PDFs
  blog/             blog imagery
  insights/         insight imagery
  documents/        property brochures, diligence packs
  videos/           walkthroughs, market briefs
```

## Serving

Public bucket (or custom domain, e.g. `assets.mindceptconsulting.com`)
exposed to the app as `NEXT_PUBLIC_R2_PUBLIC_URL`. Resolution happens in
one place — `src/lib/storage/r2.ts#assetUrl()`:

- absolute URLs pass through;
- keys resolve against the public base;
- when no bucket is configured, callers render branded placeholders
  (`ClientMark` monograms, property "photographs on request" panel) —
  **dropping real assets in requires zero code change.**

## Uploads (Admin CMS phase)

Server-side presigned PUT via R2's S3 API using `R2_ACCOUNT_ID` /
`R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` (server-only env, never
shipped to the browser). Validation before presigning: MIME allowlist
(image/svg+xml, image/png, image/webp, application/pdf), size caps
(images ≤ 5MB, documents ≤ 25MB), filename normalisation to slugs.
The `media` collection records key, kind, size, uploader and usage.

## Migration & backup policy

Replaced assets are moved to `r2://mindcept-assets/_archive/<date>/`,
never deleted; the `media` collection keeps the mapping (migration log).
