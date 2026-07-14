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
    images: ["/showcase/warehouse.jpg"],
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
    images: ["/showcase/land.jpg"],
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
    images: ["/showcase/commercial.jpg"],
    documents: [],
    coordinates: { lat: 18.5590, lng: 73.7868 },
    broker: ADVISORY_DESK,
    amenities: [
      "Fitted core",
      "100% power backup",
      "4 car parks / 1,000 sq ft",
      "Food court in complex",
    ],
    featured: true,
    seoDescription:
      "24,000 sq ft commercial office floor for lease in Baner, Pune — fitted core, highway access. MindCept Consulting commercial leasing.",
  },
];

/**
 * REPRESENTATIVE MARKET ASSETS.
 *
 * Real, third-party developments shown to illustrate the asset classes
 * MindCept advises on. These are NOT MindCept-owned or MindCept-developed —
 * ownership and development remain with the respective developers, and every
 * card/detail page carries an advisory disclaimer plus a link to the official
 * developer website.
 *
 * Content policy: only publicly available, non-fabricated facts are used —
 * development name, developer, city/corridor, asset class and the official
 * website. No area, pricing, availability, possession dates or specifications
 * are asserted. Imagery uses neutral premium repository placeholders (never
 * scraped developer assets); the "Official website" link points to the
 * authoritative source for details.
 */
const advisoryHighlights = (lines: string[]) => lines;

