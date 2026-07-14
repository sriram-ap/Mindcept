import Link from "next/link";
import { getRepositories } from "@/lib/data";
import { locations } from "@/content/locations";
import { corridors } from "@/content/corridors";
import { services } from "@/content/services";
import { COLLECTIONS } from "@/lib/data/collections";

/**
 * Admin dashboard — real content inventory only (counts come from the data
 * layer; nothing is fabricated). CRUD lands per-module after authentication.
 */
export default async function AdminDashboard() {
  const repos = await getRepositories();
  const properties = await repos.properties.all();

  const inventory: [string, number, string][] = [
    ["Properties", properties.length, "/admin/properties"],
    ["Operating markets", locations.length, "/admin/settings"],
    ["Industrial corridors", corridors.length, "/admin/settings"],
    ["Service lines", services.length, "/admin/settings"],
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Dashboard
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Architecture preview — authentication and per-module CRUD are the next
        milestone. Counts below reflect live content, not placeholders.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {inventory.map(([label, count, href]) => (
          <Link
            key={label}
            href={href}
            className="card-lift rounded-card border border-line bg-card p-5"
          >
            <dd className="font-display text-3xl font-semibold text-ink">
              {count}
            </dd>
            <dt className="mt-1 text-xs uppercase tracking-wider text-muted">
              {label}
            </dt>
          </Link>
        ))}
      </dl>

      <h2 className="mt-12 font-display text-lg font-semibold text-ink">
        Data architecture
      </h2>
      <p className="mt-1 text-sm text-muted">
        MongoDB Atlas collections (metadata) · Cloudflare R2 (media, signed
        URLs, private bucket)
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {Object.values(COLLECTIONS).map((c) => (
          <li
            key={c}
            className="rounded-full bg-jewel/10 px-3 py-1 font-mono text-xs text-jewel"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
