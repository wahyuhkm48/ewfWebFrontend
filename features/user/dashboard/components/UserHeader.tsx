"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Lowongan", href: "/dashboard/lowongan", icon: BriefcaseBusiness },
  { label: "Lamaran Saya", href: "/dashboard/lamaran-saya", icon: FileText },
  { label: "Profil & Dokumen", href: "/dashboard/profil", icon: UserRound },
  { label: "Jadwal", href: "/dashboard/jadwal", icon: CalendarDays },
  { label: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell },
  { label: "Pengaturan Akun", href: "/dashboard/pengaturan-akun", icon: Settings },
];

type Props = {
  userName: string;
  onLogout: () => void;
};

function isActivePath(pathname: string, href: string) {
  return href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function UserHeader({ userName, onLogout }: Props) {
  const pathname = usePathname();
  const currentPage = navigation.find(({ href }) => isActivePath(pathname, href));
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between px-4 sm:px-7 lg:px-10">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <Image
            src="/images/logoewf.webp"
            alt="Equityworld Futures"
            width={34}
            height={34}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-sm font-extrabold">EWF Member</span>
        </Link>
        <p className="hidden text-sm font-medium text-slate-500 lg:block">
          Member Area <span className="mx-2 text-slate-300">/</span>{" "}
          <span className="text-ink">{currentPage?.label ?? "Bantuan"}</span>
        </p>
        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-ink"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
          </button>
          <span className="hidden h-8 w-px bg-slate-200 sm:block" />
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2.5 text-left"
            aria-label={`Keluar dari akun ${userName}`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffe4d1] font-display text-sm font-extrabold text-brand">
              {initials}
            </span>
            <span className="hidden sm:block">
              <span className="block text-xs font-bold text-ink">{userName}</span>
              <span className="block text-[10px] text-slate-500">Member</span>
            </span>
          </button>
        </div>
      </div>
      <nav
        aria-label="Navigasi dashboard"
        className="dashboard-nav-scroll flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 lg:hidden"
      >
        {navigation.map(({ label, href, icon: Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                active ? "bg-brand/10 text-brand" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
        <Link
          href="/dashboard/bantuan"
          aria-current={isActivePath(pathname, "/dashboard/bantuan") ? "page" : undefined}
          className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
            isActivePath(pathname, "/dashboard/bantuan")
              ? "bg-brand/10 text-brand"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          Bantuan
        </Link>
      </nav>
    </header>
  );
}
