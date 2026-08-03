import { ExternalLink } from 'lucide-react';
import { AuthorAvatar } from '../AuthorAvatar';
import { SaveButton } from './SaveButton';
import { getAccentFromId, getInitials } from '../../lib/deriveResourceDisplay';
import type { ResourceDetail } from '../../types';

interface AuthorMetaRowProps {
  resource: ResourceDetail;
}

export function AuthorMetaRow({ resource }: AuthorMetaRowProps) {
  const authorInitials = resource.author.initials ?? getInitials(resource.author.name);
  const authorAccent = resource.author.accent ?? getAccentFromId(resource.author.name);

  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <AuthorAvatar initials={authorInitials} accent={authorAccent} size="md" variant="solid" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-text">{resource.author.name}</p>
          <p className="text-xs text-text-muted">
            {resource.publishedLabel} · {resource.readTimeLabel} · {resource.viewCount.toLocaleString()} views
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <SaveButton />
        <a
          href={resource.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
        >
          Visit Resource <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}