/** Daftar nomor halaman dengan elipsis: 1 2 3 … 12 */
export function pageRange(current: number, last: number): (number | "gap")[] {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }

  const pages = [...new Set([1, 2, 3, last, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= last)
    .sort((a, b) => a - b);

  const result: (number | "gap")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) result.push("gap");
    result.push(p);
  });

  return result;
}