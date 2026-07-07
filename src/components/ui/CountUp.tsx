"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated counter: counts to `value` when scrolled into view.
 * Renders the final value immediately for reduced-motion users, no-JS,
 * and during SSR (so SEO/CLS are unaffected).
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
  durationMs = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // keep final value
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          setDisplay(Math.round(value * ease(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  // Reserve the final rendered width (tabular digits) so the animation
  // can never cause layout shift.
  const finalText = `${prefix}${value.toLocaleString("en-IN")}${suffix}`;
  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${finalText.length}ch` }}
    >
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
