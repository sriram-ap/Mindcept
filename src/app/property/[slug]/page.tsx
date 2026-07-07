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
      { name: "Properties", path: "/properties" },
      { name: property.title, path: `/property/${property.slug}` },
    ]),
  ];

  const facts: [string, string][] = [
    ["Type", property.propertyType],
    ["Status", property.status],
    ["Area", `${formatNumber(property.areaSqft)} sq ft`],
    ["Location", `${property.city}, ${property.state}`],
    ["Price", property.price],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 10%, rgba(20,64,58,.6), transparent 60%)",
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
                  Properties
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
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {property.title}
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Gallery */}
              {images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {images.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element -- R2 CDN assets
                    <img
                      key={src}
                      src={src}
                      alt={property.title}
                      className="w-full rounded-card border border-line object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-64 items-center justify-center rounded-card border border-dashed border-line bg-[#faf7f0] text-sm text-muted"
                >
                  Photographs available on request
                </div>
              )}

              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Overview
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {property.description}
                </p>
              </Reveal>

              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Amenities & specifications
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-ink/80">
                      <span aria-hidden="true" className="mt-0.5 text-jewel">
                        ✓
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-10">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Documents
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
            </div>

            {/* Facts + contact */}
            <aside>
              <div className="rounded-card border border-line bg-[#faf7f0] p-6">
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

              <div className="mt-6 rounded-card border border-line bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Talk to the advisor
                </h2>
                <p className="mt-2 text-sm text-muted">{property.broker.name}</p>
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${property.broker.phone.replace(/\s/g, "")}`}
                    className="block rounded-full bg-jewel px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-jewel/90"
                  >
                    Call {property.broker.phone}
                  </a>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full border border-jewel/30 px-5 py-2.5 text-center text-sm font-semibold text-jewel transition-colors hover:border-jewel"
                  >
                    WhatsApp enquiry
                  </a>
                  <Link
                    href="/contact"
                    className="block rounded-full border border-line px-5 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-ember"
                  >
                    Request a callback
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
