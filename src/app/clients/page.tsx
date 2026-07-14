import type { Metadata } from "next";
import Link from "next/link";
import { getRepositories } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { ClientDirectory } from "@/components/clients/ClientDirectory";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Clients & Transaction Experience",
  description:
    "Institutions, corporate occupiers, developers and investors MindCept's team has worked with — across industrial, warehousing, land and capital-markets mandates.",
  path: "/clients",
});

export default async function ClientsPage() {
  const repos = await getRepositories();
  const clients = await repos.clients.all();

  return (
    <>
      <section className="relative overflow-hidden bg-contrast pb-14 pt-32 text-white">
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
            Trusted By
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-[3.25rem]">
            Team transaction experience.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            The organisations our team has served across an collective 35+
            years of industrial, warehousing, land and capital-markets work —
            from global manufacturers to institutional investors.
          </p>
        </div>
      </section>

      <section className="bg-tint py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ClientDirectory clients={clients} />

          <Reveal className="mt-14 rounded-card border border-line bg-card p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-ink">
              Join the organisations that trust MindCept.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Talk to our advisory team about your industrial, warehousing,
              land or commercial requirement.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-jewel px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-jewel/90"
            >
              Book a consultation →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
