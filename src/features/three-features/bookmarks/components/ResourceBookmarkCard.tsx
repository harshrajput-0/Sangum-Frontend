import { Bookmark, FileText } from 'lucide-react';
import type { ResourceBadgeVariant } from '../types';

const BADGE_STYLES: Record<ResourceBadgeVariant, string> = {
  amber: 'bg-warning-bg text-warning',
  blue: 'bg-info-bg text-info',
  green: 'bg-success-bg text-success',
};

interface ResourceBookmarkCardProps {
  title: string;
  communityName: string;
  fileType: string;
  fileSize: string;
  avatarColor: string;
  badgeVariant: ResourceBadgeVariant;
  isRemoving?: boolean;
  onRemove?: () => void;
}

export function ResourceBookmarkCard({
  title,
  communityName,
  fileType,
  fileSize,
  avatarColor,
  badgeVariant,
  isRemoving = false,
  onRemove,
}: ResourceBookmarkCardProps) {
  return (
    <div
      className={`flex gap-4 rounded-lg border border-border bg-surface p-5 transition-all duration-200 ${
        isRemoving ? 'm-0 max-h-0 overflow-hidden !border-0 !p-0 opacity-0' : 'max-h-[300px] opacity-100'
      }`}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md text-on-primary"
        style={{ background: avatarColor }}
      >
        <FileText className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-text">{title}</span>
          <button
            type="button"
            onClick={onRemove}
            title="Remove bookmark"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-primary-light transition-colors hover:bg-surface-hover"
          >
            <Bookmark className="h-3.5 w-3.5" fill="currentColor" />
          </button>
        </div>
        <p className="my-1 text-xs text-text-muted">
          {communityName} · {fileType} · {fileSize}
        </p>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_STYLES[badgeVariant]}`}
        >
          Resource
        </span>
      </div>
    </div>
  );
}