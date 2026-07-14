import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-contrast px-4 pt-16 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        This page doesn’t exist.
      </h1>
      <p className="mt-3 max-w-md text-white/70">
        The address may have changed. Head back home or talk to an advisor.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-ember"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
