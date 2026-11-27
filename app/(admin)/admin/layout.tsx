import type { Metadata } from "next";
import AdminGuard from "@/features/admin/layout/AdminGuard";
import AdminShell from "@/features/admin/layout/AdminShell";

export const metadata: Metadata = {
  title: "Admin | Equityworld Futures",
  robots: { index: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}