# R2_SETUP.md — Cloudflare R2 storage

The database/content layer stores **URLs only**; binary assets live in R2.
Zero-egress-fee, S3-compatible.

## Bucket layout

```
r2://mindcept-assets/
  logos/         brand / partner logos
  client-logos/  approved client logos → clients.logoUrl
  images/        general imagery
  properties/    property photos (per-slug)
  team/          team photos
  reports/       research PDFs
  blog/          blog imagery
  insights/      insight imagery
  documents/     brochures, diligence packs
  videos/        walkthroughs
  uploads/       enquiry-form attachments (POST /api/upload)
  forms/         reserved for future form exports
```

## One-time setup

1. Cloudflare dashboard → R2 → **Create bucket** `mindcept-assets`.
2. Enable a **public access** domain (or connect a custom domain, e.g.
   `assets.mindceptconsulting.com`) → this is `NEXT_PUBLIC_R2_PUBLIC_URL`.
3. R2 → **Manage API Tokens** → create an S3 token with Object Read & Write
   scoped to the bucket → gives Access Key ID + Secret.
4. Note the **Account ID** (R2 endpoint host prefix).

## Environment variables (Vercel + `.env.local`)

```
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.mindceptconsulting.com
R2_ACCOUNT_ID=xxxxxxxxxxxxxxxx
R2_ACCESS_KEY_ID=xxxxxxxx
R2_SECRET_ACCESS_KEY=xxxxxxxx
R2_BUCKET=mindcept-assets
```

`NEXT_PUBLIC_R2_PUBLIC_URL` is public (used to build asset URLs in the
browser). The three `R2_*` secrets are **server-only** — used solely by
`/api/upload` via the dynamically-imported AWS S3 client, never shipped to
the client bundle.

## How it works in code

- `lib/storage/r2.ts#assetUrl(key)` — resolves a stored key/URL to a public
  URL (absolute URLs pass through; missing config → caller shows a
  placeholder).
- `lib/storage/r2.ts#uploadToR2(key, bytes, contentType)` — server-side
  PutObject; returns the public URL, or `null` when R2 isn't configured.
- `/api/upload` validates (`lib/uploads.ts`), uploads to `uploads/`, and
  records URL metadata in the `uploadedFiles` collection (when Mongo is on).

## Local development

Leave the `R2_*` vars unset — uploads return a friendly 503 and forms still
submit without attachments. To test real uploads locally, set the same
production R2 vars (R2 has no local emulator; the free tier is sufficient).

## Adding client logos (feedback #5)

1. Upload `tata.svg` etc. to `client-logos/`.
2. Set `logoUrl: "client-logos/tata.svg"` on the matching entry in
   `content/clients.ts` (or the `clients` Mongo doc).
   `ClientMark` swaps the monogram for the real logo automatically.
