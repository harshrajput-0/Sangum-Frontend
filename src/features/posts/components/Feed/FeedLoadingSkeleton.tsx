/** Uses Tailwind's built-in animate-pulse + your existing bg-surface-hover token — no custom shimmer CSS needed. */
export function FeedLoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-3.5 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-surface-hover" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 rounded bg-surface-hover" />
          <div className="h-2.5 w-20 rounded bg-surface-hover" />
        </div>
      </div>
      <div className="mb-3 h-4 w-3/4 rounded bg-surface-hover" />
      <div className="mb-2 h-3 w-full rounded bg-surface-hover" />
      <div className="h-3 w-2/3 rounded bg-surface-hover" />
    </div>
  );
}