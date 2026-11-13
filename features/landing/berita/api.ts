import { api } from "@/lib/api";
import type { NewsResponse } from "./types";

export function getNews(page: number) {
  return api<NewsResponse>(`/news?page=${page}`, { next: { revalidate: 300 } });
}