import type { Client } from "@/types/content";

/**
 * Client relationships. Names sourced from the V1.0 trusted-by lists and the
 * mindcept.in "Team Transaction Experience" wall (founder-supplied evidence).
 * Engagement descriptions are representative of the team's consolidated
 * transaction experience — pending founder sign-off per client.
 *
 * `logoUrl` stays empty until approved logo assets land in R2
 * (see docs/IMAGE_STORAGE_ARCHITECTURE.md); the UI renders monogram tiles
 * until then, so real logos require zero code change.
 */
export const clients: Client[] = [
  /* ── Featured (mindcept.in logo wall) ── */
  {
    slug: "tata",
    name: "TATA",
    categories: ["Manufacturing", "Corporate Occupiers", "Industrial"],
    industry: "Conglomerate",
    engagement: "Industrial & occupier transactions",
    description:
      "Transaction experience across group companies' industrial and commercial space requirements.",
    featured: true,
  },
  {
    slug: "kubota",
    name: "Kubota",
    categories: ["Manufacturing", "Industrial"],
    industry: "Agricultural machinery",
    engagement: "Industrial facility advisory",
    description:
      "Industrial real estate advisory for manufacturing operations in India.",
    featured: true,
  },
  {
    slug: "indospace",
    name: "IndoSpace",
    categories: ["Developers", "Warehousing", "Institutional Investors"],
    industry: "Industrial & logistics parks",
    engagement: "Leasing & land mandates",
    description:
      "Warehousing and industrial park leasing collaboration with India's largest logistics-parks platform.",
    featured: true,
  },
  {
    slug: "mtu",
    name: "MTU (Rolls-Royce Power Systems)",
    categories: ["Manufacturing", "Industrial", "Corporate Occupiers"],
    industry: "Power systems",
    engagement: "Industrial space transactions",
    description:
      "Space acquisition support for precision power-systems operations.",
    featured: true,
  },
  {
    slug: "amar-builders",
    name: "Amar Builders",
    categories: ["Developers"],
    industry: "Real estate development",
    engagement: "Development advisory",
    description:
      "Advisory and transaction support across residential and commercial developments in Pune.",
    featured: true,
  },
  {
    slug: "blackstone",
    name: "Blackstone",
    categories: ["Institutional Investors"],
    industry: "Private equity",
    engagement: "Capital-markets experience",
    description:
      "Team transaction experience across institutional-grade industrial and warehousing assets.",
    featured: true,
  },
  {
    slug: "amazon",
    name: "Amazon",
    categories: ["Corporate Occupiers", "Warehousing"],
    industry: "E-commerce & logistics",
    engagement: "Warehousing transactions",
    description:
      "Fulfilment and last-mile warehousing transaction experience across key corridors.",
    featured: true,
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "Automotive",
    engagement: "Industrial & office advisory",
    description:
      "Team experience across automotive manufacturing and corporate space requirements.",
    featured: true,
  },

  /* ── Corporate occupiers & manufacturing ── */
  {
    slug: "shell",
    name: "Shell",
    categories: ["Corporate Occupiers"],
    industry: "Energy",
    engagement: "Occupier advisory",
    description: "Corporate space transaction experience.",
  },
  {
    slug: "ikea",
    name: "IKEA",
    categories: ["Corporate Occupiers", "Warehousing"],
    industry: "Retail & home furnishing",
    engagement: "Retail & distribution space",
    description: "Large-format retail and distribution experience.",
  },
  {
    slug: "bosch",
    name: "Bosch",
    categories: ["Manufacturing", "Industrial"],
    industry: "Engineering & technology",
    engagement: "Industrial advisory",
    description: "Industrial facility transaction experience.",
  },
  {
    slug: "dhl",
    name: "DHL",
    categories: ["Warehousing", "Corporate Occupiers"],
    industry: "Logistics",
    engagement: "Warehousing & logistics space",
    description: "Grade-A warehousing transaction experience.",
  },
  {
    slug: "nestle",
    name: "Nestlé",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "FMCG",
    engagement: "Industrial & distribution space",
    description: "Manufacturing and distribution footprint experience.",
  },
  {
    slug: "honeywell",
    name: "Honeywell",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "Industrial technology",
    engagement: "Occupier advisory",
    description: "Industrial and office space transaction experience.",
  },
  {
    slug: "philips",
    name: "Philips",
    categories: ["Corporate Occupiers"],
    industry: "Health technology",
    engagement: "Occupier advisory",
    description: "Corporate space transaction experience.",
  },
  {
    slug: "lg",
    name: "LG",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "Consumer electronics",
    engagement: "Industrial & distribution space",
    description: "Manufacturing and distribution experience.",
  },
  {
    slug: "decathlon",
    name: "Decathlon",
    categories: ["Corporate Occupiers", "Warehousing"],
    industry: "Sports retail",
    engagement: "Retail & warehousing space",
    description: "Retail network and warehousing experience.",
  },
  {
    slug: "hero",
    name: "Hero",
    categories: ["Manufacturing", "Industrial"],
    industry: "Automotive",
    engagement: "Industrial advisory",
    description: "Automotive manufacturing space experience.",
  },
  {
    slug: "loreal",
    name: "L’Oréal",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "Beauty & personal care",
    engagement: "Distribution & office space",
    description: "Distribution and corporate space experience.",
  },
  {
    slug: "sandvik",
    name: "Sandvik",
    categories: ["Manufacturing", "Industrial"],
    industry: "Engineering",
    engagement: "Industrial advisory",
    description: "Engineering facility transaction experience.",
  },
  {
    slug: "ericsson",
    name: "Ericsson",
    categories: ["Corporate Occupiers"],
    industry: "Telecommunications",
    engagement: "Occupier advisory",
    description: "Corporate space transaction experience.",
  },
  {
    slug: "atlas-copco",
    name: "Atlas Copco",
    categories: ["Manufacturing", "Industrial"],
    industry: "Industrial equipment",
    engagement: "Industrial advisory",
    description: "Industrial facility transaction experience.",
  },
  {
    slug: "faurecia",
    name: "Faurecia",
    categories: ["Manufacturing", "Industrial"],
    industry: "Automotive components",
    engagement: "Industrial advisory",
    description: "Automotive component manufacturing space experience.",
  },
  {
    slug: "schindler",
    name: "Schindler",
    categories: ["Manufacturing", "Corporate Occupiers"],
    industry: "Elevators & escalators",
    engagement: "Industrial & office space",
    description: "Manufacturing and corporate space experience.",
  },
  {
    slug: "geberit",
    name: "Geberit",
    categories: ["Manufacturing"],
    industry: "Sanitary technology",
    engagement: "Industrial advisory",
    description: "Manufacturing facility experience.",
  },
  {
    slug: "haier",
    name: "Haier",
    categories: ["Manufacturing"],
    industry: "Home appliances",
    engagement: "Industrial & distribution space",
    description: "Manufacturing and distribution experience.",
  },
  {
    slug: "praj",
    name: "Praj",
    categories: ["Manufacturing", "Industrial"],
    industry: "Bio-industrial engineering",
    engagement: "Industrial advisory",
    description: "Industrial campus transaction experience.",
  },

  /* ── Institutional investors & developers ── */
  {
    slug: "morgan-stanley",
    name: "Morgan Stanley",
    categories: ["Institutional Investors"],
    industry: "Investment banking",
    engagement: "Capital-markets experience",
    description: "Institutional capital-markets transaction experience.",
  },
  {
    slug: "esr",
    name: "ESR",
    categories: ["Developers", "Institutional Investors", "Warehousing"],
    industry: "Logistics real estate",
    engagement: "Warehousing & land mandates",
    description: "Logistics parks leasing and land experience.",
  },
  {
    slug: "mapletree",
    name: "Mapletree",
    categories: ["Institutional Investors", "Developers"],
    industry: "Real estate investment",
    engagement: "Institutional mandates",
    description: "Institutional industrial asset experience.",
  },
];

export function featuredClients(): Client[] {
  return clients.filter((c) => c.featured);
}

export const clientCategories = [
  "Industrial",
  "Warehousing",
  "Developers",
  "Institutional Investors",
  "Manufacturing",
  "Corporate Occupiers",
] as const;
