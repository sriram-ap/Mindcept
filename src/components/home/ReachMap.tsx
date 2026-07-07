"use client";

import { useState } from "react";
import type { OfficeLocation } from "@/types/content";
import { ZONE_ORDER, futureMarkets } from "@/content/locations";

/**
 * "Our Reach" — a premium, corporate map + grouped city directory.
 *
 * The SVG map is decorative reinforcement (aria-hidden); the grouped,
 * keyboard-operable city cards are the accessible source of truth. Hovering
 * or focusing a card highlights its map marker and vice-versa (shared
 * `active` state). Renders fully without JS (all cards are in the SSR HTML).
 */
export function ReachMap({ locations }: { locations: OfficeLocation[] }) {
  const [active, setActive] = useState<string | null>(null);
  const india = locations.filter((l) => l.region === "India");
  const international = locations.filter((l) => l.region !== "India");
  const activeLoc = india.find((l) => l.slug === active) ?? null;

  const bind = (slug: string) => ({
    onMouseEnter: () => setActive(slug),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(slug),
    onBlur: () => setActive(null),
  });

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {/* ── Map ── */}
      <div className="lg:sticky lg:top-24">
        <svg
          viewBox="0 0 100 108"
          aria-hidden="true"
          className="mx-auto w-full max-w-sm"
        >
          <defs>
            <linearGradient id="reach-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-jewel)" stopOpacity="0.10" />
              <stop offset="1" stopColor="var(--color-jewel)" stopOpacity="0.04" />
            </linearGradient>
            <filter id="reach-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.6" stdDeviation="0.8" floodColor="var(--color-jewel)" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* India silhouette — clean tonal fill, no infographic dots */}
          <path
            d="M37 1 L45 6 L44 12 L50 17 L57 21 L63 24 L66 27
               L71 27 L77 25 L82 28 L84 33 L81 39 L75 41 L71 36 L68 34
               L66 38 L65 44 L64 48 L59 54 L53 62 L49 69 L47 78
               L43 88 L39 97 L35 88 L31 77 L28 66 L25 58 L24 52
               L20 48 L13 45 L9 41 L15 38 L12 35 L18 34 L21 32
               L23 26 L27 18 L31 10 L33 5 Z"
            fill="url(#reach-fill)"
            stroke="var(--color-jewel)"
            strokeOpacity="0.35"
            strokeWidth="0.5"
            strokeLinejoin="round"
            filter="url(#reach-shadow)"
          />

          {/* Markers */}
          {india.map((loc) => {
            const isActive = active === loc.slug;
            const isHQ = loc.kind === "office";
            const ring = isActive ? 2.7 : 2;
            const dot = isActive ? 1.15 : 0.9;
            const color = isActive || isHQ ? "var(--color-ember)" : "var(--color-jewel)";
            return (
              <g key={loc.slug} style={{ transition: "opacity .2s" }}>
                <circle
                  cx={loc.map.x}
                  cy={loc.map.y}
                  r={ring}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  strokeOpacity={isActive ? 1 : 0.55}
                  style={{ transition: "r .2s, stroke-opacity .2s" }}
                />
                <circle
                  cx={loc.map.x}
                  cy={loc.map.y}
                  r={dot}
                  fill={color}
                  style={{ transition: "r .2s" }}
                />
              </g>
            );
          })}

          {/* Active-city label pill */}
          {activeLoc ? (
            <g style={{ pointerEvents: "none" }}>
              {(() => {
                const left = activeLoc.map.x > 55;
                const px = left ? activeLoc.map.x - 3.4 : activeLoc.map.x + 3.4;
                const py = activeLoc.map.y;
                const w = Math.max(activeLoc.city.length * 1.5 + 3, 10);
                const rx = left ? px - w : px;
                return (
                  <>
                    <rect
                      x={rx}
                      y={py - 2.4}
                      width={w}
                      height={4.8}
                      rx={1.2}
                      fill="var(--color-ink)"
                    />
                    <text
                      x={left ? px - w / 2 : px + w / 2}
                      y={py + 0.7}
                      textAnchor="middle"
                      fill="#fff"
                      className="font-sans"
                      style={{ fontSize: "2.5px", fontWeight: 600 }}
                    >
                      {activeLoc.city}
                    </text>
                  </>
                );
              })()}
            </g>
          ) : null}
        </svg>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-ember bg-ember" />
            Headquarters
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-jewel/60 bg-jewel" />
            Operating market
          </span>
        </div>
      </div>

      {/* ── Grouped directory ── */}
      <div className="space-y-8">
        {ZONE_ORDER.map((zone) => {
          const cities = india.filter((l) => l.zone === zone);
          if (cities.length === 0) return null;
          return (
            <div key={zone}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
                {zone}
                <span className="ml-2 font-normal text-muted">
                  {cities.length}
                </span>
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cities.map((loc) => (
                  <li key={loc.slug}>
                    <button
                      type="button"
                      {...bind(loc.slug)}
                      className={`h-full w-full rounded-card border p-4 text-left transition-colors ${
                        active === loc.slug
                          ? "border-ember bg-ember/5"
                          : "border-line bg-white hover:border-ember/50"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-ink">
                          {loc.city}
                        </span>
                        {loc.kind === "office" ? (
                          <span className="rounded-full bg-ember px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
                            HQ
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-xs font-medium text-jewel">
                        {loc.focus}
                      </span>
                      <span className="mt-2.5 flex flex-wrap gap-1.5">
                        {loc.markets.map((m) => (
                          <span
                            key={m}
                            className="rounded-full bg-jewel/10 px-2 py-0.5 text-[10px] font-medium text-jewel"
                          >
                            {m}
                          </span>
                        ))}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {/* International presence */}
        {international.length > 0 ? (
          <div className="border-t border-line pt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
              International Presence
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {international.map((loc) => (
                <li key={loc.slug}>
                  <div className="h-full rounded-card border border-line bg-[#faf7f0] p-4">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-ink">
                        {loc.city}
                      </span>
                      {loc.status === "opening-soon" ? (
                        <span className="rounded-full bg-ember px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">
                          Opening soon
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-jewel">
                      {loc.focus}
                    </span>
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {loc.markets.map((m) => (
                        <span
                          key={m}
                          className="rounded-full bg-jewel/10 px-2 py-0.5 text-[10px] font-medium text-jewel"
                        >
                          {m}
                        </span>
                      ))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              Future markets under evaluation:{" "}
              <span className="font-medium text-ink">
                {futureMarkets.join(" · ")}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
