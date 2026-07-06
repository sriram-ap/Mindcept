"use client";

import { useState } from "react";
import type { Client, ClientCategory } from "@/types/content";
import { ClientMark } from "@/components/ui/ClientMark";

const CATEGORIES: (ClientCategory | "All")[] = [
  "All",
  "Industrial",
  "Warehousing",
  "Developers",
  "Institutional Investors",
  "Manufacturing",
  "Corporate Occupiers",
];

/** Category-filterable client directory (/clients). */
export function ClientDirectory({ clients }: { clients: Client[] }) {
  const [category, setCategory] = useState<ClientCategory | "All">("All");

  const visible =
    category === "All"
      ? clients
      : clients.filter((c) => c.categories.includes(category));

  return (
    <div>
      <div role="tablist" aria-label="Client categories" className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === c
                ? "bg-jewel text-white"
                : "bg-white text-ink border border-line hover:border-jewel/50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted" role="status">
        {visible.length} client relationship{visible.length === 1 ? "" : "s"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((client) => (
          <li
            key={client.slug}
            className="flex flex-col rounded-card border border-line bg-white p-6"
          >
            <div className="flex items-center gap-4">
              <ClientMark name={client.name} logoUrl={client.logoUrl} className="h-14 w-14 shrink-0" />
              <div className="min-w-0">
                <h2 className="truncate font-display text-base font-semibold text-ink">
                  {client.name}
                </h2>
                <p className="truncate text-xs text-muted">
                  {client.industry}
                  {client.year ? ` · ${client.year}` : ""}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-jewel">{client.engagement}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {client.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {client.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-jewel/10 px-2.5 py-0.5 text-[11px] font-medium text-jewel"
                >
                  {c}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
