"use client";

import "./admin.css";
import { useEffect, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { usePersisted } from "./usePersisted";

type Theme = "light" | "dark";
type Side = "wide" | "rail";

const THEMES: readonly Theme[] = ["light", "dark"];
const SIDES: readonly Side[] = ["wide", "rail"];

export default function AdminShell({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setTheme] = usePersisted<Theme>("ewf_admin_theme", "light", THEMES);
  const [side, setSide] = usePersisted<Side>("ewf_admin_side", "wide", SIDES);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Esc menutup drawer di mobile
  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="admin-shell" data-theme={theme}>
      <div
        className="admin-overlay"
        data-open={mobileOpen}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <AdminSidebar
        collapsed={side === "rail"}
        theme={theme}
        mobileOpen={mobileOpen}
        onToggleCollapsed={() => setSide(side === "rail" ? "wide" : "rail")}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onNavigate={() => setMobileOpen(false)}
      />

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
          <span>Admin</span>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}