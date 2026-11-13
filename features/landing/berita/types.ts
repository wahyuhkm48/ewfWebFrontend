export type NewsItem = {
  id: number | null;
  slug: string | null;
  title: string;
  excerpt: string;
  category: string;
  category_slug: string;
  image: string | null;
  published_at: string | null;
  read_minutes: number;
  url: string | null;
};

export type NewsResponse = {
  data: NewsItem[];
  /** Hanya terisi di halaman 1 (sama dengan data[0]) */
  featured: NewsItem | null;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};