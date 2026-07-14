"use client";

import { useState } from "react";
import { FileUpload, type UploadedAttachment } from "@/components/ui/FileUpload";

/** Admin media uploads — reuses the production FileUpload → /api/upload path. */
export function MediaUploader() {
  const [uploaded, setUploaded] = useState<UploadedAttachment[]>([]);

  return (
    <div>
      <FileUpload onChange={setUploaded} />
      {uploaded.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
            Stored objects
          </h2>
          <ul className="mt-3 space-y-2">
            {uploaded.map((f) => (
              <li
                key={f.url}
                className="truncate rounded-card border border-line bg-card px-4 py-2.5 font-mono text-xs text-ink/80"
              >
                {f.url}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