export const representativeAssets: Property[] = [
  /* ── 1 · Industrial — Representative Grade-A Industrial Parks ── */
  {
    slug: "hipark-maharashtra",
    title: "HiPark Maharashtra",
    description:
      "HiPark's Grade-A industrial and logistics platform in Maharashtra — representative of the institutional-grade industrial parks MindCept advises manufacturing and logistics occupiers on. Ownership and development remain with HiParks.",
    city: "Maharashtra",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Industrial",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/industrial-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Grade-A industrial & logistics park platform",
      "Located in the Maharashtra industrial belt",
      "Suited to manufacturing and warehousing occupiers",
      "Asset class MindCept advises on — leasing, acquisition and diligence",
    ]),
    representative: true,
    developer: "HiParks",
    assetClass: "Grade-A Industrial & Logistics Park",
    officialWebsite: "https://www.hiparks.com/maharashtra",
    seoDescription:
      "HiPark Maharashtra — a representative Grade-A industrial & logistics park. MindCept provides advisory and transaction services across similar institutional industrial assets.",
  },
  {
    slug: "esr-talegaon",
    title: "ESR Talegaon",
    description:
      "ESR's Grade-A industrial and logistics park at Talegaon in the Pune region — representative of the institutional logistics stock MindCept advises on. Ownership and development remain with ESR.",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Industrial",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/industrial-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Grade-A industrial & logistics park",
      "Talegaon — established Pune industrial corridor",
      "Suited to manufacturing, warehousing and logistics occupiers",
      "Asset class MindCept advises on — leasing, acquisition and diligence",
    ]),
    representative: true,
    developer: "ESR",
    assetClass: "Grade-A Industrial & Logistics Park",
    officialWebsite: "https://in.esr.com/parks/esr-talegaon",
    seoDescription:
      "ESR Talegaon — a representative Grade-A industrial & logistics park in the Pune region. MindCept advises occupiers and investors on similar institutional industrial assets.",
  },
  {
    slug: "indospace-industrial-parks",
    title: "IndoSpace Industrial Parks",
    description:
      "IndoSpace's network of Grade-A industrial and logistics parks across India — representative of the pan-India institutional industrial platforms MindCept advises on. Ownership and development remain with IndoSpace.",
    city: "Pan-India",
    state: "India",
    price: "Refer official website",
    propertyType: "Industrial",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/industrial-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Grade-A industrial & logistics park network",
      "Presence across multiple Indian industrial corridors",
      "Suited to manufacturing, warehousing and logistics occupiers",
      "Asset class MindCept advises on — leasing, acquisition and diligence",
    ]),
    representative: true,
    developer: "IndoSpace",
    assetClass: "Grade-A Industrial & Logistics Parks",
    officialWebsite: "https://www.indospace.in/linking-the-limitless/",
    seoDescription:
      "IndoSpace Industrial Parks — a representative pan-India Grade-A industrial & logistics platform. MindCept advises on similar institutional industrial assets.",
  },
  {
    slug: "orange-industrial-logistics-park-nagpur",
    title: "Orange Industrial & Logistics Park — Nagpur",
    description:
      "The Orange Industrial & Logistics Park (OILP) at Nagpur — representative of the Grade-A industrial and logistics parks in Central India that MindCept advises on. Ownership and development remain with the OILP developer.",
    city: "Nagpur",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Industrial",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/industrial-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Grade-A industrial & logistics park",
      "Nagpur — Central India logistics hub",
      "Suited to manufacturing, warehousing and logistics occupiers",
      "Asset class MindCept advises on — leasing, acquisition and diligence",
    ]),
    representative: true,
    developer: "Orange Industrial & Logistics Park (OILP)",
    assetClass: "Grade-A Industrial & Logistics Park",
    officialWebsite: "https://www.oilp.in/nagpur/",
    seoDescription:
      "Orange Industrial & Logistics Park, Nagpur — a representative Grade-A industrial & logistics park in Central India. MindCept advises on similar institutional industrial assets.",
  },

  /* ── 2 · Residential — Representative Premium Residential Developments ── */
  {
    slug: "panchshil-57-avenue",
    title: "Panchshil 57 Avenue",
    description:
      "Panchshil Realty's 57 Avenue, a premium residential development in Pune — representative of the premium residential stock MindCept advises on. Ownership and development remain with Panchshil Realty.",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Residential",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/residential.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Premium residential development",
      "Developed by Panchshil Realty, Pune",
      "Representative of premium residential assets MindCept advises on",
      "Advisory across acquisition, go-to-market and transaction support",
    ]),
    representative: true,
    developer: "Panchshil Realty",
    assetClass: "Premium Residential",
    officialWebsite: "https://www.panchshils57avenue.com/",
    seoDescription:
      "Panchshil 57 Avenue — a representative premium residential development in Pune. MindCept provides advisory services across similar residential assets.",
  },
  {
    slug: "global-riverfront",
    title: "Global Riverfront",
    description:
      "Global Group's Riverfront, a premium residential development in Pune — representative of the premium residential stock MindCept advises on. Ownership and development remain with Global Group.",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Residential",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/residential.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Premium residential development",
      "Developed by Global Group, Pune",
      "Representative of premium residential assets MindCept advises on",
      "Advisory across acquisition, go-to-market and transaction support",
    ]),
    representative: true,
    developer: "Global Group",
    assetClass: "Premium Residential",
    officialWebsite: "https://www.globalgroup-riverfront.com/",
    seoDescription:
      "Global Riverfront — a representative premium residential development in Pune. MindCept provides advisory services across similar residential assets.",
  },
  {
    slug: "lodha-camelot-kharadi",
    title: "Lodha Camelot — Kharadi",
    description:
      "Lodha Group's Camelot at Kharadi, Pune — representative of the premium residential stock MindCept advises on. Ownership and development remain with the Lodha Group (Macrotech Developers).",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Residential",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/residential.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Premium residential development",
      "Kharadi — established East Pune residential micro-market",
      "Developed by the Lodha Group (Macrotech Developers)",
      "Advisory across acquisition, go-to-market and transaction support",
    ]),
    representative: true,
    developer: "Lodha Group (Macrotech Developers)",
    assetClass: "Premium Residential",
    officialWebsite:
      "https://www.lodhagroup.com/projects/residential-property-in-pune/lodha-camelot-kharadi",
    seoDescription:
      "Lodha Camelot, Kharadi — a representative premium residential development in Pune. MindCept provides advisory services across similar residential assets.",
  },
  {
    slug: "godrej-hinjewadi",
    title: "Godrej Hinjewadi",
    description:
      "Godrej Properties' development at Hinjewadi, Pune — representative of the premium residential stock MindCept advises on. Ownership and development remain with Godrej Properties.",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Residential",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/residential.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Premium residential development",
      "Hinjewadi — West Pune IT & residential corridor",
      "Developed by Godrej Properties",
      "Advisory across acquisition, go-to-market and transaction support",
    ]),
    representative: true,
    developer: "Godrej Properties",
    assetClass: "Premium Residential",
    officialWebsite: "https://hinjewadi.godrej-projects.in",
    seoDescription:
      "Godrej Hinjewadi — a representative premium residential development in Pune's Hinjewadi corridor. MindCept provides advisory services across similar residential assets.",
  },

  /* ── 3 · Commercial / IT Parks — Representative Commercial Assets ── */
  {
    slug: "magarpatta-city",
    title: "Magarpatta City",
    description:
      "Magarpatta City, an integrated commercial and IT township at Hadapsar, Pune — representative of the institutional commercial and IT-park assets MindCept advises corporate occupiers on. Ownership and development remain with the Magarpatta developer.",
    city: "Pune",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Commercial / Office",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/it-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Integrated commercial & IT township",
      "Hadapsar — established East Pune commercial hub",
      "Representative of IT-park assets MindCept advises occupiers on",
      "Advisory across leasing, occupier strategy and transactions",
    ]),
    representative: true,
    developer: "Magarpatta Township Development & Construction Co.",
    assetClass: "Commercial / IT Park",
    officialWebsite: "https://magarpattacity.com/",
    seoDescription:
      "Magarpatta City — a representative integrated commercial & IT township in Pune. MindCept advises corporate occupiers across similar commercial assets.",
  },
  {
    slug: "embassy-office-parks",
    title: "Embassy Office Parks",
    description:
      "Embassy Group's office parks portfolio (Embassy Office Parks REIT) — representative of the institutional Grade-A office assets MindCept advises corporate occupiers on. Ownership and development remain with the Embassy Group.",
    city: "Bengaluru",
    state: "Karnataka",
    price: "Refer official website",
    propertyType: "Commercial / Office",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/it-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Institutional Grade-A office parks portfolio",
      "Developed by the Embassy Group (Embassy Office Parks REIT)",
      "Representative of office-park assets MindCept advises occupiers on",
      "Advisory across leasing, occupier strategy and transactions",
    ]),
    representative: true,
    developer: "Embassy Group (Embassy Office Parks REIT)",
    assetClass: "Commercial / Office Parks",
    officialWebsite: "https://www.embassyofficeparks.com/",
    seoDescription:
      "Embassy Office Parks — a representative institutional Grade-A office-parks portfolio. MindCept advises corporate occupiers across similar commercial assets.",
  },
  {
    slug: "mindspace-business-parks",
    title: "Mindspace Business Parks",
    description:
      "Mindspace Business Parks (sponsored by K Raheja Corp; Mindspace Business Parks REIT) — representative of the institutional Grade-A business-park assets MindCept advises corporate occupiers on. Ownership and development remain with K Raheja Corp.",
    city: "Mumbai",
    state: "Maharashtra",
    price: "Refer official website",
    propertyType: "Commercial / Office",
    status: "available",
    areaSqft: 0,
    images: ["/showcase/it-park.jpg"],
    documents: [],
    broker: ADVISORY_DESK,
    amenities: advisoryHighlights([
      "Institutional Grade-A business / IT parks",
      "Sponsored by K Raheja Corp (Mindspace Business Parks REIT)",
      "Representative of business-park assets MindCept advises occupiers on",
      "Advisory across leasing, occupier strategy and transactions",
    ]),
    representative: true,
    developer: "K Raheja Corp (Mindspace Business Parks REIT)",
    assetClass: "Commercial / IT Business Parks",
    officialWebsite:
      "https://www.mindspaceindia.com/common-cities/mumbai/commercial-properties/mumbai-tech-parks/",
    seoDescription:
      "Mindspace Business Parks — a representative institutional Grade-A business-parks portfolio. MindCept advises corporate occupiers across similar commercial assets.",
  },
];

/** MindCept advisory listings + representative market assets combined. */
export const allProperties: Property[] = [...properties, ...representativeAssets];

export function featuredProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function representativeProperties(): Property[] {
  return representativeAssets;
}
