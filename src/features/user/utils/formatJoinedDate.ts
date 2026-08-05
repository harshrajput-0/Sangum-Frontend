export function formatJoinedDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `Joined ${date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  })}`;
}
