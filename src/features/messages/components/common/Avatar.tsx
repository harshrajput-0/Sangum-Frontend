import type { AvatarColorKey } from "../../types/conversation.types";
import { cn } from "@/shared/utils/cn";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  initials: string;
  colorKey: AvatarColorKey;
  size?: AvatarSize;
  /** Rounded-square for groups, circle for direct messages (matches the approved design). */
  rounded?: boolean;
  showStatusDot?: boolean;
  className?: string;
}

/**
 * Literal Tailwind class strings, keyed by design token name, so the
 * Tailwind compiler can statically discover every class in use. Building
 * these with template strings (e.g. `bg-${colorKey}`) would break under
 * Tailwind's JIT content scanning.
 */
const COLOR_CLASSES: Record<AvatarColorKey, string> = {
  primary: "bg-primary text-text-on-primary",
  "primary-light": "bg-primary-light text-text-on-primary",
  accent: "bg-accent text-[#052e2a]",
  success: "bg-success text-text-on-primary",
  warning: "bg-warning text-text-on-primary",
  danger: "bg-danger text-text-on-primary",
  info: "bg-info text-text-on-primary",
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-11 w-11 text-base",
  lg: "h-[52px] w-[52px] text-[16px]",
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  sm: "h-2 w-2 border",
  md: "h-[11px] w-[11px] border-[2.5px]",
  lg: "h-3 w-3 border-2",
};

export function Avatar({
  initials,
  colorKey,
  size = "md",
  rounded = false,
  showStatusDot = false,
  className,
}: AvatarProps) {
  return (
    <span className={cn("relative inline-flex flex-shrink-0", className)}>
      <span
        className={cn(
          "flex items-center justify-center font-semibold leading-none",
          rounded ? "rounded-lg" : "rounded-full",
          COLOR_CLASSES[colorKey],
          SIZE_CLASSES[size],
        )}
      >
        {initials}
      </span>
      {showStatusDot && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-bg-elevated bg-success",
            STATUS_DOT_SIZE[size],
          )}
        />
      )}
    </span>
  );
}