// modules/resources/components/types.ts

/**
 * Resource `type` is one consolidated enum — Article · Video · Course · Book
 * · Tool · Paper — resolved from 5 conflicting lists found in review. Finer
 * labels like "tutorial" or "cheatsheet" are NOT types anymore; they live in
 * `tags` instead. If you need a new type, it belongs here (and needs a new
 * icon/color pair in ResourceTypeBadge.tsx); if you need a new label, it's
 * just a tag — no component changes required.
 */
export type ResourceType = "article" | "video" | "course" | "book" | "tool" | "paper";

export interface ResourceData {
  id: string;
  slug: string;
  type: ResourceType;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  tags?: string[];
  bookmarkCount: number;
  /** Shown in ResourceList's compact row, e.g. "18 min read", "2h course" */
  durationLabel?: string;
  isBookmarked?: boolean;
}
