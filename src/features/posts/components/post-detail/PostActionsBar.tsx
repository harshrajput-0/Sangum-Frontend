// src/features/posts/components/post-detail/PostActionsBar.tsx
import type { MouseEvent } from 'react';
import { ThumbsUp, MessageCircle, Bookmark, Share, ChevronDown } from 'lucide-react';

interface PostActionsBarProps {
  likes: number;
  commentCount: number;
  isExpanded: boolean;
  isLiked?: boolean;
  onToggleLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

/**
 * Like / comment-count / save / share row, plus the show more/less
 * hint. The card wrapping this is clickable to expand — every button
 * here stops propagation so an action click never also toggles it.
 */
export function PostActionsBar({
  likes,
  commentCount,
  isExpanded,
  isLiked,
  onToggleLike,
  onSave,
  onShare,
}: PostActionsBarProps) {
  const stop = (handler?: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <div className="flex items-center gap-5 border-t border-border pt-3.5 text-xs text-text-muted">
      <button
        type="button"
        onClick={stop(onToggleLike)}
        className={`flex items-center gap-1.5 hover:opacity-80 ${isLiked ? 'text-danger' : ''}`}
      >
        <ThumbsUp size={16} /> <span>{likes}</span>
      </button>
      <span className="flex items-center gap-1.5">
        <MessageCircle size={16} /> {commentCount}
      </span>
      <button type="button" onClick={stop(onSave)} className="flex items-center gap-1.5 hover:text-text">
        <Bookmark size={16} /> Save
      </button>
      <button type="button" onClick={stop(onShare)} className="flex items-center gap-1.5 hover:text-text">
        <Share size={16} /> Share
      </button>
      <span className="ml-auto flex items-center gap-1 text-text-muted">
        {isExpanded ? 'Show less' : 'Show more'}
        <ChevronDown
          size={14}
          className="transition-transform duration-base"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </span>
    </div>
  );
}