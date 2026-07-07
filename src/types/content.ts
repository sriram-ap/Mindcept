/**
 * Content-layer types.
 *
 * All marketing content is structured data (see src/content/) so it can be
 * moved to a headless CMS later without touching presentation components.
 */

export type IconName =
  | "factory"
  | "warehouse"
  | "land"
  | "building"
  | "home"
  | "retail"
  | "server"
  | "gavel"
  | "chart"
  | "blueprint"
  | "shield"
  | "data"
  | "star"
  | "search"
  | "handshake"
  | "needs";

/** A practice area grouping related service lines. */
export interface Pillar {
  slug: string;
  index: string;
  icon: IconName;
  title: string;
  blurb: string;
  /** Slugs of the services within this pillar, in display order. */
  children: string[];
}

/** A service landing page (/services/[slug]). */
export interface Service {
  slug: string;
  /** Slug of the parent pillar. */
  parent: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  promise: string;
  advantage: { label: string; value: string };
  leadHeading: string;
  lead: string;
  /** [heading, description] highlight cards. */
  highlights: [string, string][];
  blockTitle: string;
  /** [heading, description] process / focus cards. */
  process: [string, string][];
  seoDescription: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

export interface Milestone {
  value: string;
  suffix: string;
  unit: string;
  heading: string;
  description: string;
}

export interface Differentiator {
  tag: string;
  icon: IconName;
  heading: string;
  description: string;
}

export interface ProcessStep {
  index: string;
  icon: IconName;
  heading: string;
  description: string;
  chips: string[];
}

export interface HeroSlide {
  eyebrow: string;
  /** Title; wrap the emphasised phrase in {{…}} for accent styling. */
  title: string;
  lead: string;
}

export interface ResearchItem {
  slug: string;
  tag: string;
  date: string;
  title: string;
  summary: string;
}

export interface SocialChannel {
  key: "instagram" | "linkedin" | "facebook" | "youtube";
  name: string;
  handle: string;
  description: string;
  url: string;
}

/* ── V1.1: credibility & property platform ── */

export type ClientCategory =
  | "Industrial"
  | "Warehousing"
  | "Developers"
  | "Institutional Investors"
  | "Manufacturing"
  | "Corporate Occupiers";

/** A client relationship shown on /clients and the Trusted By section. */
export interface Client {
  slug: string;
  name: string;
  categories: ClientCategory[];
  industry: string;
  engagement: string;
  year?: string;
  description: string;
  /** R2/CDN URL once the approved logo asset exists; monogram tile until then. */
  logoUrl?: string;
  featured?: boolean;
}

/** Regional grouping for the Our Reach directory. */
export type IndiaZone =
  | "West India"
  | "South India"
  | "North India"
  | "East India"
  | "Central India";

/** An office / operating location on the Our Reach map. */
export interface OfficeLocation {
  slug: string;
  city: string;
  region: "India" | "Middle East" | "APAC" | "Global";
  /** Sub-national grouping (India cities only). */
  zone?: IndiaZone;
  kind: "office" | "operations";
  /** e.g. Dubai — announced but not yet open. */
  status?: "opening-soon";
  /** Percentage coordinates on the India map viewBox (India cities only). */
  map: { x: number; y: number };
  /** One-line business focus. */
  focus: string;
  /** Markets served (rendered as chips). */
  markets: string[];
  /** Optional longer summary. */
  blurb?: string;
}

/** Metadata for a file uploaded via an enquiry form (URL only — bytes live in R2). */
export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  contentType: string;
  uploadedAt: string;
}

export type PropertyType =
  | "Industrial"
  | "Warehouse"
  | "Land"
  | "Commercial / Office"
  | "Retail";

export type PropertyStatus = "available" | "leased" | "sold" | "upcoming";

/** A property listing (Milestone 2 platform; storage-agnostic). */
export interface Property {
  slug: string;
  title: string;
  description: string;
  city: string;
  state: string;
  price: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  areaSqft: number;
  /** R2/CDN URLs; empty until approved assets exist. */
  images: string[];
  documents: { label: string; url: string }[];
  coordinates?: { lat: number; lng: number };
  broker: { name: string; phone: string; email: string };
  amenities: string[];
  featured?: boolean;
  seoDescription: string;
}
