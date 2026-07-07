import type {
  Differentiator,
  HeroSlide,
  Milestone,
  ProcessStep,
  ResearchItem,
  Stat,
} from "@/types/content";

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Where Strategy Meets Space",
    title: "Advisory that spans every {{stage}} of real estate.",
    lead: "Industrial, warehousing, land, commercial and capital markets — one integrated team, pan-India.",
  },
  {
    eyebrow: "Industrial",
    title: "Industrial real estate, {{driven by data}}.",
    lead: "Tailored, national-scale advice for occupiers, landlords, developers and investors.",
  },
  {
    eyebrow: "Warehousing",
    title: "Grade-A warehousing, {{sourced & secured}}.",
    lead: "Comprehensive supply-chain solutions that optimise every node of your network.",
  },
  {
    eyebrow: "Land & Capital",
    title: "From land to {{leaseback}}, under one roof.",
    lead: "Acquisition, valuation, investment sales and capital-markets advisory.",
  },
];

export const stats: Stat[] = [
  { value: "30", suffix: "+", label: "Aggregated years of experience" },
  { value: "12", suffix: " Mn+", label: "Sq ft transacted" },
  { value: "2,100", suffix: "+", label: "Acres of land" },
  { value: "₹1,000", suffix: " Cr+", label: "Transaction value" },
  { value: "300", suffix: "+", label: "Corporate clients" },
  { value: "30", suffix: "+", label: "Cities covered" },
];

export const milestones: Milestone[] = [
  {
    value: "30",
    suffix: "+",
    unit: "years",
    heading: "Aggregated 30+ years of experience",
    description:
      "A founding team whose combined, first-hand experience spans three decades across India’s real estate cycle.",
  },
  {
    value: "12",
    suffix: " Mn+",
    unit: "sq ft",
    heading: "Sales & leasing transacted",
    description: "Across industrial, warehousing and commercial mandates nationwide.",
  },
  {
    value: "2,100",
    suffix: "+",
    unit: "acres",
    heading: "Of land transactions executed",
    description: "Acquisition, valuation, partnerships and project advisory at scale.",
  },
  {
    value: "₹1,000",
    suffix: " Cr+",
    unit: "value",
    heading: "Aggregate transaction value",
    description: "Capital deployed and advised across asset classes.",
  },
  {
    value: "300",
    suffix: "+",
    unit: "clients",
    heading: "Corporate clients served",
    description: "From global occupiers to institutional investors and developers.",
  },
  {
    value: "30",
    suffix: "+",
    unit: "cities",
    heading: "Pan-India footprint",
    description:
      "Strong foothold in Tier I metros and emerging Tier II growth corridors.",
  },
];

export const differentiators: Differentiator[] = [
  {
    tag: "01 — Diligence",
    icon: "shield",
    heading: "Best-in-class Due Diligence",
    description:
      "Title, zoning, technical, financial and legal — every deal underwritten in-house before you commit, so the risks are known and priced.",
  },
  {
    tag: "02 — Data",
    icon: "data",
    heading: "A Data-Driven Approach",
    description:
      "Local, regional and national market data drives every recommendation — from site selection to pricing — not opinion or guesswork.",
  },
  {
    tag: "03 — Advisory",
    icon: "star",
    heading: "Genuinely Best Advisory",
    description:
      "A single, integrated team across the asset life cycle — client-first, conflict-free advice that aligns with your long-term success.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    icon: "needs",
    heading: "Understand Needs",
    description:
      "We map your space, location, power, compliance and budget requirements in precise detail.",
    chips: ["Operational & site specs", "Budget & timeline clarity"],
  },
  {
    index: "02",
    icon: "warehouse",
    heading: "Curate Options",
    description:
      "We present pre-verified, ready-to-occupy properties matched to your business case.",
    chips: ["Legal & title pre-checked", "Compare rent, infra & access"],
  },
  {
    index: "03",
    icon: "handshake",
    heading: "Negotiate & Close",
    description:
      "We secure the best commercial terms and manage documentation end-to-end.",
    chips: ["Best commercial terms", "Committed transaction timeline"],
  },
];

