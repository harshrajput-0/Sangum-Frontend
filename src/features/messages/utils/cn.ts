/**
 * Minimal className combinator: joins truthy string/falsy values.
 * Deliberately dependency-free (no clsx/tailwind-merge) — swap in
 * tailwind-merge later if class-conflict resolution becomes necessary.
 */
export type ClassValue = string | number | null | undefined | false;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}