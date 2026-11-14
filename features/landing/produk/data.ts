import {
  Activity, ArrowLeftRight, BarChart3, Cpu, Factory, Flame, Globe, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Fact = { label: string; value: string; wide?: boolean };
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
    desc: "Aset safe haven yang banyak dipilih untuk lindung nilai, dengan harga mengacu pada pasar emas Loco London.",
    image: "/images/emas.webp",
    highlights: [
      { icon: ShieldCheck, text: "Aset lindung nilai" },
      { icon: Globe, text: "Likuid di pasar global" },
      { icon: ArrowLeftRight, text: "Buy & Sell dua arah" },
    ],
    facts: [
      { label: "Kode Kontrak", value: "XUL10" },
      { label: "Ukuran Kontrak", value: "100 troy ons" },
      { label: "Margin (Harian / Menginap)", value: "USD 1.000 / USD 3.000" },
      { label: "Pergerakan Minimum", value: "USD 0,01 / troy ons" },
      {
        label: "Jam Perdagangan (Senin–Jumat, WIB)",
        value: "06:00 – 03:30 · musim dingin s.d. 04:30",
        wide: true,
      },
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
      { label: "Kode Kontrak", value: "BCO10_BBJ" },
      { label: "Ukuran Kontrak", value: "1.000 barel" },
      { label: "Margin (Harian / Menginap)", value: "USD 1.000 / USD 2.000" },
      { label: "Pergerakan Minimum", value: "USD 0,01 / barel" },
      {
        label: "Jam Perdagangan (Senin–Jumat, WIB)",
        value: "07:00 – 03:45 · musim dingin mulai 08:00",
        wide: true,
      },
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
      { label: "Ukuran Kontrak", value: "USD 5 / poin" },
      { label: "Margin (Harian / Menginap)", value: "USD 1.000 / USD 2.000" },
      { label: "Pergerakan Minimum", value: "1 poin" },
      {
        label: "Jam Perdagangan (Senin–Jumat, WIB)",
        value: "08:15–11:00 · 12:00–15:30 · 16:00–02:00",
        wide: true,
      },
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
      { label: "Ukuran Kontrak", value: "USD 5 / poin" },
      { label: "Margin (Harian / Menginap)", value: "USD 1.000 / USD 2.000" },
      { label: "Pergerakan Minimum", value: "5 poin" },
      {
        label: "Jam Perdagangan (Senin–Jumat, WIB)",
        value: "06:30–13:55 · 14:10–03:45",
        wide: true,
      },
    ],
  },
];

export const heroBadges = [
  "BAPPEBTI No. 549/BAPPEBTI/SI/IX/2004",
  "Anggota BBJ (JFX) & KBI",
];

export const faqs = [
  {
    q: "Apa itu kontrak berjangka komoditas & indeks saham?",
    a: "Kontrak berjangka adalah perjanjian jual beli suatu aset dengan harga yang disepakati hari ini untuk diselesaikan pada waktu tertentu. Di Equityworld Futures, transaksi dilakukan pada komoditas dan indeks saham.",
  },
  {
    q: "Berapa modal minimal untuk memulai transaksi?",
    a: "Modal awal mengikuti ketentuan margin pada spesifikasi kontrak masing-masing produk dan kebijakan pembukaan rekening. Hubungi Wakil Pialang Berjangka kami untuk informasi terbaru.",
  },
  {
    q: "Apakah seluruh produk ini diawasi regulator resmi di Indonesia?",
    a: "Ya. Seluruh aktivitas perdagangan berjangka berada di bawah pengawasan BAPPEBTI melalui bursa dan lembaga kliring yang terdaftar.",
  },
  {
    q: "Bagaimana mekanisme keamanan dana nasabah terjamin?",
    a: "Dana nasabah ditempatkan pada rekening terpisah (Segregated Account) di bank kustodian, terpisah dari dana operasional perusahaan.",
  },
  {
    q: "Apakah pemula mendapatkan bimbingan dan akun simulasi?",
    a: "Ya. Pemula dapat mencoba akun simulasi dengan data harga real-time serta mendapat pendampingan dari Wakil Pialang Berjangka berlisensi.",
  },
];