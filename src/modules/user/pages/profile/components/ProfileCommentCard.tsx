// modules/profile/components/ProfileCommentCard.tsx

import { LikeIcon } from "../components/icon";
import { formatCompactNumber } from "@/shared/utils/fromatCompactNumber";
import { cn } from "@/shared/utils/cn";

export interface ProfileCommentData {
  id: string;
  /** Title of the post this comment was left on */
  postTitle: string;
  postHref?: string;
  text: string;
  createdAtLabel: string;
  likeCount?: number;
}

export interface ProfileCommentCardProps {
  comment: ProfileCommentData;
  className?: string;
}

/** One row in the profile's Comments tab — which post it was on, the comment text, and a timestamp. */
export function ProfileCommentCard({ comment, className }: ProfileCommentCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-4", className)}>
      <p className="text-(length:--fs-xs) text-text-muted mb-1.5">
        Commented on{" "}
        {comment.postHref ? (
          <a href={comment.postHref} className="text-text-secondary hover:text-(--primary-light) transition-colors duration-150">
            {comment.postTitle}
          </a>
        ) : (
          <span className="text-text-secondary">{comment.postTitle}</span>
        )}
      </p>
      <p className="text-(length:--fs-sm) text-text mb-2">{comment.text}</p>
      <div className="flex items-center gap-4 text-(length:--fs-xs) text-text-muted">
        <span>{comment.createdAtLabel}</span>
        {comment.likeCount !== undefined && (
          <span className="inline-flex items-center gap-1">
            <LikeIcon className="w-3 h-3" />
            {formatCompactNumber(comment.likeCount)}
          </span>
        )}
      </div>
    </div>
  );
}
