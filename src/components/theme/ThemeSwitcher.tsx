"use client";

import { useEffect, useState } from "react";

/**
 * Public theme registry — generic names only; internal project names are
 * never exposed. Values are CSS-variable sets in globals.css.
 */
export const THEMES = [
  { id: "executive", label: "Executive" },
  { id: "corporate", label: "Corporate" },
  { id: "brightday", label: "Signature" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export function applyTheme(theme: ThemeId) {
  if (theme === "executive") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
  try {
    localStorage.setItem("mc-theme", theme);
  } catch {
    /* private mode — theme simply won't persist */
  }
}

export function currentTheme(): ThemeId {
  const t = document.documentElement.dataset.theme;
  return t === "corporate" || t === "brightday" ? t : "executive";
}

/**
 * Segmented theme control (light surfaces — admin settings). The public
 * header uses the compact ThemeSelect dropdown in HeaderControls instead.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("executive");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex items-center rounded-full border border-line p-0.5"
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          onClick={() => {
            setTheme(t.id);
            applyTheme(t.id);
          }}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            theme === t.id
              ? "bg-ember text-on-accent"
              : "text-muted hover:text-ink"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
