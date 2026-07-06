import type { Property } from "@/types/content";

/* Broker contact literals mirror content/site.ts — kept inline so this
   module stays runtime-import-free for the DB seed script. */
const ADVISORY_DESK = {
  name: "MindCept Advisory Desk",
  phone: "+91 95275 40404",
  email: "info@mindcept.in",
};

/**
 * Seed property listings for the Milestone-2 property platform.
 * REPRESENTATIVE listings pending live inventory from the founder — clearly
 * labelled as such in the UI while `ENABLE_PROPERTIES` remains a flag.
 * Image/document URLs stay empty until approved assets exist in R2.
 */
export const properties: Property[] = [
  {
    slug: "grade-a-warehouse-chakan-phase-2",
    title: "Grade-A Warehouse — Chakan Phase II",
    description:
      "Pre-verified Grade-A warehousing facility in Pune's Chakan industrial corridor. FM2-grade flooring, 12m clear height, ample docks and truck parking, strong last-mile connectivity to the Pune–Nashik highway. Title and compliance pre-checked by the MindCept diligence desk.",
    city: "Pune",
    state: "Maharashtra",
    price: "₹28 / sq ft / month (indicative)",
    propertyType: "Warehouse",
    status: "available",
    areaSqft: 150000,
    images: [],
    documents: [],
    coordinates: { lat: 18.7606, lng: 73.8636 },
    broker: ADVISORY_DESK,
    amenities: [
      "12m clear height",
      "FM2 flooring",
      "10 dock levellers",
      "Fire hydrant + sprinkler system",
      "24×7 security",
      "Truck parking",
    ],
    featured: true,
    seoDescription:
      "Grade-A warehouse for lease in Chakan, Pune — 150,000 sq ft, 12m clear height, FM2 flooring, title pre-checked. Advisory by MindCept Consulting.",
  },
  {
    slug: "industrial-land-chakan-talegaon",
    title: "Industrial Land — Chakan–Talegaon Belt",
    description:
      "Clear-title industrial land parcel in the Chakan–Talegaon manufacturing belt with highway frontage, industrial zoning in place and utilities at the boundary. Suitable for build-to-suit manufacturing or warehousing development.",
    city: "Pune",
    state: "Maharashtra",
    price: "Price on request",
    propertyType: "Land",
    status: "available",
    areaSqft: 435600, // 10 acres
    images: [],
    documents: [],
    coordinates: { lat: 18.7167, lng: 73.7333 },
    broker: ADVISORY_DESK,
    amenities: [
      "Industrial zoning",
      "Highway frontage",
      "Power at boundary",
      "Clear title (diligence pack available)",
    ],
    featured: true,
    seoDescription:
      "10-acre industrial land parcel in the Chakan–Talegaon belt, Pune — clear title, industrial zoning, highway frontage. MindCept Consulting land services.",
  },
  {
    slug: "commercial-office-baner-pune",
    title: "Commercial Office Floor — Baner, Pune",
    description:
      "Efficient office floor plate in Baner's commercial corridor, fitted core with flexible interiors, close to the Mumbai–Bengaluru highway. Suits GCC or corporate occupiers scaling in West Pune.",
    city: "Pune",
    state: "Maharashtra",
    price: "₹95 / sq ft / month (indicative)",
    propertyType: "Commercial / Office",
    status: "available",
    areaSqft: 24000,
    images: [],
    documents: [],
    coordinates: { lat: 18.5590, lng: 73.7868 },
    broker: ADVISORY_DESK,
    amenities: [
      "Fitted core",
      "100% power backup",
      "4 car parks / 1,000 sq ft",
      "Food court in complex",
    ],
    seoDescription:
      "24,000 sq ft commercial office floor for lease in Baner, Pune — fitted core, highway access. MindCept Consulting commercial leasing.",
  },
];

export function featuredProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
