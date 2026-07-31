"use client";

import { Check } from "lucide-react";

interface JoinButtonProps {
  isJoined: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
  className?: string;
}

export function JoinButton({
  isJoined,
  onToggle,
  size = "md",
  className = "",
}: JoinButtonProps) {
  const sizeClass =
    size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "shrink-0 rounded-md font-medium transition-colors",
        sizeClass,
        isJoined
          ? "border border-border-strong bg-surface-active text-text"
          : "bg-primary text-text-on-primary hover:bg-primary-hover",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isJoined ? (
        <span className="flex items-center gap-1">
          <Check size={12} /> Joined
        </span>
      ) : (
        "Join"
      )}
    </button>
  );
}