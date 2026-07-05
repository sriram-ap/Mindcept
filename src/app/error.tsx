"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Global error boundary — keeps the brand experience even on failure. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ink px-4 pt-16 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
        Something went wrong
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        We hit an unexpected error.
      </h1>
      <p className="mt-3 max-w-md text-white/70">
        Please try again — or reach us directly on WhatsApp or phone; the
        advisory team is always available.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-ember"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
