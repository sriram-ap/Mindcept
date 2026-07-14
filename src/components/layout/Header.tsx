"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { pillars, services } from "@/content/services";
import { useTranslations } from "next-intl";
import {
  CitySelect,
  LanguageSelect,
  ThemeSelect,
} from "@/components/layout/HeaderControls";

/**
 * MindCept brand mark — renders the brand asset file
 * (public/brand/mindcept-logo.png, retina 3200×1400) via next/image; no
 * logo artwork is drawn in code. To ship a newer original, overwrite that
 * one file — no code change needed. The gold artwork sits in a premium
 * container (champagne gradient edge, thin ivory border, soft luxury
 * shadow, subtle glass) purely for readability; the artwork itself is
 * untouched.
 */
function BrandMark() {
  return (
    <span
      className="inline-flex items-center overflow-hidden rounded-xl border border-[#fbf7ee]/70 p-[3px] shadow-[0_6px_22px_-8px_rgba(0,0,0,0.55),0_0_0_1px_rgba(198,164,92,0.25)] backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(135deg, #f4e3b8 0%, #e0bd6a 55%, #caa14a 100%)",
      }}
    >
      <Image
        src="/brand/mindcept-logo.png"
        alt="MindCept"
        width={110}
        height={48}
        quality={90}
        priority
        className="h-11 w-auto rounded-[9px]"
      />
    </span>
  );
}

/**
 * Executive header — sticky, transparent over the dark hero, glass on
 * scroll. Desktop: nav + city / language / theme selectors + CTA.
 * Mobile: drawer with the same controls.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      setMegaOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const close = () => {
    setDrawerOpen(false);
    setMegaOpen(false);
  };

  const t = useTranslations("common");

  // Routes without a dark hero (admin console) need the solid bar from the
  // start — the transparent state assumes a bg-contrast hero underneath.
  const forceSolid = pathname?.startsWith("/admin") ?? false;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid || megaOpen || drawerOpen || forceSolid
          ? "border-b border-white/10 bg-contrast/85 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="shrink-0 pe-5" onClick={close}>
          <BrandMark />
          <span className="sr-only">MindCept — {site.tagline}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <button
            type="button"
            className="text-sm font-medium text-white/85 transition-colors hover:text-ember-bright"
            aria-expanded={megaOpen}
            aria-controls="mega-menu"
            onClick={() => setMegaOpen((v) => !v)}
          >
            Services
            <span aria-hidden="true" className="ms-1 text-xs">
              {megaOpen ? "▴" : "▾"}
            </span>
          </button>
          {nav
            .filter(
              (item) => item.label !== "Services" && item.label !== "Contact",
            )
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="text-sm font-medium text-white/85 transition-colors hover:text-ember-bright"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <div className="hidden items-center gap-2 xl:flex">
            <CitySelect />
            <LanguageSelect />
            <ThemeSelect />
          </div>
          <Link
            href="/contact"
            onClick={close}
            className="ms-1 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
          >
            {t("bookConsultation")}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {drawerOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop mega-menu */}
      {megaOpen ? (
        <div
          id="mega-menu"
          className="hidden border-t border-white/10 bg-contrast/90 backdrop-blur-md lg:block"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-6 py-8">
            {pillars.map((pillar) => (
              <div key={pillar.slug}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
                  {pillar.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {pillar.children.map((slug) => {
                    const service = services.find((s) => s.slug === slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          onClick={close}
                          className="text-sm text-white/75 transition-colors hover:text-white"
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      {drawerOpen ? (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-contrast px-6 py-6 lg:hidden"
        >
          <div className="flex flex-wrap items-center gap-2 pb-4">
            <CitySelect />
            <LanguageSelect />
            <ThemeSelect />
          </div>
          <ul className="space-y-1 border-t border-white/10 pt-4">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <p className="pt-3 text-xs font-semibold uppercase tracking-[0.15em] text-ember-bright">
                  {pillar.title}
                </p>
                <ul>
                  {pillar.children.map((slug) => {
                    const service = services.find((s) => s.slug === slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}`}
                          onClick={close}
                          className="block py-1.5 text-sm text-white/75"
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
            {nav
              .filter((item) => item.label !== "Services")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2 text-base font-medium text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={close}
                className="block rounded-full bg-ember px-5 py-2.5 text-center text-sm font-semibold text-on-accent"
              >
                {t("bookConsultation")}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
