import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { navLinks } from "@/features/landing/shared/data/nav";

const legal = [
  "Izin BAPPEBTI: 549/BAPPEBTI/SI/IX/2004",
  "Keanggotaan Bursa ICDX",
  "Penjamin Kliring ICH",
  "Rekening Terpisah (Segregated)",
  "Kebijakan Privasi",
  "Syarat & Ketentuan",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold text-white">
              EQUITYWORLD FUTURES
            </p>
            <p className="mt-3 text-sm leading-6">
              PT Equityworld Futures adalah perusahaan pialang berjangka resmi
              terdaftar dan diawasi oleh Badan Pengawas Perdagangan Berjangka
              Komoditi (BAPPEBTI).
            </p>
          </div>

          <div>
            <p className="type-label text-white">Navigasi</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-white">Legalitas & Regulasi</p>
            <ul className="mt-4 space-y-2 text-sm">
              {legal.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-label text-white">Layanan Nasabah</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+622127889280" className="hover:text-white">
                  +62 21 27889280
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a
                  href="mailto:corporate@equityworld-futures.co.id"
                  className="hover:text-white"
                >
                  corporate@equityworld-futures.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-brand/30 bg-white/5 p-5">
          <p className="type-label text-brand">Warning · Peringatan Risiko Tinggi</p>
          <p className="type-micro mt-2 text-white/70">
            Perdagangan berjangka komoditi dan indeks saham memiliki risiko
            tinggi terhadap modal Anda dan tidak cocok untuk semua investor.
            Tingkat leverage yang tinggi dapat bekerja menguntungkan maupun
            merugikan Anda. Kinerja masa lalu bukan merupakan indikasi hasil di
            masa depan.
          </p>
        </div>

        <p className="type-micro mt-8">
          © 2026 PT Equityworld Futures. Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}