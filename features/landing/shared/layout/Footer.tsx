import Link from "next/link";
import { Mail, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import BackToTop from "@/components/ui/BackToTop";
import RevealGroup from "@/components/ui/RevealGroup";
import { WHATSAPP_URL } from "@/lib/contact";
import { navLinks } from "@/features/landing/shared/data/nav";
import { delay } from "@/lib/reveal";

const legal = [
  "Izin BAPPEBTI: 549/BAPPEBTI/SI/IX/2004",
  "Keanggotaan Bursa ICDX",
  "Penjamin Kliring ICH",
  "Rekening Terpisah (Segregated)",
  "Kebijakan Privasi",
  "Syarat & Ketentuan",
];

// Garis bawah oranye yang menyapu dari kiri saat di-hover.
const navLink =
  "relative inline-block transition-colors duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100";

const contactRow =
  "group flex items-center gap-3 text-sm transition-colors duration-300 hover:text-white";
const contactIcon =
  "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand group-hover:text-white";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <div className="footer-line" aria-hidden="true" />

      {/* Watermark samar */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none text-center font-display text-[clamp(4rem,16vw,15rem)] font-extrabold leading-none tracking-tight text-white/[0.035]"
      >
        EQUITYWORLD
      </span>

      <RevealGroup className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.2fr_1.3fr]">
          {/* Brand */}
          <div className="reveal-item" style={delay(0)}>
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand font-display font-extrabold">
                E
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base font-extrabold tracking-wide">
                  EQUITYWORLD
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-white/60">
                  FUTURES
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7">
              PT Equityworld Futures adalah perusahaan pialang berjangka resmi
              terdaftar dan diawasi oleh Badan Pengawas Perdagangan Berjangka
              Komoditi (BAPPEBTI).
            </p>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer" className="reveal-item" style={delay(100)}>
            <p className="type-label text-white">Navigasi</p>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={navLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legalitas */}
          <div className="reveal-item" style={delay(200)}>
            <p className="type-label text-white">Legalitas & Regulasi</p>
            <ul className="mt-5 space-y-3 border-l border-white/10 pl-4 text-sm">
              {legal.map((t) => (
                <li key={t} className="transition-colors duration-300 hover:text-white">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan nasabah */}
          <div className="reveal-item" style={delay(300)}>
            <p className="type-label text-white">Layanan Nasabah</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="tel:+622127889280" className={contactRow}>
                  <span className={contactIcon}>
                    <Phone size={15} />
                  </span>
                  +62 21 27889280
                </a>
              </li>
              <li>
                <a href="mailto:corporate@equityworld-futures.co.id" className={contactRow}>
                  <span className={contactIcon}>
                    <Mail size={15} />
                  </span>
                  <span className="break-all">corporate@equityworld-futures.co.id</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactRow}
                >
                  <span className={contactIcon}>
                    <MessageCircle size={15} />
                  </span>
                  Chat WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Peringatan risiko */}
        <div
          className="reveal-item mt-12 flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
          style={delay(400)}
        >
          <ShieldAlert size={22} className="mt-0.5 shrink-0 text-brand" />
          <div>
            <p className="type-label text-brand">Warning · Peringatan Risiko Tinggi</p>
            <p className="type-micro mt-2 text-white/70">
              Perdagangan berjangka komoditi dan indeks saham memiliki risiko
              tinggi terhadap modal Anda dan tidak cocok untuk semua investor.
              Tingkat leverage yang tinggi dapat bekerja menguntungkan maupun
              merugikan Anda. Kinerja masa lalu bukan merupakan indikasi hasil di
              masa depan.
            </p>
          </div>
        </div>

        {/* Baris bawah */}
        <div
          className="reveal-item mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center"
          style={delay(500)}
        >
          <p className="type-micro">
            © 2026 PT Equityworld Futures. Hak cipta dilindungi undang-undang.
          </p>
          <BackToTop />
        </div>
      </RevealGroup>
    </footer>
  );
}