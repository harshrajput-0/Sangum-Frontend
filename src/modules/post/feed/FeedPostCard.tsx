/**
 * FeedPostCard.tsx
 * a social-feed post — author (+ optional role badge), subtitle (community
 * or handle context), body, optional image/tags, and a like/comment/save/
 * share action bar. Distinct from PostCard (used for the Q&A-style
 * community feed) — this one matches the richer main Home Feed design.
 *
 * Path (as documented): modules/feed/components/
 */

"use client"

import type { ReactNode } from "react";
import Link from "next/link";
import { Avatar, Badge, type BadgeColor } from "";
import { cn } from "@/shared/utils/cn";

const commentIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 11.5a8.38 8.38 0 01-7.6 8.5" />
  </svg>
);
const bookmarkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);
const shareIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
);
const kebabIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export interface FeedPostCardProps {
  href: string;
  authorName: string;
  avatarInitials?: string;
  avatarColor?: string;
  roleBadgeLabel?: string;
  roleBadgeColor?: BadgeColor;
  /** e.g. "in MERN Developers · 2h ago" or "@priya.codes · 5h ago" */
  subtitle: string;
  body: ReactNode;
  imageGradient?: string;
  tags?: string[];
  likeCount: number;
  liked?: boolean;
  onToggleLike?: () => void;
  commentCount?: number;
  onCommentClick?: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
  onShareClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

const actionLinkClasses =
  "inline-flex items-center gap-1.5 text-[length:var(--fs-xs)] text-[var(--text-secondary)] [&_svg]:h-4 [&_svg]:w-4 hover:text-[var(--text)]";

export function FeedPostCard({
  // href,
  authorName,
  // avatarInitials,
  avatarColor = "var(--primary)",
  roleBadgeLabel,
  // roleBadgeColor = "purple",
  subtitle,
  body,
  imageGradient,
  tags,
  likeCount,
  liked = false,
  onToggleLike,
  commentCount,
  onCommentClick,
  saved = false,
  onToggleSave,
  onShareClick,
  onMenuClick,
  className,
}: FeedPostCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-5",
        className,
      )}
    >
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar size="md" name="Harst Rajput" color={avatarColor} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-(length:--fs-sm) font-semibold text-text">{authorName}</span>
              {roleBadgeLabel && (
                <Badge variant="solid"  className="px-1.5! py-px!">
                  {roleBadgeLabel}
                </Badge>
              )}
            </div>
            <span className="text-(length:--fs-xs) text-text-muted">{subtitle}</span>
          </div>
        </div>
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Post actions"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text [&_svg]:h-4 [&_svg]:w-4"
          >
            {kebabIcon}
          </button>
        )}
      </div>

      <Link href={"href"} className="mb-2.5 block text-(length:--fs-base) text-text hover:underline">
        {body}
      </Link>

      {imageGradient && (
        <div className="mb-3 h-45 rounded-md" style={{ background: imageGradient }} />
      )}

      {tags && tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-(--surface-2) px-2 py-0.5 text-(length:--fs-xs) text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-5 border-t border-border pt-2.5">
        <button
          type="button"
          onClick={onToggleLike}
          aria-pressed={liked}
          className={cn(actionLinkClasses, liked && "text-(--reaction-like)!")}
        >
          <span>👍</span>
          {likeCount}
        </button>
        {typeof commentCount === "number" && (
          <button type="button" onClick={onCommentClick} className={actionLinkClasses}>
            {commentIcon}
            {commentCount}
          </button>
        )}
        {onToggleSave && (
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={saved}
            className={cn(actionLinkClasses, saved && "text-primary-light!")}
          >
            {bookmarkIcon}
            {saved ? "Saved" : "Save"}
          </button>
        )}
        {onShareClick && (
          <button type="button" onClick={onShareClick} className={actionLinkClasses}>
            {shareIcon}
            Share
          </button>
        )}
      </div>
    </div>
  );
}
