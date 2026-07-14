"use client";

import { useState } from "react";
import type { OfficeLocation } from "@/types/content";
import { ZONE_ORDER, futureMarkets } from "@/content/locations";
import { corridors } from "@/content/corridors";
import { WorldPresence } from "@/components/home/WorldPresence";

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
        <WorldPresence indiaCount={india.length} internationalCount={international.length} />

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
                            : "border-line bg-card hover:border-ember/50"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-sm font-semibold text-ink">
                            {loc.city}
                          </span>
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
                    <div className="h-full rounded-card border border-line bg-tint p-4">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-semibold text-ink">
                          {loc.city}
                        </span>
                        {loc.status === "opening-soon" ? (
                          <span className="rounded-full bg-ember px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-accent">
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
          Industrial corridors we advise on.
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {corridors.map((corridor) => (
            <div
              key={corridor.slug}
              className="card-lift flex flex-col rounded-card border border-line bg-tint p-6"
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
