import { Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';

interface PostBookmarkCardProps {
  authorName: string;
  communityName: string;
  date: string;
  avatarInitials: string;
  avatarColor: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  isRemoving?: boolean;
  onRemove?: () => void;
}

export function PostBookmarkCard({
  authorName,
  communityName,
  date,
  avatarInitials,
  avatarColor,
  title,
  description,
  likes,
  comments,
  isRemoving = false,
  onRemove,
}: PostBookmarkCardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-5 transition-all duration-200 ${
        isRemoving ? 'm-0 max-h-0 overflow-hidden !border-0 !p-0 opacity-0' : 'max-h-[500px] opacity-100'
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-on-primary"
            style={{ background: avatarColor }}
          >
            {avatarInitials}
          </div>
          <div>
            <span className="text-sm font-semibold text-text">{authorName}</span>
            <div className="text-xs text-text-muted">
              in {communityName} · {date}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          title="Remove bookmark"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-primary-light transition-colors hover:bg-surface-hover"
        >
          <Bookmark className="h-3.5 w-3.5" fill="currentColor" />
        </button>
      </div>

      <p className="mb-1.5 text-lg font-semibold text-text">{title}</p>
      <p className="text-xs text-text-muted">{description}</p>

      <div className="mt-2.5 flex gap-5 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" /> {likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3 w-3" /> {comments}
        </span>
      </div>
    </div>
  );
}