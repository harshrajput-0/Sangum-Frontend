// modules/posts/components/PostActions.tsx

import { ThumbIcon, CommentIcon, ShareIcon, BookmarkIcon } from "./icons";
import { formatCompactNumber } from "@/shared/utils/fromatCompactNumber";
import { cn } from "@/shared/utils/cn";

export interface PostActionsProps {
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLikeToggle?: (next: boolean) => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmarkToggle?: (next: boolean) => void;
  className?: string;
}

/** Reaction bar: like (toggle), comment count, share, bookmark (toggle). Report lives in PostHeader's 3-dot menu instead. */
export function PostActions({
  likes,
  comments,
  isLiked = false,
  isBookmarked = false,
  onLikeToggle,
  onComment,
  onShare,
  onBookmarkToggle,
  className,
}: PostActionsProps) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onLikeToggle?.(!isLiked);
        }}
        aria-pressed={isLiked}
        className={cn(
          "flex items-center gap-1.5 text-[length:var(--fs-xs)] font-medium transition-colors duration-150",
          isLiked ? "text-[var(--reaction-like)]" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
        )}
      >
        <ThumbIcon filled={isLiked} className="w-[15px] h-[15px]" />
        {formatCompactNumber(likes)}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onComment?.();
        }}
        className="flex items-center gap-1.5 text-[length:var(--fs-xs)] font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-150"
      >
        <CommentIcon className="w-[15px] h-[15px]" />
        {formatCompactNumber(comments)}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onShare?.();
        }}
        aria-label="Share post"
        className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors duration-150"
      >
        <ShareIcon className="w-[15px] h-[15px]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle?.(!isBookmarked);
        }}
        aria-pressed={isBookmarked}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
        className={cn(
          "transition-colors duration-150",
          isBookmarked ? "text-[var(--brand-purple-light)]" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
        )}
      >
        <BookmarkIcon filled={isBookmarked} className="w-[15px] h-[15px]" />
      </button>
    </div>
  );
}
