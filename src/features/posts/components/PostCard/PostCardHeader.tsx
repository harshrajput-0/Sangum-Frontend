import type { ReactNode } from 'react';
import { Avatar, Badge } from '../../../../shared/components/ui';

export interface PostCardHeaderProps {
  authorName: string;
  authorInitials: string;
  authorColor: string;
  authorBadge?: string | null;
  date: string;
  edited?: boolean;
  rightSlot?: ReactNode;
}

export function PostCardHeader({ authorName, authorInitials, authorColor, authorBadge, date, edited, rightSlot }: PostCardHeaderProps) {
  return (
    <div className="mb-3.5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={authorInitials} color={authorColor} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text">{authorName}</span>
            {authorBadge && <Badge tone="outline">{authorBadge}</Badge>}
          </div>
          <span className="text-xs text-text-muted">
            {date}
            {edited && <span> · Edited</span>}
          </span>
        </div>
      </div>
      {rightSlot}
    </div>
  );
}