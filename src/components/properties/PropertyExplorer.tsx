"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Property } from "@/types/content";
import { formatNumber } from "@/lib/format";

/**
 * Client-side property explorer — search + category + city filtering over the
 * combined set (MindCept advisory listings + representative market assets).
 *
 * Representative assets are third-party developments shown to illustrate the
 * asset classes MindCept advises on; each is clearly labelled and links to the
 * official developer website. Nothing here implies MindCept ownership.
 *
 * Presentation only: reads the already-fetched `properties` array (server
 * component owns data access) and filters in the browser. No routing, API or
 * data-model changes.
 */
export function PropertyExplorer({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All");
  const [city, setCity] = useState<string>("All");

  const types = useMemo(
    () => ["All", ...Array.from(new Set(properties.map((p) => p.propertyType)))],
    [properties],
  );
  const cities = useMemo(
    () => ["All", ...Array.from(new Set(properties.map((p) => p.city))).sort()],
    [properties],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      if (type !== "All" && p.propertyType !== type) return false;
      if (city !== "All" && p.city !== city) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.developer,
        p.assetClass,
        p.city,
        p.state,
        p.propertyType,
        p.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [properties, query, type, city]);

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-ember bg-ember text-on-accent"
        : "border-line bg-card text-muted hover:border-ember/50 hover:text-ink"
    }`;

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="rounded-2xl border border-line bg-tint p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor="property-search" className="sr-only">
              Search properties
            </label>
            <div className="relative flex-1">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-muted"
              >
                {/* search glyph */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="property-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, developer, city or asset class…"
                className="w-full rounded-full border border-line bg-card py-3 ps-11 pe-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ember"
              />
            </div>
            <div className="sm:w-56">
              <label htmlFor="city-filter" className="sr-only">
                Filter by city
              </label>
              <select
                id="city-filter"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-full border border-line bg-card px-4 py-3 text-sm font-medium text-ink outline-none transition-colors focus:border-ember"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All cities" : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by asset class">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={chip(type === t)}
              >
                {t === "All" ? "All asset classes" : t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results count ── */}
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        {type !== "All" ? ` · ${type}` : ""}
        {city !== "All" ? ` · ${city}` : ""}
      </p>

      {/* ── Grid ── */}
      <h2 className="sr-only">Property listings</h2>
      {filtered.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-line bg-card px-6 py-12 text-center text-sm text-muted">
          No properties match these filters.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setType("All");
              setCity("All");
            }}
            className="font-semibold text-jewel underline"
          >
            Clear filters
          </button>
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <article
              key={property.slug}
              className="lux-card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
            >
              {property.images[0] ? (
                <Link
                  href={`/property/${property.slug}`}
                  className="lux-media relative block"
                  aria-label={`${property.title}, ${property.propertyType}${
                    property.representative ? ", representative market asset" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static/R2 assets */}
                  <img
                    src={property.images[0]}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute start-4 top-4 rounded-full bg-contrast/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur"
                  >
                    {property.propertyType}
                  </span>
                  {property.representative ? (
                    <span
                      aria-hidden="true"
                      className="absolute end-4 top-4 rounded-full border border-ember/60 bg-ember/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ember-bright backdrop-blur"
                    >
                      Market portfolio
                    </span>
                  ) : null}
                </Link>
              ) : null}

              <div className="flex flex-1 flex-col p-6">
                <Link href={`/property/${property.slug}`} className="block">
                  <h3 className="font-serif text-xl font-medium leading-snug text-ink transition-colors group-hover:text-ember-deep">
                    {property.title}
                  </h3>
                </Link>

                {property.representative && property.developer ? (
                  <p className="mt-1.5 text-xs font-medium text-jewel">
                    {property.developer}
                  </p>
                ) : null}

                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
                  {property.city}
                  {property.state && property.state !== property.city
                    ? `, ${property.state}`
                    : ""}
                </p>

                <p className="mt-4 flex-1 text-sm font-semibold text-ink">
                  {property.representative
                    ? (property.assetClass ?? property.propertyType)
                    : property.areaSqft > 0
                      ? `${formatNumber(property.areaSqft)} sq ft`
                      : (property.configuration ?? "On request")}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <Link
                    href={`/property/${property.slug}`}
                    className="text-sm font-semibold text-ember-deep transition-transform group-hover:translate-x-0.5"
                  >
                    View details →
                  </Link>
                  {property.representative && property.officialWebsite ? (
                    <a
                      href={property.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ember"
                    >
                      Official website ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
