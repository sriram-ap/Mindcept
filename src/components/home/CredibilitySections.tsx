import Link from "next/link";
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
            className="whitespace-nowrap rounded-full border border-line bg-white px-5 py-2 text-sm font-medium text-muted"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="clients" className="scroll-mt-20 bg-[#faf7f0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Trusted By"
            title="Aggregated 30+ years of transaction experience."
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
              className="flex items-center gap-4 rounded-card border border-line bg-white p-5"
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
          eyebrow="Our Reach"
          title="On the ground across India."
          lead={`${indiaCount} operating markets spanning every major industrial and logistics corridor — West, Central, North, South and East — with a Dubai office extending our advisory into the Middle East.`}
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
    <section className="bg-ink py-20 text-white sm:py-28">
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
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <Reveal key={property.slug} as="article" className="h-full">
              <Link
                href={`/property/${property.slug}`}
                className="flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-ember"
              >
                <span className="flex items-center justify-between">
                  <span className="rounded-full bg-jewel/10 px-3 py-1 text-xs font-semibold text-jewel">
                    {property.propertyType}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    {property.city}
                  </span>
                </span>
                <span className="mt-4 block font-display text-lg font-semibold text-ink">
                  {property.title}
                </span>
                <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted">
                  {property.description.slice(0, 120)}…
                </span>
                <span className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                  <span className="font-semibold text-jewel">
                    {formatNumber(property.areaSqft)} sq ft
                  </span>
                  <span className="text-ember-deep">Details →</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
