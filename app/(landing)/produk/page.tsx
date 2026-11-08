import type { Metadata } from "next";
import ProdukPage from "@/features/landing/produk/ProdukPage";

export const metadata: Metadata = {
  title: "Produk Pasar | Equityworld Futures",
  description:
    "Emas, minyak mentah, Hang Seng, dan Nikkei 225 dengan data real-time, analisa harian, dan pengawasan resmi BAPPEBTI.",
};

export default function Page() {
  return <ProdukPage />;
}