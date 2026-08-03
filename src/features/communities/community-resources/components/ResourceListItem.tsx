import { FileText, Video, Wrench, BookOpen, Bookmark } from "lucide-react";
import { Tag } from "@/features/communities/shared/components/ui";
import { Resource } from "../types";

interface ResourceListItemProps {
  resource: Resource;
  onBookmarkToggle?: (id: string) => void;
  onClick?: (id: string) => void;
}

const iconMap: Record<string, typeof FileText> = {
  article: FileText,
  video: Video,
  tool: Wrench,
  doc: BookOpen,
};

export function ResourceListItem({
  resource,
  onBookmarkToggle,
  onClick,
}: ResourceListItemProps) {
  const Icon = iconMap[resource.type] ?? FileText;

  return (
    <div
      onClick={() => onClick?.(resource.id)}
      className="flex cursor-pointer gap-3.5 rounded-xl border border-border bg-surface p-4 transition-all hover:border-border-strong hover:shadow-md sm:p-5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-light">
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-text sm:text-base">{resource.title}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle?.(resource.id);
            }}
            aria-label={resource.isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className="shrink-0"
          >
            <Bookmark
              size={16}
              className={resource.isBookmarked ? "fill-primary text-primary" : "text-text-muted"}
            />
          </button>
        </div>
        <p className="mb-3 text-xs text-text-secondary sm:text-sm">{resource.description}</p>
        <div className="mb-2 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <p className="text-xs text-text-muted">{resource.metaLabel}</p>
      </div>
    </div>
  );
}