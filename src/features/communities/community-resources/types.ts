export interface ResourceTypeOption {
  id: string;
  label: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string; // "article" | "video" | "tool" | "doc"
  tags: string[];
  metaLabel: string;
  isBookmarked: boolean;
}