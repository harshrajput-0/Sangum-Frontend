// modules/posts/components/utils/formatRelativeTime.ts

/** Formats a date as a short relative string: "2h ago", "3d ago", "just now"... */
export function formatRelativeTime(date: string | Date): string {
  const target = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - target.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}
