import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { safeFileName, validateUpload } from "@/lib/uploads";
import { r2Key, r2UploadConfigured, uploadToR2 } from "@/lib/storage/r2";

export const runtime = "nodejs";

/**
 * Attachment upload for enquiry forms (feedback V1.2 #6).
 *
 * Accepts one file (multipart), validates type + size against src/lib/uploads,
 * stores it in Cloudflare R2 under /uploads and returns the public URL — which
 * is what gets attached to the lead (only the URL is persisted, never the bytes).
 *
 * When R2 is not configured, returns 503 so the client can tell the user that
 * attachments aren't available yet and still submit the enquiry without one.
 */
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`upload:${ip}`).allowed) {
    return NextResponse.json(
      { error: "Too many uploads. Please try again in a minute." },
      { status: 429 },
    );
  }

  if (!r2UploadConfigured()) {
    return NextResponse.json(
      {
        error:
          "File uploads are not yet enabled. Please submit your enquiry and our team will request documents directly.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const check = validateUpload(file.name, file.size, file.type);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: 422 });
  }

  const key = r2Key("uploads", safeFileName(file.name));
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const url = await uploadToR2(
      key,
      bytes,
      file.type || "application/octet-stream",
    );
    if (!url) {
      return NextResponse.json(
        { error: "Storage is not available. Please try again later." },
        { status: 503 },
      );
    }
    // Record metadata (URL only) when a database is configured.
    try {
      const { getRepositories } = await import("@/lib/data");
      const repos = await getRepositories();
      await repos.uploadedFiles?.record({
        url,
        name: file.name,
        size: file.size,
        contentType: file.type || "application/octet-stream",
        uploadedAt: new Date().toISOString(),
      });
    } catch {
      // Metadata recording is best-effort; the URL is already returned below.
    }
    return NextResponse.json({ ok: true, url, name: file.name, size: file.size });
  } catch (error) {
    console.error("[upload] failed", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 502 },
    );
  }
}
