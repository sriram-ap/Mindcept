"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(20,64,58,.55), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 90%, rgba(198,164,92,.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6">
        {/* No entrance animation on the initial slide — it is the LCP element. */}
        <div key={index} className={`max-w-3xl ${index === 0 ? "" : "slide-fade"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
            {slide.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            <SlideTitle title={slide.title} />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {slide.lead}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/#services"
            className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
          >
            Explore our services →
          </Link>
          <Link
            href="/#list-property"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-ember hover:text-ember-bright"
          >
            List your property
          </Link>
        </div>

        <div
          className="mt-10 flex gap-2"
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
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-dark pt-8 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-white/50">
                {stat.label}
              </dt>
              <dd className="font-display text-2xl font-semibold text-white">
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
