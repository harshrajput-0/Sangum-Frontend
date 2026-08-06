import type { Comment } from '../types/comment.types';

/**
 * Pure, immutable helpers for manipulating a nested comment tree.
 * No React, no side effects — used by useComments to keep state
 * updates predictable and testable in isolation.
 */

export function countTopLevel(comments: Comment[]): number {
  return comments.length;
}

export function insertTopLevel(comments: Comment[], newComment: Comment): Comment[] {
  return [newComment, ...comments];
}

export function insertReply(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((node) => {
    if (node.id === parentId) return { ...node, replies: [reply, ...node.replies] };
    if (node.replies.length > 0) return { ...node, replies: insertReply(node.replies, parentId, reply) };
    return node;
  });
}

export function removeNode(comments: Comment[], targetId: string): Comment[] {
  return comments
    .filter((node) => node.id !== targetId)
    .map((node) => ({ ...node, replies: removeNode(node.replies, targetId) }));
}

export function updateNodeText(comments: Comment[], targetId: string, text: string): Comment[] {
  return comments.map((node) => {
    if (node.id === targetId) return { ...node, text };
    if (node.replies.length > 0) return { ...node, replies: updateNodeText(node.replies, targetId, text) };
    return node;
  });
}

export function toggleNodeLike(comments: Comment[], targetId: string, likedState: boolean): Comment[] {
  return comments.map((node) => {
    if (node.id === targetId) {
      return { ...node, likedByCurrentUser: likedState, likes: node.likes + (likedState ? 1 : -1) };
    }
    if (node.replies.length > 0) return { ...node, replies: toggleNodeLike(node.replies, targetId, likedState) };
    return node;
  });
}