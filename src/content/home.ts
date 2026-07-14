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
    lead: "Strategic real estate advisory across industrial, commercial, residential, warehousing, land and capital markets — Pan-India expertise, regional market intelligence.",
  },
  {
    eyebrow: "Industrial",
    title: "Industrial real estate, {{driven by data}}.",
    lead: "National-scale advice for occupiers, developers and investors.",
  },
  {
    eyebrow: "Warehousing",
    title: "Grade-A warehousing, {{sourced & secured}}.",
    lead: "Supply-chain real estate, from network design to keys.",
  },
  {
    eyebrow: "Land & Capital",
    title: "From land to {{leaseback}}, under one roof.",
    lead: "Acquisition, valuation and capital-markets advisory.",
  },
];

export const stats: Stat[] = [
  { value: "35", suffix: "+", label: "Years of collective expertise" },
  { value: "12", suffix: " Mn+", label: "Sq ft transacted" },
  { value: "2,100", suffix: "+", label: "Acres of land" },
  { value: "₹2,000", suffix: " Cr+", label: "Transactions facilitated" },
  { value: "300", suffix: "+", label: "Corporate clients" },
  { value: "30", suffix: "+", label: "Cities covered" },
];

export const milestones: Milestone[] = [
  {
    value: "35",
    suffix: "+",
    unit: "years",
    heading: "35+ years of collective expertise",
    description:
      "A founding team whose combined, first-hand experience spans more than three decades of India’s real estate cycle.",
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
    value: "₹2,000",
    suffix: " Cr+",
    unit: "value",
    heading: "Transactions facilitated",
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
      "Local, regional and national market data drives every recommendation — from site selection to pricing — driven by knowledge, not assumptions.",
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
  "Real estate decisions shape the future of businesses, investments and communities. At MindCept, we ensure those decisions are backed by expertise, insight and strategic foresight.",
  "MindCept is a leading real estate advisory and transaction consulting firm with over 35 years of collective industry experience, delivering comprehensive solutions across industrial, commercial, investment and residential real estate. We partner with corporates, investors, developers, landlords and high-net-worth individuals, helping them navigate an evolving landscape with confidence and clarity.",
  "Our track record reflects a legacy of trust and performance — over ₹2,000 crores in facilitated transactions and more than 12 million sq ft of successfully transacted real estate, with deep specialisation across MIDC regions and key industrial development corridors.",
  "From strategic site selection and due diligence to statutory approvals, government liaison, legal compliance, commercial negotiations and transaction management, we provide seamless end-to-end advisory. Guided by integrity, transparency and a client-first approach, we believe real estate is more than an asset — it is a catalyst for business growth and long-term value creation.",
];

/** USPs — client-approved positioning (Website_Content.docx). */
export const usps = [
  {
    title: "Strategic thinking. Practical execution.",
    body: "Exceptional outcomes are realised when informed judgement is matched by disciplined execution. This principle underpins every strategy we develop and every mandate we deliver.",
  },
  {
    title: "Beyond transactions. Built for business.",
    body: "Every assignment is approached through the lens of business strategy, ensuring real estate decisions strengthen operational capability, investment performance and long-term organisational objectives.",
  },
  {
    title: "Confidence through partnership.",
    body: "The value of an advisory relationship is measured by the confidence it creates. We cultivate enduring partnerships through objective counsel, unwavering integrity and an uncompromising commitment to our clients\u2019 success.",
  },
  {
    title: "Complexity, simplified.",
    body: "The most complex transactions require clarity, structure and foresight. We orchestrate every stage with precision, enabling clients to move forward with certainty in a dynamic market.",
  },
  {
    title: "Expertise that endures.",
    body: "Enduring expertise is built through consistency, not circumstance. Our disciplined approach, deep industry knowledge and commitment to excellence define every engagement.",
  },
] as const;

/** Core values — client-approved (Website_Content.docx). */
export const coreValues = [
  { title: "Stewardship", body: "We protect every client\u2019s interests with the same diligence and responsibility we would expect for our own." },
  { title: "Foresight", body: "The best decisions are informed by perspective, preparation and the ability to anticipate what\u2019s next." },
  { title: "Precision", body: "Every recommendation, analysis and execution is approached with discipline, attention to detail and professional rigour." },
  { title: "Partnership", body: "Strong relationships are built through collaboration, mutual respect and a shared commitment to meaningful outcomes." },
  { title: "Commitment", body: "Our responsibility extends beyond the transaction — every engagement is supported with consistency, responsiveness and long-term dedication." },
] as const;

export const vision =
  "To redefine the standards of real estate advisory through insight, integrity and innovation — becoming the trusted partner behind every significant real estate decision.";

export const mission =
  "To deliver intelligent advisory, seamless execution and client-focused solutions through expertise, integrity and an unwavering commitment to excellence in every engagement.";
