import Image from "next/image";
import RevealGroup from "@/components/ui/RevealGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import { journey } from "../data";

export default function Journey() {
  return (
    <section id="perjalanan" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-25">
      <RevealGroup>
        <div className="reveal-item">
          <SectionHeading
            center
            eyebrow="Perjalanan Magang"
            title="Dari Orientasi sampai Sertifikat"
            desc="Lima tahap yang akan Anda lalui selama program magang."
          />
        </div>
      </RevealGroup>

      <ol className="relative mt-14">
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-brand/25 md:left-1/2"
        />

        {journey.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={s.title} className="relative pb-14 pl-12 last:pb-0 md:pl-0">
              <RevealGroup className="grid items-center gap-5 md:grid-cols-2 md:gap-x-20">
                <span className="reveal-pop absolute left-4 top-0 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-brand text-sm font-bold text-white ring-4 ring-surface md:left-1/2">
                  {i + 1}
                </span>

                <div
                  className={`${flip ? "reveal-right md:order-2" : "reveal-left"} relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy shadow-md`}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${flip ? "reveal-left md:order-1 md:text-right" : "reveal-right"}`}
                >
                  <p className="type-label text-brand">Tahap {i + 1}</p>
                  <h3 className="type-h2 mt-1 text-ink">{s.title}</h3>
                  <p className="type-body mt-2 text-muted">{s.desc}</p>
                </div>
              </RevealGroup>
            </li>
          );
        })}
      </ol>
    </section>
  );
}