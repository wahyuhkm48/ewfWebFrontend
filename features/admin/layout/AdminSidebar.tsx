"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, CircleHelp, Loader2, LogOut, Moon, Sun } from "lucide-react";
import { adminNav, isActive } from "./nav";
import { logout } from "@/features/auth/api";

type Props = {
  /** Mode pendek (icon rail). Hanya berlaku di desktop. */
  collapsed: boolean;
  theme: "light" | "dark";
  /** Drawer terbuka (mobile/tablet) */
  mobileOpen: boolean;
  onToggleCollapsed: () => void;
  onToggleTheme: () => void;
  /** Dipanggil saat link diklik, dipakai untuk menutup drawer */
  onNavigate: () => void;
};

const HELP_HREF = "mailto:info@ewfpro.com";

/** Urutan muncul item saat halaman dibuka (dipakai CSS lewat variabel --i). */
const order = (i: number) => ({ "--i": i }) as CSSProperties;

export default function AdminSidebar({
  collapsed,
  theme,
  mobileOpen,
  onToggleCollapsed,
  onToggleTheme,
  onNavigate,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const activeIndex = adminNav.findIndex((item) => isActive(pathname, item));
  const footStart = adminNav.length + 1;

  const signOut = async () => {
    if (leaving) return;
    setLeaving(true);
    await logout(); // cabut token di server, lalu hapus sesi di browser
    router.replace("/masuk");
  };

  return (
    <aside
      className="admin-side"
      data-collapsed={collapsed}
      data-open={mobileOpen}
      aria-label="Navigasi admin"
    >
      <div className="admin-panel" aria-hidden="true" />

      <button
        type="button"
        className="admin-handle"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        aria-expanded={!collapsed}
      >
        <ChevronLeft size={15} />
      </button>

      <Link href="/admin" className="admin-brand" style={order(0)} onClick={onNavigate}>
        <Image src="/images/logoewf.webp" alt="" width={40} height={40} />
        <span className="admin-brand-text">
          <b>EQUITYWORLD</b>
          <i>ADMIN PANEL</i>
        </span>
      </Link>

      <nav className="admin-nav" aria-label="Menu utama">
        {/* Tab aktif tunggal yang meluncur ke item terpilih */}
        <span
          aria-hidden="true"
          className="admin-indicator"
          data-hidden={activeIndex < 0}
          style={{ "--a-active": Math.max(activeIndex, 0) } as CSSProperties}
        />

        {adminNav.map(({ label, href, icon: Icon }, i) => {
          const active = i === activeIndex;

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              data-active={active}
              className="admin-item"
              style={order(i + 1)}
            >
              <span className="admin-ico">
                <Icon size={20} strokeWidth={active ? 2.2 : 1.9} />
              </span>
              <span className="admin-label">{label}</span>
              <span className="admin-tip" aria-hidden="true">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-foot">
        <a href={HELP_HREF} className="admin-item" style={order(footStart)}>
          <span className="admin-ico">
            <CircleHelp size={20} strokeWidth={1.9} />
          </span>
          <span className="admin-label">Bantuan</span>
          <span className="admin-tip" aria-hidden="true">
            Bantuan
          </span>
        </a>

        <button
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          className="admin-item"
          style={order(footStart + 1)}
          onClick={onToggleTheme}
        >
          <span className="admin-ico admin-ico-swap">
            <Sun className="sun" size={20} strokeWidth={1.9} />
            <Moon className="moon" size={20} strokeWidth={1.9} />
          </span>
          <span className="admin-label">
            <span>Mode Tampilan</span>
            <span className="admin-switch" aria-hidden="true" />
          </span>
          <span className="admin-tip" aria-hidden="true">
            Mode {theme === "dark" ? "Gelap" : "Terang"}
          </span>
        </button>

        <button
          type="button"
          data-tone="danger"
          className="admin-item"
          style={order(footStart + 2)}
          onClick={signOut}
          disabled={leaving}
        >
          <span className="admin-ico">
            {leaving ? (
              <Loader2 className="admin-spin" size={20} />
            ) : (
              <LogOut size={20} strokeWidth={1.9} />
            )}
          </span>
          <span className="admin-label">{leaving ? "Keluar…" : "Keluar"}</span>
          <span className="admin-tip" aria-hidden="true">
            Keluar
          </span>
        </button>
      </div>
    </aside>
  );
}