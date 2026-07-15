// modules/resources/components/ResourceList.tsx

import { ResourceCard } from "./ResourceCard";
import { RESOURCE_TYPE_PRESET } from "./ResourceTypeBadge";
import { BookmarkIcon, EmptyBoxIcon } from "./icons";
import { cn } from "@/shared/utils/cn";
import type { ResourceData } from "../types";

export interface ResourceListProps {
  resources: ResourceData[];
  /** "row" = compact list (thumbnail + title + meta), "grid" = full ResourceCard tiles. Default "row". */
  layout?: "row" | "grid";
  loading?: boolean;
  /** How many skeleton placeholders to show while `loading`. Default 4. */
  loadingCount?: number;
  emptyMessage?: string;
  onView?: (resource: ResourceData) => void;
  onBookmarkToggle?: (resource: ResourceData, next: boolean) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
}

/** Renders a list of resources as compact rows or a ResourceCard grid, with built-in loading and empty states. */
export function ResourceList({
  resources,
  layout = "row",
  loading = false,
  loadingCount = 4,
  emptyMessage = "No resources found.",
  onView,
  onBookmarkToggle,
  onTagClick,
  className,
}: ResourceListProps) {
  if (loading) {
    return layout === "grid" ? (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    ) : (
      <div className={className}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <RowSkeleton key={i} isLast={i === loadingCount - 1} />
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-3 py-12 text-center", className)}>
        <EmptyBoxIcon className="w-10 h-10 text-[var(--text-muted)]" />
        <p className="text-[length:var(--fs-sm)] text-[var(--text-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", className)}>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} onView={onView} onBookmarkToggle={onBookmarkToggle} onTagClick={onTagClick} />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {resources.map((resource, i) => (
        <ResourceRow
          key={resource.id}
          resource={resource}
          isLast={i === resources.length - 1}
          onView={onView}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
}

function ResourceRow({
  resource,
  isLast,
  onView,
  onBookmarkToggle,
}: {
  resource: ResourceData;
  isLast: boolean;
  onView?: (resource: ResourceData) => void;
  onBookmarkToggle?: (resource: ResourceData, next: boolean) => void;
}) {
  const preset = RESOURCE_TYPE_PRESET[resource.type];
  const meta = [preset.label, resource.durationLabel].filter(Boolean).join(" · ");

  const navigate = () => {
    if (onView) {
      onView(resource);
    } else {
      // TODO: swap for your router's navigate/push — this is a plain example.
      window.location.href = `/resources/${resource.slug}`;
    }
  };

  return (
    <div
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate();
      }}
      role="link"
      tabIndex={0}
      className={cn(
        "flex items-center gap-3 py-2.5 px-1 cursor-pointer hover:bg-[var(--surface-hover)] transition-colors duration-150",
        !isLast && "border-b border-[var(--border)]"
      )}
    >
      <div
        className="w-10 h-10 rounded-[var(--radius-sm)] flex-shrink-0 overflow-hidden"
        style={{ background: resource.thumbnailUrl ? undefined : "var(--brand-gradient-cover)" }}
      >
        {resource.thumbnailUrl && (
          <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[length:var(--fs-sm)] font-semibold text-[var(--text)] truncate">{resource.title}</p>
        <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] truncate">{meta}</p>
      </div>

      {onBookmarkToggle ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(resource, !resource.isBookmarked);
          }}
          aria-pressed={resource.isBookmarked}
          aria-label={resource.isBookmarked ? "Remove bookmark" : "Bookmark resource"}
          className={cn(
            "flex-shrink-0 transition-colors duration-150",
            resource.isBookmarked ? "text-[var(--brand-purple-light)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
          )}
        >
          <BookmarkIcon filled={resource.isBookmarked} className="w-[14px] h-[14px]" />
        </button>
      ) : (
        <BookmarkIcon className="w-[14px] h-[14px] text-[var(--text-muted)] flex-shrink-0" />
      )}
    </div>
  );
}

function RowSkeleton({ isLast }: { isLast: boolean }) {
  const block = "bg-[var(--surface-2)] animate-pulse rounded-[var(--radius-sm)]";
  return (
    <div className={cn("flex items-center gap-3 py-2.5 px-1", !isLast && "border-b border-[var(--border)]")}>
      <div className={cn(block, "w-10 h-10 flex-shrink-0")} />
      <div className="flex-1 flex flex-col gap-1.5">
        <div className={cn(block, "h-2.5 w-1/3")} />
        <div className={cn(block, "h-2 w-1/4")} />
      </div>
    </div>
  );
}

function CardSkeleton() {
  const block = "bg-[var(--surface-2)] animate-pulse";
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
      <div className={cn(block, "h-[110px]")} />
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        <div className={cn(block, "h-4 w-16 rounded-full")} />
        <div className={cn(block, "h-3.5 w-4/5 rounded-[var(--radius-sm)]")} />
        <div className={cn(block, "h-2.5 w-full rounded-[var(--radius-sm)]")} />
        <div className={cn(block, "h-2.5 w-2/3 rounded-[var(--radius-sm)]")} />
      </div>
    </div>
  );
}
