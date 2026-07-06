import type { Client, OfficeLocation, Property, ResearchItem, Service } from "@/types/content";

/**
 * Data-access layer contracts.
 *
 * Application code (pages, API routes) depends only on these interfaces —
 * never on MongoDB or on the content modules directly. Providers:
 *
 *   - content  (default): typed modules in src/content — zero infrastructure
 *   - mongo    (when MONGODB_URI is set): MongoDB Community locally or
 *              MongoDB Atlas in production — same code, different URI
 *
 * See docs/DATABASE_ARCHITECTURE.md.
 */

export interface ClientRepository {
  all(): Promise<Client[]>;
  featured(): Promise<Client[]>;
}

export interface PropertyRepository {
  all(): Promise<Property[]>;
  featured(): Promise<Property[]>;
  bySlug(slug: string): Promise<Property | null>;
}

export interface LocationRepository {
  all(): Promise<OfficeLocation[]>;
}

export interface ServiceRepository {
  all(): Promise<Service[]>;
  bySlug(slug: string): Promise<Service | null>;
}

export interface ResearchRepository {
  all(): Promise<ResearchItem[]>;
}

export interface Repositories {
  clients: ClientRepository;
  properties: PropertyRepository;
  locations: LocationRepository;
  services: ServiceRepository;
  research: ResearchRepository;
}
