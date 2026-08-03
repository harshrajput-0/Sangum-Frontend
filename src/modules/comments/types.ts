export type CommentAccent = 'primary' | 'success' | 'info' | 'accent';

export interface CommentBadge {
  label: string;
  tone: 'outline' | 'success';
}

export interface CommentAuthor {
  name: string;
  initials: string;
  accent: CommentAccent;
  isOwn: boolean;
  badge?: CommentBadge;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  time: string;
  text: string;
  likeCount: number;
  liked: boolean;
  replies: Comment[];
}
