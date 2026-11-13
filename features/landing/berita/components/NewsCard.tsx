import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { NewsItem } from "../types";
import CategoryTag from "./CategoryTag";
import NewsImage from "./NewsImage";

export default function NewsCard({ item }: { item: NewsItem }) {
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