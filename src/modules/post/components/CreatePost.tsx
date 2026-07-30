"use client";

import type { ReactNode } from "react";
import PostCompose from "./PostCompose";
import PostActions, { type PostAction } from "./PostAction";

/**
 * CreatePost
 * -------------------------------------------------------------------------
 * The full post-creation card: PostCompose (avatar + input) on top,
 * PostActions (Photo / Poll / Link) below a divider.
 *
 * This is just a thin layout wrapper — swap in PostCompose or PostActions
 * independently wherever you don't need the full card.
 */

export interface CreatePostProps {
  avatar?: ReactNode;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  actions?: PostAction[];
  className?: string;
}

export function CreatePost({
  avatar,
  placeholder,
  onSubmit,
  onChange,
  actions,
  className = "",
}: CreatePostProps) {
  return (
    <div className={`w-full rounded-md border border-border bg-surface p-4 shadow-sm mb-4 ${className}`}>
      <PostCompose
        avatar={avatar}
        placeholder={placeholder}
        onSubmit={onSubmit}
        onChange={onChange}
      />
      <div className="my-3 h-px w-full bg-border" />
      <PostActions actions={actions} />
    </div>
  );
}