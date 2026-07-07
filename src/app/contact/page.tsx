import type { Metadata } from "next";
import { ContactSection, CtaBanner } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";
import { offices, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Book a Consultation",
  description: `Talk to the MindCept advisory team about industrial, warehousing, land, commercial or capital-markets requirements. Call ${site.phonePrimary}, WhatsApp, or request a callback.`,
  path: "/contact",
});

export default function ContactPage() {
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
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Book a consultation.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            One conversation with an advisor is the fastest way to a matched
            shortlist — with pricing, diligence and next steps.
          </p>
        </div>
      </section>

      {/* Office directory */}
      <section className="bg-[#faf7f0] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Our offices
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {offices.map((office) => (
              <Reveal
                key={office.slug}
                className="rounded-card border border-line bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {office.label}
                  </h3>
                  {office.status === "coming-soon" ? (
                    <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-semibold text-ember-deep">
                      {office.note}
                    </span>
                  ) : null}
                </div>

                {office.status === "open" ? (
                  <>
                    <address className="mt-4 not-italic text-sm leading-relaxed text-muted">
                      <span className="font-medium text-ink">{office.company}</span>
                      <br />
                      {office.addressLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </address>
                    <dl className="mt-5 space-y-2 text-sm">
                      {office.emails.map((email) => (
                        <div key={email} className="flex gap-2">
                          <dt className="w-24 shrink-0 text-muted">Email</dt>
                          <dd>
                            <a href={`mailto:${email}`} className="text-jewel hover:underline">
                              {email}
                            </a>
                          </dd>
                        </div>
                      ))}
                      {office.whatsapp ? (
                        <div className="flex gap-2">
                          <dt className="w-24 shrink-0 text-muted">WhatsApp</dt>
                          <dd>
                            <a
                              href={office.whatsapp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-jewel hover:underline"
                            >
                              {office.whatsapp.label}
                            </a>
                          </dd>
                        </div>
                      ) : null}
                      {office.mobile ? (
                        <div className="flex gap-2">
                          <dt className="w-24 shrink-0 text-muted">Mobile</dt>
                          <dd>
                            <a
                              href={`tel:${office.mobile.replace(/\s/g, "")}`}
                              className="text-ink hover:text-jewel"
                            >
                              {office.mobile}
                            </a>
                          </dd>
                        </div>
                      ) : null}
                      {office.landline ? (
                        <div className="flex gap-2">
                          <dt className="w-24 shrink-0 text-muted">Phone</dt>
                          <dd>
                            <a
                              href={`tel:${office.landline.replace(/[\s-]/g, "")}`}
                              className="text-ink hover:text-jewel"
                            >
                              {office.landline}
                            </a>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Our Middle East office is opening soon. Full address details
                    will be published here shortly — in the meantime, reach the
                    India team and we&apos;ll route your enquiry.
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <CtaBanner />
    </>
  );
}
