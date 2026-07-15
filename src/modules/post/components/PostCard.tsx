// modules/posts/components/PostCard.tsx

import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { cn } from "@/shared/utils/cn";
import type { PostData } from "../types/types";

export interface PostCardProps {
  post: PostData;
  /** Pass the logged-in viewer's username to auto-derive canEdit/canDelete/canReport. */
  currentUsername?: string;
  /** Grants Pin/Unpin in the header menu. */
  isModerator?: boolean;
  onLikeToggle?: (next: boolean) => void;
  onBookmarkToggle?: (next: boolean) => void;
  onComment?: () => void;
  onShare?: () => void;
  onVote?: (optionId: string) => void;
  onTagClick?: (tag: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onPin?: () => void;
  className?: string;
}

/**
 * Feed preview card — composes PostHeader + PostContent (text/media/link/poll)
 * + PostActions. Clicking anywhere on the card that isn't an interactive
 * control (header menu, like/comment/share/bookmark, a tag, a poll option,
 * the link preview) navigates to /posts/:slug.
 */
export function PostCard({
  post,
  currentUsername,
  isModerator = false,
  onLikeToggle,
  onBookmarkToggle,
  onComment,
  onShare,
  onVote,
  onTagClick,
  onEdit,
  onDelete,
  onReport,
  onPin,
  className,
}: PostCardProps) {
  const isOwner = !!currentUsername && currentUsername === post.author.username;

  const navigate = () => {
    // TODO: swap for your router's navigate/push (Next.js `router.push`,
    // React Router's `navigate`, etc.) — this is a plain example.
    window.location.href = `/posts/${post.slug}`;
  };

  return (
    <div
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate();
      }}
      role="link"
      tabIndex={0}
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 cursor-pointer hover:border-[var(--border-strong)] transition-colors duration-150",
        className
      )}
    >
      {/* Header owns avatar links + its own dropdown — never let those trigger card navigation. */}
      <div onClick={(e) => e.stopPropagation()} className="mb-2.5">
        <PostHeader
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          pinned={post.pinned}
          canEdit={isOwner}
          canDelete={isOwner}
          canPin={isModerator}
          canReport={!isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
          onPin={onPin}
        />
      </div>

      <PostContent post={post} onVote={onVote} onTagClick={onTagClick} className="mb-3.5" />

      <PostActions
        likes={post.stats.likes}
        comments={post.stats.comments}
        isLiked={post.isLiked}
        isBookmarked={post.isBookmarked}
        onLikeToggle={onLikeToggle}
        onComment={onComment}
        onShare={onShare}
        onBookmarkToggle={onBookmarkToggle}
      />
    </div>
  );
}
