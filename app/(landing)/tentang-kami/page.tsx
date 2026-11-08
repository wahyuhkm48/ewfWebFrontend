import type { Metadata } from "next";
import TentangKamiPage from "@/features/landing/tentang-kami/TentangKamiPage";

export const metadata: Metadata = {
  title: "Tentang Kami | Equityworld Futures",
  description:
    "Profil, legalitas, dan struktur pengawasan PT Equityworld Futures sebagai pialang berjangka resmi di bawah BAPPEBTI.",
};

export default function Page() {
  return <TentangKamiPage />;
}