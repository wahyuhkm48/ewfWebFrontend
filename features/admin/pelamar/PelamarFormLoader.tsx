"use client";

import "../lowongan/lowongan.css";
import { useEffect, useState } from "react";
import { fetchApplicant, fetchOptions } from "./api";
import PelamarForm from "./PelamarForm";
import type { Applicant, JobOption } from "./types";

type State = { key: string; jobs?: JobOption[]; applicant?: Applicant; error?: string };

export default function PelamarFormLoader({ id }: Readonly<{ id?: string }>) {
  const key = id ?? "new";
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchOptions(), id ? fetchApplicant(id) : Promise.resolve(undefined)])
      .then(([jobs, applicant]) => !cancelled && setState({ key, jobs, applicant }))
      .catch((e: Error) => !cancelled && setState({ key, error: e.message }));

    return () => {
      cancelled = true;
    };
  }, [key, id]);

  if (!state || state.key !== key) {
    return (
      <section className="admin-page">
        <div className="lw-section"><div className="lw-skel" style={{ width: "40%", height: 22 }} /></div>
      </section>
    );
  }

  if (state.error || !state.jobs) {
    return (
      <section className="admin-page">
        <div className="lw-error" style={{ margin: 0 }}>{state.error ?? "Data tidak ditemukan."}</div>
      </section>
    );
  }

  return <PelamarForm jobs={state.jobs} applicant={state.applicant} />;
}