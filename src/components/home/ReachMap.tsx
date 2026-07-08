"use client";

import { useState } from "react";
import type { OfficeLocation } from "@/types/content";
import { ZONE_ORDER, futureMarkets } from "@/content/locations";
import { corridors } from "@/content/corridors";

/**
 * "Our Reach" — a premium industrial-coverage experience.
 *
 * Layout: India map + zone-grouped city directory (shared hover/focus
 * highlight) → coverage summary → regional capability cards → industrial
 * corridors. The SVG map is decorative (aria-hidden); the keyboard-operable
 * city cards are the accessible source of truth. Renders fully without JS.
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

  const chip =
    "rounded-full bg-jewel/10 px-2.5 py-0.5 text-xs font-medium text-jewel";

  return (
    <div>
      {/* ── Map + city directory ── */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Map — premium engraved-glass card */}
        <div className="lg:sticky lg:top-24">
          <div className="flex flex-col items-center rounded-2xl border border-line/70 bg-white p-6 shadow-[0_10px_40px_-28px_rgba(20,64,58,0.22)] sm:p-8">
            <svg
              viewBox="0 0 100 101"
              aria-hidden="true"
              className="mx-auto w-full max-w-[32rem]"
            >
              <defs>
                {/* Soft grey-green landmass — near-flat, engraved feel */}
                <linearGradient id="reach-land" x1="0" y1="0" x2="0.25" y2="1">
                  <stop offset="0" stopColor="#E7ECE8" />
                  <stop offset="1" stopColor="#D6DED9" />
                </linearGradient>
                {/* Soft radial highlight behind India */}
                <radialGradient id="reach-glow" cx="0.42" cy="0.5" r="0.62">
                  <stop offset="0" stopColor="#14403A" stopOpacity="0.09" />
                  <stop offset="0.6" stopColor="#14403A" stopOpacity="0.03" />
                  <stop offset="1" stopColor="#14403A" stopOpacity="0" />
                </radialGradient>
                <filter id="reach-emboss" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#14403A" floodOpacity="0.14" />
                </filter>
                <filter id="reach-mark" x="-60%" y="-60%" width="220%" height="220%">
                  <feDropShadow dx="0" dy="0.3" stdDeviation="0.35" floodColor="#0E0E10" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Soft radial highlight behind India */}
              <ellipse cx="42" cy="52" rx="52" ry="55" fill="url(#reach-glow)" />

              {/* India silhouette — real national boundary from Natural Earth
                  (1:50m, public domain), equirectangular-projected with
                  mid-latitude correction and Douglas–Peucker simplified to a
                  single ~3 KB path. Marker coordinates in content/locations.ts
                  are projected through the same transform for accuracy. */}
              <path
                d="M3.0 43.4 L4.8 43.0 L5.0 41.8 L8.3 42.3 L10.5 41.5 L11.2 42.1 L12.3 41.5 L12.3 40.5 L11.0 38.0 L11.0 37.1 L9.8 37.0 L9.2 36.3 L9.4 34.2 L7.3 33.4 L7.4 32.1 L10.2 28.9 L11.5 30.0 L14.9 29.1 L16.5 26.4 L18.3 25.4 L19.8 22.3 L21.2 21.7 L21.6 21.3 L21.5 20.6 L23.8 18.5 L23.5 18.0 L23.6 15.8 L26.1 14.4 L25.8 13.8 L24.0 13.4 L23.9 12.5 L22.9 12.5 L22.8 11.7 L21.8 11.0 L22.3 9.9 L21.7 9.2 L22.6 8.4 L21.5 7.9 L21.7 7.4 L21.1 6.9 L21.7 5.9 L22.8 5.5 L27.3 6.4 L30.2 5.6 L34.0 3.0 L34.8 3.1 L34.7 3.8 L35.7 6.1 L37.8 7.1 L37.0 8.1 L37.3 9.9 L38.4 11.1 L38.6 13.4 L37.7 13.9 L37.0 13.1 L35.9 13.3 L37.1 15.3 L37.1 17.5 L38.3 17.2 L39.5 18.6 L41.6 19.3 L41.8 20.1 L44.4 21.5 L42.4 23.0 L41.4 26.1 L42.5 26.9 L43.0 26.8 L47.1 29.5 L49.8 30.1 L49.9 30.7 L51.7 31.2 L54.3 30.8 L56.0 31.4 L56.2 32.3 L58.0 33.4 L59.1 33.0 L59.8 33.9 L60.5 33.7 L62.7 34.4 L63.7 34.0 L64.6 34.7 L66.9 34.6 L67.4 33.4 L66.9 32.0 L67.4 29.2 L68.8 28.7 L69.5 29.0 L69.3 30.7 L69.8 31.4 L69.3 31.9 L70.6 33.1 L72.6 33.5 L74.5 32.9 L75.7 33.3 L79.8 33.0 L80.1 31.5 L79.8 30.9 L78.5 30.5 L78.6 29.8 L81.6 29.4 L83.8 26.8 L85.5 26.5 L88.3 24.5 L90.7 25.4 L92.8 24.0 L93.8 24.7 L93.1 25.3 L93.1 25.8 L94.1 25.4 L94.6 26.4 L93.6 27.6 L94.6 27.4 L97.0 28.3 L97.0 29.2 L95.5 30.4 L96.2 32.1 L95.1 31.3 L93.3 31.6 L89.9 33.9 L89.9 35.8 L88.1 38.3 L88.5 39.3 L86.7 43.3 L84.1 42.7 L84.2 45.9 L83.6 46.3 L83.5 49.0 L82.7 49.9 L82.1 49.4 L81.7 49.9 L80.6 44.0 L79.6 44.0 L79.0 46.2 L78.6 46.4 L78.0 45.7 L77.6 46.0 L77.1 44.3 L77.8 42.6 L79.4 42.2 L80.1 41.5 L80.5 39.8 L81.2 39.9 L81.3 39.6 L80.0 38.8 L74.8 38.9 L72.8 38.4 L72.8 36.2 L72.3 35.2 L71.9 35.9 L71.3 35.9 L70.2 34.5 L70.0 35.1 L69.6 35.1 L68.1 34.0 L68.3 34.7 L67.2 36.3 L70.0 38.5 L68.4 38.8 L67.0 40.7 L69.2 41.9 L68.7 44.0 L69.3 45.5 L69.9 45.7 L69.7 46.2 L70.3 48.9 L70.0 50.1 L70.3 51.0 L69.7 50.7 L69.3 51.3 L69.0 49.4 L68.8 51.0 L68.4 51.2 L67.8 50.7 L67.7 51.1 L67.3 51.1 L67.6 49.4 L66.7 48.5 L67.4 49.4 L66.8 50.4 L64.0 51.6 L63.2 52.5 L63.6 54.3 L62.9 55.7 L61.7 56.8 L61.3 56.6 L61.2 57.1 L59.1 57.8 L58.9 57.2 L58.1 57.6 L57.8 58.2 L58.7 58.1 L56.5 59.8 L54.4 62.7 L48.7 66.9 L48.4 68.7 L46.8 69.5 L45.3 69.5 L44.3 71.5 L43.2 71.0 L42.1 71.7 L41.3 73.9 L42.1 79.4 L41.6 78.6 L41.3 79.0 L42.2 79.8 L41.9 82.1 L40.7 84.6 L40.1 86.9 L40.5 86.8 L40.7 87.3 L40.6 90.4 L38.9 90.6 L37.7 93.0 L38.0 93.8 L39.2 94.3 L37.8 94.0 L36.1 94.6 L35.3 95.3 L34.9 97.1 L33.1 98.1 L31.7 97.3 L30.0 95.3 L29.3 93.4 L29.0 91.7 L29.7 93.1 L29.4 91.8 L27.4 86.8 L24.8 82.6 L23.0 75.9 L21.6 73.9 L21.3 71.8 L20.8 71.7 L19.7 69.1 L18.2 61.5 L18.6 60.2 L18.5 59.7 L18.0 60.3 L17.9 60.0 L18.0 59.2 L18.5 59.3 L17.9 59.0 L17.5 57.4 L18.2 54.4 L18.0 52.9 L17.4 52.0 L17.7 51.7 L17.3 51.7 L18.9 50.7 L17.1 50.9 L17.6 49.9 L17.0 49.9 L17.1 49.3 L18.0 49.0 L15.9 48.9 L16.2 49.5 L15.5 50.4 L16.2 51.5 L15.4 52.8 L12.2 54.2 L10.5 53.9 L5.6 48.8 L5.9 48.3 L6.6 48.8 L9.5 47.8 L10.5 46.1 L10.0 46.6 L7.8 47.2 L6.5 46.9 L4.5 45.7 L3.8 44.4 L5.0 43.4 L3.2 44.3 L3.0 43.4 Z"
                fill="url(#reach-land)"
                stroke="#54635D"
                strokeOpacity="0.85"
                strokeWidth="0.5"
                strokeLinejoin="round"
                filter="url(#reach-emboss)"
              />

              {/* Markers */}
              {india.map((loc) => {
                const isActive = active === loc.slug;
                const isHQ = loc.kind === "office";
                const fill = isHQ || isActive ? "var(--color-ember)" : "var(--color-jewel)";
                const baseR = isHQ ? 2.6 : 1.9;
                const markerR = isActive ? baseR + 0.5 : baseR;
                return (
                  <g key={loc.slug} className="reach-marker">
                    {/* HQ: a quiet, static ring — no persistent animation */}
                    {isHQ ? (
                      <circle
                        cx={loc.map.x}
                        cy={loc.map.y}
                        r={4.0}
                        fill="none"
                        stroke="var(--color-ember)"
                        strokeWidth="0.4"
                        opacity={0.35}
                      />
                    ) : null}
                    {/* Pulse only on the hovered / focused city */}
                    {isActive ? (
                      <circle
                        cx={loc.map.x}
                        cy={loc.map.y}
                        r={3.4}
                        fill="none"
                        stroke="var(--color-ember)"
                        strokeWidth="0.5"
                        className="reach-pulse"
                      />
                    ) : null}
                    <circle
                      cx={loc.map.x}
                      cy={loc.map.y}
                      r={markerR}
                      fill={fill}
                      stroke="#fff"
                      strokeWidth="0.45"
                      filter="url(#reach-mark)"
                      style={{ transition: "r .2s" }}
                    />
                  </g>
                );
              })}

              {/* Active-city label pill */}
              {activeLoc ? (
                <g style={{ pointerEvents: "none" }} className="reach-label">
                  {(() => {
                    const left = activeLoc.map.x > 55;
                    const px = left ? activeLoc.map.x - 3.8 : activeLoc.map.x + 3.8;
                    const py = activeLoc.map.y;
                    const w = Math.max(activeLoc.city.length * 1.5 + 3, 10);
                    const rx = left ? px - w : px;
                    return (
                      <>
                        <rect x={rx} y={py - 2.4} width={w} height={4.8} rx={1.2} fill="var(--color-ink)" />
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-white bg-ember shadow-sm" />
                Headquarters
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-white bg-jewel shadow-sm" />
                Operating market
              </span>
            </div>
          </div>
        </div>

        {/* Grouped directory */}
        <div className="space-y-8">
          {ZONE_ORDER.map((zone) => {
            const cities = india.filter((l) => l.zone === zone);
            if (cities.length === 0) return null;
            return (
              <div key={zone}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
                  {zone}
                  <span className="ml-2 font-normal text-muted">{cities.length}</span>
                </h3>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cities.map((loc) => (
                    <li key={loc.slug}>
                      <button
                        type="button"
                        {...bind(loc.slug)}
                        className={`card-lift h-full w-full rounded-card border p-4 text-left ${
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
                            <span key={m} className={chip}>
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
                          <span key={m} className={chip}>
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
                <span className="font-medium text-ink">{futureMarkets.join(" · ")}</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Coverage summary ── */}
      <dl className="mt-16 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
        {[
          [india.length, "Operating markets"],
          [ZONE_ORDER.length, "Regions covered"],
          [corridors.length, "Industrial corridors"],
          [international.length, "International office"],
        ].map(([value, label]) => (
          <div key={label as string} className="flex flex-col">
            <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-muted">
              {label}
            </dt>
            <dd className="font-display text-3xl font-semibold text-ink">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── Industrial corridors ── */}
      <div className="mt-14">
        <h3 className="font-display text-xl font-semibold text-ink">
          Industrial corridors we advise on
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {corridors.map((corridor) => (
            <div
              key={corridor.slug}
              className="card-lift flex flex-col rounded-card border border-line bg-[#faf7f0] p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-display text-base font-semibold text-ink">
                  {corridor.name}
                </h4>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted">
                  {corridor.region}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {corridor.sectors.join(" · ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {corridor.capabilities.map((c) => (
                  <span key={c} className={chip}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
