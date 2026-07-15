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
    <div className={cn("rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4", className)}>
      <p className="text-[length:var(--fs-xs)] text-[var(--text-muted)] mb-1.5">
        Commented on{" "}
        {comment.postHref ? (
          <a href={comment.postHref} className="text-[var(--text-secondary)] hover:text-[var(--brand-purple-light)] transition-colors duration-150">
            {comment.postTitle}
          </a>
        ) : (
          <span className="text-[var(--text-secondary)]">{comment.postTitle}</span>
        )}
      </p>
      <p className="text-[length:var(--fs-sm)] text-[var(--text)] mb-2">{comment.text}</p>
      <div className="flex items-center gap-4 text-[length:var(--fs-xs)] text-[var(--text-muted)]">
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
