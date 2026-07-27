// modules/users/components/UserStats.tsx
import { cn } from "@/shared/utils/cn";

export interface UserStat {
  label: string;
  value: string | number;
}

export interface UserStatsProps {
  stats: UserStat[];
  /** Makes each stat clickable, e.g. to open a followers list modal. */
  onStatClick?: (stat: UserStat) => void;
  className?: string;
}

export function UserStats({ stats, onStatClick, className }: UserStatsProps) {
  return (
    <div className={cn("flex gap-5", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          role={onStatClick ? "button" : undefined}
          tabIndex={onStatClick ? 0 : undefined}
          onClick={onStatClick ? () => onStatClick(stat) : undefined}
          onKeyDown={
            onStatClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") onStatClick(stat);
                }
              : undefined
          }
          className={cn(
            "flex flex-col items-start",
            onStatClick &&
              "cursor-pointer rounded-sm hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
        >
          <span className="text-(length:--fs-lg) font-semibold text-text leading-tight">
            {stat.value}
          </span>
          <span className="text-(length:--fs-xs) text-text-muted">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
