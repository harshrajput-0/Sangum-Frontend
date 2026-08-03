export type BookmarkTab = 'posts' | 'resources';

export interface PostBookmark {
  id: string;
  authorName: string;
  communityName: string;
  date: string;
  avatarInitials: string;
  avatarColor: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
}

export type ResourceBadgeVariant = 'amber' | 'blue' | 'green';

export interface ResourceBookmark {
  id: string;
  title: string;
  communityName: string;
  fileType: string;
  fileSize: string;
  avatarColor: string;
  badgeVariant: ResourceBadgeVariant;
}