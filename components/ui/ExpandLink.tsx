import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Tombol teks dengan lingkaran gelap yang melebar jadi pill penuh saat di-hover atau fokus. */
export default function ExpandLink({ href, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-12 shrink-0 items-center rounded-full ${className}`}
    >
      {/* Lingkaran yang melebar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-12 rounded-full bg-navy transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
      />

      {/* Ikon: chevron saat diam, panah saat melebar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 grid h-12 w-12 place-items-center text-white"
      >
        <ChevronRight
          size={18}
          className="col-start-1 row-start-1 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
        />
        <ArrowRight
          size={18}
          className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      </span>

      {/* Teks: gelap saat diam, putih saat lingkaran melebar di belakangnya */}
      <span className="relative pl-14 pr-6 text-[13px] font-bold uppercase tracking-wide text-ink transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
        {children}
      </span>
    </Link>
  );
}