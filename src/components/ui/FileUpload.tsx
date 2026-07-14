"use client";

import { useId, useRef, useState } from "react";
import {
  ACCEPT_ATTR,
  ACCEPTED_LABELS,
  formatBytes,
  MAX_UPLOAD_BYTES,
  validateUpload,
} from "@/lib/uploads";

export interface UploadedAttachment {
  url: string;
  name: string;
  size: number;
}

interface UploadItem {
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
}

/**
 * Accessible file-upload field: click or drag to add documents/drawings,
 * client-side validation, per-file progress, and a removable list. Emits the
 * R2 URLs of successfully uploaded files via onChange (bytes never touch the
 * form payload — only URLs are submitted).
 */
export function FileUpload({
  onChange,
  labelClassName = "block text-xs font-medium text-muted",
  tone = "light",
}: {
  onChange: (attachments: UploadedAttachment[]) => void;
  labelClassName?: string;
  tone?: "light" | "dark";
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const emit = (next: UploadItem[]) => {
    onChange(
      next
        .filter((i) => i.status === "done" && i.url)
        .map((i) => ({ url: i.url!, name: i.name, size: i.size })),
    );
  };

  const uploadOne = (file: File, index: number) => {
    const xhr = new XMLHttpRequest();
    const body = new FormData();
    body.append("file", file);
    xhr.open("POST", "/api/upload");
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const progress = Math.round((e.loaded / e.total) * 100);
      setItems((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], progress };
        return next;
      });
    };
    xhr.onload = () => {
      setItems((prev) => {
        const next = [...prev];
        if (!next[index]) return prev;
        if (xhr.status >= 200 && xhr.status < 300) {
          const res = JSON.parse(xhr.responseText) as { url: string };
          next[index] = { ...next[index], status: "done", progress: 100, url: res.url };
        } else {
          let msg = "Upload failed";
          try {
            msg = (JSON.parse(xhr.responseText) as { error?: string }).error ?? msg;
          } catch {
            /* keep default */
          }
          next[index] = { ...next[index], status: "error", error: msg };
        }
        emit(next);
        return next;
      });
    };
    xhr.onerror = () => {
      setItems((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], status: "error", error: "Network error" };
        return next;
      });
    };
    xhr.send(body);
  };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      const check = validateUpload(file.name, file.size, file.type);
      setItems((prev) => {
        const index = prev.length;
        const item: UploadItem = check.ok
          ? { name: file.name, size: file.size, progress: 0, status: "uploading" }
          : { name: file.name, size: file.size, progress: 0, status: "error", error: check.error };
        const next = [...prev, item];
        if (check.ok) queueMicrotask(() => uploadOne(file, index));
        return next;
      });
    }
  };

  const remove = (index: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      emit(next);
      return next;
    });
  };

  const dark = tone === "dark";
  const dropBase = dark
    ? "border-white/25 bg-white/5 text-white/70 hover:border-ember"
    : "border-line bg-card text-muted hover:border-ember";

  return (
    <div>
      <label htmlFor={inputId} className={labelClassName}>
        Attach documents{" "}
        <span className={dark ? "text-white/40" : "text-muted"}>(optional)</span>
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mt-1 rounded-lg border border-dashed p-4 transition-colors ${dropBase} ${
          dragOver ? "border-ember bg-ember/5" : ""
        }`}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 text-sm font-medium"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
            <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Click to upload or drag &amp; drop
        </button>
        <p className={`mt-1 text-center text-[11px] ${dark ? "text-white/40" : "text-muted"}`}>
          {ACCEPTED_LABELS} · up to {formatBytes(MAX_UPLOAD_BYTES)}
        </p>
      </div>

      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              className={`rounded-lg border p-2.5 text-xs ${
                dark ? "border-white/15 bg-white/5 text-white/80" : "border-line bg-card text-ink"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                <span className={dark ? "text-white/40" : "text-muted"}>
                  {formatBytes(item.size)}
                </span>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label={`Remove ${item.name}`}
                  className="text-muted hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              {item.status === "uploading" ? (
                <div className={`mt-1.5 h-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-line"}`}>
                  <div
                    className="h-full bg-ember transition-all"
                    style={{ width: `${item.progress}%` }}
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Uploading ${item.name}`}
                  />
                </div>
              ) : null}
              {item.status === "done" ? (
                <p className="mt-1 text-[11px] font-medium text-jewel">✓ Uploaded</p>
              ) : null}
              {item.status === "error" ? (
                <p className="mt-1 text-[11px] font-medium text-red-500">{item.error}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
