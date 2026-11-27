import { api } from "@/lib/api";
import { MAX_PAGES } from "../../landing/berita/constants";
import type { NewsResponse } from "./types";

export function getNews(page: number) {
  return api<NewsResponse>(`/news?page=${page}`, { next: { revalidate: 300 } });
}

/** Urutan terlama: halaman 1 = halaman terakhir arsip, isinya dibalik. */
export async function getOldestNews(page: number): Promise<NewsResponse> {
  const first = await getNews(1);
  const last = Math.min(first.meta.last_page, MAX_PAGES);

  if (page > last) {
    return { ...first, data: [], featured: null, meta: { ...first.meta, current_page: page } };
  }

  const apiPage = last - page + 1;
  const source = apiPage === 1 ? first : await getNews(apiPage);
  const data = [...source.data].reverse();

  return {
    data,
    featured: page === 1 ? (data[0] ?? null) : null,
    meta: { ...source.meta, current_page: page, last_page: last },
  };
}