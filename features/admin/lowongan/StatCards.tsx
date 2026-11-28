"use client";

import { Briefcase, CheckCircle2, Users } from "lucide-react";
import { formatNumber } from "@/lib/format";
import { useCountUp } from "./useCountUp";
import type { JobStats } from "./types";

const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

const pct = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

export default function StatCards({ stats }: Readonly<{ stats: JobStats }>) {
  const total = useCountUp(stats.total);
  const open = useCountUp(stats.open);
  const quotaAll = stats.quota_kerja + stats.quota_magang;
  const quota = useCountUp(quotaAll);
  const openPct = pct(stats.open, stats.total);

  return (
    <div className="lw-stats">
      {/* 1. Total lowongan */}
      <div className="lw-card" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="lw-card-top">
          Total Lowongan
          <span className="lw-card-icon"><Briefcase size={18} /></span>
        </div>
        <div className="lw-num">{formatNumber(total, 0)}</div>
        <div className="lw-split" aria-hidden="true">
          <span className="k" style={{ width: `${pct(stats.kerja, stats.total)}%` }} />
          <span className="m" style={{ width: `${pct(stats.magang, stats.total)}%` }} />
        </div>
        <div className="lw-legend">
          <span><i className="lw-dot" style={{ background: "var(--a-brand)" }} />Kerja {stats.kerja}</span>
          <span><i className="lw-dot" style={{ background: "#3b82f6" }} />Magang {stats.magang}</span>
        </div>
      </div>

      {/* 2. Lowongan aktif (cincin) */}
      <div className="lw-card" style={{ "--i": 1 } as React.CSSProperties}>
        <div className="lw-card-top">
          Lowongan Aktif
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
              strokeDashoffset={CIRC * (1 - openPct / 100)}
              style={{ "--circ": CIRC } as React.CSSProperties}
            />
          </svg>
          <div>
            <div className="lw-num" style={{ marginTop: 0 }}>{formatNumber(open, 0)}</div>
            <div className="lw-sub">{Math.round(openPct)}% dari {stats.total} lowongan</div>
          </div>
        </div>
        <span className="lw-chip">{stats.closed} nonaktif / berakhir</span>
      </div>

      {/* 3. Kuota terbuka */}
      <div className="lw-card" style={{ "--i": 2 } as React.CSSProperties}>
        <div className="lw-card-top">
          Total Kuota Terbuka
          <span className="lw-card-icon"><Users size={18} /></span>
        </div>
        <div className="lw-num">{formatNumber(quota, 0)}</div>
        <div className="lw-bars">
          <div>
            <div className="lw-bar-label"><span>Kerja</span><span>{stats.quota_kerja}</span></div>
            <div className="lw-bar">
              <span style={{ width: `${pct(stats.quota_kerja, quotaAll)}%`, background: "var(--a-brand)" }} />
            </div>
          </div>
          <div>
            <div className="lw-bar-label"><span>Magang</span><span>{stats.quota_magang}</span></div>
            <div className="lw-bar">
              <span style={{ width: `${pct(stats.quota_magang, quotaAll)}%`, background: "#3b82f6" }} />
            </div>
          </div>
        </div>
        {stats.closing_soon > 0 && <span className="lw-chip">{stats.closing_soon} segera berakhir (≤ 7 hari)</span>}
      </div>
    </div>
  );
}