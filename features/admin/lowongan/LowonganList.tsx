"use client";

import "./lowongan.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Select from "@/components/ui/Select";
import { formatDate } from "@/lib/format";
import { deleteJob, fetchJobs, setJobStatus } from "./api";
import StatCards from "./StatCards";
import type { JobListResponse, JobPosting, ListParams } from "./types";

const TYPE_OPTIONS: { value: ListParams["type"]; label: string }[] = [
  { value: "", label: "Semua tipe" },
  { value: "kerja", label: "Kerja" },
  { value: "magang", label: "Magang" },
];

const STATUS_OPTIONS: { value: ListParams["status"]; label: string }[] = [
  { value: "", label: "Semua status" },
  { value: "aktif", label: "Aktif" },
  { value: "nonaktif", label: "Nonaktif" },
];

type Result = { key: string; data?: JobListResponse; error?: string };

export default function LowonganList() {
  const [page, setPage] = useState(1);
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [type, setType] = useState<ListParams["type"]>("");
  const [status, setStatus] = useState<ListParams["status"]>("");
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [toDelete, setToDelete] = useState<JobPosting | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  const key = JSON.stringify({ page, q, type, status, reload });
  const loading = result?.key !== key;
  const data = result?.data;

  // Debounce pencarian
  useEffect(() => {
    const t = setTimeout(() => {
      setQ(qInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [qInput]);

  // Ambil data (loading diturunkan dari `key`, bukan setState sinkron)
  useEffect(() => {
    let cancelled = false;

    fetchJobs({ page, q, type, status })
      .then((d) => !cancelled && setResult({ key, data: d }))
      .catch((e: Error) => !cancelled && setResult({ key, error: e.message }));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function toggle(job: JobPosting) {
    setActionError("");
    const next = !job.is_active;

    // Optimistic update
    setResult((prev) =>
      prev?.data
        ? { ...prev, data: { ...prev.data, data: prev.data.data.map((j) => (j.id === job.id ? { ...j, is_active: next } : j)) } }
        : prev,
    );

    try {
      await setJobStatus(job.id, next);
      setReload((n) => n + 1); // segarkan statistik
    } catch (e) {
      setActionError((e as Error).message);
      setReload((n) => n + 1); // kembalikan ke data server
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteJob(toDelete.id);
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
          <h1>Daftar Lowongan Kerja</h1>
          <p>Kelola lowongan kerja dan magang yang tampil di website.</p>
        </div>
        <Link href="/admin/lowongan/baru" className="lw-btn">
          <Plus size={18} /> Buat Lowongan
        </Link>
      </div>

      {data && <StatCards stats={data.stats} />}

      <div className="lw-panel">
        <div className="lw-toolbar">
          <div className="lw-search">
            <Search size={16} />
            <input
              className="lw-input"
              placeholder="Cari posisi…"
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
            />
          </div>
                    <div className="lw-ui lw-filter">
            <Select
              ariaLabel="Filter tipe"
              value={type}
              options={TYPE_OPTIONS}
              onChange={(v) => {
                setType(v);
                setPage(1);
              }}
            />
          </div>
          <div className="lw-ui lw-filter">
            <Select
              ariaLabel="Filter status"
              value={status}
              options={STATUS_OPTIONS}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            />
          </div>
        </div>

        {(result?.error || actionError) && <div className="lw-error">{result?.error || actionError}</div>}

        <div className="lw-scroll" data-loading={loading && !!data}>
          <table className="lw-table">
            <thead>
              <tr>
                <th>Posisi</th>
                <th>Tipe</th>
                <th>Kuota</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="lw-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!data &&
                !result?.error &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((__, c) => (
                      <td key={c}><div className="lw-skel" style={{ width: c === 0 ? "70%" : "50%" }} /></td>
                    ))}
                  </tr>
                ))}

              {rows.map((job, i) => (
                <tr key={job.id} style={{ "--i": i } as React.CSSProperties}>
                  <td>
                    <div className="lw-title">{job.title}</div>
                    {job.location && <div className="lw-loc">{job.location}</div>}
                  </td>
                  <td><span className={`lw-badge ${job.type}`}>{job.type === "kerja" ? "Kerja" : "Magang"}</span></td>
                  <td>{job.quota} pelamar</td>
                  <td>
                    <div>{formatDate(job.deadline)}</div>
                    {job.days_left < 0 ? (
                      <div className="lw-late">Berakhir</div>
                    ) : job.days_left <= 7 ? (
                      <div className="lw-soon">{job.days_left === 0 ? "Berakhir hari ini" : `${job.days_left} hari lagi`}</div>
                    ) : (
                      <div className="lw-mute">{job.days_left} hari lagi</div>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={job.is_active}
                      className="lw-switch"
                      onClick={() => toggle(job)}
                    >
                      <span className="lw-track" />
                      {job.is_active ? "Aktif" : "Nonaktif"}
                    </button>
                  </td>
                  <td className="lw-right">
                    <span className="lw-actions">
                      <Link href={`/admin/lowongan/${job.id}/edit`} className="lw-icon-btn" aria-label={`Edit ${job.title}`}>
                        <Pencil size={17} />
                      </Link>
                      <button
                        type="button"
                        className="lw-icon-btn del"
                        aria-label={`Hapus ${job.title}`}
                        onClick={() => setToDelete(job)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data && rows.length === 0 && <div className="lw-empty">Belum ada lowongan yang cocok.</div>}
        </div>

        {meta && meta.last_page > 1 && (
          <div className="lw-pager">
            <span>
              Halaman {meta.current_page} dari {meta.last_page} · {meta.total} lowongan
            </span>
            <div>
              <button className="lw-icon-btn" disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Sebelumnya">
                <ChevronLeft size={18} />
              </button>
              <button
                className="lw-icon-btn"
                disabled={page >= meta.last_page}
                onClick={() => setPage(page + 1)}
                aria-label="Berikutnya"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {toDelete && (
        <div className="lw-modal" onClick={() => !busy && setToDelete(null)}>
          <div className="lw-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>Hapus lowongan?</h3>
            <p>
              Lowongan <strong>{toDelete.title}</strong> akan dihapus permanen dan tidak bisa dikembalikan. Untuk
              menyembunyikan sementara, gunakan toggle status saja.
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