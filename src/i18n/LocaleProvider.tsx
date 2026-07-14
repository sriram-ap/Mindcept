"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import en from "../../messages/en.json";
import hi from "../../messages/hi.json";
import mr from "../../messages/mr.json";
import ar from "../../messages/ar.json";
import ur from "../../messages/ur.json";

/**
 * Runtime locale switching (English / Hindi / Marathi / Arabic / Urdu)
 * with no page reload and no route duplication — pages stay statically
 * prerendered and the UI chrome re-renders in the selected language.
 * RTL locales (Arabic, Urdu) mirror the whole layout via dir="rtl" on
 * <html>. Persisted as mc-locale.
 *
 * Adding a language = one JSON file in /messages plus one LOCALES entry.
 * When per-locale SEO is needed, migrate to next-intl [locale] routing —
 * the message files carry over unchanged.
 */
export const LOCALES = [
  { id: "en", label: "EN", name: "English", dir: "ltr" },
  { id: "hi", label: "हिं", name: "हिन्दी", dir: "ltr" },
  { id: "mr", label: "मरा", name: "मराठी", dir: "ltr" },
  { id: "ar", label: "ع", name: "العربية", dir: "rtl" },
  { id: "ur", label: "اردو", name: "اردو", dir: "rtl" },
] as const;

export type LocaleId = (typeof LOCALES)[number]["id"];

const MESSAGES: Record<LocaleId, typeof en> = { en, hi, mr, ar, ur };

function applyDocumentLocale(l: LocaleId) {
  document.documentElement.lang = l;
  document.documentElement.dir =
    LOCALES.find((x) => x.id === l)?.dir ?? "ltr";
}

const LocaleContext = createContext<{
  locale: LocaleId;
  setLocale: (l: LocaleId) => void;
}>({ locale: "en", setLocale: () => {} });

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mc-locale") as LocaleId | null;
      if (stored && stored in MESSAGES) {
        setLocaleState(stored);
        applyDocumentLocale(stored);
      }
    } catch {
      /* private mode */
    }
  }, []);

  const setLocale = (l: LocaleId) => {
    setLocaleState(l);
    applyDocumentLocale(l);
    try {
      localStorage.setItem("mc-locale", l);
    } catch {
      /* private mode */
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={MESSAGES[locale]}
        timeZone="Asia/Kolkata"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
