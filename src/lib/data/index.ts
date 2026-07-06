import { contentRepositories } from "./content-provider";
import type { Repositories } from "./repositories";

/**
 * Provider selection — the ONLY switch is the MONGODB_URI env var:
 *
 *   unset                          → typed content modules (default)
 *   mongodb://localhost:27017     → MongoDB Community (local dev)
 *   mongodb+srv://…atlas…         → MongoDB Atlas (production)
 *
 * No application code changes between environments.
 */
export async function getRepositories(): Promise<Repositories> {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    const { mongoRepositories } = await import("./mongo-provider");
    return mongoRepositories(uri);
  }
  return contentRepositories();
}

export type { Repositories } from "./repositories";
