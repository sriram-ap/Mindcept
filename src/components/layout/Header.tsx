"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { pillars, services } from "@/content/services";

/**
 * Sticky site header: transparent over the hero, solid on scroll.
 * Services expands into a mega-menu on desktop; a drawer serves mobile.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || megaOpen || drawerOpen
          ? "bg-ink/95 shadow-lg backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-white"
          onClick={close}
        >
          Mind<span className="text-ember">Cept</span>
          <span className="sr-only"> — {site.tagline}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          <button
            type="button"
            className="text-sm font-medium text-white/85 transition-colors hover:text-ember-bright"
            aria-expanded={megaOpen}
            aria-controls="mega-menu"
            onClick={() => setMegaOpen((v) => !v)}
          >
            Services
            <span aria-hidden="true" className="ml-1 text-xs">
              {megaOpen ? "▴" : "▾"}
            </span>
          </button>
          {nav
            .filter((item) => item.label !== "Services")
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
          <Link
            href="/contact"
            onClick={close}
            className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
          >
            Book a consultation
          </Link>
        </nav>

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
          className="hidden border-t border-line-dark bg-ink/95 backdrop-blur lg:block"
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
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line-dark bg-ink px-6 py-6 lg:hidden"
        >
          <ul className="space-y-1">
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
                className="block rounded-full bg-ember px-5 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Book a consultation
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
