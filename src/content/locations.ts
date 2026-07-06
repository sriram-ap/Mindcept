import type { OfficeLocation } from "@/types/content";

/**
 * Our Reach — operating locations (per mindcept.in "Our Reach").
 * Map coordinates are percentages on the IndiaMap viewBox (0–100).
 * The `region` field keeps the model ready for global offices.
 */
export const locations: OfficeLocation[] = [
  {
    slug: "pune",
    city: "Pune",
    region: "India",
    kind: "office",
    map: { x: 30, y: 58 },
    blurb: "Headquarters — industrial, warehousing and land advisory.",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "India",
    kind: "operations",
    map: { x: 25.5, y: 54 },
    blurb: "MMR warehousing, commercial and capital-markets mandates.",
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    region: "India",
    kind: "operations",
    map: { x: 41, y: 26 },
    blurb: "North India industrial & logistics corridors.",
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "India",
    kind: "operations",
    map: { x: 38, y: 75 },
    blurb: "GCC offices, industrial and data-centre advisory.",
  },
  {
    slug: "chennai",
    city: "Chennai",
    region: "India",
    kind: "operations",
    map: { x: 45.5, y: 77 },
    blurb: "Auto-corridor industrial and port-led logistics.",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "India",
    kind: "operations",
    map: { x: 41, y: 62 },
    blurb: "Commercial offices and industrial parks.",
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    region: "India",
    kind: "operations",
    map: { x: 24, y: 42 },
    blurb: "Gujarat industrial belt — Sanand, Becharaji, GIFT City.",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    region: "India",
    kind: "operations",
    map: { x: 63, y: 44 },
    blurb: "Eastern India warehousing and distribution.",
  },
  {
    slug: "guwahati",
    city: "Guwahati",
    region: "India",
    kind: "operations",
    map: { x: 74, y: 34 },
    blurb: "North-East gateway logistics.",
  },
  {
    slug: "sri-city",
    city: "Sri City",
    region: "India",
    kind: "operations",
    map: { x: 44, y: 72 },
    blurb: "Integrated business city — manufacturing & warehousing.",
  },
];

export function indiaLocations(): OfficeLocation[] {
  return locations.filter((l) => l.region === "India");
}
