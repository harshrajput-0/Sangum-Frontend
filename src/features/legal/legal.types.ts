import type { LucideIcon } from "lucide-react";

/** A single link shown in the Legal Hub, grouped under a category. */
export interface LegalHubItem {
  /** Slug used to navigate to the article, e.g. "terms-of-service" */
  id: string;
  title: string;
  description: string;
  /** Lucide icon component. Omit and use `iconGlyph` instead for glyph-based icons (©, ™). */
  icon?: LucideIcon;
  /** Text glyph shown in place of an icon (e.g. "©", "™") */
  iconGlyph?: string;
}

export interface LegalHubGroup {
  id: string;
  label: string;
  items: LegalHubItem[];
}

/**
 * One block of content within a legal article section.
 * Covers every content shape used across legal documents (paragraphs,
 * numbered subsections, bulleted lists, and info/warning callouts).
 */
export type LegalContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subsection"; id?: string; heading: string; paragraphs: string[] }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "info" | "warning"; text: string };

export interface LegalSection {
  /** Anchor id — also used by the table of contents and scrollspy */
  id: string;
  /** Numbered heading, e.g. "1. Introduction" */
  heading: string;
  /** Shorter label for the TOC, if different from `heading` */
  tocLabel?: string;
  blocks: LegalContentBlock[];
}

export interface LegalArticleData {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}