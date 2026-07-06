import type { Metadata } from "next";
import Link from "next/link";
import { research } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Research & Insights",
  description:
    "Data-backed perspectives on India’s industrial, warehousing and commercial real estate markets — reports, indices and demand trackers from MindCept.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-14 pt-32 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 15%, rgba(20,64,58,.6), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
            Research &amp; Insights
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Market intelligence, published.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Data-backed perspectives on India’s industrial, warehousing and
            commercial markets.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {research.map((item) => (
              <Reveal
                key={item.slug}
                as="article"
                className="flex flex-col rounded-card border border-line bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-jewel/10 px-3 py-1 text-xs font-semibold text-jewel">
                    {item.tag}
                  </span>
                  <span className="text-xs text-muted">{item.date}</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-ember-deep">
                  Full report coming soon
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-card border border-line bg-[#faf7f0] p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-ink">
              Want the reports as they publish?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Our research desk publishes quarterly. Ask an advisor to add you to
              the distribution list.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-jewel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jewel/90"
            >
              Request access →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
