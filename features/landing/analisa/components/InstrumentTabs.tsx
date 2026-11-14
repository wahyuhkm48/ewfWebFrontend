import SlidingTabs from "@/components/ui/SlidingTabs";
import type { Instrument } from "../types";

type Props = {
  instruments: Instrument[];
  value: string;
  onChange: (slug: string) => void;
};

export default function InstrumentTabs({ instruments, value, onChange }: Props) {
  return (
    <div className="rounded-2xl bg-softgrey px-4 py-2 sm:px-5">
      {/* w-fit + mx-auto: terpusat saat muat, bisa digeser ke samping di layar sempit */}
      <div className="mx-auto w-fit max-w-full overflow-x-auto px-1 py-3">
        {instruments.length === 0 ? (
          <div className="h-14 w-[30rem] max-w-full animate-pulse rounded-full bg-white" />
        ) : (
          <SlidingTabs
            variant="pill"
            ariaLabel="Produk"
            value={value}
            onChange={onChange}
            options={instruments.map((i) => ({ value: i.slug, label: i.short }))}
          />
        )}
      </div>
    </div>
  );
}