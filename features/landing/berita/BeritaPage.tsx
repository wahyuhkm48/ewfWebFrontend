import Link from "next/link";
import { getNews, getOldestNews } from "../../shared/news/api";
import type { NewsSort } from "./constants";
import type { NewsResponse } from "../../shared/news/types";
import Hero from "./sections/Hero";
import FeaturedNews from "./sections/FeaturedNews";
import NewsGrid from "./sections/NewsGrid";
import CtaBerita from "./sections/CtaBerita";

type Props = {
  page: number;
  sort: NewsSort;
};

export default async function BeritaPage({ page, sort }: Props) {
  let news: NewsResponse | null = null;

  try {
    news = sort === "oldest" ? await getOldestNews(page) : await getNews(page);
  } catch {
    news = null;
  }

  // Di halaman 1 berita pertama tampil sebagai sorotan, sisanya masuk grid.
  const featured = page === 1 ? news?.featured : null;
  const items = featured ? (news?.data.slice(1) ?? []) : (news?.data ?? []);

  return (
    <>
      <Hero />
      {featured && <FeaturedNews item={featured} sort={sort} />}

      {news && items.length > 0 ? (
        <NewsGrid items={items} meta={news.meta} sort={sort} />
      ) : (
        <section id="semua-berita" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-12 sm:px-6 sm:pt-16">
          <div className="rounded-3xl border border-softgrey bg-white p-6 text-center sm:p-10">
            <p className="font-display text-lg font-bold text-ink">
              {news ? "Halaman berita tidak ditemukan." : "Berita belum bisa dimuat saat ini."}
            </p>
            <p className="type-body mt-2 text-muted">
              {news ? "Kembali ke halaman pertama untuk melihat berita terbaru." : "Silakan coba lagi dalam beberapa saat."}
            </p>
            <Link
              href="/berita"
              className="mt-5 inline-block rounded-full bg-brand px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90"
            >
              {news ? "Ke Halaman Pertama" : "Muat Ulang"}
            </Link>
          </div>
        </section>
      )}

      <CtaBerita />
    </>
  );
}