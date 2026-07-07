"use client";

import { useState } from "react";
import type { OfficeLocation } from "@/types/content";

/**
 * Interactive "Our Reach" India map. Stylised halftone silhouette with
 * pinned cities; hovering/focusing a pin or a list entry highlights both.
 * The city list is the accessible source of truth — the map is decorative
 * reinforcement (aria-hidden), so screen readers get a clean list.
 */
export function IndiaMap({ locations }: { locations: OfficeLocation[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      {/* Map */}
      <svg
        viewBox="0 0 100 104"
        aria-hidden="true"
        className="mx-auto w-full max-w-md"
      >
        <defs>
          <pattern id="halftone" width="1.6" height="1.6" patternUnits="userSpaceOnUse">
            <circle cx="0.8" cy="0.8" r="0.34" className="fill-jewel/50" />
          </pattern>
        </defs>
        {/* Simplified India silhouette */}
        <path
          d="M37 1 L45 6 L44 12 L50 17 L57 21 L63 24 L66 27
             L71 27 L77 25 L82 28 L84 33 L81 39 L75 41 L71 36 L68 34
             L66 38 L65 44 L64 48 L59 54 L53 62 L49 69 L47 78
             L43 88 L39 97 L35 88 L31 77 L28 66 L25 58 L24 52
             L20 48 L13 45 L9 41 L15 38 L12 35 L18 34 L21 32
             L23 26 L27 18 L31 10 L33 5 Z"
          fill="url(#halftone)"
          className="stroke-jewel/30"
          strokeWidth="0.4"
        />
        {locations.map((loc) => {
          const isActive = active === loc.slug;
          const labelLeft = loc.map.x < 40;
          return (
            <g
              key={loc.slug}
              onMouseEnter={() => setActive(loc.slug)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
            >
              {/* pin */}
              <circle
                cx={loc.map.x}
                cy={loc.map.y}
                r={isActive ? 2.1 : 1.5}
                className={isActive ? "fill-ember" : "fill-jewel"}
                style={{ transition: "r .2s" }}
              />
              <circle cx={loc.map.x} cy={loc.map.y} r="0.55" className="fill-white" />
              {/* leader + label */}
              <text
                x={labelLeft ? loc.map.x - 3 : loc.map.x + 3}
                y={loc.map.y + 1}
                textAnchor={labelLeft ? "end" : "start"}
                className={`font-sans text-[2.6px] font-semibold uppercase tracking-wide ${
                  isActive ? "fill-ember-deep" : "fill-ink/70"
                }`}
              >
                {loc.city}
              </text>
              {/* generous hit area */}
              <circle cx={loc.map.x} cy={loc.map.y} r="4" fill="transparent" />
            </g>
          );
        })}
      </svg>

      {/* Accessible city list */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {locations.map((loc) => (
          <li key={loc.slug}>
            <button
              type="button"
              onMouseEnter={() => setActive(loc.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(loc.slug)}
              onBlur={() => setActive(null)}
              className={`w-full rounded-card border p-4 text-left transition-colors ${
                active === loc.slug
                  ? "border-ember bg-ember/5"
                  : "border-line bg-white hover:border-ember/50"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-ink">
                  {loc.city}
                </span>
                <span className="rounded-full bg-jewel/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-jewel">
                  {loc.kind === "office" ? "Office" : "Operations"}
                </span>
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">
                {loc.blurb}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
