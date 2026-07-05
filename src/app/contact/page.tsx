import type { Metadata } from "next";
import { ContactSection, CtaBanner } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

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
      <ContactSection />
      <CtaBanner />
    </>
  );
}
