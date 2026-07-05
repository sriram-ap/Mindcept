import type { Pillar, Service } from "@/types/content";

/**
 * Four practice pillars, each with three service lines.
 * IA and copy sourced from the approved design prototype
 * (Mindcept_Webpage_Design_New.html) and the client requirement document.
 */
export const pillars: Pillar[] = [
  {
    slug: "industrial-investment-advisory",
    index: "01",
    icon: "factory",
    title: "Industrial & Investment Advisory",
    blurb:
      "Site, space and capital strategy for India’s industrial economy — from land to leaseback.",
    children: ["industrial", "warehousing", "land-services"],
  },
  {
    slug: "transaction-advisory",
    index: "02",
    icon: "home",
    title: "Transaction Advisory",
    blurb:
      "Demand generation, leasing and go-to-market across residential, commercial and retail.",
    children: ["residential-services", "commercial-leasing", "retail-leasing"],
  },
  {
    slug: "integrated-real-estate-services",
    index: "03",
    icon: "server",
    title: "Delivering Integrated Real Estate Services",
    blurb:
      "Specialised mandates across niche assets, distressed acquisitions and capital markets.",
    children: ["specialty-development", "bank-auction-assets", "investment-sales"],
  },
  {
    slug: "project-management",
    index: "04",
    icon: "blueprint",
    title: "Project Management",
    blurb: "Design-led delivery and on-site execution under one accountable team.",
    children: ["design-and-build", "redevelopment-pmc", "cost-quality-schedule"],
  },
];

