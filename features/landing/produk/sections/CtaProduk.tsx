// features/landing/produk/sections/CtaProduk.tsx
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Pill from "@/components/ui/Pill";

export default function CtaProduk() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="rounded-3xl bg-linear-to-r from-brand via-brand to-navy p-8 text-white sm:p-12">
        <Pill tone="dark" className="bg-white/15 text-white">
          Konsultasi Transaksi Resmi
        </Pill>
        <h2 className="type-h2 mt-4 max-w-md">
          Siap Mengenal Produk Kami Lebih Jauh?
        </h2>
        <p className="type-body mt-3 max-w-lg text-white/85">
          Diskusikan rencana analisa dan pemantauan pasar Anda bersama tim
          profesional berlisensi resmi BAPPEBTI.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-surface"
          >
            <MessageCircle size={16} className="text-bull" /> Chat WhatsApp
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-3 text-[13px] font-semibold hover:bg-white/10"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}