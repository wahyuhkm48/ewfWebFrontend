"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CircleHelp,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "Beranda", href: "/dashboard", icon: LayoutDashboard },
  { label: "Lowongan", href: "/dashboard/lowongan", icon: BriefcaseBusiness },
  { label: "Lamaran Saya", href: "/dashboard/lamaran-saya", icon: FileText },
  { label: "Profil & Dokumen", href: "/dashboard/profil", icon: UserRound },
  { label: "Jadwal", href: "/dashboard/jadwal", icon: CalendarDays },
  { label: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell, badge: "2" },
  { label: "Pengaturan Akun", href: "/dashboard/pengaturan-akun", icon: Settings },
];

type Props = {
  onLogout: () => void;
};

function isActivePath(pathname: string, href: string) {
  return href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export default function UserSidebar({ onLogout }: Props) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#101c2a] text-white lg:flex">
      <Link href="/dashboard" className="flex items-center gap-3 px-6 py-6">
        <Image
          src="/images/logoewf.webp"
          alt="Equityworld Futures"
          width={42}
          height={42}
          className="h-10 w-10 object-contain"
        />
        <span>
          <span className="block font-display text-sm font-extrabold tracking-wide">
            EQUITYWORLD
          </span>
          <span className="block text-[10px] tracking-[0.2em] text-white/55">FUTURES</span>
        </span>
      </Link>

      <Link
        href="/dashboard/lowongan"
        className="mx-4 mb-5 flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand/90"
      >
        <BriefcaseBusiness size={16} />
        Temukan Lowongan
      </Link>

      <nav aria-label="Navigasi dashboard" className="space-y-1 px-3">
        {navigation.map(({ label, href, icon: Icon, badge }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                active
                  ? "bg-brand text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 px-4 py-4">
        <Link
          href="/dashboard/bantuan"
          aria-current={isActivePath(pathname, "/dashboard/bantuan") ? "page" : undefined}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
            isActivePath(pathname, "/dashboard/bantuan")
              ? "bg-white/10 text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <CircleHelp size={16} />
          Bantuan
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold text-red-300 transition hover:bg-red-400/10"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
