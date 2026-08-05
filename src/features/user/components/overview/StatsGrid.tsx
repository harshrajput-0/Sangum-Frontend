import { formatCompactNumber } from "../../utils/formatCompactNumber";
import type { ProfileStats } from "../../types/profile.types";

export interface StatsGridProps {
  stats: ProfileStats;
  className?: string;
}

const STAT_ITEMS: { key: keyof ProfileStats; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" },
  { key: "comments", label: "Comments" },
];

export function StatsGrid({ stats, className = "" }: StatsGridProps) {
  return (
    <div className={["grid grid-cols-4 gap-2", className].join(" ")}>
      {STAT_ITEMS.map((item) => (
        <div
          key={item.key}
          className="flex flex-col items-center justify-center gap-0.5 rounded-md border border-border bg-bg-elevated py-3"
        >
          <span className="text-lg font-semibold text-text">
            {formatCompactNumber(stats[item.key])}
          </span>
          <span className="text-xs text-text-muted">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
