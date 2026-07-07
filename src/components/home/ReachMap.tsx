"use client";

import { useState } from "react";
import type { OfficeLocation } from "@/types/content";
import { ZONE_ORDER, futureMarkets } from "@/content/locations";
import { corridors, regionalCapabilities } from "@/content/corridors";

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
    "rounded-full bg-jewel/10 px-2 py-0.5 text-[10px] font-medium text-jewel";

  return (
    <div>
      {/* ── Map + city directory ── */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Map — premium engraved-glass card */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line/70 bg-[#F6F6F3] p-6 shadow-[0_16px_48px_-24px_rgba(20,64,58,0.28)] sm:p-8">
            <svg
              viewBox="0 0 100 112"
              aria-hidden="true"
              className="mx-auto w-full max-w-sm"
            >
              <defs>
                {/* Soft grey-green landmass — near-flat, engraved feel */}
                <linearGradient id="reach-land" x1="0" y1="0" x2="0.25" y2="1">
                  <stop offset="0" stopColor="#E7ECE8" />
                  <stop offset="1" stopColor="#D6DED9" />
                </linearGradient>
                <filter id="reach-emboss" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#14403A" floodOpacity="0.14" />
                </filter>
                <filter id="reach-mark" x="-60%" y="-60%" width="220%" height="220%">
                  <feDropShadow dx="0" dy="0.3" stdDeviation="0.35" floodColor="#0E0E10" floodOpacity="0.35" />
                </filter>
                <clipPath id="reach-clip">
                  <path d="M39 7 C42 6 45 8 49 9 C54 10 59 12 63 15 C66 17 68 19 70 20 C72 20 73 22 75 22 C79 22 84 25 86 29 C88 31 86 34 83 35 C80 36 78 34 76 35 C74 36 73 38 71 39 C72 41 70 43 68 43 C66 44 65 46 64 48 C62 50 61 52 60 54 C58 58 57 62 56 66 C54 71 53 76 51 81 C49 87 47 92 45 97 C43 102 41 106 39 109 C38 110 37 110 36 108 C35 103 34 98 33 93 C32 87 31 81 30 75 C29 70 28 65 27 60 C26 57 25 56 24 55 C23 55 22 56 21 57 C20 55 19 53 18 52 C16 51 14 52 13 54 C11 55 10 53 11 51 C12 49 15 49 17 48 C15 47 12 47 11 45 C9 43 11 41 14 41 C17 41 19 42 22 41 C24 40 24 37 25 34 C26 30 28 25 30 21 C32 16 34 11 37 8 C38 7 38 7 39 7 Z" />
                </clipPath>
              </defs>

              {/* India silhouette — recognizable, curved, annual-report style */}
              <path
                d="M39 7 C42 6 45 8 49 9 C54 10 59 12 63 15 C66 17 68 19 70 20 C72 20 73 22 75 22 C79 22 84 25 86 29 C88 31 86 34 83 35 C80 36 78 34 76 35 C74 36 73 38 71 39 C72 41 70 43 68 43 C66 44 65 46 64 48 C62 50 61 52 60 54 C58 58 57 62 56 66 C54 71 53 76 51 81 C49 87 47 92 45 97 C43 102 41 106 39 109 C38 110 37 110 36 108 C35 103 34 98 33 93 C32 87 31 81 30 75 C29 70 28 65 27 60 C26 57 25 56 24 55 C23 55 22 56 21 57 C20 55 19 53 18 52 C16 51 14 52 13 54 C11 55 10 53 11 51 C12 49 15 49 17 48 C15 47 12 47 11 45 C9 43 11 41 14 41 C17 41 19 42 22 41 C24 40 24 37 25 34 C26 30 28 25 30 21 C32 16 34 11 37 8 C38 7 38 7 39 7 Z"
                fill="url(#reach-land)"
                stroke="#6E7B77"
                strokeOpacity="0.7"
                strokeWidth="0.6"
                strokeLinejoin="round"
                filter="url(#reach-emboss)"
              />

              {/* Faint internal contour lines (<8% opacity) — subtle elevation */}
              <g clipPath="url(#reach-clip)" stroke="#14403A" strokeOpacity="0.06" strokeWidth="0.4" fill="none">
                <path d="M8 44 C28 38 60 40 92 34" />
                <path d="M12 66 C34 60 56 64 84 58" />
                <path d="M20 88 C34 84 46 86 60 82" />
              </g>

              {/* Markers */}
              {india.map((loc) => {
                const isActive = active === loc.slug;
                const isHQ = loc.kind === "office";
                const fill = isActive || isHQ ? "var(--color-ember)" : "var(--color-jewel)";
                return (
                  <g key={loc.slug} className="reach-marker">
                    {isActive ? (
                      <>
                        <circle cx={loc.map.x} cy={loc.map.y} r={3.6} fill="var(--color-ember)" opacity={0.16} />
                        <circle
                          cx={loc.map.x}
                          cy={loc.map.y}
                          r={1.9}
                          fill="none"
                          stroke="var(--color-ember)"
                          strokeWidth="0.5"
                          className="reach-pulse"
                        />
                      </>
                    ) : null}
                    <circle
                      cx={loc.map.x}
                      cy={loc.map.y}
                      r={isActive ? 2.5 : 1.9}
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
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted">
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
          [regionalCapabilities.length, "Regions covered"],
          [corridors.length, "Industrial corridors"],
          [international.length, "International office"],
        ].map(([value, label]) => (
          <div key={label as string} className="flex flex-col">
            <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-muted">
              {label}
            </dt>
            <dd className="font-display text-3xl font-semibold text-ink">
              {value}
              <span className="text-ember">+</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* ── Regional capability cards ── */}
      <div className="mt-14">
        <h3 className="font-display text-xl font-semibold text-ink">
          Regional capability
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {regionalCapabilities.map((region) => (
            <div
              key={region.zone}
              className="card-lift flex flex-col rounded-card border border-line bg-white p-6"
            >
              <h4 className="font-display text-base font-semibold text-ink">
                {region.zone}
              </h4>
              <p className="mt-1 text-xs text-muted">{region.cities}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ember-deep">
                Primary industries
              </p>
              <p className="mt-1.5 text-sm text-ink/80">
                {region.industries.join(" · ")}
              </p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-ember-deep">
                Capabilities
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {region.capabilities.map((c) => (
                  <span key={c} className={chip}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted">
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
