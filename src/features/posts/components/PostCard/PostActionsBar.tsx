import { ThumbsUp, MessageCircle, Bookmark, Share2 } from 'lucide-react';

export interface PostActionsBarProps {
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  isSaved: boolean;
  onToggleLike: () => void;
  onToggleComments: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
}

export function PostActionsBar({ isLiked, likeCount, commentCount, isSaved, onToggleLike, onToggleComments, onToggleBookmark, onShare }: PostActionsBarProps) {
  return (
    <div className="flex items-center gap-5 border-t border-border pt-3.5 text-xs text-text-muted">
      <button type="button" onClick={onToggleLike} className={`flex items-center gap-1.5 hover:text-text ${isLiked ? 'text-primary-light' : 'text-text-muted'}`}>
        <ThumbsUp size={16} fill={isLiked ? 'currentColor' : 'none'} />
        <span>{likeCount}</span>
      </button>
      <button type="button" onClick={onToggleComments} className="flex items-center gap-1.5 hover:text-text">
        <MessageCircle size={16} />
        <span>{commentCount}</span>
      </button>
      <button type="button" onClick={onToggleBookmark} className={`flex items-center gap-1.5 hover:text-text ${isSaved ? 'text-primary-light' : 'text-text-muted'}`}>
        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>
      <button type="button" onClick={onShare} className="flex items-center gap-1.5 hover:text-text">
        <Share2 size={16} />
        Share
      </button>
    </div>
  );
}