/**
 * Upload validation shared by the FileUpload component (client) and the
 * /api/upload route (server). Single source of truth for allowed types
 * and size limits so client and server never disagree.
 */

export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024; // 25 MB

/** Accepted document/drawing/image types (feedback V1.2 #6). */
export const ALLOWED_UPLOADS: {
  ext: string;
  mimes: string[];
  label: string;
}[] = [
  { ext: ".pdf", mimes: ["application/pdf"], label: "PDF" },
  { ext: ".doc", mimes: ["application/msword"], label: "DOC" },
  {
    ext: ".docx",
    mimes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    label: "DOCX",
  },
  {
    ext: ".dwg",
    // AutoCAD drawings are frequently sent as octet-stream — extension is authoritative.
    mimes: ["image/vnd.dwg", "application/acad", "application/dwg", "application/x-dwg", "application/octet-stream"],
    label: "DWG",
  },
  {
    ext: ".dxf",
    mimes: ["image/vnd.dxf", "application/dxf", "application/octet-stream"],
    label: "DXF",
  },
  { ext: ".png", mimes: ["image/png"], label: "PNG" },
  { ext: ".jpg", mimes: ["image/jpeg"], label: "JPEG" },
  { ext: ".jpeg", mimes: ["image/jpeg"], label: "JPEG" },
  {
    ext: ".zip",
    mimes: ["application/zip", "application/x-zip-compressed", "application/octet-stream"],
    label: "ZIP",
  },
];

/** `accept` attribute value for the file input. */
export const ACCEPT_ATTR = ALLOWED_UPLOADS.map((t) => t.ext).join(",");

/** Human-readable list of accepted formats (deduplicated). */
export const ACCEPTED_LABELS = [
  ...new Set(ALLOWED_UPLOADS.map((t) => t.label)),
].join(", ");

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface UploadValidationResult {
  ok: boolean;
  error?: string;
}

/** Validate a file by extension (authoritative) + size. */
export function validateUpload(name: string, size: number, type?: string): UploadValidationResult {
  const lower = name.toLowerCase();
  const match = ALLOWED_UPLOADS.find((t) => lower.endsWith(t.ext));
  if (!match) {
    return { ok: false, error: `Unsupported file type. Accepted: ${ACCEPTED_LABELS}.` };
  }
  if (size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: `File is too large (max ${formatBytes(MAX_UPLOAD_BYTES)}).` };
  }
  // MIME is a secondary hint only (drawings often report octet-stream).
  if (type && match.mimes.length && !match.mimes.includes(type) && type !== "") {
    // Do not hard-fail on MIME mismatch for extension-authoritative formats;
    // extension already matched an allowed type.
  }
  return { ok: true };
}

/** Sanitise a filename into a safe R2 object key segment. */
export function safeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "file";
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  return `${base}-${Date.now().toString(36)}${ext}`;
}
