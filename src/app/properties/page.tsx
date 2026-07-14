import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRepositories } from "@/lib/data";
import { flags } from "@/lib/flags";
import { pageMetadata } from "@/lib/seo";
import { PropertyExplorer } from "@/components/properties/PropertyExplorer";

export const metadata: Metadata = pageMetadata({
  title: "Market Portfolio",
  description:
    "A representative portfolio of industrial, residential and commercial developments across India — illustrating the asset classes MindCept advises on. Advisory and transaction services across premium real estate.",
  path: "/properties",
});

export default async function PropertiesPage() {
  if (!flags.properties) notFound();
  const repos = await getRepositories();
  const properties = await repos.properties.all();

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
            Market Portfolio
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight sm:text-[3.25rem]">
            The asset classes we advise on.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            A representative portfolio of institutional industrial,
            residential and commercial developments across India — illustrating
            the calibre of assets MindCept provides advisory, consulting and
            transaction services on.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-10 rounded-card border border-ember/30 bg-ember/5 px-5 py-3 text-sm leading-relaxed text-ink/80">
            <span className="font-semibold text-ink">Representative market assets.</span>{" "}
            Developments shown here are owned and developed by their respective
            developers and are presented to illustrate the asset classes
            MindCept advises on — MindCept is an advisory and consulting firm,
            not the owner or developer of these projects.
          </p>
          <PropertyExplorer properties={properties} />
        </div>
      </section>
    </>
  );
}
