import { cn } from "@/shared/utils/cn";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  /** Any CSS color value, e.g. "var(--brand-purple)". Defaults to currentColor. */
  color?: string;
  className?: string;
}

const sizes: Record<SpinnerSize, string> = {
  xs: "h-3.5 w-3.5 border-2",
  sm: "h-5 w-5 border-2",
  md: "h-7 w-7 border-[3px]",
  lg: "h-9 w-9 border-[3px]",
};

export function Spinner({ size = "md", color, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={color ? { color } : undefined}
      className={cn(
        "inline-block shrink-0 animate-spin rounded-full border-current border-t-transparent",
        sizes[size],
        className,
      )}
    />
  );
}
