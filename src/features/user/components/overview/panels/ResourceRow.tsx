import { Bookmark, ExternalLink } from "lucide-react";
import type { ResourceItem } from "../../../types/profile.types";

export interface ResourceRowProps {
  resource: ResourceItem;
}

export function ResourceRow({ resource }: ResourceRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="flex items-start gap-2">
        <Bookmark size={15} className="mt-0.5 shrink-0 text-text-muted" />
        <div>
          <p className="text-sm font-medium text-text">{resource.title}</p>
          <p className="mt-0.5 text-xs text-text-muted">{resource.sourceLabel}</p>
        </div>
      </div>
      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 text-text-muted hover:text-text"
        >
          <ExternalLink size={15} />
        </a>
      )}
    </div>
  );
}
