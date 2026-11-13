import type { Metadata } from "next";
export const revalidate = 300;
import BerandaPage from "@/features/landing/beranda/BerandaPage";

export const metadata: Metadata = {
  title: "Equityworld Futures | Trading with Trust",
};

export default function Page() {
  return <BerandaPage />;
}