import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

// Only `primary` and `accent` have dedicated -hover/-active tokens mapped in
// global.css's @theme inline block. Other tones (danger/success/etc.) use
// hover:opacity-90 instead of a nonexistent bg-danger-hover utility.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-active",
  outline: "bg-transparent text-text border border-border hover:bg-surface-hover",
  danger: "bg-danger text-white hover:opacity-90",
  ghost: "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-base px-3.5 py-2 gap-2",
  lg: "text-md px-4 py-2.5 gap-2.5"
};

export function Button({
  variant = "primary",
  size = "sm",
  icon,
  fullWidth,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
