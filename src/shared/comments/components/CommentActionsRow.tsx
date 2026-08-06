import { Heart, Reply } from 'lucide-react';

export interface CommentActionsRowProps {
  likes: number;
  likedByCurrentUser: boolean;
  onToggleLike: () => void;
  onToggleReply: () => void;
}

export function CommentActionsRow({ likes, likedByCurrentUser, onToggleLike, onToggleReply }: CommentActionsRowProps) {
  return (
    <div className="mt-2 flex items-center gap-4">
      <button
        type="button"
        onClick={onToggleLike}
        className={`flex items-center gap-1.5 text-xs hover:text-text ${likedByCurrentUser ? 'text-primary-light' : 'text-text-muted'}`}
      >
        <Heart size={14} fill={likedByCurrentUser ? 'currentColor' : 'none'} />
        <span>{likes}</span>
      </button>
      <button type="button" onClick={onToggleReply} className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text">
        <Reply size={14} />
        Reply
      </button>
    </div>
  );
}