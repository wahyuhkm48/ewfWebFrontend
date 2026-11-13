export type Spec = { label: string; value: string };

export type ProductDetail = {
  slug: string;
  category: string;
  name: string;
  title: string;
  desc: string;
  image: string;
  priceLabel: string;
  price: string;
  change: string;
  changeAbs: string;
  why: string[];
  specs: Spec[];
  high: string;
  low: string;
  analysisLabel: string;
};

const PLACEHOLDER = "[isi sesuai spesifikasi kontrak resmi]";

const makeSpecs = (): Spec[] => [
  { label: "Kode Produk", value: PLACEHOLDER },
  { label: "Bursa Penyelenggara", value: PLACEHOLDER },
  { label: "Jam Perdagangan (WIB)", value: PLACEHOLDER },
  { label: "Satuan Kontrak", value: PLACEHOLDER },
  { label: "Margin Awal", value: PLACEHOLDER },
  { label: "Fluktuasi Minimum", value: PLACEHOLDER },
];

export const productDetails: ProductDetail[] = [
  {
    slug: "emas",
    category: "Komoditas Logam Mulia",
    name: "Emas (Gold)",
    title: "Emas (Gold / XAUUSD)",
    desc: "Emas adalah komoditas multilateral paling likuid di dunia yang berfungsi sebagai aset lindung nilai (safe haven) terhadap inflasi dan gejolak geopolitik. Kontrak berjangka emas memberikan fleksibilitas transaksi dua arah dengan perlindungan segregasi perbankan resmi.",
    image: "/images/emas.webp",
    priceLabel: "Harga Emas Dunia (XAUUSD)",
    price: "$2,348.50",
    change: "+1.42%",
    changeAbs: "+$32.90",
    why: [
      "Likuiditas pasar global 24 jam",
      "Lindung nilai terhadap depresiasi mata uang",
      "Peluang transaksi 2 arah (Buy & Sell)",
    ],
    specs: makeSpecs(),
    high: "$2,352.10",
    low: "$2,314.80",
    analysisLabel: "Pelajari Analisa Emas",
  },
  {
    slug: "minyak",
    category: "Komoditas Energi",
    name: "Minyak Mentah",
    title: "Minyak Mentah (Crude Oil / WTI)",
    desc: "Minyak mentah merupakan urat nadi rantai pasok industri global dengan volatilitas tinggi yang dipengaruhi oleh dinamika kuota produksi OPEC+, tensi geopolitik, serta proyeksi pertumbuhan ekonomi dunia.",
    image: "/images/minyak.webp",
    priceLabel: "Minyak Mentah WTI Spot",
    price: "$84.50 / bbl",
    change: "+0.85%",
    changeAbs: "+$0.70",
    why: [
      "Volatilitas tinggi untuk strategi harian",
      "Korelasi erat data makro & rilis inventori",
      "Instrumen diversifikasi sektor energi",
    ],
    specs: makeSpecs(),
    high: "$85.20",
    low: "$83.45",
    analysisLabel: "Pelajari Analisa Minyak Mentah",
  },
  {
    slug: "hang-seng",
    category: "Indeks Saham Multilateral",
    name: "Hang Seng",
    title: "Hang Seng Index (HSI)",
    desc: "Indeks acuan pasar saham Hong Kong yang melacak performa perusahaan-perusahaan berkapitalisasi pasar terbesar, mencakup raksasa teknologi, institusi keuangan, dan konglomerasi properti terkemuka di Asia Timur.",
    image: "/images/hangseng.webp",
    priceLabel: "Hang Seng Index (HSI)",
    price: "16,720.50 pts",
    change: "+1.85%",
    changeAbs: "+304.5",
    why: [
      "Sentimen pasar modal ekonomi China & Asia",
      "Likuiditas tinggi saat jam bursa Asia",
      "Rentang fluktuasi harian yang dinamis",
    ],
    specs: makeSpecs(),
    high: "16,756.30",
    low: "16,420.10",
    analysisLabel: "Pelajari Analisa Hang Seng",
  },
  {
    slug: "nikkei",
    category: "Indeks Saham Jepang",
    name: "Nikkei 225",
    title: "Nikkei 225 (JPK / Tokyo Index)",
    desc: "Indeks saham di Jepang yang merefleksikan 225 perusahaan berkinerja unggul di Tokyo Stock Exchange, didominasi oleh korporasi otomotif, semikonduktor, robotika, dan teknologi industri Jepang.",
    image: "/images/nikkei.webp",
    priceLabel: "Nikkei 225 Stock Average",
    price: "39,587.40 pts",
    change: "+0.92%",
    changeAbs: "+362.2",
    why: [
      "Indikator kekuatan sektor ekspor & manufaktur Jepang",
      "Korelasi erat nilai tukar Yen (JPY) & USD",
      "Buka perdagangan paling awal di sesi regional Asia",
    ],
    specs: makeSpecs(),
    high: "39,640.00",
    low: "39,210.50",
    analysisLabel: "Pelajari Analisa Nikkei 225",
  },
];

export const heroBadges = [
  "BAPPEBTI No. 549/BAPPEBTI/SI/IX/2004",
  "Anggota BBJ (JFX) & KBI",
];

export const faqs = [
  {
    q: "Apa itu kontrak berjangka komoditas & indeks saham?",
    a: "Kontrak berjangka adalah perjanjian jual beli suatu aset dengan harga yang disepakati hari ini untuk diserahkan atau diselesaikan pada waktu tertentu. Di Equityworld Futures, transaksi dilakukan pada komoditas dan indeks saham melalui bursa berjangka resmi.",
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