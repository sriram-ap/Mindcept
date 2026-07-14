import { notFound } from "next/navigation";

/**
 * Module scaffold pages — architecture only. Each states the module's
 * scope and planned capabilities so the console navigates end-to-end
 * before any CRUD exists. Media has a dedicated page (working uploads).
 */
const MODULES: Record<string, { title: string; scope: string; planned: string[] }> = {
  properties: {
    title: "Properties",
    scope: "Listing inventory — metadata in MongoDB Atlas, media keys in R2.",
    planned: ["Create / edit listings", "Publish workflow", "Featured ordering", "Bulk import"],
  },
  developers: {
    title: "Developers",
    scope: "Developer and partner profiles referenced by listings.",
    planned: ["Profiles", "Brand assets via Media", "Listing associations"],
  },
  research: {
    title: "Research",
    scope: "Market research publications and gated report downloads.",
    planned: ["Draft / publish", "PDF uploads to R2", "Gating rules"],
  },
  blogs: {
    title: "Blogs",
    scope: "Editorial content with SEO metadata.",
    planned: ["Rich-text editor", "Scheduled publishing", "Author profiles"],
  },
  seo: {
    title: "SEO",
    scope: "Per-route metadata, structured data and sitemap controls.",
    planned: ["Metadata overrides", "Schema preview", "Redirect manager"],
  },
  analytics: {
    title: "Analytics",
    scope: "Traffic and enquiry funnels (privacy-first, first-party).",
    planned: ["Page performance", "Enquiry conversion", "Source attribution"],
  },
  users: {
    title: "Users",
    scope: "Console access with role-based permissions.",
    planned: ["Invitations", "Roles (admin / editor / analyst)", "Audit log"],
  },
  downloads: {
    title: "Downloads",
    scope: "Brochure and diligence-pack delivery tracking.",
    planned: ["Signed-URL issuance", "Expiry policies", "Download log"],
  },
  reports: {
    title: "Reports",
    scope: "Operational exports for the advisory desk.",
    planned: ["Enquiry exports", "Listing performance", "Scheduled email"],
  },
  theme: {
    title: "Theme",
    scope: "Design-token management for the three runtime themes.",
    planned: ["Token editor", "Preview per theme", "Brand asset slots"],
  },
};

export function generateStaticParams() {
  return Object.keys(MODULES).map((module) => ({ module }));
}

export const dynamicParams = false;

export default async function AdminModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const def = MODULES[module];
  if (!def) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        {def.title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">{def.scope}</p>

      <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-ember-deep">
        Planned capabilities
      </h2>
      <ul className="mt-4 max-w-md space-y-2">
        {def.planned.map((p) => (
          <li
            key={p}
            className="rounded-card border border-line bg-card px-4 py-3 text-sm text-ink/80"
          >
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs text-muted">
        Architecture scaffold — no data operations are wired to this module
        yet.
      </p>
    </div>
  );
}
