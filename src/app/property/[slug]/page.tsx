import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepositories } from "@/lib/data";
import { flags } from "@/lib/flags";
import { formatNumber } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { assetUrl } from "@/lib/storage/r2";
import { Reveal } from "@/components/ui/Reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!flags.properties) return [];
  const repos = await getRepositories();
  const properties = await repos.properties.all();
  return properties.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repos = await getRepositories();
  const property = await repos.properties.bySlug(slug);
  if (!property) return {};
  return pageMetadata({
    title: property.title,
    description: property.seoDescription,
    path: `/property/${property.slug}`,
  });
}

export default async function PropertyPage({ params }: Props) {
  if (!flags.properties) notFound();
  const { slug } = await params;
  const repos = await getRepositories();
  const property = await repos.properties.bySlug(slug);
  if (!property) notFound();

  const images = property.images
    .map((key) => assetUrl(key))
    .filter((u): u is string => u !== null);

  const isRep = property.representative === true;
  const locationLabel =
    property.city === property.state
      ? property.city
      : `${property.city}, ${property.state}`;
  const advisoryDisclaimer =
    "This development is showcased as a representative market asset. MindCept provides advisory and consulting services across similar commercial, industrial and residential real estate. Project ownership and development remain with their respective developers.";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description: property.seoDescription,
      url: `${site.url}/property/${property.slug}`,
      datePosted: undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.city,
        addressRegion: property.state,
        addressCountry: "IN",
      },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Market Portfolio", path: "/properties" },
      { name: property.title, path: `/property/${property.slug}` },
    ]),
  ];

  const facts: [string, string][] = isRep
    ? [
        ["Developer", property.developer ?? "—"],
        ["Asset class", property.assetClass ?? property.propertyType],
        ["Category", property.propertyType],
        ["Location", locationLabel],
      ]
    : [
        ["Type", property.propertyType],
        ["Status", property.status],
        property.areaSqft > 0
          ? ["Area", `${formatNumber(property.areaSqft)} sq ft`]
          : ["Configuration", property.configuration ?? "On request"],
        ["Location", locationLabel],
        ["Price", property.price],
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-contrast pb-16 pt-32 text-white">
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
                <Link href="/properties" className="transition-colors hover:text-white">
                  Market Portfolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/85">
                {property.title}
              </li>
            </ol>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ember-bright">
            {property.propertyType} · {property.city}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-[3.25rem]">
            {property.title}
          </h1>
          {property.brand ? (
            <div className="mt-6 inline-flex items-center rounded-card bg-white/95 px-4 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- static brand mark */}
              <img
                src={property.brand.logo}
                alt={property.brand.name}
                className="h-10 w-auto"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* 1 · Hero image — full-width architectural banner */}
      {images[0] ? (
        <section className="bg-contrast">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- static/R2 assets */}
            <img
              src={images[0]}
              alt={property.title}
              className="aspect-[21/9] w-full rounded-t-2xl object-cover"
            />
          </div>
        </section>
      ) : null}

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              {/* 2 · Overview */}
              <Reveal>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                  {isRep ? "Overview" : "The project"}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                  {property.description}
                </p>
                {isRep ? (
                  <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    <div className="border-t border-ember/40 pt-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Developer
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {property.developer ?? "—"}
                      </dd>
                    </div>
                    <div className="border-t border-ember/40 pt-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Asset class
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {property.assetClass ?? property.propertyType}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </Reveal>

              {/* 3 · Highlights / Representative highlights */}
              <Reveal className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-deep">
                  {isRep ? "Representative highlights" : "Highlights"}
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-3">
                  {(isRep ? property.amenities : property.amenities.slice(0, 3)).map(
                    (a) => (
                      <li
                        key={a}
                        className="border-t border-ember/40 pt-3 text-sm leading-relaxed text-ink/85"
                      >
                        {a}
                      </li>
                    ),
                  )}
                </ul>
              </Reveal>

              {/* 4 · Gallery */}
              {images.length > 1 ? (
                <Reveal className="mt-14">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {images.slice(1).map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element -- static/R2 assets
                      <img
                        key={src}
                        src={src}
                        alt={property.title}
                        className="w-full rounded-card object-cover"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {/* 5 · Amenities (MindCept listings only) */}
              {!isRep ? (
                <Reveal className="mt-14">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-deep">
                    Amenities &amp; specifications
                  </h2>
                  <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li
                        key={a}
                        className="border-b border-line/70 pb-3 text-sm text-ink/80"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {/* 6 · Location */}
              <Reveal className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-deep">
                  Location
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  {locationLabel}.{" "}
                  {isRep
                    ? "Micro-market analysis and connectivity mapping for this corridor are available through the MindCept advisory desk."
                    : "Micro-market analysis, connectivity mapping and site visits are arranged through the advisory desk."}
                </p>
              </Reveal>

              {isRep ? (
                <>
                  {/* 7 · Official website */}
                  <Reveal className="mt-14">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-deep">
                      Official website
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                      For specifications, availability and pricing, refer to the
                      developer&apos;s official website.
                    </p>
                    {property.officialWebsite ? (
                      <a
                        href={property.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-ember/50 px-5 py-2.5 text-sm font-semibold text-ember-deep transition-colors hover:border-ember"
                      >
                        Visit official website ↗
                      </a>
                    ) : null}
                  </Reveal>

                  {/* 8 · Advisory disclaimer */}
                  <Reveal className="mt-14">
                    <div className="rounded-card border border-line bg-tint px-5 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ember-deep">
                        Advisory disclaimer
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {advisoryDisclaimer}
                      </p>
                    </div>
                  </Reveal>
                </>
              ) : (
                /* 8 · Downloads (MindCept listings) */
                <Reveal className="mt-14">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-ember-deep">
                    Downloads
                  </h2>
                  {property.documents.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {property.documents.map((doc) => (
                        <li key={doc.url}>
                          <a
                            href={assetUrl(doc.url) ?? "#"}
                            className="text-sm font-medium text-jewel underline"
                          >
                            {doc.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-muted">
                      Title diligence pack and brochure are shared after a
                      qualification call with our advisory desk.
                    </p>
                  )}
                </Reveal>
              )}
            </div>

            {/* Facts + contact */}
            <aside>
              <div className="rounded-card border border-line bg-tint p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Key facts
                </h2>
                <dl className="mt-4 space-y-3">
                  {facts.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {label}
                      </dt>
                      <dd className="text-right text-sm font-semibold capitalize text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* 9 · Contact advisor — clear button hierarchy */}
              <div className="mt-6 rounded-card border border-line bg-card p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {isRep
                    ? "Discuss this asset class with MindCept"
                    : "Speak with the advisory desk"}
                </h2>
                <p className="mt-2 text-sm text-muted">{property.broker.name}</p>
                <div className="mt-5 space-y-3">
                  {/* Primary */}
                  <Link
                    href="/contact"
                    className="block rounded-full bg-ember px-5 py-3 text-center text-sm font-semibold text-on-accent transition-colors hover:bg-ember-bright"
                  >
                    Book a consultation
                  </Link>
                  {/* Secondary */}
                  {isRep ? (
                    <a
                      href={property.officialWebsite ?? "/contact"}
                      target={property.officialWebsite ? "_blank" : undefined}
                      rel={property.officialWebsite ? "noopener noreferrer" : undefined}
                      className="block rounded-full border border-ember/50 px-5 py-3 text-center text-sm font-semibold text-ember-deep transition-colors hover:border-ember"
                    >
                      Visit official website ↗
                    </a>
                  ) : (
                    <a
                      href={
                        property.documents[0]
                          ? (assetUrl(property.documents[0].url) ?? "/contact")
                          : "/contact"
                      }
                      className="block rounded-full border border-ember/50 px-5 py-3 text-center text-sm font-semibold text-ember-deep transition-colors hover:border-ember"
                    >
                      {property.documents[0]
                        ? "Download brochure"
                        : "Request the brochure"}
                    </a>
                  )}
                  {/* Tertiary */}
                  <p className="pt-1 text-center text-sm text-muted">
                    <a
                      href={`tel:${property.broker.phone.replace(/\s/g, "")}`}
                      className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ember"
                    >
                      Call {property.broker.phone}
                    </a>{" "}
                    ·{" "}
                    <a
                      href={site.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ember"
                    >
                      WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
