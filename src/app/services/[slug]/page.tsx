import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPillar,
  getService,
  getServicesForPillar,
  services,
} from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const pillar = getPillar(service.parent);
  if (!pillar) notFound();
  const siblings = getServicesForPillar(pillar.slug).filter(
    (s) => s.slug !== service.slug,
  );

  const jsonLd = [
    serviceJsonLd(service),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: pillar.title, path: "/#services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-contrast pb-16 pt-32 text-white sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 10%, rgba(64,58,44,.6), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-white">
                  {pillar.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/85">
                {service.title}
              </li>
            </ol>
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-[3.25rem]">
            {service.title}
          </h1>
          <div aria-hidden="true" className="mt-6 h-0.5 w-16 bg-ember" />
          <p className="mt-6 max-w-2xl text-lg text-white/75">{service.promise}</p>
          <div className="mt-8 inline-flex max-w-2xl flex-col gap-1 rounded-card border border-white/15 bg-white/5 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-ember-bright">
              {service.advantage.label}
            </span>
            <span className="text-sm text-white/80">{service.advantage.value}</span>
          </div>
        </div>
      </section>

      {/* Overview + highlights */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {service.leadHeading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {service.lead}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.highlights.map(([heading, description]) => (
                <div
                  key={heading}
                  className="rounded-card border border-line bg-card p-5"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-jewel/10 text-xs text-jewel"
                    >
                      ✓
                    </span>
                    {heading}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Process / focus grid */}
          <Reveal className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {service.blockTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.process.map(([heading, description], i) => (
                <li
                  key={heading}
                  className="rounded-card border border-line bg-tint p-6"
                >
                  <span className="font-display text-sm font-semibold text-ember-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink">
                    {heading}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{description}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Related services */}
          {siblings.length > 0 ? (
            <Reveal className="mt-16">
              <h2 className="font-display text-xl font-semibold text-ink">
                More in {pillar.title}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/services/${sibling.slug}`}
                    className="group flex items-center justify-between rounded-card border border-line bg-card px-6 py-4 transition-colors hover:border-ember"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-ink">
                      <span className="text-jewel">
                        <Icon name={sibling.icon} className="h-5 w-5" />
                      </span>
                      {sibling.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-ember-deep transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}

          <div className="mt-14">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-ember px-7 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
            >
              Talk to an advisor about {service.eyebrow} →
            </Link>
            <p className="mt-3 text-xs text-muted">
              Or email{" "}
              <a href={`mailto:${site.email}`} className="underline hover:text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
