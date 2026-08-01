/**
 * Pure, timezone-naive-safe formatting helpers. `now` is an injectable
 * parameter (defaults to `new Date()`) so callers/tests can pin "today".
 */

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/**
 * Conversation-row / message-meta timestamp label:
 * "11:24 AM" (today) → "Yesterday" → "Mon" (within the last 7 days)
 * → "May 6" (this year) → "May 6, 2024" (older).
 */
export function formatConversationTimestamp(
  iso: string,
  now: Date = new Date(),
): string {
  const date = new Date(iso);

  if (isSameCalendarDay(date, now)) {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameCalendarDay(date, yesterday)) {
    return "Yesterday";
  }

  const dayDiff = Math.round(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / 86_400_000,
  );
  if (dayDiff > 0 && dayDiff < 7) {
    return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(
      date,
    );
  }

  const sameYear = date.getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  }).format(date);
}

/**
 * Thread date-divider label: "Today" / "Yesterday" / "May 6, 2026".
 */
export function formatDateDividerLabel(
  iso: string,
  now: Date = new Date(),
): string {
  const date = new Date(iso);

  if (isSameCalendarDay(date, now)) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameCalendarDay(date, yesterday)) return "Yesterday";

  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/** Short "10:35 AM" clock label used inside message bubbles. */
export function formatMessageClock(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** Groups messages into buckets keyed by calendar day (YYYY-MM-DD), preserving order. */
export function groupByCalendarDay<T extends { createdAt: string }>(
  items: T[],
): { dayKey: string; items: T[] }[] {
  const groups: { dayKey: string; items: T[] }[] = [];

  for (const item of items) {
    const d = new Date(item.createdAt);
    const dayKey = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.dayKey === dayKey) {
      lastGroup.items.push(item);
    } else {
      groups.push({ dayKey, items: [item] });
    }
  }

  return groups;
}