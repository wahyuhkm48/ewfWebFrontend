import SlidingTabs from "@/components/ui/SlidingTabs";
import type { Instrument } from "../../../shared/market/types";

type Props = {
  instruments: Instrument[];
  value: string;
  onChange: (slug: string) => void;
};

export default function InstrumentTabs({ instruments, value, onChange }: Props) {
  const current = instruments.find((i) => i.slug === value);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <p className="type-micro font-semibold uppercase tracking-[0.1em] text-muted">Produk</p>
        <p className="truncate font-display text-lg font-extrabold text-ink">
          {current?.label ?? "Memuat…"}
        </p>
      </div>

      <div className="-mx-1 max-w-full overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {instruments.length === 0 ? (
          <div className="h-11 w-[26rem] max-w-full animate-pulse rounded-full bg-softgrey" />
        ) : (
          <SlidingTabs
            variant="track"
            ariaLabel="Pilih produk"
            value={value}
            onChange={onChange}
            options={instruments.map((i) => ({ value: i.slug, label: i.short }))}
          />
        )}
      </div>
    </div>
  );
}