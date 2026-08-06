import type { Comment } from '../types/comment.types';
import { CommentNode } from './CommentNode';

export interface CommentListProps {
  comments: Comment[];
  depth: number;
  onReply: (parentId: string, text: string) => void;
  onEdit: (commentId: string, text: string) => void;
  onDelete: (commentId: string, isTopLevel: boolean) => void;
  onToggleLike: (commentId: string, nextLikedState: boolean) => void;
  onReport: (commentId: string) => void;
}

export function CommentList({ comments, depth, onReply, onEdit, onDelete, onToggleLike, onReport }: CommentListProps) {
  return (
    <>
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          depth={depth}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleLike={onToggleLike}
          onReport={onReport}
        />
      ))}
    </>
  );
}