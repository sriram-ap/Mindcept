import Link from "next/link";
import Image from "next/image";
import { clientsRowA, clientsRowB } from "@/content/home";
import { getRepositories } from "@/lib/data";
import { flags } from "@/lib/flags";
import { formatNumber } from "@/lib/format";
import { ClientMark } from "@/components/ui/ClientMark";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import dynamic from "next/dynamic";

const ReachMap = dynamic(() =>
  import("@/components/home/ReachMap").then((m) => m.ReachMap),
);

/* ── Trusted By — featured client relationships + marquee strip ── */
export async function TrustedBy() {
  const repos = await getRepositories();
  const featured = await repos.clients.featured();

  const marqueeRow = (names: string[], reverse?: boolean) => (
    <div className="overflow-hidden" aria-hidden="true">
      <div className={`marquee-track flex w-max gap-3 py-2 ${reverse ? "reverse" : ""}`}>
        {[...names, ...names].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap rounded-full border border-line bg-card px-5 py-2 text-sm font-medium text-muted"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="clients" className="scroll-mt-20 bg-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Trusted By"
            title="35+ years of collective transaction experience."
            lead="Institutions, occupiers, developers and investors our team has worked with across industrial, warehousing and capital-markets mandates."
          />
          <Link
            href="/clients"
            className="rounded-full border border-jewel/30 px-5 py-2.5 text-sm font-semibold text-jewel transition-colors hover:border-jewel hover:bg-jewel hover:text-white"
          >
            View all clients →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((client) => (
            <Reveal
              key={client.slug}
              className="card-lift group flex items-center gap-4 rounded-card border border-line bg-card p-5"
            >
              <ClientMark name={client.name} logoUrl={client.logoUrl} className="h-12 w-12 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold text-ink">
                  {client.name}
                </span>
                <span className="block truncate text-xs text-muted">
                  {client.engagement}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-3">
        {marqueeRow(clientsRowA)}
        {marqueeRow(clientsRowB, true)}
      </div>
    </section>
  );
}

/* ── Our Reach — interactive India map ── */
export async function Reach() {
  const repos = await getRepositories();
  const locations = await repos.locations.all();
  const indiaCount = locations.filter((l) => l.region === "India").length;

  return (
    <section id="reach" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Presence"
          title="Coverage across India and the Middle East."
          lead={`${indiaCount} operating markets spanning every major industrial and logistics corridor, with a Dubai office extending our advisory across the Middle East and a defined path to further expansion.`}
        />
        <div className="mt-12">
          <ReachMap locations={locations} />
        </div>
      </div>
    </section>
  );
}

/* ── Featured Properties (flag-gated Milestone-2 surface) ── */
export async function FeaturedProperties() {
  if (!flags.properties) return null;
  const repos = await getRepositories();
  const featured = await repos.properties.featured();
  if (featured.length === 0) return null;

  return (
    <section className="bg-contrast py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            dark
            eyebrow="Featured Properties"
            title="Pre-verified opportunities."
            lead="Title-checked industrial, warehousing and commercial options from our advisory desk."
          />
          <Link
            href="/properties"
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-ember hover:text-ember-bright"
          >
            View all properties →
          </Link>
        </div>
        {/* Full-width editorial showcase — magazine rows, alternating image
            side, large next/image photography, minimal copy. */}
        <div className="mt-16 space-y-20 sm:space-y-24">
          {featured.map((property, i) => {
            const summary = `${property.description.split(". ")[0]}.`;
            const flip = i % 2 === 1;
            return (
              <Reveal
                key={property.slug}
                as="article"
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                {/* Photography */}
                <div
                  className={`lux-media group relative overflow-hidden rounded-2xl lg:col-span-7 ${
                    flip ? "lg:order-2" : ""
                  }`}
                >
                  <Link href={`/property/${property.slug}`} aria-label={property.title}>
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={property.images[0] ?? "/hero/executive.jpg"}
                        alt={property.title}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute start-5 top-5 rounded-full bg-contrast/75 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
                      {property.propertyType}
                    </span>
                    {property.status === "available" ? (
                      <span className="absolute end-5 top-5 rounded-full border border-ember/60 bg-ember/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-ember-bright backdrop-blur">
                        Available
                      </span>
                    ) : null}
                  </Link>
                </div>

                {/* Editorial content */}
                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ember-bright">
                    {property.city} · {property.propertyType}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
                    {property.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                    {summary}
                  </p>
                  <p className="mt-5 border-t border-white/10 pt-4 text-sm font-semibold text-white/85">
                    {property.areaSqft > 0
                      ? `${formatNumber(property.areaSqft)} sq ft`
                      : (property.configuration ?? "On request")}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/property/${property.slug}`}
                      className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
                    >
                      View property →
                    </Link>
                    <Link
                      href="/contact"
                      className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-ember hover:text-ember-bright"
                    >
                      Book a consultation
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
