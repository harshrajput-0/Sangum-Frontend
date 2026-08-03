// src/features/posts/components/post-detail/CommentList.tsx
import { CommentComposer } from './CommentComposer';
import { CommentItem } from './CommentItem';
import type { PostComment } from '../../types';

interface CommentListProps {
  comments: PostComment[];
  commentCount: number;
  currentUserAvatarLabel: string;
  draftComment: string;
  onDraftChange: (value: string) => void;
  onReply?: (commentId: string) => void;
}

/** Composer + existing comments, merged under the post card's action row. */
export function CommentList({
  comments,
  commentCount,
  currentUserAvatarLabel,
  draftComment,
  onDraftChange,
  onReply,
}: CommentListProps) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="mb-4 text-sm font-semibold text-text">{commentCount} Comments</p>
      <CommentComposer
        currentUserAvatarLabel={currentUserAvatarLabel}
        value={draftComment}
        onChange={onDraftChange}
      />
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
}