import type { IndiaZone } from "@/types/content";

/**
 * Coverage capability data for the "Our Reach" experience — regional
 * capability cards and industrial-corridor view. This frames MindCept's
 * geography as consulting *capability* (sectors + services), not just pins.
 *
 * Sub-city industrial nodes (Chakan, Sanand, Hosur, Aurangabad) are
 * represented here as corridors rather than separate map markers — see
 * docs/LOCATION_RATIONALE.md.
 */

export interface RegionalCapability {
  zone: IndiaZone | "Middle East";
  cities: string;
  industries: string[];
  capabilities: string[];
}

export const regionalCapabilities: RegionalCapability[] = [
  {
    zone: "West India",
    cities: "Pune · Mumbai · Nashik · Ahmedabad · Vadodara",
    industries: ["Automotive", "Engineering", "Warehousing", "Pharma"],
    capabilities: ["Industrial", "Warehouse", "Land Advisory", "Capital Markets"],
  },
  {
    zone: "Central India",
    cities: "Nagpur · Indore",
    industries: ["Logistics", "FMCG Distribution", "Auto Components"],
    capabilities: ["Warehouse Parks", "Distribution", "Industrial Land"],
  },
  {
    zone: "North India",
    cities: "Delhi NCR",
    industries: ["E-commerce", "Electronics", "Auto Components"],
    capabilities: ["Industrial", "Warehouse", "Occupier Advisory"],
  },
  {
    zone: "South India",
    cities: "Bangalore · Chennai · Hyderabad · Coimbatore · Sri City",
    industries: ["GCC / IT", "Automotive", "Electronics", "Data Centres"],
    capabilities: ["Commercial Offices", "Industrial", "Warehouse", "Data Centres"],
  },
  {
    zone: "East India",
    cities: "Visakhapatnam · Guwahati",
    industries: ["Ports & Petrochem", "Gateway Logistics"],
    capabilities: ["Port Logistics", "Industrial", "Warehouse"],
  },
  {
    zone: "Middle East",
    cities: "Dubai",
    industries: ["Cross-border Capital", "Commercial", "Industrial"],
    capabilities: ["Advisory", "Capital Markets", "Occupier Advisory"],
  },
];

export interface IndustrialCorridor {
  slug: string;
  name: string;
  region: IndiaZone;
  sectors: string[];
  capabilities: string[];
}

export const corridors: IndustrialCorridor[] = [
  {
    slug: "mumbai-pune-belt",
    name: "Mumbai–Pune Belt",
    region: "West India",
    sectors: ["Automotive (Chakan)", "Engineering", "Warehousing"],
    capabilities: ["Industrial", "Warehouse", "Land", "Capital Markets"],
  },
  {
    slug: "nashik-manufacturing",
    name: "Nashik Manufacturing Belt",
    region: "West India",
    sectors: ["Automobile", "Engineering (Sinnar / Ambad)"],
    capabilities: ["Industrial", "Land", "Occupier Advisory"],
  },
  {
    slug: "ahmedabad-sanand",
    name: "Ahmedabad–Sanand",
    region: "West India",
    sectors: ["Automotive (Sanand)", "Electronics", "GIFT City"],
    capabilities: ["Industrial", "Warehouse", "Land"],
  },
  {
    slug: "nagpur-logistics",
    name: "Nagpur Logistics Hub",
    region: "Central India",
    sectors: ["Multi-modal (MIHAN)", "Distribution", "FMCG"],
    capabilities: ["Warehouse Parks", "Distribution", "Land"],
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    region: "North India",
    sectors: ["E-commerce (Noida/Gurugram)", "Electronics", "Auto Components"],
    capabilities: ["Industrial", "Warehouse", "Occupier Advisory"],
  },
  {
    slug: "hyderabad-corridor",
    name: "Hyderabad Corridor",
    region: "South India",
    sectors: ["Pharma", "Data Centres", "Industrial Parks"],
    capabilities: ["Commercial", "Industrial", "Data Centres"],
  },
  {
    slug: "chennai-sri-city",
    name: "Chennai–Sri City",
    region: "South India",
    sectors: ["Automotive (Hosur belt)", "Electronics", "Manufacturing SEZ"],
    capabilities: ["Industrial", "Warehouse", "Occupier Advisory"],
  },
];
