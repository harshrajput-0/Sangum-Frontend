"use client";

import { Avatar } from "../../shared/components/ui";

interface PostComposerBarProps {
  authorLabel: string;
  authorImageUrl?: string;
  placeholder?: string;
  onClick?: () => void;
}

export function PostComposerBar({
  authorLabel,
  authorImageUrl,
  placeholder = "Share something with the community…",
  onClick,
}: PostComposerBarProps) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5">
      <Avatar label={authorLabel} imageUrl={authorImageUrl} size="sm" />
      <button
        type="button"
        onClick={onClick}
        className="flex-1 rounded-md bg-bg-elevated px-3.5 py-2 text-left text-sm text-text-muted"
      >
        {placeholder}
      </button>
    </div>
  );
}