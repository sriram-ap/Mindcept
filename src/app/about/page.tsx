import type { Metadata } from "next";
import Link from "next/link";
import {
  aboutNarrative,
  coreValues,
  milestones,
  mission,
  usps,
  vision,
} from "@/content/home";
import { pillars } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "MindCept Consulting LLP — real estate advisory born from decades of understanding the market from the ground up. The story, the philosophy and the track record.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-contrast pb-16 pt-32 text-white sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 15%, rgba(64,58,44,.6), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
            About MindCept
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-[3.25rem]">
            The right <span className="text-ember">MIND</span>set. The right con
            <span className="text-ember">CEPT</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">{site.tagline}.</p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            {aboutNarrative.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-6 text-lg leading-relaxed text-ink/80 first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* USPs — client-approved positioning */}
      <section className="bg-tint py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How we advise"
            title="Principles that shape every mandate."
          />
          <ol className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {usps.map((u, i) => (
              <Reveal as="li" key={u.title} className="border-t border-ember/40 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-serif text-xl font-medium text-ink">
                  {u.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{u.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember-deep">
              Vision
            </p>
            <p className="mt-5 font-serif text-2xl font-medium leading-snug text-ink">
              {vision}
            </p>
          </Reveal>
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember-deep">
              Mission
            </p>
            <p className="mt-5 font-serif text-2xl font-medium leading-snug text-ink">
              {mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-tint py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Core values" title="How we hold ourselves accountable." />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v) => (
              <Reveal key={v.title}>
                <h3 className="font-serif text-lg font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What we do"
            title="Four practice areas, one accountable team."
            lead="From industrial land to capital markets, MindCept owns the complete journey of a real estate decision."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <Reveal key={pillar.slug}>
                <Link
                  href={`/services/${pillar.children[0]}`}
                  className="group flex h-full items-start gap-4 rounded-card border border-line bg-card p-6 transition-colors hover:border-ember"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                    <Icon name={pillar.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">
                      {pillar.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {pillar.blurb}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-contrast py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            dark
            eyebrow="Track Record"
            title="Milestones that built the firm."
          />
          <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m) => (
              <Reveal as="li" key={m.heading} className="border-l-2 border-ember/50 pl-6">
                <p className="font-display text-4xl font-semibold">
                  {m.value}
                  <span className="text-ember">{m.suffix}</span>
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {m.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {m.description}
                </p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-ember px-7 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
            >
              Work with us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
