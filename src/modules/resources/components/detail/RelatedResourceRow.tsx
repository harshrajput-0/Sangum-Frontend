import Link from 'next/link';
import type { Resource } from '../../types';
import { getAccentFromId, getBannerLabel, formatViewCount } from '../../lib/deriveResourceDisplay';

const ICON_ACCENT_CLASSES: Record<string, string> = {
  primary: 'bg-primary',
  warning: 'bg-warning',
  info: 'bg-info',
  danger: 'bg-danger',
  success: 'bg-success',
};

interface RelatedResourceRowProps {
  resource: Resource;
  size?: 'sm' | 'md';
  showMeta?: boolean;
}

export function RelatedResourceRow({ resource, size = 'md', showMeta = true }: RelatedResourceRowProps) {
  const accent = resource.accent ?? getAccentFromId(resource.id);
  const iconLabel = resource.bannerLabel ?? getBannerLabel(resource.title);
  const iconSizeClass = size === 'md' ? 'h-10 w-10 text-xs' : 'h-8 w-8 text-xs';

  return (
    <Link href={`/resources/${resource.id}`} className="group -mx-2 flex items-center gap-2.5 rounded-md px-2 py-3 transition-colors hover:bg-surface-hover">
      <span className={`flex shrink-0 items-center justify-center rounded-lg font-semibold text-text-on-primary ${iconSizeClass} ${ICON_ACCENT_CLASSES[accent]}`}>
        {iconLabel}
      </span>
      <span className="min-w-0 flex-1">
        <p className={`truncate font-medium text-text transition-colors group-hover:text-primary-light ${size === 'md' ? 'text-sm' : 'text-xs'}`}>
          {resource.title}
        </p>
        {showMeta && (
          <p className="text-xs text-text-muted">
            {resource.type} · {formatViewCount(resource.viewCount)} views
          </p>
        )}
      </span>
    </Link>
  );
}