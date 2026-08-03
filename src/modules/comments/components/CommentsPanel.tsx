'use client';

import { useState } from 'react';
import { CommentComposer } from './components/CommentComposer';
import { CommentThread } from './components/CommentThread';
import { updateCommentById, removeCommentById, addReplyToComment } from './lib/commentTree';
import { mockComments, mockMoreComments } from './mock';
import type { Comment } from './types';

const CURRENT_USER = { name: 'Arjun Sharma', initials: 'AV', accent: 'primary' as const };

export function CommentsPanel() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [hasMore, setHasMore] = useState(true);

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
    setComments((prev) =>
      updateCommentById(prev, id, (comment) => ({
        ...comment,
        liked: !comment.liked,
        likeCount: comment.liked ? comment.likeCount - 1 : comment.likeCount + 1,
      }))
    );
  }

  function handleTopLevelComment(text: string) {
    // TODO: Replace with Express API integration — POST /api/comments
    setComments((prev) => [buildComment(text), ...prev]);
  }

  function handleReply(parentId: string, text: string) {
    // TODO: Replace with Express API integration — POST /api/comments (with parentId)
    setComments((prev) => addReplyToComment(prev, parentId, buildComment(text)));
  }

  function handleEdit(id: string, text: string) {
    // TODO: Replace with Express API integration — PATCH /api/comments/:id
    setComments((prev) => updateCommentById(prev, id, (comment) => ({ ...comment, text })));
  }

  function handleDelete(id: string) {
    // TODO: Replace with Express API integration — DELETE /api/comments/:id
    if (!confirm('Delete this comment? This cannot be undone.')) return;
    setComments((prev) => removeCommentById(prev, id));
  }

  function handleReport(_id: string) {
    // TODO: Replace with Express API integration — POST /api/comments/:id/report
  }

  function handleShowMore() {
    // TODO: Replace with Express API integration — GET /api/comments?page=2
    setComments((prev) => [...prev, ...mockMoreComments]);
    setHasMore(false);
  }

  return (
    <div>
      <CommentComposer
        avatarInitials={CURRENT_USER.initials}
        avatarAccent={CURRENT_USER.accent}
        placeholder="Write a comment…"
        submitLabel="Comment"
        onSubmit={handleTopLevelComment}
      />

      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <CommentThread key={comment.id} comment={comment} onLike={handleLike} onReply={handleReply} onEdit={handleEdit} onDelete={handleDelete} onReport={handleReport} />
        ))}
      </div>

      {hasMore && (
        <button onClick={handleShowMore} className="mt-5 text-sm font-medium text-primary-light hover:underline">
          Show more comments
        </button>
      )}
    </div>
  );
}