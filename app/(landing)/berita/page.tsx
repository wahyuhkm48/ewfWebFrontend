import type { Metadata } from "next";
import BeritaPage from "@/features/landing/berita/BeritaPage";

export const metadata: Metadata = {
  title: "Berita Pasar | Equityworld Futures",
  description:
    "Berita terbaru komoditi emas, minyak mentah, dan indeks bursa Asia dari sumber yang terverifikasi.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);

  return <BeritaPage page={current} />;
}