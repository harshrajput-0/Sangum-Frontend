// modules/users/components/UserBadge.tsx

import React from "react";
import { cn } from "@/shared/utils/cn";

export type BadgeTone = "solid" | "subtle" | "outline";
export type BadgeColor = "purple" | "green" | "blue" | "amber" | "red" | "gray";
export type BadgeSize = "xs" | "sm";
export type UserRole = "admin" | "moderator" | "verified" | "contributor";

export interface UserBadgeProps {
  label: string;
  tone?: BadgeTone;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  xs: "px-[7px] py-[1px] text-[length:var(--fs-xs)]",
  sm: "px-2.5 py-1 text-[length:var(--fs-xs)]",
};

// Background for Solid Badge Tone 
const SOLID_BG: Record<BadgeColor, string> = {
  purple: "var(--primary)",
  green: "var(--success)",
  blue: "var(--info)",
  amber: "var(--warning)",
  red: "var(--danger)",
  gray: "var(--neutral)",
};

// Background for Subtle Badge Tone 
const SUBTLE_BG: Record<BadgeColor, string> = {
  purple: "rgba(109, 93, 254, 0.15)",
  green: "var(--success-bg-dark)",
  blue: "var(--info-bg-dark)",
  amber: "var(--warning-bg-dark)",
  red: "var(--danger-bg-dark)",
  gray: "var(--surface-2)",
};

// Test for Subtle Badge Tone 
const SUBTLE_TEXT: Record<BadgeColor, string> = {
  purple: "var(--primary-light)",
  green: "var(--success)",
  blue: "var(--info)",
  amber: "var(--warning)",
  red: "var(--danger)",
  gray: "var(--text-muted)",
};

/** Generic pill/chip. Prefer <RoleBadge> below for the common user roles. */
export function UserBadge({ label, tone = "subtle", color = "purple", size = "sm", icon, className }: UserBadgeProps) {
  const style: React.CSSProperties =
    tone === "solid"
      ? { backgroundColor: SOLID_BG[color], color: "#ffffff" }
      : tone === "subtle"
      ? {
          backgroundColor: SUBTLE_BG[color],
          color: SUBTLE_TEXT[color],
          border: color === "gray" ? "1px solid var(--border)" : "1px solid transparent",
        }
      : { backgroundColor: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-strong)" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold leading-none whitespace-nowrap",
        SIZE_CLASSES[size],
        className
      )}
      style={style}
    >
      {icon}
      {label}
    </span>
  );
}

// Define Badge based on role
const ROLE_PRESET: Record<UserRole, { tone: BadgeTone; color: BadgeColor; label: string }> = {
  admin: { tone: "solid", color: "purple", label: "Admin" },
  moderator: { tone: "subtle", color: "green", label: "Moderator" },
  verified: { tone: "subtle", color: "blue", label: "Verified" },
  contributor: { tone: "subtle", color: "amber", label: "Top Contributor" },
};

// Role Badge (Badge Preset determined by the role)
export function RoleBadge({
  role,
  size = "sm",
  className,
}: {
  role: UserRole;
  size?: BadgeSize;
  className?: string;
}) {
  const preset = ROLE_PRESET[role];
  return <UserBadge label={preset.label} tone={preset.tone} color={preset.color} size={size} className={className} />;
}
