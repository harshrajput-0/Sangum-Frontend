/**
 * Badge.tsx
 * solid · subtle · outline, in purple · green · blue · amber · red · gray.
 *
 * Icon is left to the consumer via the `icon` prop.
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeColor = "purple" | "green" | "blue" | "amber" | "red" | "gray";

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const colorMap: Record<BadgeColor, { solid: string; text: string; subtleBg: string; border: string }> = {
  purple: {
    solid: "var(--primary)",
    text: "var(--primary-light)",
    subtleBg: "rgba(109,93,254,0.15)",
    border: "var(--primary-light)",
  },
  green: { solid: "var(--success)", text: "var(--success)", subtleBg: "var(--success-bg-dark)", border: "var(--success)" },
  blue: { solid: "var(--info)", text: "var(--info)", subtleBg: "var(--info-bg-dark)", border: "var(--info)" },
  amber: { solid: "var(--warning)", text: "var(--warning)", subtleBg: "var(--warning-bg-dark)", border: "var(--warning)" },
  red: { solid: "var(--danger)", text: "var(--danger)", subtleBg: "var(--danger-bg-dark)", border: "var(--danger)" },
  gray: { solid: "var(--neutral)", text: "var(--text-secondary)", subtleBg: "var(--surface-2)", border: "var(--border-strong)" },
};

export function Badge({ variant = "subtle", color = "gray", icon, children, className }: BadgeProps) {
  const c = colorMap[color];

  const style: CSSProperties =
    variant === "solid"
      ? { background: c.solid, color: "#fff" }
      : variant === "outline"
        ? { color: c.text, borderColor: c.border }
        : { background: c.subtleBg, color: c.text };

  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[length:var(--fs-xs)] font-medium leading-none [&_svg]:h-3 [&_svg]:w-3",
        variant === "outline" && "border",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
