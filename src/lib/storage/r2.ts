/**
 * Cloudflare R2 asset layer.
 *
 * The database/content layer stores only asset KEYS or absolute URLs —
 * never binary data. This module resolves keys to public URLs served from
 * the R2 bucket's public domain (or a custom CDN domain).
 *
 * Bucket layout (docs/R2_SETUP.md):
 *   /logos /images /client-logos /properties /team /reports /blog /insights
 *   /documents /videos /uploads /forms
 *
 * Enquiry-form attachments are stored under /uploads by the /api/upload route.
 */

const PUBLIC_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

export type AssetFolder =
  | "logos"
  | "images"
  | "client-logos"
  | "properties"
  | "team"
  | "reports"
  | "blog"
  | "insights"
  | "documents"
  | "videos"
  | "uploads"
  | "forms";

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

/** True when server-side R2 upload credentials are configured. */
export function r2UploadConfigured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET,
  );
}

/**
 * Upload bytes to R2 and return the public URL for the stored object.
 * Server-only: uses the S3-compatible API. The AWS SDK is imported
 * dynamically so it never reaches the client bundle and is only loaded
 * when an upload actually happens. Returns null when R2 is not configured
 * (caller degrades gracefully — no fabricated storage).
 */
export async function uploadToR2(
  key: string,
  body: Uint8Array,
  contentType: string,
): Promise<string | null> {
  if (!r2UploadConfigured()) return null;

  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );

  return assetUrl(key);
}
