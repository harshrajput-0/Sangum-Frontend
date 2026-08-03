export type ResourceType = 'Article' | 'Video' | 'Course' | 'Book' | 'Tool' | 'Paper';

export type ResourceTypeFilter = 'All' | ResourceType;

export type SortOption = 'newest' | 'most-viewed' | 'top-rated';

export type AccentToken = 'primary' | 'warning' | 'info' | 'danger';

export interface ResourceAuthor {
  name: string;
  initials: string;
  accent: AccentToken;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  author: ResourceAuthor;
  viewCount: number;
  bannerLabel: string;
  accent: AccentToken;
}

export const RESOURCE_TYPES: ResourceType[] = ['Article', 'Video', 'Course', 'Book', 'Tool', 'Paper'];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'most-viewed', label: 'Most viewed' },
  { value: 'top-rated', label: 'Top rated' },
];