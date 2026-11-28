"use client";

import "./lowongan.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { createJob, LowonganError, updateJob } from "./api";
import type { JobInput, JobPosting, JobType } from "./types";

const EMPTY: JobInput = {
  title: "",
  type: "kerja",
  location: "",
  description: "",
  quota: 1,
  deadline: "",
  is_active: true,
};

function fromJob(job: JobPosting): JobInput {
  return {
    title: job.title,
    type: job.type,
    location: job.location ?? "",
    description: job.description ?? "",
    quota: job.quota,
    deadline: job.deadline,
    is_active: job.is_active,
  };
}

export default function LowonganForm({ job }: Readonly<{ job?: JobPosting }>) {
  const router = useRouter();
  const editing = !!job;
  const [form, setForm] = useState<JobInput>(job ? fromJob(job) : EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof JobInput>(key: K, value: JobInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setFormError("");

    // Validasi ringan di browser; aturan lengkap tetap di server
    const local: Record<string, string> = {};
    if (!form.title.trim()) local.title = "Posisi wajib diisi.";
    if (!form.quota || form.quota < 1) local.quota = "Kuota minimal 1 pelamar.";
    if (!form.deadline) local.deadline = "Deadline wajib diisi.";
    if (Object.keys(local).length) {
      setErrors(local);
      setSaving(false);
      return;
    }

    try {
      const payload = { ...form, title: form.title.trim() };
      if (job) await updateJob(String(job.id), payload);
      else await createJob(payload);
      router.push("/admin/lowongan");
      router.refresh();
    } catch (err) {
      if (err instanceof LowonganError && Object.keys(err.fields).length) setErrors(err.fields);
      else setFormError((err as Error).message);
      setSaving(false);
    }
  }

  const field = (name: keyof JobInput) => ({ "data-invalid": !!errors[name] });

  return (
    <section className="admin-page">
      <div className="lw-head">
        <div>
          <h1>{editing ? "Edit Lowongan" : "Buat Lowongan"}</h1>
          <p>{editing ? "Perbarui informasi lowongan." : "Isi detail lowongan yang akan dibuka."}</p>
        </div>
        <Link href="/admin/lowongan" className="lw-btn ghost">
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>

      <form className="lw-form" onSubmit={onSubmit} noValidate>
        <div className="lw-section" style={{ "--i": 0 } as React.CSSProperties}>
          <h2>Informasi Lowongan</h2>
          <div className="lw-grid">
            <div className="lw-field full" {...field("title")}>
              <label htmlFor="title">Posisi</label>
              <input
                id="title"
                className="lw-input"
                value={form.title}
                maxLength={150}
                placeholder="mis. Frontend Developer"
                onChange={(e) => set("title", e.target.value)}
              />
              {errors.title && <span className="err">{errors.title}</span>}
            </div>

            <div className="lw-field" {...field("type")}>
              <label>Tipe</label>
              <div className="lw-seg" data-value={form.type}>
                <i />
                {(["kerja", "magang"] as JobType[]).map((t) => (
                  <button key={t} type="button" aria-pressed={form.type === t} onClick={() => set("type", t)}>
                    {t === "kerja" ? "Kerja" : "Magang"}
                  </button>
                ))}
              </div>
              {errors.type && <span className="err">{errors.type}</span>}
            </div>

            <div className="lw-field" {...field("location")}>
              <label htmlFor="location">Lokasi (opsional)</label>
              <input
                id="location"
                className="lw-input"
                value={form.location}
                maxLength={120}
                placeholder="mis. Jakarta"
                onChange={(e) => set("location", e.target.value)}
              />
              {errors.location && <span className="err">{errors.location}</span>}
            </div>

            <div className="lw-field full" {...field("description")}>
              <label htmlFor="description">Deskripsi (opsional)</label>
              <textarea
                id="description"
                className="lw-textarea"
                value={form.description}
                maxLength={5000}
                placeholder="Tanggung jawab dan kualifikasi…"
                onChange={(e) => set("description", e.target.value)}
              />
              {errors.description && <span className="err">{errors.description}</span>}
            </div>
          </div>
        </div>

        <div className="lw-section" style={{ "--i": 1 } as React.CSSProperties}>
          <h2>Kuota & Jadwal</h2>
          <div className="lw-grid">
            <div className="lw-field" {...field("quota")}>
              <label htmlFor="quota">Kuota pelamar</label>
              <input
                id="quota"
                type="number"
                min={1}
                max={10000}
                className="lw-input"
                value={form.quota}
                onChange={(e) => set("quota", Number(e.target.value))}
              />
              <small>Jumlah maksimal pelamar yang bisa bergabung.</small>
              {errors.quota && <span className="err">{errors.quota}</span>}
            </div>

            <div className="lw-field" {...field("deadline")}>
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                className="lw-input"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
              />
              <small>Lowongan dibuka sampai tanggal ini.</small>
              {errors.deadline && <span className="err">{errors.deadline}</span>}
            </div>

            <div className="lw-field full">
              <label>Status</label>
              <button
                type="button"
                role="switch"
                aria-checked={form.is_active}
                className="lw-switch"
                onClick={() => set("is_active", !form.is_active)}
              >
                <span className="lw-track" />
                {form.is_active ? "Aktif: tampil di website" : "Nonaktif: disembunyikan"}
              </button>
            </div>
          </div>
        </div>

        {formError && <div className="lw-error" style={{ margin: 0 }}>{formError}</div>}

        <div className="lw-foot">
          <Link href="/admin/lowongan" className="lw-btn ghost">Batal</Link>
          <button type="submit" className="lw-btn" disabled={saving}>
            <Save size={18} /> {saving ? "Menyimpan…" : editing ? "Simpan Perubahan" : "Buat Lowongan"}
          </button>
        </div>
      </form>
    </section>
  );
}