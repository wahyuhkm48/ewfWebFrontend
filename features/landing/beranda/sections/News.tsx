import ExpandLink from "@/components/ui/ExpandLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { getNews } from "@/features/landing/berita/api";
import NewsCard from "@/features/landing/berita/components/NewsCard";
import type { NewsItem } from "@/features/landing/berita/types";

export default async function News() {
  let items: NewsItem[] = [];

  try {
    items = (await getNews(1)).data.slice(0, 4);
  } catch {
    items = [];
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-50 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Berita Terkini" title="Berita Pasar Finansial Global" />
        <ExpandLink href="/berita">Jelajahi Semua Berita</ExpandLink>
      </div>

      {items.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <NewsCard key={item.id ?? item.slug ?? item.title} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-softgrey bg-white p-10 text-center">
          <p className="type-body text-muted">Berita belum bisa dimuat saat ini.</p>
        </div>
      )}
    </section>
  );
}