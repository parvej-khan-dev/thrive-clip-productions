export function formatCount(value: number, decimals: number, suffix: string): string {
  const body = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();
  return body + suffix;
}
