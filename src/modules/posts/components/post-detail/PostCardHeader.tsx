// src/features/posts/components/post-detail/PostCardHeader.tsx
import { Pin } from 'lucide-react';
import { Avatar } from '../primitives/Avatar';
import type { PostAuthor } from '../../types';

interface PostCardHeaderProps {
  author: PostAuthor;
  date: string;
  edited?: boolean;
  pinned?: boolean;
}

export function PostCardHeader({ author, date, edited, pinned }: PostCardHeaderProps) {
  return (
    <div className="mb-3.5 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar label={author.avatarLabel} variant={author.avatarVariant ?? 'primary'} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-text">{author.name}</span>
            {author.role && (
              <span className="rounded-full border border-border-strong px-1.5 py-0.5 text-[10px] text-text-muted">
                {author.role}
              </span>
            )}
          </div>
          <span className="text-xs text-text-muted">
            {date}
            {edited ? ' · Edited' : ''}
          </span>
        </div>
      </div>
      {pinned && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary-light">
          <Pin size={12} />
          Pinned
        </span>
      )}
    </div>
  );
}