import {
  Activity, ArrowLeftRight, BarChart3, Cpu, Factory, Flame, Globe, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Fact = { label: string; value: string };
export type Highlight = { icon: LucideIcon; text: string };

export type ProductDetail = {
  slug: string;
  category: string;
  name: string;
  ticker: string;
  desc: string;
  image: string;
  highlights: Highlight[];
  facts: Fact[];
};

export const productDetails: ProductDetail[] = [
  {
    slug: "emas",
    category: "Logam Mulia",
    name: "Emas",
    ticker: "XAU/USD · Loco London",
    desc: "Aset safe haven paling likuid di dunia, dengan harga mengacu pada pasar emas Loco London.",
    image: "/images/emas.webp",
    highlights: [
      { icon: ShieldCheck, text: "Aset lindung nilai" },
      { icon: Globe, text: "Likuid di pasar global" },
      { icon: ArrowLeftRight, text: "Buy & Sell dua arah" },
    ],
    facts: [
      { label: "Kode Kontrak", value: "XUL10" },
      { label: "Acuan Harga", value: "Emas Loco London" },
      { label: "Jenis Kontrak", value: "Gulir harian" },
      { label: "Kurs", value: "Tetap, USD 1 = Rp 10.000" }, // verifikasi ke dokumen EWF
    ],
  },
  {
    slug: "minyak",
    category: "Energi",
    name: "Minyak Mentah Brent",
    ticker: "OIL/BRENT",
    desc: "Patokan harga minyak dunia dari Laut Utara, bergerak mengikuti pasokan OPEC+, geopolitik, dan data ekonomi.",
    image: "/images/minyak.webp",
    highlights: [
      { icon: Activity, text: "Volatilitas tinggi" },
      { icon: Globe, text: "Acuan energi dunia" },
      { icon: Flame, text: "Dipengaruhi OPEC+ & geopolitik" },
    ],
    facts: [
      { label: "Kode Kontrak", value: "BCO10_BBJ" }, // verifikasi: kontrak multilateral JFX berkode MINIBRENT
      { label: "Acuan Harga", value: "Brent Crude (Laut Utara)" },
      { label: "Jenis Kontrak", value: "Gulir berkala" }, // verifikasi
      { label: "Penyelesaian", value: "Tunai" },
    ],
  },
  {
    slug: "hang-seng",
    category: "Indeks Hong Kong",
    name: "Hang Seng Index",
    ticker: "HK50 / HSI",
    desc: "Indeks acuan Bursa Hong Kong yang mencerminkan saham-saham berkapitalisasi terbesar di sana.",
    image: "/images/hangseng.webp",
    highlights: [
      { icon: BarChart3, text: "Barometer pasar Hong Kong" },
      { icon: Cpu, text: "Sektor teknologi & keuangan" },
      { icon: Globe, text: "Aktif di sesi Asia" },
    ],
    facts: [
      { label: "Kode Kontrak", value: "HKK50_BBJ" },
      { label: "Acuan Harga", value: "Hang Seng Futures (HKEx)" },
      { label: "Nilai per Poin", value: "Rp 50.000" },
      { label: "Penyelesaian", value: "Tunai" },
    ],
  },
  {
    slug: "nikkei",
    category: "Indeks Jepang",
    name: "Nikkei 225",
    ticker: "JPK / NIKKEI",
    desc: "Indeks utama Bursa Tokyo yang berisi 225 perusahaan besar Jepang.",
    image: "/images/nikkei.webp",
    highlights: [
      { icon: Factory, text: "Manufaktur & ekspor Jepang" },
      { icon: Cpu, text: "Teknologi & otomotif" },
      { icon: ArrowLeftRight, text: "Dipengaruhi kurs Yen" },
    ],
    facts: [
      { label: "Kode Kontrak", value: "JPK50_BBJ" },
      { label: "Acuan Harga", value: "Nikkei 225 Futures (SGX)" },
      { label: "Nilai per Poin", value: "Rp 50.000" },
      { label: "Penyelesaian", value: "Tunai" },
    ],
  },
];