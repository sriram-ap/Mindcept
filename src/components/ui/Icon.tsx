import type { IconName } from "@/types/content";

/** Line-icon set from the design prototype, rendered as inline SVG. */
const PATHS: Record<IconName, string> = {
  factory:
    '<path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z" stroke-linejoin="round" stroke-linecap="round"/><path d="M3 21h18" stroke-linecap="round"/>',
  warehouse:
    '<path d="M3 21V9l9-5 9 5v12" stroke-linejoin="round" stroke-linecap="round"/><path d="M7 21v-7h10v7M7 14h10" stroke-linecap="round" stroke-linejoin="round"/>',
  land: '<path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.4"/>',
  building:
    '<path d="M5 21V4h9v17M14 21h5V9h-5" stroke-linejoin="round" stroke-linecap="round"/><path d="M8 8h3M8 12h3M8 16h3" stroke-linecap="round"/>',
  home: '<path d="M4 11l8-7 8 7" stroke-linejoin="round" stroke-linecap="round"/><path d="M6 10v10h12V10" stroke-linejoin="round" stroke-linecap="round"/><path d="M10 20v-5h4v5" stroke-linejoin="round"/>',
  retail:
    '<path d="M4 9l1.4-4h13.2L20 9M4 9h16v11H4zM4 9a3 3 0 006 0 3 3 0 006 0 3 3 0 004 0" stroke-linejoin="round" stroke-linecap="round"/>',
  server:
    '<rect x="4" y="4" width="16" height="7" rx="1.5"/><rect x="4" y="13" width="16" height="7" rx="1.5"/><path d="M8 7.5h.01M8 16.5h.01" stroke-linecap="round" stroke-width="2.5"/>',
  gavel:
    '<path d="M14 4l6 6-3 3-6-6 3-3zM11 7l-7 7 3 3 7-7M5 21h8" stroke-linejoin="round" stroke-linecap="round"/>',
  chart:
    '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" stroke-linecap="round" stroke-linejoin="round"/>',
  blueprint:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M9 13h6v4" stroke-linejoin="round"/>',
  shield:
    '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>',
  data: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke-linecap="round"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke-linecap="round"/>',
  star: '<path d="M12 3l2.5 6.5L21 11l-5 4.5L17 22l-5-3-5 3 1-6.5L3 11l6.5-1.5L12 3z" stroke-linejoin="round"/>',
  search:
    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/>',
  handshake:
    '<path d="M8 11l3-3 3 3 3-2 3 3v4l-4 3-2-2-3 2-3-2-4-3v-4l4-2 0 0" stroke-linejoin="round" stroke-linecap="round"/>',
  needs:
    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/><path d="M11 8v3l2 2" stroke-linecap="round"/>',
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
