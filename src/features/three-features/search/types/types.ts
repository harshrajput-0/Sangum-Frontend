export type SearchResultType = 'posts' | 'people' | 'communities' | 'resources' | 'tags';
export type SearchTab = 'all' | SearchResultType;

export interface SearchPostResult {
  id: string;
  title: string;
  communityName: string;
  date: string;
  likes: number;
  comments: number;
  avatarInitials?: string;
  avatarColor: string;
}

export interface SearchPersonResult {
  id: string;
  name: string;
  handle: string;
  avatarInitials: string;
  avatarColor: string;
  isFollowing?: boolean;
}

export interface SearchCommunityResult {
  id: string;
  name: string;
  visibility: 'Public' | 'Private';
  memberCount: string;
  avatarInitials: string;
  avatarColor: string;
  isMember?: boolean;
}

export interface SearchResourceResult {
  id: string;
  title: string;
  communityName: string;
  fileType: string;
  avatarColor: string;
}

export interface SearchTagResult {
  id: string;
  name: string;
  count: number | string;
}

export interface SearchResultCounts {
  posts: number;
  people: number;
  communities: number;
  resources: number;
  tags: number;
}

export interface SearchResults {
  query: string;
  counts: SearchResultCounts;
  posts: SearchPostResult[];
  people: SearchPersonResult[];
  communities: SearchCommunityResult[];
  resources: SearchResourceResult[];
  tags: SearchTagResult[];
}