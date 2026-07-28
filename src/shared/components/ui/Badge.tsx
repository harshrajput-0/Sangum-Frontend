import type { ReactNode } from "react";

export type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";
export type BadgeVariant = "solid" | "subtle" | "outline";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string;
}

const SOLID: Record<BadgeColor, string> = {
  primary: "bg-primary text-text-on-primary",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  danger: "bg-danger text-white",
  info: "bg-info text-white",
  neutral: "bg-neutral text-white",
};

const SUBTLE: Record<BadgeColor, string> = {
  primary: "bg-primary/15 text-primary-light",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  neutral: "border border-border bg-surface-hover text-text-muted",
};

export function Badge({
  children,
  color = "primary",
  variant = "solid",
  className = "",
}: BadgeProps) {
  const styles =
    variant === "solid"
      ? SOLID[color]
      : variant === "subtle"
        ? SUBTLE[color]
        : "border border-border-strong bg-transparent text-text-secondary";

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold leading-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
}