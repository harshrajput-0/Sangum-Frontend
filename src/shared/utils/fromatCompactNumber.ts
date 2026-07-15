// modules/posts/components/utils/formatCompactNumber.ts

/** 128 -> "128", 1240 -> "1.2K", 3400000 -> "3.4M" */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}