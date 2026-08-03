// src/features/posts/components/post-detail/CommentItem.tsx
import { MessageCircle } from 'lucide-react';
import { Avatar } from '../primitives/Avatar';
import type { PostComment } from '../../types';

interface CommentItemProps {
  comment: PostComment;
  onReply?: (commentId: string) => void;
}

export function CommentItem({ comment, onReply }: CommentItemProps) {
  return (
    <div className="flex gap-3 border-t border-border pt-3.5">
      <Avatar label={comment.author.avatarLabel} variant={comment.author.avatarVariant ?? 'success'} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-text">{comment.author.name}</span>
          {comment.isAdmin && (
            <span className="rounded-full bg-success-bg px-1.5 py-0.5 text-[10px] text-success">Admin</span>
          )}
          <span className="text-xs text-text-muted">{comment.date}</span>
        </div>
        <p className="my-1 text-sm text-text">{comment.content}</p>
        <button
          type="button"
          onClick={() => onReply?.(comment.id)}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text"
        >
          <MessageCircle size={14} />
          Reply · 👍 {comment.likes}
        </button>
      </div>
    </div>
  );
}