import ExpandLink from "@/components/ui/ExpandLink";
import RevealGroup from "@/components/ui/RevealGroup";
import SectionHeading from "@/components/ui/SectionHeading";
import { getNews } from "@/features/shared/news/api";
import NewsCard from "@/features/shared/news/components/NewsCard";
import type { NewsItem } from "@/features/shared/news/types";
import { stagger } from "@/lib/reveal";

export default async function News() {
  let items: NewsItem[] = [];

  try {
    items = (await getNews(1)).data.slice(0, 4);
  } catch {
    items = [];
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-50 sm:px-6">
      <RevealGroup threshold={0.1}>
        <div className="reveal-item flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Berita Terkini" title="Berita Pasar Finansial Global" />
          <ExpandLink href="/berita">Jelajahi Semua Berita</ExpandLink>
        </div>

        {items.length > 0 ? (
          <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {items.map((item, i) => (
              <div
                key={item.id ?? item.slug ?? item.title}
                className="reveal-item w-[78%] shrink-0 snap-start sm:h-full sm:w-auto"
                style={stagger(i, 100, 150)}
              >
                <NewsCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="reveal-fade mt-8 rounded-3xl border border-softgrey bg-white p-10 text-center">
            <p className="type-body text-muted">Berita belum bisa dimuat saat ini.</p>
          </div>
        )}
      </RevealGroup>
    </section>
  );
}