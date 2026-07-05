/** Indian-locale number and currency formatting for the calculators. */

export function formatNumber(n: number): string {
  return Math.round(n || 0).toLocaleString("en-IN");
}

/** Format rupees compactly: ₹x.xx Cr / ₹x.xx L / ₹n. */
export function formatINR(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)} L`;
  return `${sign}₹${formatNumber(abs)}`;
}
