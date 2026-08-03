"use client";

import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  ariaLabel: string;
  variant?: "ghost" | "outline";
  size?: number;
}

export function IconButton({
  icon: Icon,
  onClick,
  ariaLabel,
  variant = "ghost",
  size = 16,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-hover hover:text-text",
        variant === "outline" && "border border-border",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon size={size} />
    </button>
  );
}