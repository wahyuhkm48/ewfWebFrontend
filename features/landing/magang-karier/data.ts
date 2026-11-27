import {
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

export const heroChips = [
  "Program Magang",
  "Lowongan Pekerjaan",
  "Sertifikat Magang",
];

export const reasons = [
  {
    icon: GraduationCap,
    title: "Bimbingan Langsung",
    desc: "Belajar bersama mentor yang berpengalaman di industri perdagangan berjangka.",
  },
  {
    icon: Briefcase,
    title: "Pengalaman Proyek Nyata",
    desc: "Mengerjakan proyek yang relevan dengan bidang studi dan minat Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Lingkungan Profesional",
    desc: "Mengenal budaya kerja perusahaan pialang berjangka yang terdaftar dan diawasi BAPPEBTI.",
  },
  {
    icon: Users,
    title: "Jaringan Profesional",
    desc: "Bertemu rekan dan praktisi dari berbagai divisi dan kantor cabang.",
  },
  {
    icon: Award,
    title: "Sertifikat Magang",
    desc: "Peserta yang menyelesaikan program menerima sertifikat.",
  },
  {
    icon: TrendingUp,
    title: "Jalur Karier",
    desc: "Kenali posisi tetap yang dibuka perusahaan melalui portal lowongan.",
  },
];

export const journey = [
  {
    title: "Orientasi",
    desc: "Pengenalan perusahaan, budaya kerja, struktur divisi, dan aturan di industri perdagangan berjangka.",
    image: "/images/magang/orientasi.png",
    alt: "Sesi orientasi peserta magang",
  },
  {
    title: "Belajar Dasar",
    desc: "Mempelajari dasar pasar berjangka, produk yang diperdagangkan, dan alur kerja divisi penempatan.",
    image: "/images/magang/belajar.png",
    alt: "Peserta magang belajar dasar pasar berjangka",
  },
  {
    title: "Mengerjakan Proyek",
    desc: "Mengerjakan tugas dan proyek nyata bersama mentor sesuai bidang penempatan.",
    image: "/images/magang/proyek.png",
    alt: "Peserta magang mengerjakan proyek",
  },
  {
    title: "Presentasi Hasil",
    desc: "Memaparkan hasil kerja di depan mentor dan tim untuk mendapatkan masukan.",
    image: "/images/magang/presentasi.png",
    alt: "Peserta magang mempresentasikan hasil",
  },
  {
    title: "Evaluasi & Sertifikat",
    desc: "Penilaian akhir dari mentor. Peserta yang menyelesaikan program menerima sertifikat.",
    image: "/images/magang/evaluasi.png",
    alt: "Penyerahan sertifikat magang",
  },
];

// height = tinggi relatif tiap foto
const GALLERY_HEIGHTS = [
  420, 520, 380, 460, 560,
  400, 500, 360, 540, 440,
  480, 380, 520, 500, 550,
  460
];

export const galleryItems = GALLERY_HEIGHTS.map((height, i) => ({
  id: `kegiatan-${i + 1}`,
  img: `/images/galeri/kegiatan-${i + 1}.png`,
  url: `/images/galeri/kegiatan-${i + 1}.png`,
  width: 600,
  height,
  alt: `Kegiatan magang ${i + 1}`,
}));

export const programs = [
  {
    id: "magang",
    icon: GraduationCap,
    eyebrow: "Untuk Mahasiswa & Fresh Graduate",
    title: "Program Magang",
    desc: "Belajar langsung di industri perdagangan berjangka dan bangun pengalaman kerja pertama Anda.",
    points: [
      "Bimbingan mentor selama program",
      "Proyek sesuai bidang penempatan",
      "Sertifikat setelah program selesai",
    ],
    cta: "Masuk untuk Mendaftar",
    href: "/masuk",
    featured: true,
  },
  {
    id: "lowongan",
    icon: Briefcase,
    eyebrow: "Untuk Profesional",
    title: "Lowongan Pekerjaan",
    desc: "Bergabung sebagai bagian dari tim Equityworld Futures dan kembangkan karier Anda bersama kami.",
    points: [
      "Lihat posisi yang sedang dibuka",
      "Lamar langsung lewat akun Anda",
      "Pantau status lamaran di dashboard",
    ],
    cta: "Masuk untuk Melamar",
    href: "/masuk",
    featured: false,
  },
];

export const faqs = [
  {
    q: "Apa saja syarat mengikuti program magang?",
    a: "Program terbuka untuk mahasiswa aktif dan lulusan baru. [Lengkapi: jurusan, semester atau IPK minimum, dan syarat lain sesuai kebijakan HR.]",
  },
  {
    q: "Berapa lama durasi magang?",
    a: "[Isi durasi program sesuai kebijakan HR.]",
  },
  {
    q: "Bagaimana proses seleksinya?",
    a: "Pendaftar membuat akun, melengkapi data dan dokumen, lalu mengikuti tahapan seleksi. [Rinci tahapan: seleksi berkas, wawancara, dst.]",
  },
  {
    q: "Apakah magang mendapatkan uang saku?",
    a: "[Isi sesuai kebijakan HR: ada atau tidaknya uang saku dan besarnya.]",
  },
  {
    q: "Apakah magang dilakukan WFO atau WFH?",
    a: "[Isi sesuai kebijakan HR: WFO, WFH, atau hybrid, serta kantor penempatan.]",
  },
  {
    q: "Dokumen apa yang perlu disiapkan?",
    a: "Umumnya CV terbaru, transkrip nilai, dan surat pengantar dari kampus. [Konfirmasi daftar dokumen final dengan HR.]",
  },
];