"use client";

import "./lowongan.css";
import { useEffect, useState } from "react";
import { fetchJob } from "./api";
import LowonganForm from "./LowonganForm";
import type { JobPosting } from "./types";

type State = { id: string; job?: JobPosting; error?: string };

export default function LowonganEditLoader({ id }: Readonly<{ id: string }>) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchJob(id)
      .then((job) => !cancelled && setState({ id, job }))
      .catch((e: Error) => !cancelled && setState({ id, error: e.message }));

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!state || state.id !== id) {
    return (
      <section className="admin-page">
        <div className="lw-section"><div className="lw-skel" style={{ width: "40%", height: 22 }} /></div>
      </section>
    );
  }

  if (state.error || !state.job) {
    return (
      <section className="admin-page">
        <div className="lw-error" style={{ margin: 0 }}>{state.error ?? "Lowongan tidak ditemukan."}</div>
      </section>
    );
  }

  return <LowonganForm job={state.job} />;
}