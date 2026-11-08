import {
  BadgeCheck,
  Landmark,
  ShieldCheck,
  Lock,
  Headset,
} from "lucide-react";

export const heroTags = [
  "Emas Digital",
  "Minyak Mentah",
  "Hang Seng",
  "Nikkei 225",
  "BAPPEBTI Terdaftar",
];

export const marketStatus = [
  { city: "JAKARTA (WIB)", status: "Buka Pasar", open: true },
  { city: "TOKYO (JST)", status: "Buka Pasar", open: true },
  { city: "HONG KONG (HKT)", status: "Buka Pasar", open: true },
  { city: "NEW YORK (EST)", status: "Tutup Pasar", open: false },
];

export const marketPrices = [
  { label: "XAU/USD", price: "$2,384.20", change: "+1.42%" },
  { label: "Brent Oil", price: "$84.50", change: "+0.85%" },
  { label: "Hang Seng", price: "16,720.50", change: "+1.85%" },
  { label: "Nikkei 225", price: "38,450.00", change: "+0.92%" },
];

export const trustBadges = [
  { title: "Terdaftar BAPPEBTI", desc: "Izin: 549/BAPPEBTI/SI/IX/2004", icon: BadgeCheck },
  { title: "Anggota Bursa Resmi", desc: "ICDX & JFX Terakreditasi", icon: Landmark },
  { title: "Lembaga Kliring", desc: "Penjaminan ICH & KBI", icon: ShieldCheck },
  { title: "Segregated Account", desc: "Dana Nasabah Terpisah 100%", icon: Lock },
  { title: "Layanan 24/5", desc: "Dukungan Bahasa Indonesia", icon: Headset },
];

export const stats = [
  { value: "20+", label: "Tahun Pengalaman Pialang" },
  { value: "15.000+", label: "Nasabah Aktif Nasional" },
  { value: "4", label: "Portofolio Produk Utama" },
];

export const steps = [
  {
    no: 1,
    title: "Kenali Produk & Regulasi",
    desc: "Pelajari dokumen pemberitahuan risiko, spesifikasi ukuran kontrak fisik dan finansial, serta aturan transaksi berjangka di Indonesia.",
    link: "Edukasi Legalitas",
    color: "bg-navy",
  },
  {
    no: 2,
    title: "Coba Akun Simulasi & Analisa",
    desc: "Uji strategi trading menggunakan platform simulasi dengan data harga real-time tanpa risiko finansial untuk membiasakan eksekusi order.",
    link: "Simulasi Gratis 100%",
    color: "bg-brand",
  },
  {
    no: 3,
    title: "Hubungi Wakil Pialang Resmi",
    desc: "Lengkapi verifikasi identitas (e-KYC) didampingi Wakil Pialang Berjangka berlisensi untuk pembukaan rekening dana terpisah (Segregated Account).",
    link: "Pendampingan Resmi",
    color: "bg-sapphire",
  },
];