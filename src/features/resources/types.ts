export type ResourceType = 'Article' | 'Video' | 'Course' | 'Book' | 'Tool' | 'Paper';

export type ResourceTypeFilter = 'All' | ResourceType;

export type SortOption = 'newest' | 'most-viewed' | 'top-rated';

export type AccentToken = 'primary' | 'warning' | 'info' | 'danger' | 'success';

export interface ResourceAuthor {
  name: string;
  initials?: string; // derive via getInitials(name) if not sent
  accent?: AccentToken; // derive via getAccentFromId(name) if not sent
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  author: ResourceAuthor;
  viewCount: number;
  bannerLabel?: string; // derive via getBannerLabel(title) if not sent
  accent?: AccentToken; // derive via getAccentFromId(id) if not sent
}

// Detail endpoint returns everything Resource has, plus page-specific fields.
export interface ResourceDetail extends Resource {
  description: string;
  learnPoints: string[];
  language: string;
  categoryTags: string[];
  externalUrl: string;
  commentCount: number;
  // Pre-formatted for now — TODO: service layer should derive these from
  // raw ISO timestamps (publishedAt / updatedAt) once the backend is wired up
  publishedLabel: string;
  lastUpdatedLabel: string;
  readTimeLabel: string;
  relatedResources: Resource[];
  moreFromAuthor: Resource[];
}

export const RESOURCE_TYPES: ResourceType[] = ['Article', 'Video', 'Course', 'Book', 'Tool', 'Paper'];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'most-viewed', label: 'Most viewed' },
  { value: 'top-rated', label: 'Top rated' },
];