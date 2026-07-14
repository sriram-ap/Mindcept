import type { IndiaZone, OfficeLocation } from "@/types/content";

/**
 * Our Reach — operating locations across India's industrial & logistics
 * corridors, plus the international presence.
 *
 * These represent MindCept's mandate coverage (Pune is the primary market;
 * others are active operating markets). Map coordinates are percentages on
 * the India map viewBox (0–100). See CHANGELOG_V1_2.md for the rationale
 * behind each city.
 */
export const locations: OfficeLocation[] = [
  /* ── West India ── */
  {
    slug: "pune",
    city: "Pune",
    region: "India",
    zone: "West India",
    kind: "office",
    map: { x: 21.4, y: 61.9 },
    focus: "Industrial & Warehousing",
    markets: ["Industrial", "Warehousing", "Build-to-Suit", "Land Advisory"],
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 18.2, y: 60.0 },
    focus: "Capital Markets & Commercial",
    markets: ["Capital Markets", "Commercial Offices", "Logistics"],
  },
  {
    slug: "nashik",
    city: "Nashik",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 21.1, y: 56.8 },
    focus: "Manufacturing & Industrial Land",
    markets: ["Manufacturing", "Industrial Land", "Automobile Corridor"],
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 17.2, y: 46.3 },
    focus: "Gujarat Industrial Belt",
    markets: ["Industrial", "Warehousing", "GIFT City"],
  },
  {
    slug: "vadodara",
    city: "Vadodara",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 19.2, y: 48.8 },
    focus: "Petrochem & Manufacturing",
    markets: ["Manufacturing", "Industrial Land", "DMIC Corridor"],
  },

  /* ── Central India ── */
  {
    slug: "nagpur",
    city: "Nagpur",
    region: "India",
    zone: "Central India",
    kind: "operations",
    map: { x: 38.2, y: 52.8 },
    focus: "Central India Logistics",
    markets: ["Warehouse Parks", "Distribution", "MIHAN"],
  },
  {
    slug: "indore",
    city: "Indore",
    region: "India",
    zone: "Central India",
    kind: "operations",
    map: { x: 27.8, y: 47.3 },
    focus: "Madhya Pradesh Industrial & Warehousing",
    markets: ["Warehousing", "Pithampur Industrial", "Distribution"],
  },

  /* ── North India ── */
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "India",
    zone: "North India",
    kind: "operations",
    map: { x: 32.1, y: 26.9 },
    focus: "North India Industrial & Logistics",
    markets: ["Industrial", "Warehousing", "Commercial Offices"],
  },

  /* ── South India ── */
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 33.4, y: 81.2 },
    focus: "GCC Offices & Data Centres",
    markets: ["GCC Offices", "Industrial", "Data Centres"],
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 42.0, y: 80.8 },
    focus: "Auto Corridor & Port Logistics",
    markets: ["Automobile Corridor", "Industrial", "Port Logistics"],
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 36.3, y: 65.8 },
    focus: "Commercial & Industrial Parks",
    markets: ["Commercial Offices", "Industrial Parks", "Warehousing"],
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 31.4, y: 87.9 },
    focus: "Engineering & Textiles Manufacturing",
    markets: ["Manufacturing", "Industrial Estates", "Warehousing"],
  },
  {
    slug: "sri-city",
    city: "Sri City",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 41.2, y: 79.2 },
    focus: "Integrated Business City",
    markets: ["Manufacturing", "Warehousing", "SEZ"],
  },

  /* ── East India ── */
  {
    slug: "visakhapatnam",
    city: "Visakhapatnam",
    region: "India",
    zone: "East India",
    kind: "operations",
    map: { x: 51.8, y: 64.8 },
    focus: "Port-led Industrial",
    markets: ["Port Logistics", "Industrial", "Petrochem"],
  },
  {
    slug: "guwahati",
    city: "Guwahati",
    region: "India",
    zone: "East India",
    kind: "operations",
    map: { x: 79.0, y: 35.5 },
    focus: "North-East Gateway",
    markets: ["Gateway Logistics", "Warehousing", "Distribution"],
  },

  /* ── International (only Dubai is active; others are future markets) ── */
  {
    slug: "dubai",
    city: "Dubai",
    region: "Middle East",
    kind: "office",
    status: "opening-soon",
    map: { x: 0, y: 0 }, // not plotted on the India map
    focus: "Middle East Real Estate Advisory",
    markets: ["Commercial", "Industrial", "Cross-border Capital"],
  },
];

/** India-map zone order (west → east reading flow). */
export const ZONE_ORDER: IndiaZone[] = [
  "West India",
  "Central India",
  "North India",
  "South India",
  "East India",
];

export function indiaLocations(): OfficeLocation[] {
  return locations.filter((l) => l.region === "India");
}

export function internationalLocations(): OfficeLocation[] {
  return locations.filter((l) => l.region !== "India");
}

/** Future international markets — named intent, NOT active offices. */
export const futureMarkets = ["Singapore", "Saudi Arabia"] as const;
