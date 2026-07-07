# UPDATED_ARCHITECTURE.md (V1.2)

Extends `docs/ARCHITECTURE.md` and `DATABASE_ARCHITECTURE.md` — this file
records only what V1.2 added. Nothing was rebuilt.

## System

```
Browser
  → Next.js (Vercel, App Router, mostly SSG)
    → RSC / API routes
      → Data-access layer (lib/data)          content ↔ MongoDB (MONGODB_URI)
      → Storage layer (lib/storage/r2)         Cloudflare R2 (URLs only)
```

## New in V1.2

| Concern | Module | Notes |
|---|---|---|
| File uploads | `app/api/upload/route.ts` | multipart → validate → R2 `/uploads` → URL; 503 when R2 absent |
| Upload validation | `lib/uploads.ts` | shared client+server: allowed types, 25 MB, filename sanitising |
| Upload UI | `components/ui/FileUpload.tsx` | icon, drag-drop, XHR progress, remove; light/dark tones |
| R2 write | `lib/storage/r2.ts#uploadToR2` | server-only; `@aws-sdk/client-s3` dynamically imported |
| Uploaded-file metadata | `uploadedFiles` repo (mongo) | URL/name/size/type; append-only |
| Offices | `content/site.ts#offices` | India (full) + Dubai (placeholder) |
| International reach | `home/CredibilitySections.tsx#Reach` | India map + Middle East block |
| Header UX | `components/layout/Header.tsx` | mega-menu close-on-scroll/Escape/outside/route |

## Presentation ↔ content separation (unchanged, reinforced)

All new copy (experience figures, contact values, Dubai, upload labels)
lives in `content/` or `lib/uploads.ts` — components stay presentational.
Feedback-driven text edits touched **data**, not component structure.

## Data flow: an enquiry with an attachment

1. User drops `plan.dwg` → `FileUpload` validates → `POST /api/upload`.
2. Route validates again → `uploadToR2("uploads/plan-….dwg", …)` → URL.
3. URL returned to the client; `FileUpload` emits it via `onChange`.
4. On submit, the form sends the enquiry JSON **with `attachments: [url]`**
   (never the bytes) → `/api/enquiry` (Zod-validated, rate-limited).
5. Lead (incl. attachment URLs) → CRM webhook / logs; file bytes remain in R2.

## Env surface (all optional)

`NEXT_PUBLIC_R2_PUBLIC_URL`, `R2_ACCOUNT_ID/ACCESS_KEY_ID/SECRET_ACCESS_KEY/
BUCKET`, `MONGODB_URI/DB`, `ENABLE_*` flags, `LEAD_WEBHOOK_URL`. Empty env =
fully functional site from content modules; uploads show a clear
"not enabled" message.
