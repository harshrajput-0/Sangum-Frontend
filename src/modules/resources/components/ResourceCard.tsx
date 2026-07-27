// modules/resources/components/ResourceCard.tsx


import { ResourceTypeBadge } from "./ResourceTypeBadge";
import { BookmarkIcon } from "./icons";
import { formatCompactNumber } from "@/shared/utils/fromatCompactNumber";
import { cn } from "@/shared/utils/cn";
import type { ResourceData } from "../types";

export interface ResourceCardProps {
  resource: ResourceData;
  /** Called when the card (or the "View Resource" button) is clicked. Defaults to navigating to /resources/:slug. */
  onView?: (resource: ResourceData) => void;
  /** Pass to make the bookmark count an interactive toggle; omit to render it as a plain stat. */
  onBookmarkToggle?: (resource: ResourceData, next: boolean) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
}

/** Feed/grid tile: thumbnail, type badge, title, description, tags, bookmark count, and a "View Resource" CTA. */
export function ResourceCard({ resource, onView, onBookmarkToggle, onTagClick, className }: ResourceCardProps) {
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
        "flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] cursor-pointer hover:border-[var(--border-strong)] transition-colors duration-150",
        className
      )}
    >
      <div className="h-[110px] flex-shrink-0" style={{ background: resource.thumbnailUrl ? undefined : "var(--brand-gradient-cover)" }}>
        {resource.thumbnailUrl && (
          <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex flex-col flex-1 p-3.5">
        <ResourceTypeBadge type={resource.type} className="self-start mb-2" />

        <h4 className="text-[length:var(--fs-lg)] font-semibold text-[var(--text)] leading-snug mb-1.5 line-clamp-2">
          {resource.title}
        </h4>

        {resource.description && (
          <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] leading-relaxed mb-2.5 line-clamp-2">
            {resource.description}
          </p>
        )}

        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2.5">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className={cn(
                  "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[length:var(--fs-xs)] font-medium text-[var(--text-secondary)] transition-colors duration-150",
                  onTagClick && "cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary-light)]"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
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
                "flex items-center gap-1.5 text-[length:var(--fs-xs)] font-medium transition-colors duration-150",
                resource.isBookmarked ? "text-[var(--primary-light)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              <BookmarkIcon filled={resource.isBookmarked} className="w-[13px] h-[13px]" />
              {formatCompactNumber(resource.bookmarkCount)}
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-[length:var(--fs-xs)] text-[var(--text-muted)]">
              <BookmarkIcon className="w-[13px] h-[13px]" />
              {formatCompactNumber(resource.bookmarkCount)}
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate();
            }}
            className="inline-flex items-center justify-center rounded-[var(--radius-sm)] bg-[var(--primary)] px-3 py-[7px] text-[length:var(--fs-xs)] font-semibold text-[var(--text-on-brand)] shadow-[var(--shadow-sm)] hover:bg-[var(--primary-dark)] transition-colors duration-150"
          >
            View Resource
          </button>
        </div>
      </div>
    </div>
  );
}
