import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { properties } from "@/content/properties";
import { flags } from "@/lib/flags";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/about", "/clients", "/contact", "/insights"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const servicePages = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const propertyPages = flags.properties
    ? [
        {
          url: `${site.url}/properties`,
          changeFrequency: "daily" as const,
          priority: 0.9,
        },
        ...properties.map((p) => ({
          url: `${site.url}/property/${p.slug}`,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        })),
      ]
    : [];

  return [...staticPages, ...servicePages, ...propertyPages];
}
