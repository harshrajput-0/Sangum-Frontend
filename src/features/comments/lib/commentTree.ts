import type { Comment } from '../types';

export function updateCommentById(comments: Comment[], id: string, updater: (comment: Comment) => Comment): Comment[] {
  return comments.map((comment) => {
    if (comment.id === id) return updater(comment);
    if (comment.replies.length > 0) {
      return { ...comment, replies: updateCommentById(comment.replies, id, updater) };
    }
    return comment;
  });
}

export function removeCommentById(comments: Comment[], id: string): Comment[] {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) =>
      comment.replies.length > 0 ? { ...comment, replies: removeCommentById(comment.replies, id) } : comment
    );
}

export function addReplyToComment(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, reply] };
    }
    if (comment.replies.length > 0) {
      return { ...comment, replies: addReplyToComment(comment.replies, parentId, reply) };
    }
    return comment;
  });
}