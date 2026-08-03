import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Resource } from '../types';
import { ResourceTypeBadge } from './ResourceTypeBadge';
import { AuthorAvatar } from './AuthorAvatar';
import { getAccentFromId, getInitials, getBannerLabel } from '../lib/deriveResourceDisplay';

const GRADIENT_CLASSES: Record<string, string> = {
  primary: 'from-primary to-primary-active',
  warning: 'from-warning to-orange-700',
  info: 'from-info to-cyan-800',
  danger: 'from-danger to-rose-900',
};

function formatViewCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count);
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const accent = resource.accent ?? getAccentFromId(resource.id);
  const bannerLabel = resource.bannerLabel ?? getBannerLabel(resource.title);
  const authorInitials = resource.author.initials ?? getInitials(resource.author.name);
  const authorAccent = resource.author.accent ?? getAccentFromId(resource.author.name);

  return (
    <Link
      href={`/resources/${resource.id}`}
      className="group block cursor-pointer overflow-hidden rounded-xl border border-border bg-surface transition-all duration-base hover:-translate-y-1 hover:border-border-strong hover:shadow-xl"
    >
      <div className={`relative flex aspect-[5/3] items-center justify-center bg-gradient-to-br ${GRADIENT_CLASSES[accent]}`}>
        <span className="absolute left-2.5 top-2.5">
          <ResourceTypeBadge type={resource.type} />
        </span>
        <span className="text-base font-extrabold tracking-wide text-white/95">{bannerLabel}</span>
      </div>
      <div className="p-3.5">
        <p className="mb-2.5 text-sm font-semibold leading-snug text-text transition-colors group-hover:text-primary-light">
          {resource.title}
        </p>
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <AuthorAvatar initials={authorInitials} accent={authorAccent} size="xs" />
            {resource.author.name}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <Eye size={12} />
            {formatViewCount(resource.viewCount)}
          </span>
        </div>
      </div>
    </Link>
  );
}