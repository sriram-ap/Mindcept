import Link from "next/link";
import {
  differentiators,
  milestones,
  processSteps,
  research,
} from "@/content/home";
import { pillars, services } from "@/content/services";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialGlyph } from "@/components/ui/SocialIcons";
import { socials } from "@/content/site";
import dynamic from "next/dynamic";

/* Forms carry the Zod bundle — loaded as separate chunks so validation
   code stays off the initial critical path. SSR output is unchanged. */
const EnquiryForm = dynamic(() =>
  import("@/components/forms/EnquiryForm").then((m) => m.EnquiryForm),
);
const ListPropertyForm = dynamic(() =>
  import("@/components/forms/ListPropertyForm").then((m) => m.ListPropertyForm),
);

/* ── Why MindCept ── */
export function Differentiators() {
  return (
    <section className="bg-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why MindCept"
          title="Three things we are best at."
          lead="Every mandate is underwritten on first-hand market data and protected by rigorous diligence — so the advice you act on is the advice that holds up."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {differentiators.map((d) => (
            <Reveal
              key={d.tag}
              className="rounded-card border border-line bg-card p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-deep">
                {d.tag}
              </p>
              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                <Icon name={d.icon} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {d.heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {d.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services (four pillars) ── */
export function Pillars() {
  return (
    <section id="services" className="scroll-mt-20 bg-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Four practice areas. One integrated team."
          lead="The right real estate strategy begins with understanding the business behind it. Sector expertise and practical advisory, integrated across commercial, industrial, warehousing and land assets."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <Reveal
              key={pillar.slug}
              className="rounded-card border border-line bg-card p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-ink">
                  <span className="mr-2 text-sm font-semibold text-ember-deep">
                    {pillar.index}
                  </span>
                  {pillar.title}
                </h3>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pillar.blurb}
              </p>
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {pillar.children.map((slug) => {
                  const service = services.find((s) => s.slug === slug);
                  if (!service) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="group flex items-center justify-between py-3 text-sm font-medium text-ink transition-colors hover:text-jewel"
                      >
                        {service.title}
                        <span
                          aria-hidden="true"
                          className="text-ember-deep transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Track record timeline ── */
export function Milestones() {
  return (
    <section className="bg-contrast py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Track Record"
          title="Milestones that built the firm."
          lead="A legacy built on trusted partnerships, landmark transactions, and a steadfast commitment to delivering meaningful real estate outcomes."
        />
        <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((m) => (
            <Reveal as="li" key={m.heading} className="border-l-2 border-ember/50 pl-6">
              <p className="font-display text-4xl font-semibold">
                {m.value}
                <span className="text-ember">{m.suffix}</span>
                <span className="ml-2 text-sm font-normal uppercase tracking-wider text-white/65">
                  {m.unit}
                </span>
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold">{m.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {m.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── How we work ── */
export function ProcessSteps() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven advisory process."
          lead="From mapping your exact operational needs to handing over the keys, we manage the entire journey — saving time, cost and risk."
        />
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {processSteps.map((step) => (
            <Reveal
              as="li"
              key={step.index}
              className="rounded-card border border-line bg-card p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ember/15 text-ember-deep">
                  <Icon name={step.icon} className="h-5 w-5" />
                </div>
                <span className="font-display text-3xl font-semibold text-line">
                  {step.index}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {step.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {step.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-jewel/10 px-3 py-1 text-xs font-medium text-jewel"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Social channels ── */
export function SocialSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Follow Us"
          title="Stay close to the market."
          lead="Insights, live mandates and on-ground updates across our channels."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {socials
            .filter((s) => s.key !== "youtube")
            .map((s) => (
              <Reveal key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-card border border-line bg-card p-5 transition-colors hover:border-ember"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                    <SocialGlyph name={s.key} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-semibold text-ink">
                      {s.name}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {s.handle} · {s.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-sm text-ember-deep transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ── Research & insights ── */
export function Research() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Research & Insights"
          title="Market intelligence, published."
          lead="Data-backed perspectives on India’s industrial, warehousing and commercial markets."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {research.map((item) => (
            <Reveal
              key={item.slug}
              as="article"
              className="flex flex-col rounded-card border border-line bg-card p-7"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-jewel/10 px-3 py-1 text-xs font-semibold text-jewel">
                  {item.tag}
                </span>
                <span className="text-xs text-muted">{item.date}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {item.summary}
              </p>
              <Link
                href="/insights"
                className="mt-5 text-sm font-semibold text-ember-deep transition-colors hover:text-jewel"
              >
                View report →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── List your property ── */
export function ListProperty() {
  return (
    <section
      id="list-property"
      className="scroll-mt-20 bg-slate py-20 text-white sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            dark
            eyebrow="For Owners · Developers · Channel Partners"
            title="List your property with MindCept."
            lead="Put your industrial, warehousing, land or commercial asset in front of 300+ corporate occupiers and institutional investors — with data-driven pricing and full transaction support."
          />
          <ul className="mt-8 space-y-3 text-sm text-white/85">
            {[
              "Marketed to pre-qualified occupiers & investors",
              "Data-driven pricing & rental benchmarking",
              "End-to-end due diligence & transaction support",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 text-ember-bright">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-3 gap-6">
            {[
              ["12 Mn+", "Sq ft transacted"],
              ["300+", "Corporate clients"],
              ["30+", "Cities covered"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col">
                <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-white/80">
                  {label}
                </dt>
                <dd className="font-display text-2xl font-semibold text-ember-bright">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Reveal className="rounded-card border border-white/15 bg-contrast/30 p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold">Submit your property</h3>
          <div className="mt-5">
            <ListPropertyForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact / enquiry ── */
export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Get in touch"
            title="Tell us your requirement."
            lead="Share a few details and our advisory team will respond with matched options and clear next steps."
          />
          <ul className="mt-8 space-y-4">
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-card border border-line p-4 transition-colors hover:border-ember"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
                  <SocialGlyph name="whatsapp" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    WhatsApp
                  </span>
                  <span className="block text-sm text-muted">{site.whatsappNumber}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 rounded-card border border-line p-4 transition-colors hover:border-ember"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-jewel/10 text-jewel">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Email us</span>
                  <span className="block text-sm text-muted">
                    {site.email} · {site.emailSales}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phonePrimary.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-card border border-line p-4 transition-colors hover:border-ember"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember/15 text-ember-deep">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Call us</span>
                  <span className="block text-sm text-muted">
                    {site.phonePrimary} · {site.phoneSecondary}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <Reveal className="rounded-card border border-line bg-card p-6 shadow-sm sm:p-8">
          <h3 className="font-display text-xl font-semibold text-ink">
            Request a callback
          </h3>
          <div className="mt-5">
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Closing CTA ── */
export function CtaBanner() {
  return (
    <section className="bg-contrast py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let’s find the strategy for your space.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Talk to our advisory team about your next industrial, warehousing,
            land or commercial requirement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-ember px-7 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
            >
              Book a consultation →
            </Link>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-ember hover:text-ember-bright"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
