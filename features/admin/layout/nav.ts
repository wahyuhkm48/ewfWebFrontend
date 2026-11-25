import {
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  LayoutDashboard,
  ScrollText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** true = hanya aktif bila path persis sama (untuk /admin) */
  exact?: boolean;
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Lowongan", href: "/admin/lowongan", icon: BriefcaseBusiness },
  { label: "Pelamar", href: "/admin/pelamar", icon: UsersRound },
  { label: "Jadwal Interview", href: "/admin/jadwal-interview", icon: CalendarClock },
  { label: "Laporan", href: "/admin/laporan", icon: BarChart3 },
  { label: "Audit Log", href: "/admin/audit-log", icon: ScrollText },
];

export function isActive(pathname: string, item: AdminNavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}