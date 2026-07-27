// modules/users/components/FollowButton.tsx
"use client"; // uses hover state — remove this line if you're not on Next.js App Router

import { useState } from "react";
import { PlusIcon, CheckIcon } from "./icons"
import { cn } from "@/shared/utils/cn";

export type FollowButtonSize = "sm" | "md" | "lg";

export interface FollowButtonProps {
  isFollowing: boolean;
  /** Called with the *next* state the user is asking for. Wire this up to your API call. */
  onToggle?: (next: boolean) => void;
  size?: FollowButtonSize;
  disabled?: boolean;
  /** Shows a busy state and blocks interaction — e.g. while the request is in flight. */
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<FollowButtonSize, string> = {
  sm: "px-3 py-[7px] text-[length:var(--fs-xs)] rounded-[var(--radius-sm)] gap-1",
  md: "px-4 py-[10px] text-[length:var(--fs-sm)] rounded-[var(--radius-md)] gap-1.5",
  lg: "px-[22px] py-[13px] text-[length:var(--fs-md)] rounded-[var(--radius-md)] gap-2",
};

const ICON_SIZE: Record<FollowButtonSize, string> = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export function FollowButton({
  isFollowing,
  onToggle,
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
}: FollowButtonProps) {
  const [hovering, setHovering] = useState(false);
  const busy = disabled || loading;
  const willUnfollow = isFollowing && hovering;

  const label = loading ? "Loading" : willUnfollow ? "Unfollow" : isFollowing ? "Following" : "Follow";
  const icon = loading ? null : willUnfollow ? null : isFollowing ? (
    <CheckIcon className={ICON_SIZE[size]} />
  ) : (
    <PlusIcon className={ICON_SIZE[size]} />
  );

  return (
    <button
      type="button"
      disabled={busy}
      aria-pressed={isFollowing}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => onToggle?.(!isFollowing)}
      className={cn(
        "inline-flex items-center justify-center font-semibold border transition-colors duration-150 whitespace-nowrap leading-none",
        SIZE_CLASSES[size],
        fullWidth && "w-full",
        busy && "opacity-45 cursor-not-allowed",
        isFollowing
          ? willUnfollow
            ? "bg-transparent border-danger text-danger"
            : "bg-(--surface-2) border-border text-text hover:bg-surface-hover"
          : "bg-primary border-transparent text-white shadow-(--shadow-sm) hover:bg-(--primary-dark)",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}
