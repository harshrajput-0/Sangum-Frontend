import type { Comment, CommentTarget } from '../types/comment.types';

/**
 * TODO(api): backend is still in development. Every function below
 * is a PLACEHOLDER that resolves locally instead of hitting a real
 * endpoint, so the feature is fully usable/demoable today. The
 * intended Express route is noted above each function — swap the
 * body for a real fetch call once it exists; keep signatures
 * stable so hooks don't need to change.
 *
 * TODO(api): once endpoints exist, replace with the project's
 * shared HTTP client (see features/auth/services for the existing
 * fetch-wrapper pattern), and consider React Query for
 * caching/invalidation instead of hook-local state.
 */

// TODO(api): GET /api/comments?entityType=:entityType&entityId=:entityId
export async function getComments(_target: CommentTarget): Promise<Comment[]> {
  return []; // PLACEHOLDER — no persisted comments until the backend exists
}

// TODO(api): POST /api/comments  { entityType, entityId, text }
export async function addComment(_target: CommentTarget, comment: Comment): Promise<Comment> {
  return comment; // PLACEHOLDER — echoes what the hook already built optimistically
}

// TODO(api): POST /api/comments/:commentId/replies  { text }
export async function addReply(_target: CommentTarget, _parentCommentId: string, reply: Comment): Promise<Comment> {
  return reply;
}

// TODO(api): PATCH /api/comments/:commentId  { text }
export async function editComment(_target: CommentTarget, _commentId: string, text: string): Promise<{ text: string }> {
  return { text };
}

// TODO(api): DELETE /api/comments/:commentId
export async function deleteComment(_target: CommentTarget, _commentId: string): Promise<void> {}

// TODO(api): POST /api/comments/:commentId/like  (toggle)
export async function toggleCommentLike(
  _target: CommentTarget,
  _commentId: string,
  nextLikedState: boolean
): Promise<{ likedByCurrentUser: boolean }> {
  return { likedByCurrentUser: nextLikedState };
}

// TODO(api): POST /api/comments/:commentId/report
export async function reportComment(_target: CommentTarget, _commentId: string): Promise<void> {}