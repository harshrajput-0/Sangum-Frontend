'use client';

import { useState } from 'react';
import { CommentComposer } from './components/CommentComposer';
import { CommentThread } from './components/CommentThread';
import { updateCommentById, removeCommentById, addReplyToComment } from './lib/commentTree';
import type { Comment } from './types';

const CURRENT_USER = { name: 'Arjun Sharma', initials: 'AV', accent: 'primary' as const };

interface CommentsPanelProps {
  entityType: string;
  entityId: string;
  initialComments: Comment[];
  initialMoreComments?: Comment[];
  initialVisibleCount?: number;
}

export function CommentsPanel({
  entityType,
  entityId,
  initialComments,
  initialMoreComments = [],
  initialVisibleCount,
}: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [hasMorePages, setHasMorePages] = useState(initialMoreComments.length > 0);
  const [showAllVisible, setShowAllVisible] = useState(initialVisibleCount === undefined);

  function buildComment(text: string): Comment {
    return {
      id: `local-${Date.now()}`,
      author: { ...CURRENT_USER, isOwn: true, badge: { label: 'Author', tone: 'outline' } },
      time: 'Just now',
      text,
      likeCount: 0,
      liked: false,
      replies: [],
    };
  }

  function handleLike(id: string) {
    // TODO: Replace with Express API integration — POST /api/comments/:id/like
    setComments((prev) => updateCommentById(prev, id, (c) => ({ ...c, liked: !c.liked, likeCount: c.liked ? c.likeCount - 1 : c.likeCount + 1 })));
  }

  function handleTopLevelComment(text: string) {
    // TODO: Replace with Express API integration — POST /api/comments (entityType, entityId)
    setComments((prev) => [buildComment(text), ...prev]);
  }

  function handleReply(parentId: string, text: string) {
    // TODO: Replace with Express API integration — POST /api/comments (parentId, entityType, entityId)
    setComments((prev) => addReplyToComment(prev, parentId, buildComment(text)));
  }

  function handleEdit(id: string, text: string) {
    // TODO: Replace with Express API integration — PATCH /api/comments/:id
    setComments((prev) => updateCommentById(prev, id, (c) => ({ ...c, text })));
  }

  function handleDelete(id: string) {
    // TODO: Replace with Express API integration — DELETE /api/comments/:id
    if (!confirm('Delete this comment? This cannot be undone.')) return;
    setComments((prev) => removeCommentById(prev, id));
  }

  function handleReport(_id: string) {
    // TODO: Replace with Express API integration — POST /api/comments/:id/report
  }

  function handleLoadNextPage() {
    // TODO: Replace with Express API integration — GET /api/comments?entityType=${entityType}&entityId=${entityId}&page=2
    setComments((prev) => [...prev, ...initialMoreComments]);
    setHasMorePages(false);
  }

  const visibleComments = showAllVisible ? comments : comments.slice(0, initialVisibleCount);
  const hiddenCount = comments.length - visibleComments.length;

  return (
    <div>
      <CommentComposer avatarInitials={CURRENT_USER.initials} avatarAccent={CURRENT_USER.accent} placeholder="Write a comment…" submitLabel="Comment" onSubmit={handleTopLevelComment} />

      {comments.length === 0 ? (
        <p className="mt-6 text-center text-sm text-text-muted">No comments yet — be the first to comment.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {visibleComments.map((comment) => (
            <CommentThread key={comment.id} comment={comment} onLike={handleLike} onReply={handleReply} onEdit={handleEdit} onDelete={handleDelete} onReport={handleReport} />
          ))}
        </div>
      )}

      {!showAllVisible && hiddenCount > 0 && (
        <button onClick={() => setShowAllVisible(true)} className="mt-5 text-sm font-medium text-primary-light hover:underline">
          Show all {comments.length} comments
        </button>
      )}

      {showAllVisible && hasMorePages && (
        <button onClick={handleLoadNextPage} className="mt-5 text-sm font-medium text-primary-light hover:underline">
          Show more comments
        </button>
      )}
    </div>
  );
}