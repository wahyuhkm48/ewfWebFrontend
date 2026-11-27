import type { Metadata } from "next";
import DashboardPage from "@/features/user/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | Equityworld Futures",
  description: "Ringkasan aktivitas dan rekomendasi karier Anda.",
  robots: { index: false },
};

export default function Page() {
  return <DashboardPage />;
}
