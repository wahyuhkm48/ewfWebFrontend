import type { Metadata } from "next";
import AdminShell from "@/features/admin/layout/AdminShell";

export const metadata: Metadata = {
  title: "Admin | Equityworld Futures",
  robots: { index: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminShell>{children}</AdminShell>;
}