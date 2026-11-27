import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import RevealGroup from "@/components/ui/RevealGroup";
import type { NewsItem, NewsResponse } from "../../../shared/news/types";
import { MAX_PAGES, SORT_OPTIONS, newsHref, type NewsSort } from "../constants";
import NewsImage from "../../../shared/news/components/NewsImage";
import CategoryTag from "../../../shared/news/components/CategoryTag";
import { formatDate } from "@/lib/format";
import { delay } from "@/lib/reveal";

type Props = {
  items: NewsItem[];
  meta: NewsResponse["meta"];
  sort: NewsSort;
};

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const Wrapper = item.url ? "a" : "div";
  const link = item.url
    ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...link}
      className="reveal-item group flex h-full flex-col rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      style={delay((index % 3) * 110)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy sm:aspect-auto sm:h-44">
        <NewsImage
          src={item.image}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          settle
        />
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

export default function NewsGrid({ items, meta, sort }: Props) {
  const current = meta.current_page;
  const last = Math.min(meta.last_page, MAX_PAGES);

  return (
    <section id="semua-berita" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-12 sm:px-6 sm:pt-16">
      <RevealGroup threshold={0.1}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="reveal-item">
            <h2 className="type-h2 text-ink">Semua Berita</h2>
            <p className="type-body mt-1 text-muted">
              Arsip informasi terverifikasi dan analisis komprehensif
            </p>
          </div>
          <div
            className="reveal-item flex w-full items-center gap-2 text-xs text-muted sm:w-auto"
            style={delay(120)}
          >
            <span id="urutkan-label">Urutkan:</span>
            <div
              role="group"
              aria-labelledby="urutkan-label"
              className="flex flex-1 rounded-lg border border-softgrey bg-white p-1 sm:inline-flex sm:flex-none"
            >
              {SORT_OPTIONS.map((o) => (
                <Link
                  key={o.value}
                  href={newsHref(1, o.value, "berita-terbaru")}
                  aria-current={o.value === sort ? "true" : undefined}
                  className={`flex-1 rounded-md px-3.5 py-2.5 text-center font-semibold transition-colors sm:flex-none sm:py-1.5 ${
                    o.value === sort ? "bg-navy text-white" : "text-muted hover:text-ink"
                  }`}
                >
                  {o.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </RevealGroup>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map((item, i) => (
          <RevealGroup
            key={item.id ?? item.slug ?? item.title}
            threshold={0.12}
            className="h-full"
          >
            <NewsCard item={item} index={i} />
          </RevealGroup>
        ))}
      </div>

      {last > 1 && (
        <RevealGroup className="mt-8 flex justify-center sm:mt-10 sm:justify-end">
          <div className="reveal-item">
            <Pagination current={current} last={last} sort={sort} />
          </div>
        </RevealGroup>
      )}
    </section>
  );
}