import { MediaUploader } from "@/components/admin/MediaUploader";
import { r2UploadConfigured } from "@/lib/storage/r2";

/**
 * Media module — the one admin module with working functionality in the
 * POC: drag-and-drop uploads through /api/upload (Cloudflare R2 when
 * credentials are configured; graceful local fallback otherwise).
 */
export default function AdminMediaPage() {
  const r2Live = r2UploadConfigured();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Media</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Property images, floor plans, brochures and documents. Binaries live
        in Cloudflare R2 (private bucket, signed URLs); MongoDB stores
        metadata and object keys only.
      </p>

      <p
        className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
          r2Live ? "bg-jewel/10 text-jewel" : "bg-ember/10 text-ember-deep"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-1.5 w-1.5 rounded-full ${r2Live ? "bg-jewel" : "bg-ember"}`}
        />
        {r2Live
          ? "Cloudflare R2 connected"
          : "R2 credentials not set — uploads use the local fallback"}
      </p>

      <div className="mt-8 max-w-xl">
        <MediaUploader />
      </div>
    </div>
  );
}
