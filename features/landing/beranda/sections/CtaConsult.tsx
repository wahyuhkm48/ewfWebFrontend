import Link from "next/link";
import { MessageCircle, CalendarDays } from "lucide-react";

export default function CtaConsult() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="grid items-center gap-8 rounded-3xl bg-linear-to-r from-navy via-navy to-brand p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="type-label rounded-full border border-white/30 px-3 py-1 text-[11px]">
            Konsultasi Terpercaya
          </span>
          <h2 className="type-h2 mt-4">
            Punya Pertanyaan Seputar Perdagangan Berjangka?
            <span className="block">Tim Kami Siap Membantu.</span>
          </h2>
          <p className="type-body mt-3 max-w-xl text-white/80">
            Konsultasi gratis bersama wakil pialang berjangka profesional
            berlisensi resmi. Pelajari mekanisme pasar, risiko, dan tata cara
            transaksi dengan nyaman.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-surface"
          >
            <MessageCircle size={16} className="text-bull" /> Chat WhatsApp Resmi
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-[13px] font-semibold hover:bg-white/10"
          >
            <CalendarDays size={16} /> Kirim Pesan / Janji Temu
          </Link>
        </div>
      </div>
    </section>
  );
}