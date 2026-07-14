/**
 * IconButton.tsx
 * square button, single icon — sm · md · lg, optional outlined style.
 *
 * Icon is entirely up to the consumer via the required `icon` prop —
 * nothing is rendered by default.
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: IconButtonSize;
  outlined?: boolean;
  /** Required for accessibility since there's no visible text label. */
  "aria-label": string;
}

const sizes: Record<IconButtonSize, string> = {
  sm: "h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 w-12 [&_svg]:h-[18px] [&_svg]:w-[18px]",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", outlined = false, disabled, className, type = "button", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md border [transition:background_var(--t-fast),border-color_var(--t-fast),color_var(--t-fast)] focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-glow-purple)] disabled:cursor-not-allowed disabled:opacity-45",
          outlined
            ? "border-border-strong bg-surface text-text hover:border-brand-purple hover:bg-surface-hover hover:text-text"
            : "border-transparent bg-transparent text-text hover:bg-surface-hover hover:text-text",
          sizes[size],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
