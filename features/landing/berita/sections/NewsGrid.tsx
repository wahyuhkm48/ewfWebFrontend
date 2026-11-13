import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { pageRange } from "@/lib/pagination";
import CategoryTag from "../components/CategoryTag";
import NewsImage from "../components/NewsImage";
import type { NewsItem, NewsResponse } from "../types";

type Props = {
  items: NewsItem[];
  meta: NewsResponse["meta"];
};

const pageHref = (page: number) => (page <= 1 ? "/berita#semua-berita" : `/berita?page=${page}#semua-berita`);

function NewsCard({ item }: { item: NewsItem }) {
  const Wrapper = item.url ? "a" : "div";
  const link = item.url
    ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...link}
      className="group flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden rounded-xl bg-navy">
        <NewsImage src={item.image} sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw" />
        <CategoryTag
          category={item.category}
          slug={item.category_slug}
          className="absolute left-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <h3 className="line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{item.excerpt}</p>
        )}
        <div className="type-micro mt-auto flex items-center justify-between pt-4 text-muted">
          <span>
            {item.published_at ? formatDate(item.published_at) : ""} • {item.read_minutes} min
          </span>
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
      </div>
    </Wrapper>
  );
}

export default function NewsGrid({ items, meta }: Props) {
  const { current_page: current, last_page: last } = meta;

  return (
    <section id="semua-berita" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="type-h2 text-ink">Semua Berita</h2>
          <p className="type-body mt-1 text-muted">
            Arsip informasi terverifikasi dan analisis komprehensif
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted">
          Urutkan:
          <span className="rounded-lg border border-softgrey bg-white px-4 py-2 font-medium text-ink">
            Terbaru
          </span>
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <NewsCard key={item.id ?? item.slug ?? item.title} item={item} />
        ))}
      </div>

      {last > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-softgrey pt-6">
          <nav aria-label="Halaman berita" className="flex flex-wrap items-center gap-1.5">
            {current > 1 && (
              <Link
                href={pageHref(current - 1)}
                aria-label="Halaman sebelumnya"
                className="grid h-9 w-9 place-items-center rounded-full border border-softgrey bg-white text-ink transition hover:bg-softgrey"
              >
                <ChevronLeft size={15} />
              </Link>
            )}
            {pageRange(current, last).map((p, i) =>
              p === "gap" ? (
                <span key={`gap-${i}`} className="px-1 text-muted">
                  …
                </span>
              ) : (
                <Link
                  key={p}
                  href={pageHref(p)}
                  aria-current={p === current ? "page" : undefined}
                  className={`grid h-9 min-w-9 place-items-center rounded-full px-2 text-xs font-semibold transition ${
                    p === current
                      ? "bg-brand text-white"
                      : "border border-softgrey bg-white text-ink hover:bg-softgrey"
                  }`}
                >
                  {p}
                </Link>
              ),
            )}
            {current < last && (
              <Link
                href={pageHref(current + 1)}
                aria-label="Halaman berikutnya"
                className="grid h-9 w-9 place-items-center rounded-full border border-softgrey bg-white text-ink transition hover:bg-softgrey"
              >
                <ChevronRight size={15} />
              </Link>
            )}
          </nav>

          {current < last && (
            <Link
              href={pageHref(current + 1)}
              className="rounded-full border border-softgrey bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-softgrey"
            >
              Muat Lebih Banyak Berita
            </Link>
          )}
        </div>
      )}
    </section>
  );
}