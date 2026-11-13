const formatters = new Map<number, Intl.NumberFormat>();

function numberFormat(digits: number) {
  let f = formatters.get(digits);
  if (!f) {
    f = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    formatters.set(digits, f);
  }
  return f;
}

export function formatNumber(value: number | null | undefined, digits = 2) {
  return value == null ? "–" : numberFormat(digits).format(value);
}

export function formatSigned(value: number | null | undefined, digits = 2) {
  if (value == null) return "–";
  const text = numberFormat(digits).format(Math.abs(value));
  return value > 0 ? `+${text}` : value < 0 ? `-${text}` : text;
}

export function formatPercent(value: number | null | undefined) {
  return value == null ? "–" : `${formatSigned(value, 2)}%`;
}

/** "2026-11-05" atau ISO lengkap -> "05 Nov 2026" (atau "5 November 2026" bila long). */
export function formatDate(iso: string, options: { long?: boolean } = {}) {
  const hasTime = iso.length > 10;
  const date = new Date(hasTime ? iso : `${iso}T00:00:00Z`);

  return new Intl.DateTimeFormat("id-ID", {
    day: options.long ? "numeric" : "2-digit",
    month: options.long ? "long" : "short",
    year: "numeric",
    timeZone: hasTime ? "Asia/Jakarta" : "UTC",
  }).format(date);
}