import { MongoClient, type Db } from "mongodb";
import type { Client, OfficeLocation, Property, ResearchItem, Service } from "@/types/content";
import { contentRepositories } from "./content-provider";
import type { Repositories } from "./repositories";

/**
 * MongoDB provider. Activated purely by MONGODB_URI — the same code runs
 * against MongoDB Community locally and MongoDB Atlas in production.
 *
 * Collections read here are seeded by scripts/seed-db.mjs from the typed
 * content modules; collections that are empty fall back to the content
 * provider so a half-seeded database never blanks the site.
 */

declare global {
  // Reuse the client across dev hot-reloads / serverless invocations.
  var _mongoClient: MongoClient | undefined;
}

function getDb(uri: string): Db {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri);
  }
  return globalThis._mongoClient.db(process.env.MONGODB_DB ?? "mindcept");
}

async function collectionOrFallback<T extends object>(
  db: Db,
  name: string,
  fallback: () => Promise<T[]>,
): Promise<T[]> {
  const docs = await db
    .collection(name)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  if (docs.length === 0) return fallback();
  return docs as unknown as T[];
}

export function mongoRepositories(uri: string): Repositories {
  const db = getDb(uri);
  const content = contentRepositories();

  return {
    clients: {
      all: () => collectionOrFallback<Client>(db, "clients", content.clients.all),
      featured: async () => {
        const all = await collectionOrFallback<Client>(db, "clients", content.clients.all);
        return all.filter((c) => c.featured);
      },
    },
    properties: {
      all: () => collectionOrFallback<Property>(db, "properties", content.properties.all),
      featured: async () => {
        const all = await collectionOrFallback<Property>(db, "properties", content.properties.all);
        return all.filter((p) => p.featured);
      },
      bySlug: async (slug) => {
        const doc = await db
          .collection("properties")
          .findOne({ slug }, { projection: { _id: 0 } });
        if (doc) return doc as unknown as Property;
        return content.properties.bySlug(slug);
      },
    },
    locations: {
      all: () => collectionOrFallback<OfficeLocation>(db, "locations", content.locations.all),
    },
    services: {
      all: () => collectionOrFallback<Service>(db, "services", content.services.all),
      bySlug: async (slug) => {
        const doc = await db
          .collection("services")
          .findOne({ slug }, { projection: { _id: 0 } });
        if (doc) return doc as unknown as Service;
        return content.services.bySlug(slug);
      },
    },
    research: {
      all: () => collectionOrFallback<ResearchItem>(db, "research", content.research.all),
    },
    uploadedFiles: {
      record: async (file) => {
        await db.collection("uploadedFiles").insertOne(file);
      },
    },
  };
}