export const services: Service[] = [
  /* ── Pillar 1 · Industrial & Investment Advisory ── */
  {
    slug: "industrial",
    parent: "industrial-investment-advisory",
    icon: "factory",
    eyebrow: "Industrial Services",
    title: "Industrial Real Estate Excellence",
    promise:
      "Bespoke advice and integrated national service geared to the needs of every key stakeholder.",
    advantage: {
      label: "Core focus",
      value:
        "Localized market knowledge combined with a strategic national perspective to drive efficiency.",
    },
    leadHeading: "Localized knowledge, national scale.",
    lead: "Our team delivers a fully integrated national service across the entire spectrum of logistics, industrial and commercial real estate. By combining localized market knowledge with a strategic national perspective, we provide tailored solutions that drive efficiency, maximise value and meet each client’s specific business objectives across India.",
    highlights: [
      ["Bespoke Advice", "Custom strategies for unique client requirements."],
      ["National Scale", "Integrated service across all major markets."],
      ["Market Intelligence", "Data-driven insights for informed decisions."],
      ["Value Maximization", "Focused on long-term asset performance."],
    ],
    blockTitle: "Client segments & focus areas",
    process: [
      ["Occupiers", "Operational efficiency & cost optimization"],
      ["Landlords", "Tenant retention & asset marketing"],
      ["Developers", "Land acquisition & project advisory"],
      ["Investors", "Capital deployment & yield maximization"],
      ["Logistics", "Supply-chain network optimization"],
      ["Commercial", "Industrial park & mixed-use advisory"],
    ],
    seoDescription:
      "Industrial real estate advisory for occupiers, landlords, developers and investors — localized market knowledge with national scale across India.",
  },
  {
    slug: "warehousing",
    parent: "industrial-investment-advisory",
    icon: "warehouse",
    eyebrow: "Logistics & Warehousing",
    title: "Strategic Supply Chain Integration",
    promise:
      "Comprehensive warehousing solutions that prioritise your business requirements and optimise logistics efficiency.",
    advantage: {
      label: "Key advantage",
      value:
        "Data-driven insights — full knowledge of local, regional and national data trends.",
    },
    leadHeading: "Real estate, supply chain and strategy — integrated.",
    lead: "Keeping our clients’ requirements as the priority, our warehousing services combine real estate, supply-chain management and strategic advice into a single offering. We conduct business management and negotiations armed with deep market intelligence to optimise every node of your network.",
    highlights: [
      ["Client Priority", "Solutions tailored strictly to operational needs."],
      ["Integrated Approach", "Merging real estate with supply-chain strategy."],
      ["Market Intelligence", "Leveraging local, regional and national statistics."],
      ["Global Reach", "Insights supplied through extensive operations."],
    ],
    blockTitle: "Strategic execution process",
    process: [
      ["Data Analysis", "Trends & statistics evaluation"],
      ["Strategic Planning", "Location & network design"],
      ["Negotiations", "Market-backed deal structuring"],
      ["Implementation", "Real estate & supply-chain setup"],
      ["Management", "Business & operational oversight"],
      ["Optimization", "Continuous improvement strategy"],
    ],
    seoDescription:
      "Grade-A warehousing and logistics advisory — integrated real estate, supply-chain and negotiation expertise across India’s key corridors.",
  },
  {
    slug: "land-services",
    parent: "industrial-investment-advisory",
    icon: "land",
    eyebrow: "Land Services",
    title: "Strategic Land Solutions",
    promise:
      "Unlocking value through expert land acquisition, valuation and development advisory tailored to your goals.",
    advantage: {
      label: "Experience",
      value:
        "Over two decades of expertise — customised solutions aligned with long-term strategic growth.",
    },
    leadHeading: "Two decades of end-to-end land expertise.",
    lead: "With over two decades of expertise in land transactions, we provide customised solutions tailored to clients’ goals through thorough market analysis and strategic planning. We prioritise strong stakeholder relationships for a smooth process from consultation to execution — across acquisition, valuation, strategic partnerships and project advisory.",
    highlights: [
      ["Strategic Planning", "Customised strategies tailored to client objectives."],
      ["Market Analysis", "Thorough trend monitoring and data-driven insight."],
      ["Complex Issues", "Navigating legal and regulatory land challenges."],
      ["Sustainable Growth", "Innovative strategies to exceed expectations."],
    ],
    blockTitle: "Land life-cycle management",
    process: [
      ["Consultation", "Defining goals & requirements"],
      ["Market Analysis", "Feasibility & valuation study"],
      ["Stakeholders", "Relationship management"],
      ["Execution", "Smooth transaction processing"],
      ["Expansion", "Portfolio growth support"],
      ["Divestment", "Strategic asset disposition"],
    ],
    seoDescription:
      "Land acquisition, valuation, strategic partnerships and project advisory — two decades of end-to-end land transaction expertise.",
  },

  /* ── Pillar 2 · Transaction Advisory ── */
  {
    slug: "residential-services",
    parent: "transaction-advisory",
    icon: "home",
    eyebrow: "Residential Services",
    title: "Residential Go-To-Market & Sales",
    promise:
      "Project study and go-to-market strategy that strengthen positioning and accelerate inventory movement.",
    advantage: {
      label: "Powered by",
      value: "Market intelligence, AI-led strategy and technology-enabled execution.",
    },
    leadHeading: "Position the project. Generate qualified demand. Convert.",
    lead: "Sales and marketing services designed to strengthen residential project positioning, generate qualified demand and improve conversions. Powered by market intelligence, AI-led strategies and technology-enabled execution, we help developers accelerate inventory movement and maximise project visibility.",
    highlights: [
      ["Project Study", "Deep feasibility and positioning analysis."],
      ["Go-To-Market Strategy", "A clear launch and pricing playbook."],
      ["Qualified Demand", "Targeted, technology-enabled lead generation."],
      ["Higher Conversions", "Sales governance that improves velocity."],
    ],
    blockTitle: "Engagement process",
    process: [
      ["Project Study", "Product & micro-market analysis"],
      ["Positioning", "Differentiation & pricing strategy"],
      ["Go-To-Market", "Launch & channel planning"],
      ["Digital & AI", "AI-led demand generation"],
      ["Sales Governance", "Funnel & conversion management"],
      ["Inventory Velocity", "Accelerated absorption tracking"],
    ],
    seoDescription:
      "Residential project positioning, go-to-market strategy and sales governance — AI-led demand generation for developers.",
  },
  {
    slug: "commercial-leasing",
    parent: "transaction-advisory",
    icon: "building",
    eyebrow: "Commercial Leasing",
    title: "Office Real Estate Excellence",
    promise:
      "Integrated, single-point office advisory across the asset’s full life cycle.",
    advantage: {
      label: "Key advantage",
      value:
        "Single point of contact — seamless execution tailored to your business objectives.",
    },
    leadHeading: "One team across every phase of the asset.",
    lead: "Leveraging our extensive network of owners, occupiers, consultants and market influencers, we provide a distinct advantage in office real estate. With a vast network, our experts deliver a fully integrated office approach, guiding you through every phase of the asset’s life cycle to ensure value maximisation.",
    highlights: [
      ["Extensive Network", "Access to key influencers and off-market deals."],
      ["Tailored Solutions", "Strategies aligned with business goals."],
      ["Risk Mitigation", "Comprehensive due diligence and legal support."],
      ["Cost Optimization", "Strategic financial analysis and negotiation."],
    ],
    blockTitle: "Asset life-cycle management",
    process: [
      ["Strategic Planning", "Needs analysis & portfolio strategy"],
      ["Site Selection", "Market search & location analysis"],
      ["Transactions", "Lease negotiations & financial analysis"],
      ["Facility Mgmt.", "Operational efficiency & maintenance"],
      ["Renewal / Review", "Lease restructuring & optimization"],
      ["Disposition", "Exit strategy & asset sales"],
    ],
    seoDescription:
      "Integrated office leasing advisory — site selection, lease negotiation and portfolio strategy across the asset life cycle.",
  },
  {
    slug: "retail-leasing",
    parent: "transaction-advisory",
    icon: "retail",
    eyebrow: "Retail Leasing",
    title: "Retail Leasing & Brand Expansion",
    promise:
      "Trade-area intelligence and leasing execution for malls, high streets and retail brands.",
    advantage: {
      label: "Key advantage",
      value: "Catchment and footfall analytics matched to brand and format strategy.",
    },
    leadHeading: "The right brand, in the right location, on the right terms.",
    lead: "We advise retailers, brands and landlords on store networks and mall leasing — pairing catchment and footfall analytics with format strategy to place the right brand in the right location on the right commercial terms, while curating a tenant mix that lifts overall asset performance.",
    highlights: [
      ["Catchment Analytics", "Footfall and trade-area intelligence."],
      ["Format Strategy", "Store sizing and network planning."],
      ["Lease Structuring", "MG vs revenue-share deal design."],
      ["Brand-Mix Curation", "Tenant mix that maximises footfall."],
    ],
    blockTitle: "Who we work with",
    process: [
      ["Retailers", "Network expansion & site selection"],
      ["Malls & Developers", "Leasing & tenant-mix strategy"],
      ["High-Street Landlords", "Positioning & rent optimisation"],
      ["F&B & Entertainment", "Anchor & experiential leasing"],
      ["Brands", "Market-entry advisory"],
      ["Investors", "Retail asset underwriting"],
    ],
    seoDescription:
      "Retail leasing and brand expansion — catchment analytics, format strategy and tenant-mix curation for malls, high streets and brands.",
  },

  /* ── Pillar 3 · Delivering Integrated Real Estate Services ── */
  {
    slug: "specialty-development",
    parent: "integrated-real-estate-services",
    icon: "server",
    eyebrow: "Specialty Development",
    title: "Specialised Project Expertise",
    promise:
      "Partnering with investors and corporates on unique asset classes with distinct profit potential.",
    advantage: {
      label: "Core approach",
      value:
        "Tailored partnership — customised structures for high-potential special projects.",
    },
    leadHeading: "Niche assets, specialised execution.",
    lead: "MindCept collaborates with investors, owners and corporates on special projects that require specialised knowledge and strategic execution — data centers, hospitals, hotels and schools. Each engagement is tailored to unique goals, risk-return profiles and partnership structures to unlock maximum project value.",
    highlights: [
      ["Strategic Collaboration", "Deep alignment with investor and owner goals."],
      ["Unique Goal Alignment", "Customised strategies for complex assets."],
      ["High Profit Potential", "Identifying undervalued niche opportunities."],
      ["Sector Expertise", "Specialised knowledge in technical asset classes."],
    ],
    blockTitle: "Focus sectors",
    process: [
      ["Data Centers", "Digital infrastructure & connectivity hubs"],
      ["Hospitals", "Healthcare facilities & medical assets"],
      ["Hotels", "Hospitality & leisure developments"],
      ["Schools", "Educational institutions & campuses"],
    ],
    seoDescription:
      "Specialty development advisory for data centers, hospitals, hotels and schools — niche asset classes with distinct profit potential.",
  },
  {
    slug: "bank-auction-assets",
    parent: "integrated-real-estate-services",
    icon: "gavel",
    eyebrow: "Bank Auction Assets",
    title: "Distressed Asset Solutions",
    promise:
      "Turning challenging situations into strategic opportunities through specialised auction expertise.",
    advantage: {
      label: "Specialised service",
      value:
        "End-to-end support — mitigating risk and maximising value for institutions and investors.",
    },
    leadHeading: "Distressed today, high-potential tomorrow.",
    lead: "MindCept provides specialised expertise in the acquisition and disposition of assets through bank auctions. We guide investors, developers and financial institutions through a complex landscape, transforming distressed assets into high-potential investments — and assisting institutions with strategic disposition.",
    highlights: [
      ["Expert Guidance", "Navigating complex auction landscapes."],
      ["Asset Identification", "Sourcing high-potential auction properties."],
      ["Strategic Disposition", "Efficient asset sales for banks."],
      ["Risk Mitigation", "Comprehensive due-diligence support."],
    ],
    blockTitle: "Auction process management",
    process: [
      ["Opportunity ID", "Identifying distressed assets"],
      ["Due Diligence", "Legal & technical verification"],
      ["Valuation", "Accurate asset appraisal"],
      ["Bidding Strategy", "Auction participation & support"],
      ["Transaction", "Process management & closing"],
      ["Asset Handover", "Post-acquisition transition"],
    ],
    seoDescription:
      "Bank auction asset advisory — acquisition of distressed assets and strategic disposition support for financial institutions and investors.",
  },
  {
    slug: "investment-sales",
    parent: "integrated-real-estate-services",
    icon: "chart",
    eyebrow: "Investment Sales",
    title: "Maximise Real Estate Value",
    promise:
      "Crafting strategies to extract maximum value and protect long-term wealth for our clients.",
    advantage: {
      label: "Strategic synergy",
      value:
        "Integrated platform — transactional prowess combined with deep analytical research.",
    },
    leadHeading: "Capital markets, research and property services in unison.",
    lead: "Our in-house capital markets, research and property-services platforms operate in unison to offer clients an unparalleled edge. This synergy enables us to craft and execute strategies that extract maximum value from any real estate asset, regardless of type or scale — leveraging industry expertise to drive long-term success.",
    highlights: [
      ["Deep Analysis", "Research-backed insight to navigate markets."],
      ["Transactional Prowess", "Expertise across all property types and scales."],
      ["Asset Management", "Hands-on approach to maximise potential."],
      ["Wealth Protection", "Building and safeguarding long-term value."],
    ],
    blockTitle: "Investment life-cycle strategy",
    process: [
      ["Market Research", "Data-driven opportunity identification"],
      ["Strategic Positioning", "Crafting the optimal value story"],
      ["Valuation", "Pricing for maximum return"],
      ["Global Marketing", "Targeting the right investors"],
      ["Execution", "Negotiation & transaction closing"],
      ["Wealth Creation", "Realising and protecting value"],
    ],
    seoDescription:
      "Investment sales and capital markets advisory — research-backed strategies that maximise real estate asset value.",
  },

  /* ── Pillar 4 · Project Management ── */
  {
    slug: "design-and-build",
    parent: "project-management",
    icon: "blueprint",
    eyebrow: "Design & Build",
    title: "Integrated Design & Build Delivery",
    promise: "One team accountable for design development and on-site execution.",
    advantage: {
      label: "Delivery model",
      value:
        "A single integrated team — seamless coordination from concept to handover.",
    },
    leadHeading: "Design and execution, under one roof.",
    lead: "A comprehensive project-delivery approach in which we undertake both the design development and the execution of the project. This integrated model removes interface gaps between consultants and contractors, ensuring seamless coordination, optimised costs, faster project delivery and greater accountability across the entire project lifecycle.",
    highlights: [
      ["Single Accountability", "One team owns design and delivery."],
      ["Optimised Costs", "Value engineering from day one."],
      ["Faster Delivery", "Compressed, de-risked timelines."],
      ["Quality Control", "Specification held end-to-end."],
    ],
    blockTitle: "Delivery process",
    process: [
      ["Brief & Feasibility", "Requirements & viability"],
      ["Design Development", "Concept to detailed design"],
      ["Approvals", "Regulatory compliance"],
      ["Procurement", "Tendering & vendor selection"],
      ["Construction", "Execution & monitoring"],
      ["Handover", "Commissioning & closeout"],
    ],
    seoDescription:
      "Integrated design & build delivery — one accountable team from concept to handover, with optimised costs and faster timelines.",
  },
  {
    slug: "redevelopment-pmc",
    parent: "project-management",
    icon: "building",
    eyebrow: "Redevelopment PMC",
    title: "Redevelopment PMC for Housing Societies",
    promise:
      "Independent project-management consultancy that protects the society’s interests end-to-end.",
    advantage: {
      label: "Our commitment",
      value:
        "Independent, transparent and result-driven PMC services from start to finish.",
    },
    leadHeading: "Representing the society, start to finish.",
    lead: "As a Project Management Consultant (PMC) we represent the society in a redevelopment project and manage everything from planning to completion. We ensure transparency, better deals, quality construction and protected interests throughout the process — covering the technical, financial and regulatory aspects to maximise value.",
    highlights: [
      ["Independent Advice", "Unbiased guidance focused on the society."],
      ["Transparent Process", "Clear communication and structured decisions."],
      ["Measurable Value", "Tangible financial and design benefits."],
      ["Result-Driven", "Focus on optimal project outcomes."],
    ],
    blockTitle: "Core PMC services",
    process: [
      ["Feasibility & Planning", "Viability analysis"],
      ["Design & Approvals", "Regulatory compliance"],
      ["Legal Structuring", "Risk safeguards"],
      ["Tendering & Selection", "Best-deal sourcing"],
      ["Construction Monitoring", "Quality control"],
      ["Handover & Support", "Project closure"],
    ],
    seoDescription:
      "Independent redevelopment PMC for housing societies — transparency, better deals and protected interests from planning to completion.",
  },
  {
    slug: "cost-quality-schedule",
    parent: "project-management",
    icon: "chart",
    eyebrow: "Project Controls",
    title: "Cost, Quality & Schedule Management",
    promise:
      "Disciplined controls that keep capital projects on budget, on spec and on time.",
    advantage: {
      label: "Discipline",
      value: "BIM-led planning with transparent cost and progress reporting.",
    },
    leadHeading: "Institutional project-controls discipline.",
    lead: "We bring institutional project-controls discipline to every mandate — value engineering, quality assurance and schedule governance — with transparent reporting that keeps owners informed at every stage and protects the return on every rupee deployed.",
    highlights: [
      ["Value Engineering", "Cost optimisation without compromising spec."],
      ["Quality Assurance", "QA/QC discipline at every stage."],
      ["Schedule Governance", "Critical-path tracking and recovery."],
      ["Transparent Reporting", "Owner visibility at every milestone."],
    ],
    blockTitle: "Controls framework",
    process: [
      ["Baseline", "Cost & schedule baselining"],
      ["Value Engineering", "Design optimisation"],
      ["QA / QC", "Quality assurance & control"],
      ["Progress Tracking", "Earned-value monitoring"],
      ["Risk Control", "Issue & change management"],
      ["Closeout", "Final account & handover"],
    ],
    seoDescription:
      "Cost, quality and schedule management for capital projects — value engineering, QA/QC and schedule governance with transparent reporting.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getServicesForPillar(pillarSlug: string): Service[] {
  const pillar = getPillar(pillarSlug);
  if (!pillar) return [];
  return pillar.children
    .map(getService)
    .filter((s): s is Service => s !== undefined);
}
