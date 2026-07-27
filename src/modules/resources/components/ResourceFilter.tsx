// modules/resources/components/ResourceFilter.tsx

import { RESOURCE_TYPE_PRESET } from "./ResourceTypeBadge";
import { SearchIcon } from "./icons";
import { cn } from "@/shared/utils/cn";
import type { ResourceType } from "../types";

export type ResourceSort = "newest" | "popular" | "bookmarked";

export interface ResourceFilterValue {
  search: string;
  type: ResourceType | "all";
  sort: ResourceSort;
}

export interface ResourceFilterProps {
  value: ResourceFilterValue;
  onChange: (value: ResourceFilterValue) => void;
  className?: string;
}

const SORT_LABEL: Record<ResourceSort, string> = {
  newest: "Newest",
  popular: "Most Popular",
  bookmarked: "Most Bookmarked",
};

const selectClasses =
  "w-auto bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] rounded-[var(--radius-md)] px-3.5 py-2.5 text-[length:var(--fs-sm)] transition-colors duration-150 focus:outline-none focus:border-[var(--primary)] focus:shadow-[var(--shadow-glow-purple)]";

/** Search box + type selector + sort — the standard filter bar above a ResourceList. */
export function ResourceFilter({ value, onChange, className }: ResourceFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <div className="relative flex-1 min-w-[160px]">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
        <input
          type="text"
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Search resources…"
          className="w-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] rounded-[var(--radius-md)] pl-[38px] pr-3.5 py-2.5 text-[length:var(--fs-sm)] transition-colors duration-150 focus:outline-none focus:border-[var(--primary)] focus:shadow-[var(--shadow-glow-purple)]"
        />
      </div>

      <select
        value={value.type}
        onChange={(e) => onChange({ ...value, type: e.target.value as ResourceType | "all" })}
        className={selectClasses}
      >
        <option value="all">All Types</option>
        {(Object.keys(RESOURCE_TYPE_PRESET) as ResourceType[]).map((type) => (
          <option key={type} value={type}>
            {RESOURCE_TYPE_PRESET[type].label}
          </option>
        ))}
      </select>

      <select
        value={value.sort}
        onChange={(e) => onChange({ ...value, sort: e.target.value as ResourceSort })}
        className={selectClasses}
      >
        {(Object.keys(SORT_LABEL) as ResourceSort[]).map((sort) => (
          <option key={sort} value={sort}>
            {SORT_LABEL[sort]}
          </option>
        ))}
      </select>
    </div>
  );
}
