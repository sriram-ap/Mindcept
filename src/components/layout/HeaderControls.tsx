"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, useLocale, type LocaleId } from "@/i18n/LocaleProvider";
import {
  THEMES,
  applyTheme,
  currentTheme,
  type ThemeId,
} from "@/components/theme/ThemeSwitcher";

/* ── Cities (global coverage; selection persists and will drive listing
      filters when live inventory lands) ─────────────────────────────── */
export const CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Bengaluru",
  "Pune",
  "Mumbai",
  "Hyderabad",
  "Delhi NCR",
  "Ahmedabad",
  "Nagpur",
  "Indore",
  "Chennai",
  "Kolkata",
] as const;

export type City = (typeof CITIES)[number];

export function getStoredCity(): City | null {
  try {
    const c = localStorage.getItem("mc-city") as City | null;
    if (c && (CITIES as readonly string[]).includes(c)) return c;
  } catch {
    /* private mode */
  }
  return null; // no stored choice yet — caller runs live detection
}

/** Match an edge-geo result to one of our markets (case/spelling-tolerant). */
function matchCity(
  city?: string,
  region?: string,
  country?: string,
): City | null {
  const norm = (s?: string) => (s ?? "").trim().toLowerCase();
  const c = norm(city)
    .replace("bangalore", "bengaluru")
    .replace("gurgaon", "delhi ncr")
    .replace("gurugram", "delhi ncr")
    .replace("noida", "delhi ncr")
    .replace("new delhi", "delhi ncr");
  const direct = CITIES.find((m) => m.toLowerCase() === c);
  if (direct) return direct;
  // UAE → nearest listed emirate, else Dubai
  if (["ae", "are", "united arab emirates"].includes(norm(country))) {
    const emirate = CITIES.find(
      (m) => m.toLowerCase() === norm(region) && m !== "Dubai",
    );
    return emirate ?? "Dubai";
  }
  return null;
}

/**
 * Live location detection via the same-origin /api/geo endpoint (reads the
 * host's edge geo headers — no third-party call, no permission prompt, no
 * console noise). Resolves to a listed market or null. Runs once, only when
 * the visitor has not already chosen a city.
 */
async function detectCity(): Promise<City | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch("/api/geo", { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const d = (await res.json()) as {
      city?: string;
      region?: string;
      country?: string;
    };
    return matchCity(d.city, d.region, d.country);
  } catch {
    return null; // blocked / timeout → keep the fallback
  }
}

/* ── Generic compact dropdown for the glass header ───────────────────── */
function HeaderSelect<T extends string>({
  label,
  value,
  options,
  display,
  onSelect,
  wide = false,
}: {
  label: string;
  value: T;
  options: readonly { id: T; name: string }[];
  display: string;
  onSelect: (v: T) => void;
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
      >
        {display}
        <span aria-hidden="true" className="text-[9px] opacity-70">
          ▾
        </span>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={label}
          className={`absolute end-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-line bg-card py-1.5 shadow-[0_18px_50px_-18px_rgba(10,10,10,0.45)] ${
            wide ? "w-48" : "w-40"
          }`}
        >
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                role="option"
                aria-selected={o.id === value}
                onClick={() => {
                  onSelect(o.id);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-start text-sm transition-colors ${
                  o.id === value
                    ? "font-semibold text-ember-deep"
                    : "text-ink/80 hover:bg-tint hover:text-ink"
                }`}
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ── City — auto-detected city shown first, with a location pin ───────── */
export function CitySelect() {
  const [city, setCity] = useState<City>("Bengaluru");

  useEffect(() => {
    const stored = getStoredCity();
    if (stored) {
      setCity(stored);
      return; // respect an explicit prior choice; never re-detect
    }
    let cancelled = false;
    detectCity().then((detected) => {
      if (cancelled || !detected) return; // detection failed → keep Bengaluru
      setCity(detected);
      try {
        localStorage.setItem("mc-city", detected);
      } catch {
        /* private mode */
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HeaderSelect
      label="City"
      value={city}
      display={`\u{1F4CD} ${city}`}
      wide
      options={CITIES.map((c) => ({ id: c, name: c }))}
      onSelect={(c) => {
        setCity(c);
        try {
          localStorage.setItem("mc-city", c);
        } catch {
          /* private mode */
        }
      }}
    />
  );
}

/* ── Language ─────────────────────────────────────────────────────────── */
export function LanguageSelect() {
  const { locale, setLocale } = useLocale();
  const active = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  return (
    <HeaderSelect<LocaleId>
      label="Language"
      value={locale}
      display={active.label}
      options={LOCALES.map((l) => ({ id: l.id, name: l.name }))}
      onSelect={setLocale}
    />
  );
}

/* ── Theme ────────────────────────────────────────────────────────────── */
export function ThemeSelect() {
  const [theme, setTheme] = useState<ThemeId>("executive");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <HeaderSelect<ThemeId>
      label="Theme"
      value={theme}
      display={active.label}
      options={THEMES.map((t) => ({ id: t.id, name: t.label }))}
      onSelect={(t) => {
        setTheme(t);
        applyTheme(t);
      }}
    />
  );
}
