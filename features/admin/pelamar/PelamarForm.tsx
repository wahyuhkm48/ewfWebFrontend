"use client";

import "../lowongan/lowongan.css";
import "./pelamar.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import DatePicker from "@/components/ui/DatePicker";
import Select from "@/components/ui/Select";
import { LowonganError } from "../lowongan/api";
import { createApplicant, updateApplicant } from "./api";
import { STATUS_OPTIONS, type Applicant, type ApplicantInput, type JobOption } from "./types";

function localToday() {
  const t = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

function fromApplicant(a: Applicant): ApplicantInput {
  return {
    job_posting_id: String(a.job_posting_id),
    name: a.name,
    email: a.email,
    phone: a.phone ?? "",
    status: a.status,
    applied_at: a.applied_at,
    notes: a.notes ?? "",
  };
}

type Props = { jobs: JobOption[]; applicant?: Applicant };

export default function PelamarForm({ jobs, applicant }: Readonly<Props>) {
  const router = useRouter();
  const editing = !!applicant;
  const [today] = useState(localToday);
  const [form, setForm] = useState<ApplicantInput>(
    applicant
      ? fromApplicant(applicant)
      : { job_posting_id: "", name: "", email: "", phone: "", status: "baru", applied_at: today, notes: "" },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ApplicantInput>(key: K, value: ApplicantInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const jobOptions = [
    { value: "", label: "Pilih lowongan" },
    ...jobs.map((j) => ({
      value: String(j.id),
      label: `${j.title} · ${j.type === "kerja" ? "Kerja" : "Magang"}${j.is_open ? "" : " (ditutup)"}`,
    })),
  ];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setFormError("");

    const local: Record<string, string> = {};
    if (!form.job_posting_id) local.job_posting_id = "Pilih lowongan yang dilamar.";
    if (!form.name.trim()) local.name = "Nama wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) local.email = "Format email tidak valid.";
    if (!form.applied_at) local.applied_at = "Tanggal melamar wajib diisi.";
    if (Object.keys(local).length) {
      setErrors(local);
      setSaving(false);
      return;
    }

    try {
      if (applicant) await updateApplicant(String(applicant.id), form);
      else await createApplicant(form);
      router.push("/admin/pelamar");
      router.refresh();
    } catch (err) {
      if (err instanceof LowonganError && Object.keys(err.fields).length) setErrors(err.fields);
      else setFormError((err as Error).message);
      setSaving(false);
    }
  }

  const invalid = (name: string) => ({ "data-invalid": !!errors[name] });

  return (
    <section className="admin-page">
      <div className="lw-head">
        <div>
          <h1>{editing ? "Edit Pelamar" : "Tambah Pelamar Manual"}</h1>
          <p>{editing ? "Perbarui data pelamar." : "Catat pelamar yang masuk di luar form website."}</p>
        </div>
        <Link href="/admin/pelamar" className="lw-btn ghost">
          <ArrowLeft size={18} /> Kembali
        </Link>
      </div>

      <form className="lw-form" onSubmit={onSubmit} noValidate>
        <div className="lw-section" style={{ "--i": 0 } as React.CSSProperties}>
          <h2>Data Pelamar</h2>
          <div className="lw-grid">
            <div className="lw-field full" {...invalid("name")}>
              <label htmlFor="name">Nama lengkap</label>
              <input
                id="name"
                className="lw-input"
                value={form.name}
                maxLength={120}
                placeholder="mis. Budi Santoso"
                onChange={(e) => set("name", e.target.value)}
              />
              {errors.name && <span className="err">{errors.name}</span>}
            </div>

            <div className="lw-field" {...invalid("email")}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="lw-input"
                value={form.email}
                maxLength={150}
                placeholder="nama@email.com"
                onChange={(e) => set("email", e.target.value)}
              />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>

            <div className="lw-field" {...invalid("phone")}>
              <label htmlFor="phone">Telepon (opsional)</label>
              <input
                id="phone"
                className="lw-input"
                value={form.phone}
                maxLength={30}
                placeholder="+62 812-3456-7890"
                onChange={(e) => set("phone", e.target.value)}
              />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>
          </div>
        </div>

        <div className="lw-section" style={{ "--i": 1 } as React.CSSProperties}>
          <h2>Lamaran</h2>
          <div className="lw-grid">
            <div className="lw-field full" {...invalid("job_posting_id")}>
              <label htmlFor="job">Posisi yang dilamar</label>
              <div className="lw-ui">
                <Select
                  id="job"
                  ariaLabel="Posisi yang dilamar"
                  value={form.job_posting_id}
                  options={jobOptions}
                  onChange={(v) => set("job_posting_id", v)}
                />
              </div>
              {errors.job_posting_id && <span className="err">{errors.job_posting_id}</span>}
            </div>

            <div className="lw-field" {...invalid("applied_at")}>
              <label htmlFor="applied_at">Tanggal melamar</label>
              <div className="lw-ui">
                <DatePicker
                  id="applied_at"
                  ariaLabel="Tanggal melamar"
                  placeholder="Pilih tanggal"
                  value={form.applied_at}
                  max={today}
                  onChange={(v) => set("applied_at", v)}
                />
              </div>
              {errors.applied_at && <span className="err">{errors.applied_at}</span>}
            </div>

            <div className="lw-field" {...invalid("status")}>
              <label htmlFor="status">Status</label>
              <div className="lw-ui">
                <Select
                  id="status"
                  ariaLabel="Status pelamar"
                  value={form.status}
                  options={STATUS_OPTIONS}
                  onChange={(v) => set("status", v)}
                />
              </div>
              {errors.status && <span className="err">{errors.status}</span>}
            </div>

            <div className="lw-field full" {...invalid("notes")}>
              <label htmlFor="notes">Catatan (opsional)</label>
              <textarea
                id="notes"
                className="lw-textarea"
                value={form.notes}
                maxLength={2000}
                placeholder="Catatan internal tim HR…"
                onChange={(e) => set("notes", e.target.value)}
              />
              {errors.notes && <span className="err">{errors.notes}</span>}
            </div>
          </div>
        </div>

        {formError && <div className="lw-error" style={{ margin: 0 }}>{formError}</div>}

        <div className="lw-foot">
          <Link href="/admin/pelamar" className="lw-btn ghost">Batal</Link>
          <button type="submit" className="lw-btn" disabled={saving}>
            <Save size={18} /> {saving ? "Menyimpan…" : editing ? "Simpan Perubahan" : "Tambah Pelamar"}
          </button>
        </div>
      </form>
    </section>
  );
}