// modules/posts/components/PostSkeleton.tsx

import { cn } from "@/shared/utils/cn";

export interface PostSkeletonProps {
  /** Reserve space for a media block — turn off for text-only feed placeholders. */
  withMedia?: boolean;
  className?: string;
}

/** Loading placeholder shaped like PostCard — render a few of these while a feed page is fetching. */
export function PostSkeleton({ withMedia = true, className }: PostSkeletonProps) {
  const block = "bg-[var(--surface-2)] animate-pulse rounded-[var(--radius-sm)]";

  return (
    <div className={cn("rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5", className)}>
      <div className="flex items-center gap-3 mb-3.5">
        <div className={cn(block, "w-9 h-9 rounded-full flex-shrink-0")} />
        <div className="flex flex-col gap-1.5 flex-1">
          <div className={cn(block, "h-2.5 w-1/3")} />
          <div className={cn(block, "h-2 w-1/4")} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-3.5">
        <div className={cn(block, "h-2.5 w-full")} />
        <div className={cn(block, "h-2.5 w-4/5")} />
      </div>

      {withMedia && <div className={cn(block, "h-[160px] w-full mb-3.5 rounded-[var(--radius-md)]")} />}

      <div className="flex gap-5">
        <div className={cn(block, "h-2.5 w-8")} />
        <div className={cn(block, "h-2.5 w-8")} />
        <div className={cn(block, "h-2.5 w-8")} />
      </div>
    </div>
  );
}
