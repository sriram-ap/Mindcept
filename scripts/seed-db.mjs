/**
 * Seed MongoDB (Community or Atlas) from the typed content modules.
 *
 * Usage:
 *   MONGODB_URI=mongodb://localhost:27017 node scripts/seed-db.mjs
 *   MONGODB_URI=mongodb+srv://…atlas… node scripts/seed-db.mjs
 *
 * Idempotent: replaces each collection's documents keyed by slug.
 * Content modules stay the source of truth until the Admin CMS ships.
 */
import { MongoClient } from "mongodb";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is required. See docs/DATABASE_ARCHITECTURE.md");
  process.exit(1);
}

// Transpile the TS content modules to a temp dir so this script has no
// runtime dependency on the Next build.
const tmp = mkdtempSync(join(tmpdir(), "mindcept-seed-"));
execSync(
  `npx tsc src/content/*.ts src/types/*.ts --outDir ${tmp} --module nodenext --moduleResolution nodenext --target es2022 --skipLibCheck`,
  { stdio: "inherit" },
);

const load = async (name) =>
  (await import(join(tmp, "content", name + ".js")));

const clientsMod = await load("clients");
const locationsMod = await load("locations");
const propertiesMod = await load("properties");
const servicesMod = await load("services");
const homeMod = await load("home");

const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB ?? "mindcept");

const collections = {
  clients: clientsMod.clients,
  locations: locationsMod.locations,
  properties: propertiesMod.properties,
  services: servicesMod.services,
  research: homeMod.research,
};

for (const [name, docs] of Object.entries(collections)) {
  const col = db.collection(name);
  await col.deleteMany({});
  await col.insertMany(docs);
  await col.createIndex({ slug: 1 }, { unique: true }).catch(() => {});
  console.log(`seeded ${name}: ${docs.length} documents`);
}

await client.close();
rmSync(tmp, { recursive: true, force: true });
console.log("done");