export const clientsRowA = [
  "Shell", "IKEA", "Amazon", "Bosch", "TATA", "Mercedes-Benz", "DHL",
  "Nestlé", "Honeywell", "Philips", "LG", "Decathlon", "Hero", "L’Oréal",
];

export const clientsRowB = [
  "Morgan Stanley", "ESR", "Indospace", "Blackstone", "Mapletree", "Sandvik",
  "Ericsson", "Kubota", "Atlas Copco", "Faurecia", "Schindler", "Geberit",
  "Haier", "Praj",
];

export const research: ResearchItem[] = [
  {
    slug: "india-warehousing-logistics-outlook",
    tag: "Warehousing",
    date: "Q2 2026",
    title: "India Warehousing & Logistics Market Outlook",
    summary:
      "Supply, absorption and rental trends across India’s Grade-A warehousing clusters, with corridor-level demand drivers.",
  },
  {
    slug: "industrial-land-price-index-tier-2",
    tag: "Industrial",
    date: "Q2 2026",
    title: "Industrial Land Price Index — Tier II Corridors",
    summary:
      "Land price movement across emerging Tier II industrial corridors, benchmarked against infrastructure readiness.",
  },
  {
    slug: "gcc-office-demand-tracker",
    tag: "Commercial",
    date: "Q1 2026",
    title: "GCC Office Demand Tracker — Top 8 Cities",
    summary:
      "Where Global Capability Centres are taking office space — take-up, micro-market concentration and outlook.",
  },
];

export const aiPrompts = [
  "Grade-A warehousing near Bhiwandi",
  "Industrial land rates: Chakan vs Sanand",
  "Where are GCCs taking office space?",
  "Build-to-suit options under 200,000 sq ft",
];

export const aiReplies: Record<string, string> = {
  default:
    "Based on MindCept’s live inventory and market data, here’s a shortlist of matched options with indicative rentals, infrastructure and title status. Connect with an advisor to view full diligence reports and arrange site visits.",
  "Grade-A warehousing near Bhiwandi":
    "Bhiwandi remains MMR’s core warehousing cluster. We’re tracking several Grade-A, pre-verified facilities here with strong last-mile connectivity. An advisor can share live availability, indicative rentals and title-checked options.",
  "Industrial land rates: Chakan vs Sanand":
    "Chakan (Pune) and Sanand (Ahmedabad) are both strong auto & engineering corridors with differing land economics and incentives. We can share a side-by-side on price/acre, infra readiness and approval timelines.",
  "Where are GCCs taking office space?":
    "Global Capability Centres are concentrating in established non-CBD corridors across Bengaluru, Hyderabad, Pune and NCR. Our GCC demand tracker maps where take-up is strongest right now.",
  "Build-to-suit options under 200,000 sq ft":
    "For BTS under 200,000 sq ft we typically structure pre-leased developments with vetted developers. Share your spec — power, clear height, dock ratio — and an advisor will return matched options.",
};

/** About page narrative — from the client requirement document, verbatim intent. */
export const aboutNarrative = [
  "It is known that real estate cannot be stolen or carried away. But keeping it stagnant never helped anyone either.",
  "Real estate needs to be nurtured — and that involves smart thinking, timely action and, above all, the correct MINDset. Cohesive planning and expert guidance, coupled with unique methods, help achieve desired results along with optimum returns; making this a conCEPT where the mind needs the right support and key insights to make the right decision.",
  "Keeping that thought in factual consideration, MINDCEPT was born — a platform to enable our clients to cultivate and magnify their real estate ideas with unique concepts, arrived at after decades of understanding the pulse of the real estate playing field from the ground up.",
];
