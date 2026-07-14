"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ADMIN_MODULES = [
  { slug: "", label: "Dashboard" },
  { slug: "properties", label: "Properties" },
  { slug: "developers", label: "Developers" },
  { slug: "media", label: "Media" },
  { slug: "research", label: "Research" },
  { slug: "blogs", label: "Blogs" },
  { slug: "seo", label: "SEO" },
  { slug: "analytics", label: "Analytics" },
  { slug: "users", label: "Users" },
  { slug: "downloads", label: "Downloads" },
  { slug: "reports", label: "Reports" },
  { slug: "theme", label: "Theme" },
  { slug: "settings", label: "Settings" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin"
      className="sticky top-20 hidden h-[calc(100vh-5rem)] w-52 shrink-0 border-r border-line py-8 pr-4 md:block"
    >
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        Console
      </p>
      <ul className="mt-4 space-y-0.5">
        {ADMIN_MODULES.map((m) => {
          const href = m.slug ? `/admin/${m.slug}` : "/admin";
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-jewel/10 font-semibold text-jewel"
                    : "text-muted hover:bg-tint hover:text-ink"
                }`}
              >
                {m.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
