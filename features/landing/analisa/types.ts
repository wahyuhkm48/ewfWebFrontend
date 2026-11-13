export type Interval = "daily" | "weekly" | "monthly";

export type Instrument = {
  slug: string;
  label: string;
  short: string;
  tradingview_symbol: string;
  latest_date: string | null;
};

export type HistoryRow = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number | null;
  change_percent: number | null;
};

export type Summary = {
  last_close: { value: number; date: string };
  change: {
    value: number | null;
    percent: number | null;
    sentiment: "bullish" | "bearish" | "netral";
  };
  period_high: { value: number; date: string };
  period_low: { value: number; date: string };
};

export type PageMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export type HistoryResponse = {
  instrument: Pick<Instrument, "slug" | "label" | "short" | "tradingview_symbol">;
  filters: { from: string; to: string; interval: Interval };
  summary: Summary | null;
  data: HistoryRow[];
  meta: PageMeta;
};

export type LiveQuote = {
  price: number;
  open: number;
  high: number;
  low: number;
  change_percent: number;
  direction: string;
  time: string | null;
};

export type LiveResponse = {
  state: string | null;
  updated_at: string | null;
  data: Record<string, LiveQuote>;
};

export type PivotLevels = {
  resistance4: number;
  resistance3: number;
  resistance2: number;
  resistance1: number;
  pivot_point: number;
  support1: number;
  support2: number;
  support3: number;
  support4: number;
};

export type PivotMidpoints = {
  r4_r3: number;
  r3_r2: number;
  r2_r1: number;
  r1_pp: number;
  pp_s1: number;
  s1_s2: number;
  s2_s3: number;
  s3_s4: number;
};

export type PivotResponse = {
  instrument?: { slug: string; label: string; short: string };
  basis?: { date: string; open: number; high: number; low: number; close: number };
  input?: { high: number; low: number; close: number };
  today_open?: number | null;
  live?: LiveQuote | null;
  levels: PivotLevels;
  midpoints: PivotMidpoints;
};

export type Filters = {
  slug: string;
  from: string;
  to: string;
  interval: Interval;
};