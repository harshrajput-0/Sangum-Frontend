export interface PostAuthor {
  name: string;
  avatarLabel: string;
  avatarImageUrl?: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  timestamp: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  likeCount: number;
  commentCount: number;
  viewCount: string;
}

export interface AboutSummary {
  description: string;
  createdAt: string;
  type: string;
  rules: string[];
}