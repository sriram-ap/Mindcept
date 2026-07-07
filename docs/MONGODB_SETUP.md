# MONGODB_SETUP.md — MongoDB (Community ↔ Atlas)

The app never talks to MongoDB directly — it uses the repository layer
(`lib/data`). The **only** switch is `MONGODB_URI`.

| MONGODB_URI | Provider | Use |
|---|---|---|
| *(unset)* | content modules | default, zero infra |
| `mongodb://localhost:27017` | MongoDB Community | local dev |
| `mongodb+srv://…mongodb.net` | MongoDB Atlas (M0 free) | production |

No application code changes between these.

## Local (MongoDB Community)

```bash
# macOS: brew install mongodb-community && brew services start mongodb-community
# Linux: install mongodb-org, systemctl start mongod
export MONGODB_URI=mongodb://localhost:27017
export MONGODB_DB=mindcept
node scripts/seed-db.mjs   # seeds collections from content modules
npm run dev
```

## Production (Atlas free tier)

1. cloud.mongodb.com → create an **M0** cluster.
2. Database Access → add a user (read/write).
3. Network Access → allow Vercel egress (0.0.0.0/0 for Hobby, or Vercel IPs).
4. Copy the SRV connection string → set in Vercel env:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB=mindcept
   ```
5. Seed once: `MONGODB_URI=… node scripts/seed-db.mjs`.

## Collections

Live: `clients`, `properties`, `locations`, `services`, `research`,
`uploadedFiles`. Slug-keyed (unique index) except `uploadedFiles`
(append-only URL metadata).

Designed for the Admin CMS phase (add a repository interface + seed entry
each): `contacts`, `enquiries`, `media`, `reports`, `insights`, `team`,
`testimonials`, `forms`.

## Safety net

Every read collection falls back to the content modules when empty
(`collectionOrFallback`), so a half-seeded database never blanks the site.
Connection is reused across serverless invocations (module-scoped client) —
Atlas M0 connection-limit safe.
