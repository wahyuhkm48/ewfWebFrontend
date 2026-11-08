import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps } from "@/features/landing/beranda/data";

export default function Steps() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-55 sm:px-6">
      <SectionHeading
        center
        eyebrow="Mudah & Terpandu"
        title="Mulai dalam 3 Langkah Sederhana"
        desc="Proses pendaftaran terstandarisasi BAPPEBTI dengan verifikasi resmi yang cepat dan aman."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.no} className="rounded-2xl bg-white p-6 shadow-sm">
            <span
              className={`type-data grid h-10 w-10 place-items-center rounded-xl text-white ${s.color}`}
            >
              {s.no}
            </span>
            <h3 className="type-h3 mt-4 text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{s.desc}</p>
            <Link
              href="/tentang-kami"
              className="mt-4 inline-block text-[13px] font-semibold text-brand hover:underline"
            >
              {s.link} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}