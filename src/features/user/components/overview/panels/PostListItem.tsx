import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { PostSummary } from "../../../types/profile.types";

export interface PostListItemProps {
  post: PostSummary;
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text">{post.author.name}</span>
        <span className="text-xs text-text-muted">{post.createdAtLabel}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{post.body}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
        <span className="inline-flex items-center gap-1">
          <Heart size={14} /> {post.reactions.likes}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle size={14} /> {post.reactions.comments}
        </span>
        <span className="inline-flex items-center gap-1">
          <Share2 size={14} /> {post.reactions.shares}
        </span>
      </div>
    </div>
  );
}
