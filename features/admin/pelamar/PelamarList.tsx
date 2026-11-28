"use client";

import "../lowongan/lowongan.css";
import "./pelamar.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import Select from "@/components/ui/Select";
import HistoryPagination from "@/features/landing/analisa/components/HistoryPagination";
import { formatDate, formatNumber } from "@/lib/format";
import { deleteApplicant, fetchApplicants, fetchOptions, setApplicantStatus } from "./api";
import StatCards from "./StatCards";
import {
  STATUS_OPTIONS,
  type Applicant,
  type ApplicantListResponse,
  type ApplicantStatus,
  type JobOption,
  type ListParams,
} from "./types";

const TYPE_OPTIONS: { value: ListParams["type"]; label: string }[] = [
  { value: "", label: "Semua tipe" },
  { value: "kerja", label: "Kerja" },
  { value: "magang", label: "Magang" },
];

const STATUS_FILTER: { value: ListParams["status"]; label: string }[] = [
  { value: "", label: "Semua status" },
  ...STATUS_OPTIONS,
];

type Result = { key: string; data?: ApplicantListResponse; error?: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export default function PelamarList() {
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState<ListParams["type"]>("");
  const [status, setStatus] = useState<ListParams["status"]>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [toDelete, setToDelete] = useState<Applicant | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  const key = JSON.stringify({ page, q, job, type, status, from, to, reload });
  const loading = result?.key !== key;
  const data = result?.data;
  const hasFilter = !!(qInput || job || type || status || from || to);

  const jobFilter = [
    { value: "", label: "Semua posisi" },
    ...jobs.map((j) => ({ value: String(j.id), label: j.title })),
  ];

  // Daftar lowongan untuk dropdown posisi
  useEffect(() => {
    fetchOptions()
      .then(setJobs)
      .catch(() => {});
  }, []);

  // Debounce pencarian
  useEffect(() => {
    const t = setTimeout(() => {
      setQ(qInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [qInput]);

  // Ambil data (loading diturunkan dari `key`)
  useEffect(() => {
    let cancelled = false;

    fetchApplicants({ page, q, job, type, status, from, to })
      .then((d) => !cancelled && setResult({ key, data: d }))
      .catch((e: Error) => !cancelled && setResult({ key, error: e.message }));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const filter = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setPage(1);
  };

  function resetFilters() {
    setQInput("");
    setQ("");
    setJob("");
    setType("");
    setStatus("");
    setFrom("");
    setTo("");
    setPage(1);
  }

  async function changeStatus(row: Applicant, next: ApplicantStatus) {
    if (row.status === next) return;
    setActionError("");

    // Optimistic update
    setResult((prev) =>
      prev?.data
        ? {
            ...prev,
            data: {
              ...prev.data,
              data: prev.data.data.map((a) => (a.id === row.id ? { ...a, status: next } : a)),
            },
          }
        : prev,
    );

    try {
      await setApplicantStatus(row.id, next);
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setReload((n) => n + 1); // segarkan statistik / kembalikan ke data server
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteApplicant(toDelete.id);
      setToDelete(null);
      if (data && data.data.length === 1 && page > 1) setPage(page - 1);
      setReload((n) => n + 1);
    } catch (e) {
      setActionError((e as Error).message);
      setToDelete(null);
    } finally {
      setBusy(false);
    }
  }

  const rows = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section className="admin-page">
      <div className="lw-head">
        <div>
          <h1>Daftar Pelamar</h1>
          <p>Kelola kandidat yang masuk dan proses tahapan seleksinya.</p>
        </div>
        <Link href="/admin/pelamar/baru" className="lw-btn">
          <Plus size={18} /> Tambah Pelamar Manual
        </Link>
      </div>

      {data && <StatCards stats={data.stats} />}

      <div className="lw-panel">
        <div className="pl-toolbar">
          <div className="pl-row">
            <div className="lw-search" style={{ flex: "1 1 240px" }}>
              <Search size={16} />
              <input
                className="lw-input"
                placeholder="Cari nama atau email pelamar…"
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
              />
            </div>
            <div className="lw-ui pl-w-md">
              <Select ariaLabel="Filter posisi" value={job} options={jobFilter} onChange={filter(setJob)} />
            </div>
            <div className="lw-ui pl-w-sm">
              <Select ariaLabel="Filter tipe" value={type} options={TYPE_OPTIONS} onChange={filter(setType)} />
            </div>
            <div className="lw-ui pl-w-sm">
              <Select ariaLabel="Filter status" value={status} options={STATUS_FILTER} onChange={filter(setStatus)} />
            </div>
          </div>

          <div className="pl-row">
            <span className="pl-label">Tanggal melamar</span>
            <div className="lw-ui pl-w-sm">
              <DatePicker
                ariaLabel="Tanggal mulai"
                placeholder="Dari tanggal"
                value={from}
                max={to || undefined}
                onChange={filter(setFrom)}
              />
            </div>
            <span className="pl-sep">–</span>
            <div className="lw-ui pl-w-sm">
              <DatePicker
                ariaLabel="Tanggal akhir"
                placeholder="Sampai tanggal"
                value={to}
                min={from || undefined}
                onChange={filter(setTo)}
              />
            </div>
            {hasFilter && (
              <button type="button" className="lw-btn sm ghost" onClick={resetFilters}>
                <RotateCcw size={14} /> Reset filter
              </button>
            )}
          </div>
        </div>

        {(result?.error || actionError) && <div className="lw-error">{result?.error || actionError}</div>}

        <div className="lw-scroll pl-menu" data-loading={loading && !!data}>
          <table className="lw-table">
            <thead>
              <tr>
                <th>Pelamar</th>
                <th>Posisi dilamar</th>
                <th>Tipe</th>
                <th>Tanggal melamar</th>
                <th>Status</th>
                <th className="lw-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!data &&
                !result?.error &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, c) => (
                      <td key={c}><div className="lw-skel" style={{ width: c === 0 ? "75%" : "50%" }} /></td>
                    ))}
                  </tr>
                ))}

              {rows.map((a, i) => (
                <tr key={a.id} style={{ "--i": i } as React.CSSProperties}>
                  <td>
                    <div className="pl-who">
                      <span className="pl-avatar" aria-hidden="true">{initials(a.name)}</span>
                      <div>
                        <div className="lw-title">{a.name}</div>
                        <div className="pl-contact">
                          {a.email}
                          {a.phone ? ` · ${a.phone}` : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{a.job?.title ?? "–"}</td>
                  <td>
                    {a.job && (
                      <span className={`lw-badge ${a.job.type}`}>{a.job.type === "kerja" ? "Kerja" : "Magang"}</span>
                    )}
                  </td>
                  <td>{formatDate(a.applied_at)}</td>
                  <td>
                    <div className="lw-ui pl-status" data-s={a.status}>
                      <Select
                        ariaLabel={`Status ${a.name}`}
                        value={a.status}
                        options={STATUS_OPTIONS}
                        onChange={(v) => changeStatus(a, v)}
                      />
                    </div>
                  </td>
                  <td className="lw-right">
                    <span className="lw-actions">
                      <Link href={`/admin/pelamar/${a.id}/edit`} className="lw-icon-btn" aria-label={`Edit ${a.name}`}>
                        <Pencil size={17} />
                      </Link>
                      <button
                        type="button"
                        className="lw-icon-btn del"
                        aria-label={`Hapus ${a.name}`}
                        onClick={() => setToDelete(a)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data && rows.length === 0 && <div className="lw-empty">Belum ada pelamar yang cocok.</div>}
        </div>

        {meta && meta.total > 0 && (
          <div className="pl-pager lw-ui">
            <span>
              Menampilkan {meta.from}–{meta.to} dari {formatNumber(meta.total, 0)} pelamar
            </span>
            {meta.last_page > 1 && (
              <HistoryPagination current={meta.current_page} last={meta.last_page} onChange={setPage} />
            )}
          </div>
        )}
      </div>

      {toDelete && (
        <div className="lw-modal" onClick={() => !busy && setToDelete(null)}>
          <div className="lw-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>Hapus pelamar?</h3>
            <p>
              Data <strong>{toDelete.name}</strong> akan dihapus permanen dan tidak bisa dikembalikan. Untuk menolak
              pelamar, ubah saja statusnya menjadi <strong>Ditolak</strong>.
            </p>
            <div className="row">
              <button className="lw-btn ghost" onClick={() => setToDelete(null)} disabled={busy}>Batal</button>
              <button className="lw-btn danger" onClick={confirmDelete} disabled={busy}>
                {busy ? "Menghapus…" : "Ya, hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}