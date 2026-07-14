/**
 * Canonical MongoDB Atlas collection registry — single source of truth for
 * collection names and their recommended indexes. The Mongo provider and
 * the db-init script consume this; no collection name is hardcoded twice.
 *
 * Media binaries (images, floor plans, brochures, documents) live in
 * Cloudflare R2 (private bucket, signed URLs) — Mongo stores metadata and
 * R2 object keys only.
 */

export const COLLECTIONS = {
  properties: "properties",
  developers: "developers",
  cities: "cities",
  research: "research",
  blogs: "blogs",
  media: "media",
  downloads: "downloads",
  contacts: "contacts",
  enquiries: "enquiries",
  users: "users",
  admin: "admin",
  analytics: "analytics",
  settings: "settings",
  /** R2 upload metadata written by /api/upload (V1.2). */
  uploadedFiles: "uploadedFiles",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/** Recommended indexes, applied idempotently by scripts/db-init. */
export const COLLECTION_INDEXES: Record<
  string,
  { keys: Record<string, 1 | -1 | "text">; unique?: boolean }[]
> = {
  properties: [
    { keys: { slug: 1 }, unique: true },
    { keys: { city: 1, propertyType: 1, status: 1 } },
    { keys: { featured: -1 } },
  ],
  developers: [{ keys: { slug: 1 }, unique: true }],
  cities: [{ keys: { slug: 1 }, unique: true }],
  research: [{ keys: { slug: 1 }, unique: true }, { keys: { publishedAt: -1 } }],
  blogs: [{ keys: { slug: 1 }, unique: true }, { keys: { publishedAt: -1 } }],
  media: [{ keys: { r2Key: 1 }, unique: true }, { keys: { kind: 1 } }],
  downloads: [{ keys: { createdAt: -1 } }],
  contacts: [{ keys: { email: 1 } }, { keys: { createdAt: -1 } }],
  enquiries: [{ keys: { createdAt: -1 } }, { keys: { type: 1 } }],
  users: [{ keys: { email: 1 }, unique: true }],
  admin: [{ keys: { userId: 1 }, unique: true }],
  analytics: [{ keys: { day: -1, path: 1 } }],
  settings: [{ keys: { key: 1 }, unique: true }],
  uploadedFiles: [{ keys: { key: 1 }, unique: true }],
};
