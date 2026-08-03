// src/features/posts/components/post-detail/AuthorSidebarCard.tsx
import { Avatar } from '../primitives/Avatar';
import { TagPill } from '../primitives/TagPill';
import type { PostAuthor } from '../../types';

interface AuthorSidebarCardProps {
  author: PostAuthor;
  postCount: number;
  followerCount: string;
  relatedTopics: string[];
  isFollowing: boolean;
  onToggleFollow: () => void;
}

export function AuthorSidebarCard({
  author,
  postCount,
  followerCount,
  relatedTopics,
  isFollowing,
  onToggleFollow,
}: AuthorSidebarCardProps) {
  return (
    <div className="max-w-xs rounded-xl border border-border bg-surface p-4 sm:p-5">
      <span className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-text-muted">
        About the author
      </span>
      <div className="mb-3 flex items-center gap-3">
        <Avatar label={author.avatarLabel} size="lg" />
        <div>
          <p className="text-sm font-semibold text-text">{author.name}</p>
          {author.title && <p className="text-xs text-text-muted">{author.title}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggleFollow}
        className={
          isFollowing
            ? 'mb-4 w-full rounded-md border border-border-strong bg-surface-active px-4 py-2 text-sm font-medium text-text'
            : 'mb-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover'
        }
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
      <div className="mb-4 flex gap-6">
        <div>
          <p className="text-sm font-semibold text-text">{postCount}</p>
          <p className="text-xs text-text-muted">Posts</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{followerCount}</p>
          <p className="text-xs text-text-muted">Followers</p>
        </div>
      </div>
      {relatedTopics.length > 0 && (
        <>
          <p className="mb-2.5 text-sm font-semibold text-text">Related Topics</p>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic) => (
              <TagPill key={topic} label={topic} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}