"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calculator, Table } from "lucide-react";
import { getInstruments } from "../api";
import type { Instrument } from "../types";
import HistoryPanel from "./HistoryPanel";
import PivotPanel, { type PivotPreset } from "./PivotPanel";
import SlidingTabs from "@/components/ui/SlidingTabs";

type Tab = "history" | "pivot";

const TABS: { id: Tab; query: string; label: string; icon: typeof Table }[] = [
  { id: "history", query: "historis", label: "Data Historis", icon: Table },
  { id: "pivot", query: "kalkulator", label: "Kalkulator Pivot Point", icon: Calculator },
];

export default function AnalisaTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const tab: Tab = params.get("tab") === "kalkulator" ? "pivot" : "history";
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [preset, setPreset] = useState<PivotPreset | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getInstruments(controller.signal)
      .then(setInstruments)
      .catch(() => {
        // Daftar instrumen gagal dimuat: pilihan tetap kosong, panel menampilkan pesan galat sendiri.
      });

    return () => controller.abort();
  }, []);

  const go = (next: Tab) => {
    const query = TABS.find((t) => t.id === next)?.query;
    router.replace(`${pathname}?tab=${query}#panel`, { scroll: false });
  };

  const openPivot = (slug: string, date: string) => {
    setPreset((p) => ({ slug, date, id: (p?.id ?? 0) + 1 }));
    go("pivot");
  };

  return (
    <div id="panel" className="scroll-mt-28">
      <div className="flex justify-center">
        <SlidingTabs
          variant="pill"
          ariaLabel="Alat analisa"
          value={tab}
          onChange={go}
          options={TABS.map(({ id, label, icon: Icon }) => ({
            value: id,
            label: (
              <>
                <Icon size={15} /> {label}
              </>
            ),
          }))}
        />
      </div>

      <div className="mt-8">
        {/* Kedua panel tetap terpasang agar filter dan hasil tidak hilang saat berpindah tab */}
        <div hidden={tab !== "history"}>
          <HistoryPanel instruments={instruments} active={tab === "history"} onPivot={openPivot} />
        </div>
        <div hidden={tab !== "pivot"}>
          <PivotPanel key={preset?.id ?? 0} instruments={instruments} preset={preset} />
        </div>
      </div>
    </div>
  );
}