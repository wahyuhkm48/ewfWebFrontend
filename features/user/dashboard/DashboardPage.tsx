"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useUserName } from "./useUserName";

const recommendations = [
  {
    title: "Junior FX & Commodity Broker",
    location: "Jakarta Pusat",
    type: "Full Time",
    posted: "2 hari lalu",
    featured: true,
  },
  {
    title: "HR People Operations Intern",
    location: "Jakarta Utara",
    type: "Magang",
    posted: "5 hari lalu",
    featured: false,
  },
];

export default function DashboardPage() {
  const userName = useUserName();

  return (
    <>
      <section
            id="overview"
            className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm sm:px-7 sm:py-6"
          >
            <p className="text-sm font-semibold text-brand">Member Dashboard</p>
            <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">
              Halo, {userName}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Pantau progres lamaran dan temukan peluang karier terbaik Anda di Equityworld
              Futures.
            </p>
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.85fr)]">
            <div className="space-y-6">
              <section
                id="applications"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-base font-extrabold">Status Lamaran Terbaru</h2>
                    <p className="mt-1 text-xs text-slate-500">Perbarui secara real-time</p>
                  </div>
                  <Link
                    href="#applications"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                  >
                    Semua lamaran <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-brand">
                      <UsersRound size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">Manager Get Manager</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Equityworld Futures <span className="px-1">•</span> Divisi Bisnis &amp;
                        Kemitraan
                      </p>
                      <p className="mt-2 text-[11px] text-slate-400">Diperbarui hari ini, 10:30</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-[11px] font-bold text-amber-800 sm:ml-auto">
                    <Clock3 size={13} />
                    Dalam proses
                  </span>
                </div>
              </section>

              <section
                id="recommendations"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles size={17} className="text-sapphire" />
                      <h2 className="font-display text-base font-extrabold">
                        Rekomendasi Lowongan Untuk Anda
                      </h2>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Pilihan peluang karier minggu ini</p>
                  </div>
                  <Link
                    href="#recommendations"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sapphire hover:underline"
                  >
                    Semua lowongan <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {recommendations.map((job) => (
                    <article
                      key={job.title}
                      className="flex flex-col rounded-xl border border-slate-200 p-4 transition hover:border-brand/40 hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                          {job.type}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            job.featured
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-sapphire/10 text-sapphire"
                          }`}
                        >
                          {job.featured ? "Urgent" : "Baru"}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-extrabold leading-5">{job.title}</h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={13} /> {job.location}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                        <span className="text-[10px] text-slate-400">{job.posted}</span>
                        <Link
                          href="#recommendations"
                          className="inline-flex items-center gap-1 rounded-lg border border-sapphire px-3 py-1.5 text-[11px] font-bold text-sapphire transition hover:bg-sapphire hover:text-white"
                        >
                          Lihat Detail <ArrowRight size={13} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="notifications"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center gap-2">
                  <Bell size={17} className="text-brand" />
                  <h2 className="font-display text-base font-extrabold">Notifikasi Terbaru</h2>
                </div>
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-orange-50/70 p-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-brand shadow-sm">
                    <FileText size={14} />
                  </span>
                  <p className="text-xs leading-5 text-slate-600">
                    Lamaran Anda untuk posisi <strong>Manager Get Manager</strong> sedang ditinjau
                    oleh tim rekrutmen.
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section
                id="profile"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-base font-extrabold">Kelengkapan Profil</h2>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-extrabold text-brand">
                    70% Selesai
                  </span>
                </div>
                <div className="mt-5 flex justify-center">
                  <div
                    role="img"
                    aria-label="Kelengkapan profil 70 persen"
                    className="grid h-28 w-28 place-items-center rounded-full"
                    style={{
                      background: "conic-gradient(#ec7013 0deg 252deg, #f1f3f5 252deg 360deg)",
                    }}
                  >
                    <div className="grid h-[5.25rem] w-[5.25rem] place-content-center rounded-full bg-white text-center">
                      <span className="font-display text-2xl font-extrabold">70%</span>
                      <span className="text-[9px] font-semibold text-slate-500">Tingkat Selesai</span>
                    </div>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-xs">
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <Check size={15} className="shrink-0 text-emerald-600" />
                    Data Pribadi Lengkap
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <Check size={15} className="shrink-0 text-emerald-600" />
                    Unggah CV terbaru
                    <span className="ml-auto max-w-24 truncate text-[10px] text-slate-400">
                      Rina_EW_2025.pdf
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-500">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-slate-300" />
                    Tambah Riwayat Pengalaman Kerja / Magang
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-500">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-slate-300" />
                    Tautkan Akun LinkedIn
                  </li>
                </ul>
                <Link
                  href="#settings"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-xs font-bold text-white transition hover:bg-brand/90"
                >
                  Lengkapi Profil Sekarang <ArrowUpRight size={14} />
                </Link>
              </section>

              <section
                id="schedule"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={17} className="text-brand" />
                    <h2 className="font-display text-base font-extrabold">Jadwal Terdekat</h2>
                  </div>
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-brand">
                    1 Acara
                  </span>
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <span className="inline-flex rounded-full bg-[#101c2a] px-2.5 py-1 text-[9px] font-bold tracking-wide text-white">
                    INTERVIEW USER
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold">Manager Get Manager</h3>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Pewawancara: Bpk. Fikri (VP Business Strategic)
                  </p>
                  <div className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand shadow-sm">
                      <CalendarDays size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold leading-4 text-ink">
                        Kamis, 26 November 2026 <span className="text-slate-400">•</span> 13:30 -
                        14:30 WIB
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} /> Online via Google Meet
                        </span>
                        <a
                          href="https://meet.google.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-sapphire hover:underline"
                        >
                          Join Meet <ArrowUpRight size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="#schedule"
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-[11px] font-bold text-slate-600 transition hover:border-brand hover:text-brand"
                  >
                    Lihat Detail Jadwal
                  </Link>
                </div>
              </section>

              <section
                id="settings"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck size={18} />
                  </span>
                  <div>
                    <h2 className="text-sm font-extrabold">Akun Anda Terlindungi</h2>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Pastikan informasi profil Anda selalu terbaru.
                    </p>
                    <Link
                      href="#profile"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                    >
                      Periksa profil <ArrowDownRight size={14} />
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
    </>
  );
}
