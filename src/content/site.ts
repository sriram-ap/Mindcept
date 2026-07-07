import type { SocialChannel } from "@/types/content";

/**
 * Global site configuration and contact details.
 * Contact values approved in Website_Feedback_07July2026.docx.
 */
export const site = {
  name: "MindCept Consulting",
  legalName: "Mindcept Consulting LLP",
  tagline: "Where Strategy Meets Space",
  description:
    "Real estate advisory across industrial, warehousing, land, residential, commercial and capital markets — one integrated team, pan-India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindceptconsulting.com",
  email: "info@mindcept.in",
  emailSales: "sales@mindcept.in",
  /** Mobile — primary voice number. */
  phonePrimary: "+91 95275 40404",
  /** Landline. */
  phoneSecondary: "+91 20 4862 6172",
  whatsappUrl: "https://wa.me/919527540100",
  whatsappNumber: "+91 95275 40100",
  address: {
    city: "Pune",
    region: "Maharashtra",
    country: "IN",
  },
} as const;

/** Office directory — India live, Dubai placeholder (address pending). */
export const offices = [
  {
    slug: "india-pune",
    label: "India Office",
    company: "MindCept Consulting",
    addressLines: [
      "B Wing, Unit 308, 3rd Floor",
      "Nyati Empress, Viman Nagar",
      "Pune – 411014, Maharashtra, India",
    ],
    emails: ["info@mindcept.in", "sales@mindcept.in"],
    whatsapp: { label: "+91 95275 40100", url: "https://wa.me/919527540100" },
    mobile: "+91 95275 40404",
    landline: "+91 20 4862 6172",
    status: "open" as const,
  },
  {
    slug: "uae-dubai",
    label: "Dubai Office",
    company: "MindCept Consulting",
    addressLines: [],
    emails: [],
    status: "coming-soon" as const,
    note: "Address Coming Soon",
  },
];

export const socials: SocialChannel[] = [
  {
    key: "instagram",
    name: "Instagram",
    handle: "@mindcept",
    description: "Industrial & warehousing insights",
    url: "https://instagram.com/",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    handle: "MindCept Consulting",
    description: "Company updates & thought leadership",
    url: "https://www.linkedin.com/",
  },
  {
    key: "facebook",
    name: "Facebook",
    handle: "MindCept",
    description: "News, events & community",
    url: "https://facebook.com/",
  },
  {
    key: "youtube",
    name: "YouTube",
    handle: "MindCept",
    description: "Walkthroughs & market briefs",
    url: "https://youtube.com/",
  },
];

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Clients", href: "/clients" },
  { label: "Company", href: "/about" },
  { label: "Research", href: "/insights" },
  { label: "Calculator", href: "/#calculator" },
  { label: "List Property", href: "/#list-property" },
  { label: "Contact", href: "/contact" },
] as const;
