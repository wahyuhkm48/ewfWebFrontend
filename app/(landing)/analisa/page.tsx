import type { Metadata } from "next";
import AnalisaPage from "@/features/landing/analisa/AnalisaPage";

export const metadata: Metadata = {
  title: "Analisa Pasar | Equityworld Futures",
  description:
    "Data historis emas, minyak mentah, Hang Seng, dan Nikkei 225 beserta kalkulator pivot point, support, resistance, dan midpoint.",
};

export default function Page() {
  return <AnalisaPage />;
}