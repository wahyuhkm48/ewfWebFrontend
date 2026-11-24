import type { Metadata } from "next";
import MagangKarierPage from "@/features/landing/magang-karier/MagangKarierPage";

export const metadata: Metadata = {
  title: "Magang & Karier | Equityworld Futures",
  description:
    "Program magang dan lowongan pekerjaan di Equityworld Futures: belajar langsung di industri perdagangan berjangka yang diawasi BAPPEBTI.",
};

export default function Page() {
  return <MagangKarierPage />;
}