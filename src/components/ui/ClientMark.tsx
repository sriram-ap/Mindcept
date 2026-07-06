/* eslint-disable @next/next/no-img-element -- R2-hosted logos are pre-sized SVGs/PNGs */
import { assetUrl } from "@/lib/storage/r2";

/**
 * Client logo tile. Renders the real logo once an approved asset URL exists
 * (content/clients.ts `logoUrl` → R2); until then, a branded monogram — so
 * dropping in real logos requires no code change.
 */
export function ClientMark({
  name,
  logoUrl,
  className = "h-14 w-14",
}: {
  name: string;
  logoUrl?: string;
  className?: string;
}) {
  const url = assetUrl(logoUrl);
  if (url) {
    return (
      <span className={`flex items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-2 ${className}`}>
        <img src={url} alt={`${name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
      </span>
    );
  }
  const initials = name
    .replace(/\(.*\)/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-xl border border-line bg-jewel/5 font-display text-lg font-bold text-jewel ${className}`}
    >
      {initials}
    </span>
  );
}
