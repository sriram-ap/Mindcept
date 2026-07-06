/**
 * Cloudflare R2 asset layer.
 *
 * The database/content layer stores only asset KEYS or absolute URLs —
 * never binary data. This module resolves keys to public URLs served from
 * the R2 bucket's public domain (or a custom CDN domain).
 *
 * Bucket layout (docs/IMAGE_STORAGE_ARCHITECTURE.md):
 *   /images /client-logos /properties /team /reports /blog /insights
 *   /documents /videos
 *
 * Uploads are an Admin-CMS concern (presigned PUT via S3-compatible API) —
 * see the architecture doc; no upload path ships in V1.1 public code.
 */

const PUBLIC_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

export type AssetFolder =
  | "images"
  | "client-logos"
  | "properties"
  | "team"
  | "reports"
  | "blog"
  | "insights"
  | "documents"
  | "videos";

/** Resolve an asset key to a servable URL; absolute URLs pass through. */
export function assetUrl(keyOrUrl: string | undefined): string | null {
  if (!keyOrUrl) return null;
  if (/^https?:\/\//.test(keyOrUrl)) return keyOrUrl;
  if (!PUBLIC_BASE) return null; // no bucket configured yet → caller renders placeholder
  return `${PUBLIC_BASE.replace(/\/$/, "")}/${keyOrUrl.replace(/^\//, "")}`;
}

/** Build a namespaced asset key, e.g. r2Key("client-logos", "tata.svg"). */
export function r2Key(folder: AssetFolder, filename: string): string {
  return `${folder}/${filename.replace(/^\//, "")}`;
}
