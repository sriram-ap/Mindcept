import { clients, featuredClients } from "@/content/clients";
import { locations } from "@/content/locations";
import { featuredProperties, properties } from "@/content/properties";
import { research } from "@/content/home";
import { getService, services } from "@/content/services";
import type { Repositories } from "./repositories";

/** Default provider: serves the typed content modules. No infrastructure. */
export function contentRepositories(): Repositories {
  return {
    clients: {
      all: async () => clients,
      featured: async () => featuredClients(),
    },
    properties: {
      all: async () => properties,
      featured: async () => featuredProperties(),
      bySlug: async (slug) => properties.find((p) => p.slug === slug) ?? null,
    },
    locations: {
      all: async () => locations,
    },
    services: {
      all: async () => services,
      bySlug: async (slug) => getService(slug) ?? null,
    },
    research: {
      all: async () => research,
    },
  };
}
