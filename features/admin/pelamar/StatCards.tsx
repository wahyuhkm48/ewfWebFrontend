"use client";

import { CheckCircle2, Hourglass, Inbox, Users } from "lucide-react";
import { formatDate, formatNumber } from "@/lib/format";
import { useCountUp } from "../lowongan/useCountUp";
import type { ApplicantStats } from "./types";

const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

export default function StatCards({ stats }: Readonly<{ stats: ApplicantStats }>) {
  const total = useCountUp(stats.total);
  const fresh = useCountUp(stats.baru);
  const inProcess = stats.screening + stats.interview;
  const process = useCountUp(inProcess);
  const accepted = useCountUp(stats.diterima);

  const max = Math.max(1, ...stats.last7.map((d) => d.count));
  const acceptedPct = pct(stats.diterima, stats.total);

  return (
    <div className="pl-stats">
      {/* 1. Total + 7 hari terakhir */}
      <div className="lw-card" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="lw-card-top">
          Total Pelamar
          <span className="lw-card-icon"><Users size={18} /></span>
        </div>
        <div className="lw-num">{formatNumber(total, 0)}</div>
        <div className="pl-spark" aria-hidden="true">
          {stats.last7.map((d, i) => (
            <span
              key={d.date}
              title={`${formatDate(d.date)}: ${d.count} pelamar`}
              style={{ height: `${Math.max(8, (d.count / max) * 100)}%`, animationDelay: `${0.3 + i * 0.06}s` }}
            />
          ))}
        </div>
        <div className="lw-sub">7 hari terakhir</div>
      </div>

      {/* 2. Baru masuk */}
      <div className="lw-card" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="lw-card-top">
          Baru Masuk
          <span className="lw-card-icon"><Inbox size={18} /></span>
        </div>
        <div className="lw-num">{formatNumber(fresh, 0)}</div>
        <div className="lw-sub">Menunggu ditinjau tim HR</div>
        <span className="lw-chip">{stats.today} masuk hari ini</span>
      </div>

      {/* 3. Dalam proses */}
      <div className="lw-card" style={{ "--i": 2 } as React.CSSProperties}>
        <div className="lw-card-top">
          Dalam Proses
          <span className="lw-card-icon"><Hourglass size={18} /></span>
        </div>
        <div className="lw-num">{formatNumber(process, 0)}</div>
        <div className="lw-split" aria-hidden="true">
          <span style={{ width: `${pct(stats.screening, inProcess)}%`, background: "#3b82f6" }} />
          <span style={{ width: `${pct(stats.interview, inProcess)}%`, background: "var(--a-brand)" }} />
        </div>
        <div className="lw-legend">
          <span><i className="lw-dot" style={{ background: "#3b82f6" }} />Screening {stats.screening}</span>
          <span><i className="lw-dot" style={{ background: "var(--a-brand)" }} />Interview {stats.interview}</span>
        </div>
      </div>

      {/* 4. Diterima (cincin) */}
      <div className="lw-card" style={{ "--i": 3 } as React.CSSProperties}>
        <div className="lw-card-top">
          Diterima
          <span className="lw-card-icon"><CheckCircle2 size={18} /></span>
        </div>
        <div className="lw-ring-row">
          <svg className="lw-ring" width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
            <circle className="bg" cx="44" cy="44" r={RADIUS} fill="none" strokeWidth="9" />
            <circle
              className="fg"
              cx="44"
              cy="44"
              r={RADIUS}
              fill="none"
              strokeWidth="9"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - acceptedPct / 100)}
              style={{ "--circ": CIRC } as React.CSSProperties}
            />
          </svg>
          <div>
            <div className="lw-num" style={{ marginTop: 0 }}>{formatNumber(accepted, 0)}</div>
            <div className="lw-sub">{Math.round(acceptedPct)}% dari total</div>
          </div>
        </div>
        <span className="lw-chip">{stats.ditolak} ditolak</span>
      </div>
    </div>
  );
}