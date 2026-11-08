"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import GooeyNav from "@/components/ui/GooeyNav";
import { navLinks } from "@/features/landing/shared/data/nav";

const darkHeroRoutes = ["/", "/tentang-kami", "/produk"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.max(
    0,
    navLinks.findIndex((l) => l.href === pathname)
  );

  // Transparan hanya di Beranda (yang punya hero gelap) dan saat posisi paling atas.
  const solid = scrolled || open || !darkHeroRoutes.includes(pathname);

  return (
    <header
      className={`fixed inset-x-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "top-0 border-white/10 bg-navy/90 backdrop-blur"
          : "top-5 sm:top-12 border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Ganti dengan <Image> logo asli nanti */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand font-display font-extrabold">
            E
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-extrabold tracking-wide">
              EQUITYWORLD
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-white/60">
              FUTURES
            </span>
          </span>
        </Link>

        {/* Desktop: Gooey Nav */}
        <div className="hidden xl:block">
          <GooeyNav
            items={navLinks}
            activeIndex={activeIndex}
            theme="dark"
            size="md"
            color="#ec7013"
            activeTextColor="#ffffff"
            colors={["#ec7013", "#138eec", "#ffffff"]}
            animationTime={600}
            particleCount={10}
            spread={44}
          />
        </div>

        <div className="hidden items-center gap-5 xl:flex">
          <span className="text-[13px] font-medium text-white/60">ID / EN</span>
          <Link
            href="/masuk"
            className="text-[13px] font-semibold text-white/80 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/daftar"
            className="rounded-full bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand/90"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="text-white xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile: menu biasa */}
      {open && (
        <div className="border-t border-white/10 px-4 py-3 xl:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`type-label block rounded-lg px-3 py-3 ${
                pathname === l.href
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-3">
            <Link
              href="/masuk"
              className="flex-1 rounded-full border border-white/20 py-2.5 text-center text-[13px] font-semibold text-white"
            >
              Sign In
            </Link>
            <Link
              href="/daftar"
              className="flex-1 rounded-full bg-brand py-2.5 text-center text-[13px] font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}