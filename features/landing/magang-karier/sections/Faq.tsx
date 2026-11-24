import { ChevronDown } from "lucide-react";
import RevealGroup from "@/components/ui/RevealGroup";
import { faqs } from "../data";
import { delay, stagger } from "@/lib/reveal";

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-25">
      <RevealGroup threshold={0.1}>
        <div className="text-center">
          <p className="reveal-item type-label text-brand">Pertanyaan Umum</p>
          <h2 className="reveal-item type-h2 mt-2 text-ink" style={delay(100)}>
            Pertanyaan Seputar Magang & Karier
          </h2>
          <p className="reveal-item type-body mt-2 text-muted" style={delay(200)}>
            Syarat, durasi, proses seleksi, dan hal lain yang sering ditanyakan.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              style={stagger(i, 90, 250)}
              className="reveal-item group rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-md open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-semibold text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={16}
                  className="shrink-0 text-muted transition group-open:rotate-180"
                />
              </summary>
              <p className="faq-answer px-5 pb-5 text-sm leading-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}