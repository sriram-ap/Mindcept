import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin foundation — architecture only (no CRUD yet). Minimal two-pane
 * shell in the Vercel/Stripe/Linear idiom: fixed sidebar of modules,
 * quiet content pane. Authentication must land before production use;
 * every module page states its planned capabilities.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper pt-20">
      <div className="mx-auto flex max-w-7xl">
        <AdminNav />
        <div className="min-w-0 flex-1 px-6 py-10 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
