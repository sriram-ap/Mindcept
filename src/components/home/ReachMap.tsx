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
        {/* Map */}
        <div className="lg:sticky lg:top-24">
          <svg
            viewBox="0 0 100 104"
            aria-hidden="true"
            className="mx-auto w-full max-w-sm"
          >
            <defs>
              <linearGradient id="reach-fill" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0" stopColor="var(--color-jewel)" stopOpacity="0.14" />
                <stop offset="1" stopColor="var(--color-jewel)" stopOpacity="0.05" />
              </linearGradient>
              <filter id="reach-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.7" floodColor="var(--color-jewel)" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* India silhouette — smooth curved outline (premium, no dots) */}
            <path
              d="M37 2 C41 2 44 4 44 8 C44 11 47 13 50 15
                 C54 17 58 19 62 22 C64 24 65 26 68 26
                 C72 26 76 24 80 26 C83 27 84 30 83 34
                 C82 38 78 40 74 40 C72 39 71 37 69 36
                 C67 36 66 40 65 44 C64 48 63 51 60 55
                 C56 61 53 66 50 72 C47 79 45 85 42 92
                 C40 96 39 98 37 95 C35 90 33 84 31 78
                 C29 71 27 64 25 58 C24 54 23 51 20 49
                 C16 47 11 46 9 42 C8 39 11 37 14 37
                 C17 37 19 38 21 36 C23 34 23 30 24 27
                 C26 21 29 14 32 8 C33 5 34 3 37 2 Z"
              fill="url(#reach-fill)"
              stroke="var(--color-jewel)"
              strokeOpacity="0.4"
              strokeWidth="0.6"
              strokeLinejoin="round"
              filter="url(#reach-shadow)"
            />

            {/* Markers */}
            {india.map((loc) => {
              const isActive = active === loc.slug;
              const isHQ = loc.kind === "office";
              const color = isActive || isHQ ? "var(--color-ember)" : "var(--color-jewel)";
              return (
                <g key={loc.slug}>
                  {isActive ? (
                    <circle
                      cx={loc.map.x}
                      cy={loc.map.y}
                      r={1.6}
                      fill="none"
                      stroke="var(--color-ember)"
                      strokeWidth="0.5"
                      className="reach-pulse"
                    />
                  ) : null}
                  <circle
                    cx={loc.map.x}
                    cy={loc.map.y}
                    r={isActive ? 2.7 : 2}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    strokeOpacity={isActive ? 1 : 0.55}
                    style={{ transition: "r .2s, stroke-opacity .2s" }}
                  />
                  <circle
                    cx={loc.map.x}
                    cy={loc.map.y}
                    r={isActive ? 1.15 : 0.9}
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
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-ember bg-ember" />
              Headquarters
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-jewel/60 bg-jewel" />
              Operating market
            </span>
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
