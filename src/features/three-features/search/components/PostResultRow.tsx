import { ThumbsUp, MessageCircle } from 'lucide-react';

interface PostResultRowProps {
  title: string;
  communityName: string;
  date: string;
  likes: number;
  comments: number;
  avatarInitials?: string;
  avatarColor: string;
}

export function PostResultRow({
  title,
  communityName,
  date,
  likes,
  comments,
  avatarInitials,
  avatarColor,
}: PostResultRowProps) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-surface p-5">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-on-primary"
        style={{ background: avatarColor }}
      >
        {avatarInitials}
      </div>
      <div className="flex-1">
        <span className="text-lg font-semibold text-text">{title}</span>
        <p className="my-1 text-xs text-text-muted">
          {communityName} · {date}
        </p>
        <span className="flex items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" /> {likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-3 w-3" /> {comments}
          </span>
        </span>
      </div>
    </div>
  );
}