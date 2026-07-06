import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";

/* Below-fold interactive sections load as separate chunks so their
   hydration stays off the critical path. SSR output is unchanged. */
const Calculators = dynamic(() =>
  import("@/components/home/Calculators").then((m) => m.Calculators),
);
const AISearch = dynamic(() =>
  import("@/components/home/AISearch").then((m) => m.AISearch),
);
import {
  FeaturedProperties,
  Reach,
  TrustedBy,
} from "@/components/home/CredibilitySections";
import {
  ContactSection,
  CtaBanner,
  Differentiators,
  ListProperty,
  Milestones,
  Pillars,
  ProcessSteps,
  Research,
  SocialSection,
} from "@/components/home/Sections";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  // The home page carries the full brand title, not the "%s | MindCept" template.
  title: { absolute: `${site.name} — ${site.tagline}` },
};

/**
 * Section order is the approved trust-first sequence: who we've worked
 * with, where we operate and at what scale come before the service pitch.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Reach />
      <Milestones />
      <Pillars />
      <FeaturedProperties />
      <Research />
      <Differentiators />
      <ProcessSteps />
      <Calculators />
      <AISearch />
      <SocialSection />
      <ListProperty />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
