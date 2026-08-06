import type { Comment } from '../types/comment.types';
import type { UseCommentComposerReturn } from '../hooks/useCommentComposer';
import { CommentComposer } from './CommentComposer';
import { CommentList } from './CommentList';

export interface CommentsSectionProps {
  isOpen: boolean;
  isLoading: boolean;
  comments: Comment[];
  commentCount: number;
  composer: UseCommentComposerReturn;
  currentUserInitials: string;
  currentUserAvatarColor: string;
  onReply: (parentId: string, text: string) => void;
  onEdit: (commentId: string, text: string) => void;
  onDelete: (commentId: string, isTopLevel: boolean) => void;
  onToggleLike: (commentId: string, nextLikedState: boolean) => void;
}

/**
 * Purely presentational. All orchestration lives in useComments(),
 * called by the consuming feature — the "open comments" trigger
 * usually lives in a sibling component (the post's action bar), so
 * that state can't live inside this tree.
 */
export function CommentsSection({
  isOpen,
  isLoading,
  comments,
  commentCount,
  composer,
  currentUserInitials,
  currentUserAvatarColor,
  onReply,
  onEdit,
  onDelete,
  onToggleLike,
}: CommentsSectionProps) {
  if (!isOpen) return null;

  return (
    <div className="mt-4 border-t border-border pt-4">
      <p className="mb-4 text-sm font-semibold text-text">
        {commentCount} Comment{commentCount === 1 ? '' : 's'}
      </p>

      {composer.isOpen && (
        <div className="mb-4">
          <CommentComposer authorInitials={currentUserInitials} authorColor={currentUserAvatarColor} {...composer} />
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-text-muted">Loading comments…</p>
      ) : (
        <div className={`space-y-4 ${comments.length > 0 ? 'border-t border-border pt-4' : ''}`}>
          <CommentList comments={comments} depth={0} onReply={onReply} onEdit={onEdit} onDelete={onDelete} onToggleLike={onToggleLike} />
        </div>
      )}
    </div>
  );
}