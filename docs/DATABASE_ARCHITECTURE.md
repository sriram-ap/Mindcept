# DATABASE_ARCHITECTURE.md

```
Browser → Next.js (Vercel) → Next.js API / RSC → Data-access layer
                                                   ├─ content provider (default)
                                                   └─ MongoDB (Community ↔ Atlas)
Assets: Cloudflare R2 (URLs only in DB — see IMAGE_STORAGE_ARCHITECTURE.md)
```

## Provider switching — MONGODB_URI only

| MONGODB_URI | Provider |
|---|---|
| *(unset)* | Typed content modules (`src/content/`) — zero infrastructure |
| `mongodb://localhost:27017` | MongoDB Community (local dev) |
| `mongodb+srv://…mongodb.net` | MongoDB Atlas FREE (production) |

No application code changes between environments. Pages and API routes
depend only on the interfaces in `src/lib/data/repositories.ts`
(`getRepositories()` selects the provider). The Mongo provider falls back
per-collection to content when a collection is empty, so a half-seeded
database never blanks the site.

## Collections (slug-keyed, unique index)

Live now: `clients`, `properties`, `locations`, `services`, `research`.

Designed for the Admin CMS phase (same slug-keyed pattern; add a repository
interface + seed entry each): `propertyImages`, `propertyDocuments`,
`enquiries`, `contacts`, `reports`, `insights`, `media`, `testimonials`,
`careers`, `faqs`, `practiceAreas`, `industries`, `team`.

## Seeding

```bash
MONGODB_URI=mongodb://localhost:27017 node scripts/seed-db.mjs
```

Idempotent (replace-by-collection). Content modules remain the source of
truth until the Admin CMS owns writes.

## Atlas FREE-tier fit

M0: 512MB storage, shared vCPU — comfortably fits text-only documents
(assets live in R2). Connection reuse via a module-scoped client
(serverless-safe). Set `MONGODB_URI` + `MONGODB_DB` in Vercel env.

## Admin CMS design (build phase P2)

- **Auth:** email+password with Auth.js (credentials) or Clerk free tier;
  session-gated `/admin` route group, `ENABLE_ADMIN` flag.
- **Roles:** `owner` (all), `editor` (content collections), `agent`
  (properties + enquiries).
- **Managers:** Media (R2 presigned uploads), Property, Client, Research,
  Insights — one CRUD surface per collection, Zod-validated writes.
- **Dashboard:** enquiry stream, property status board.
- **Audit log:** `auditLogs` collection — actor, action, collection, slug,
  timestamp, diff.

## AI search retrieval design (P2)

Index target: properties, services, reports, research, insights, clients,
locations, FAQs. Pipeline: content/DB → embedding job (script, later cron)
→ vectors in MongoDB Atlas Vector Search (free tier) → `/api/search`
does hybrid retrieval (vector + keyword) → optional LLM re-rank/answer via
`src/lib/ai/assistant.ts`. UI is already seamed (AISearch component).

## Future API surface

`/api/properties` `/api/reports` `/api/clients` `/api/search` `/api/media`
`/api/contact` `/api/property-enquiry` `/api/newsletter` — all follow the
`/api/enquiry` pattern: Zod-validated, rate-limited, honeypot where
form-facing, repository-backed.
