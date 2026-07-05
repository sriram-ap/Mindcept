import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Calculators } from "@/components/home/Calculators";
import { AISearch } from "@/components/home/AISearch";
import {
  Clients,
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiators />
      <Pillars />
      <Milestones />
      <ProcessSteps />
      <Calculators />
      <AISearch />
      <Clients />
      <SocialSection />
      <Research />
      <ListProperty />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
