// features/landing/produk/sections/Faq.tsx
import { ChevronDown } from "lucide-react";
import { faqs } from "@/features/landing/produk/data";

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-30 sm:px-6">
      <div className="text-center">
        <p className="type-label text-brand">Pertanyaan Umum</p>
        <h2 className="type-h2 mt-2 text-ink">Pertanyaan Seputar Produk</h2>
        <p className="type-body mt-2 text-muted">
          Informasi faktual dan transparan mengenai perdagangan berjangka di
          EWF.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl bg-white shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown
                size={16}
                className="shrink-0 text-muted transition group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-6 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}