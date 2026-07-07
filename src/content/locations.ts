import type { IndiaZone, OfficeLocation } from "@/types/content";

/**
 * Our Reach — operating locations across India's industrial & logistics
 * corridors, plus the international presence.
 *
 * These represent MindCept's mandate coverage (only Pune is a physical HQ;
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
    map: { x: 31, y: 64 },
    focus: "Headquarters — Industrial & Warehousing",
    markets: ["Industrial", "Warehousing", "Built-to-Suit", "Land Advisory"],
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 27, y: 60 },
    focus: "Capital Markets & Commercial",
    markets: ["Capital Markets", "Commercial Offices", "Logistics"],
  },
  {
    slug: "nashik",
    city: "Nashik",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 30, y: 57 },
    focus: "Manufacturing & Industrial Land",
    markets: ["Manufacturing", "Industrial Land", "Automobile Corridor"],
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 25, y: 48 },
    focus: "Gujarat Industrial Belt",
    markets: ["Industrial", "Warehousing", "GIFT City"],
  },
  {
    slug: "vadodara",
    city: "Vadodara",
    region: "India",
    zone: "West India",
    kind: "operations",
    map: { x: 28, y: 50 },
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
    map: { x: 46, y: 54 },
    focus: "Central India Logistics",
    markets: ["Warehouse Parks", "Distribution", "MIHAN"],
  },
  {
    slug: "indore",
    city: "Indore",
    region: "India",
    zone: "Central India",
    kind: "operations",
    map: { x: 37, y: 49 },
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
    map: { x: 43, y: 26 },
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
    map: { x: 39, y: 88 },
    focus: "GCC Offices & Data Centres",
    markets: ["GCC Offices", "Industrial", "Data Centres"],
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 47, y: 88 },
    focus: "Auto Corridor & Port Logistics",
    markets: ["Automobile Corridor", "Industrial", "Port Logistics"],
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 44, y: 66 },
    focus: "Commercial & Industrial Parks",
    markets: ["Commercial Offices", "Industrial Parks", "Warehousing"],
  },
  {
    slug: "coimbatore",
    city: "Coimbatore",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 38, y: 93 },
    focus: "Engineering & Textiles Manufacturing",
    markets: ["Manufacturing", "Industrial Estates", "Warehousing"],
  },
  {
    slug: "sri-city",
    city: "Sri City",
    region: "India",
    zone: "South India",
    kind: "operations",
    map: { x: 46, y: 84 },
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
    map: { x: 54, y: 63 },
    focus: "Port-led Industrial",
    markets: ["Port Logistics", "Industrial", "Petrochem"],
  },
  {
    slug: "guwahati",
    city: "Guwahati",
    region: "India",
    zone: "East India",
    kind: "operations",
    map: { x: 80, y: 36 },
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
