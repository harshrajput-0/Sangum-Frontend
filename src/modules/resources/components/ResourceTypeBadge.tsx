// modules/resources/components/ResourceTypeBadge.tsx

import React from "react";
import { ArticleIcon, VideoIcon, CourseIcon, BookIcon, ToolIcon, PaperIcon } from "./icons";
import { cn } from "@/shared/utils/cn";
import type { ResourceType } from "../types";

export type BadgeSize = "xs" | "sm";

export interface ResourceTypeBadgeProps {
  type: ResourceType;
  size?: BadgeSize;
  /** Hide the icon and show text only */
  iconOnly?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  xs: "px-[7px] py-[1px] text-[length:var(--fs-xs)]",
  sm: "px-2.5 py-1 text-[length:var(--fs-xs)]",
};

/**
 * Single source of truth for the 6 resource types — label, subtle-badge
 * color, and icon. ResourceFilter's type <select> and ResourceList's meta
 * line both read from this instead of duplicating strings.
 */
export const RESOURCE_TYPE_PRESET: Record<
  ResourceType,
  { label: string; bg: string; text: string; border?: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  article: { label: "Article", bg: "var(--info-bg-dark)", text: "var(--info)", Icon: ArticleIcon },
  video: { label: "Video", bg: "var(--danger-bg-dark)", text: "var(--danger)", Icon: VideoIcon },
  course: { label: "Course", bg: "rgba(109, 93, 254, 0.15)", text: "var(--brand-purple-light)", Icon: CourseIcon },
  book: { label: "Book", bg: "var(--success-bg-dark)", text: "var(--success)", Icon: BookIcon },
  tool: { label: "Tool", bg: "var(--warning-bg-dark)", text: "var(--warning)", Icon: ToolIcon },
  paper: { label: "Paper", bg: "var(--surface-2)", text: "var(--text-muted)", border: "var(--border)", Icon: PaperIcon },
};

/** Consolidated 6-type badge — each type has a distinct icon & color, sourced from RESOURCE_TYPE_PRESET. */
export function ResourceTypeBadge({ type, size = "sm", iconOnly = false, className }: ResourceTypeBadgeProps) {
  const preset = RESOURCE_TYPE_PRESET[type];
  const { Icon } = preset;

  return (
    <span
      className={cn("inline-flex items-center gap-[5px] rounded-full font-semibold leading-none whitespace-nowrap", SIZE_CLASSES[size], className)}
      style={{
        backgroundColor: preset.bg,
        color: preset.text,
        border: preset.border ? `1px solid ${preset.border}` : undefined,
      }}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      {!iconOnly && preset.label}
    </span>
  );
}
