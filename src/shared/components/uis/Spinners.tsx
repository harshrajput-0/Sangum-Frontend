import { cn } from "@/shared/utils/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg";
type SpinnerColor = "primary" | "current" | "white";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
}

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-5 w-5 border-2",
  md: "h-7 w-7 border-[2.5px]",
  lg: "h-9 w-9 border-[3px]",
};

const COLOR_CLASSES: Record<SpinnerColor, string> = {
  primary: "border-border border-t-primary",
  current: "border-current/25 border-t-current",
  white: "border-white/30 border-t-white",
};

export function Spinner({
  size = "md",
  color = "primary",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block shrink-0 animate-spin rounded-full",
        SIZE_CLASSES[size],
        COLOR_CLASSES[color],
        className
      )}
    />
  );
}