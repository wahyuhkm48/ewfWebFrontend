import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import CategoryTag from "../components/CategoryTag";
import NewsImage from "../components/NewsImage";
import type { NewsItem } from "../types";

export default function FeaturedNews({ item }: { item: NewsItem }) {
  const Wrapper = item.url ? "a" : "div";
  const link = item.url
    ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <section id="berita-terbaru" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="type-h2 text-ink">Berita Terbaru</h2>
          <p className="type-body mt-1 text-muted">
            Perkembangan pasar komoditi dan indeks bursa terkini hari ini
          </p>
        </div>
        <a
          href="#semua-berita"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Lihat Semua Berita <ChevronRight size={14} />
        </a>
      </div>

      <Wrapper
        {...link}
        className="group relative mt-6 block h-[24rem] overflow-hidden rounded-3xl bg-navy text-white sm:h-[28rem]"
      >
        <NewsImage src={item.image} sizes="(min-width: 1280px) 1232px, 100vw" priority />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <CategoryTag category={item.category} slug={item.category_slug} />
          <h3 className="type-h2 mt-3 max-w-3xl transition group-hover:text-white/90">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="type-body mt-3 line-clamp-2 max-w-3xl text-white/80">{item.excerpt}</p>
          )}
          <p className="type-micro mt-4 flex flex-wrap items-center gap-x-3 border-t border-white/15 pt-4 text-white/70">
            {item.published_at && <span>{formatDate(item.published_at, { long: true })}</span>}
            <span aria-hidden="true">•</span>
            <span>{item.read_minutes} menit baca</span>
            <span aria-hidden="true">•</span>
            <span className="font-semibold text-bull">Berita Pasar</span>
          </p>
        </div>
      </Wrapper>
    </section>
  );
}