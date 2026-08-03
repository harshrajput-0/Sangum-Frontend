export type CommentAccent = 'primary' | 'success' | 'info' | 'accent';

export interface CommentBadge {
  label: string;
  tone: 'outline' | 'success';
}

export interface CommentAuthor {
  name: string;
  initials?: string; // derive via getInitials(name) if not sent
  accent?: CommentAccent; // derive via getCommentAccent(name) if not sent
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
