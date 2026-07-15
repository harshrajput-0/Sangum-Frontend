// modules/posts/components/PostContent.tsx

import { PostTag } from "./PostTag";
import { PostMedia } from "./PostMedia";
import { LinkPreviewCard } from "./LinkPreviewCard";
import { PollCard } from "./PollCard";
import { cn } from "@/shared/utils/cn";
import type { PostData } from "../types/types";

export interface PostContentProps {
  post: PostData;
  onMediaClick?: () => void;
  onVote?: (optionId: string) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
}

/** Renders the body text, tags, and whichever type-specific block the post needs — media grid, link preview, or poll — based on `post.type`. */
export function PostContent({ post, onMediaClick, onVote, onTagClick, className }: PostContentProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {post.body && (
        <p className="text-[length:var(--fs-base)] text-[var(--text)] leading-relaxed whitespace-pre-wrap">{post.body}</p>
      )}

      {post.type === "poll" && post.poll && <PollCard poll={post.poll} onVote={onVote} />}
      {post.type === "link" && post.link && <LinkPreviewCard link={post.link} />}
      {(post.type === "image" || post.type === "video") && post.media && post.media.length > 0 && (
        <PostMedia type={post.type} media={post.media} onClick={onMediaClick} />
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <PostTag key={tag} label={tag} onClick={onTagClick} />
          ))}
        </div>
      )}
    </div>
  );
}
