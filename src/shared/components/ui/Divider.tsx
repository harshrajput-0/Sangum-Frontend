import { cn } from "@/shared/utils/cn";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return <span className={cn("inline-block w-px self-stretch bg-[var(--border)]", className)} />;
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="flex-shrink-0 text-[length:var(--fs-xs)] text-[var(--text-muted)]">{label}</span>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>
    );
  }

  return <div className={cn("h-px w-full bg-[var(--border)]", className)} />;
}
