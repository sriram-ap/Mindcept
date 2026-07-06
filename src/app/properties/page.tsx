import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepositories } from "@/lib/data";
import { flags } from "@/lib/flags";
import { formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Properties",
  description:
    "Pre-verified industrial, warehousing, land and commercial opportunities from the MindCept advisory desk — title-checked, with full transaction support.",
  path: "/properties",
});

export default async function PropertiesPage() {
  if (!flags.properties) notFound();
  const repos = await getRepositories();
  const properties = await repos.properties.all();

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
            Properties
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pre-verified opportunities.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            Every listing is underwritten by our diligence desk — title,
            zoning, technical and legal — before it reaches this page.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="rounded-card border border-ember/30 bg-ember/5 px-5 py-3 text-sm text-ink/80">
            Representative listings shown while live inventory is onboarded.
            For current availability,{" "}
            <Link href="/contact" className="font-semibold text-jewel underline">
              talk to an advisor
            </Link>
            .
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <Reveal key={property.slug} as="article" className="h-full">
                <Link
                  href={`/property/${property.slug}`}
                  className="flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-ember"
                >
                  <span className="flex items-center justify-between">
                    <span className="rounded-full bg-jewel/10 px-3 py-1 text-xs font-semibold text-jewel">
                      {property.propertyType}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        property.status === "available"
                          ? "bg-jewel/10 text-jewel"
                          : "bg-line/60 text-muted"
                      }`}
                    >
                      {property.status}
                    </span>
                  </span>
                  <span className="mt-4 block font-display text-lg font-semibold text-ink">
                    {property.title}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-wider text-muted">
                    {property.city}, {property.state}
                  </span>
                  <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">
                    {property.description.slice(0, 140)}…
                  </span>
                  <span className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
                    <span className="font-semibold text-jewel">
                      {formatNumber(property.areaSqft)} sq ft
                    </span>
                    <span className="text-muted">{property.price}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
