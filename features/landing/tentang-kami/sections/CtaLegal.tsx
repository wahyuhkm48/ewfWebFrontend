import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaLegal() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6">
      <div className="rounded-3xl bg-navy p-8 text-center text-white sm:p-12">
        <h2 className="type-h2">Ingin Mengenal Kami Lebih Dekat?</h2>
        <p className="type-body mx-auto mt-3 max-w-xl text-white/80">
          Konsultasikan kebutuhan investasi berjangka Anda bersama wakil
          pialang berlisensi resmi EWF.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="#legalitas"
            className="rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-ink transition hover:bg-surface"
          >
            Lihat Dokumen Legalitas
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[13px] font-semibold transition hover:bg-brand/90"
          >
            Hubungi Kami <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}