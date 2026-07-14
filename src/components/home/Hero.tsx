"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { heroSlides, stats } from "@/content/home";
import { CountUp } from "@/components/ui/CountUp";

/** Split "₹1,000" into prefix "₹" and numeric 1000 for the counter. */
function parseStat(value: string): { prefix: string; num: number } {
  const match = value.match(/^([^\d]*)([\d,]+)$/);
  if (!match) return { prefix: "", num: 0 };
  return { prefix: match[1], num: parseInt(match[2].replace(/,/g, ""), 10) };
}

/** Render a slide title, styling the {{…}} phrase in ember gold. */
function SlideTitle({ title }: { title: string }) {
  const parts = title.split(/\{\{|\}\}/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-ember">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      5500,
    );
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  const slide = heroSlides[index];
  const t = useTranslations("common");

  return (
    <section className="relative overflow-hidden bg-contrast text-white">
      {/* Full-bleed cinematic hero photograph, optimised via next/image
          (fill + priority — this is the LCP element). To use the official
          MindCept background, replace public/hero/executive.jpg with the
          supplied image at the same path (or point src at a new file); no
          code change is needed. */}
      <Image
        src="/hero/executive.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        quality={72}
        className="pointer-events-none object-cover opacity-90"
      />
      {/* Cinematic overlay — dark gradient for readability, theme-adaptive
          via the contrast token. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-contrast) 0%, color-mix(in srgb, var(--color-contrast) 76%, transparent) 42%, color-mix(in srgb, var(--color-contrast) 22%, transparent) 100%), linear-gradient(0deg, var(--color-contrast) 0%, transparent 45%)",
        }}
      />
      {/* Subtle warm-bronze wash — ties the imagery to the Executive theme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 78% 30%, color-mix(in srgb, var(--color-ember) 45%, transparent), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-28 pt-32 sm:px-6">
        {/* No entrance animation on the initial slide — it is the LCP element. */}
        <div key={index} className={`max-w-4xl ${index === 0 ? "" : "slide-fade"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-bright">
            {slide.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.04] tracking-tight sm:text-7xl xl:text-[5.25rem]">
            <SlideTitle title={slide.title} />
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {slide.lead}
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span>Industrial</span>
            <span aria-hidden="true" className="text-ember">·</span>
            <span>Commercial</span>
            <span aria-hidden="true" className="text-ember">·</span>
            <span>Warehousing &amp; Land</span>
            <span aria-hidden="true" className="text-ember">·</span>
            <span>Capital Markets</span>
            <span aria-hidden="true" className="text-ember">·</span>
            <span className="text-ember-bright">India &amp; Middle East</span>
          </p>
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-4">
          <Link
            href="/#services"
            className="rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-on-accent shadow-[0_14px_30px_-14px_rgba(176,138,74,0.7)] transition-colors hover:bg-ember-bright"
          >
            {t("exploreServices")} →
          </Link>
          <Link
            href="/#list-property"
            className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-ember hover:text-ember-bright"
          >
            {t("listProperty")}
          </Link>
        </div>

        <div
          className="mt-11 flex gap-2"
          role="tablist"
          aria-label="Hero slides"
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.eyebrow}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
              onClick={() => {
                setIndex(i);
                restart();
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-ember" : "w-4 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Stat strip */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-dark pt-9 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-1.5 text-[11px] uppercase tracking-[0.14em] text-white/65">
                {stat.label}
              </dt>
              <dd className="font-serif text-3xl font-medium text-white">
                <CountUp
                  value={parseStat(stat.value).num}
                  prefix={parseStat(stat.value).prefix}
                />
                <span className="text-ember">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
