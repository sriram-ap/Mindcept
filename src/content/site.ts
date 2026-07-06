import type { SocialChannel } from "@/types/content";

/** Global site configuration and contact details. */
export const site = {
  name: "MindCept Consulting",
  legalName: "Mindcept Consulting LLP",
  tagline: "Where Strategy Meets Space",
  description:
    "Real estate advisory across industrial, warehousing, land, residential, commercial and capital markets — one integrated team, pan-India.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mindceptconsulting.com",
  email: "info@mindcept.in",
  phonePrimary: "+91 95275 40404",
  phoneSecondary: "+91 77209 55800",
  whatsappUrl: "https://wa.me/919527540404",
  address: {
    city: "Pune",
    region: "Maharashtra",
    country: "IN",
  },
} as const;

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
  { label: "Tools", href: "/#tools" },
  { label: "List Property", href: "/#list-property" },
  { label: "Contact", href: "/contact" },
] as const;
