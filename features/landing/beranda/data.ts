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

export const marketClocks: { city: string; abbr: string | null; timeZone: string }[] = [
  { city: "JAKARTA", abbr: "WIB", timeZone: "Asia/Jakarta" },
  { city: "TOKYO", abbr: "JST", timeZone: "Asia/Tokyo" },
  { city: "HONG KONG", abbr: "HKT", timeZone: "Asia/Hong_Kong" },
  // abbr null = singkatan (EST/EDT) dihitung otomatis mengikuti musim
  { city: "NEW YORK", abbr: null, timeZone: "America/New_York" },
];

export const marketTickers = [
  { slug: "gold", label: "XAU/USD" },
  { slug: "oil", label: "Brent Oil" },
  { slug: "hangseng", label: "Hang Seng" },
  { slug: "nikkei", label: "Nikkei 225" },
] as const;

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