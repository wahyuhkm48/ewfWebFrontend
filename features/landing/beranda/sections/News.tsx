import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { news } from "@/features/landing/shared/data/news";

export default function News() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading eyebrow="Kabar Terkini" title="Berita Pasar Finansial Global" />
        <Link
          href="/berita"
          className="shrink-0 text-[13px] font-semibold text-brand hover:underline"
        >
          Jelajahi Semua Berita →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {news.map((n) => (
          <article key={n.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative h-40 bg-softgrey">
              <Image
                src={n.image}
                alt={n.title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sapphire">
                {n.category}
              </p>
              <h3 className="mt-2 line-clamp-3 font-display text-base font-semibold leading-snug text-ink">
                {n.title}
              </h3>
              <div className="type-micro mt-4 flex justify-between text-muted">
                <span>{n.time}</span>
                <span>{n.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}