
/**
 * Pure, immutable helpers for manipulating a nested comment tree.
 * No React, no side effects — used by useComments to keep state
 * updates predictable and testable in isolation.
 */

import type { Comment } from '../types/comment.types';

function repliesOf(node: Comment): Comment[] {
  return node.replies ?? [];
}

export function countTopLevel(comments: Comment[]): number {
  return comments.length;
}

export function insertTopLevel(comments: Comment[], newComment: Comment): Comment[] {
  return [newComment, ...comments];
}

export function insertReply(comments: Comment[], parentId: string, reply: Comment): Comment[] {
  return comments.map((node) => {
    if (node.id === parentId) return { ...node, replies: [reply, ...repliesOf(node)] };
    if (repliesOf(node).length > 0) return { ...node, replies: insertReply(repliesOf(node), parentId, reply) };
    return node;
  });
}

export function removeNode(comments: Comment[], targetId: string): Comment[] {
  return comments
    .filter((node) => node.id !== targetId)
    .map((node) => ({ ...node, replies: removeNode(repliesOf(node), targetId) }));
}

export function updateNodeText(comments: Comment[], targetId: string, text: string): Comment[] {
  return comments.map((node) => {
    if (node.id === targetId) return { ...node, text };
    if (repliesOf(node).length > 0) return { ...node, replies: updateNodeText(repliesOf(node), targetId, text) };
    return node;
  });
}

export function toggleNodeLike(comments: Comment[], targetId: string, likedState: boolean): Comment[] {
  return comments.map((node) => {
    if (node.id === targetId) {
      return { ...node, likedByCurrentUser: likedState, likes: (node.likes ?? 0) + (likedState ? 1 : -1) };
    }
    if (repliesOf(node).length > 0) return { ...node, replies: toggleNodeLike(repliesOf(node), targetId, likedState) };
    return node;
  });
}

/**
 * Normalizes a raw comment (as it might arrive from a still-evolving
 * API) into a shape the rest of the UI can rely on — loose types at
 * the boundary, filled-in defaults once inside app state, rather than
 * scattering `?? []` / `?? 0` through every component.
 */
export function normalizeComment(raw: Comment): Comment {
  return {
    ...raw,
    author: raw.author ?? {},
    time: raw.time ?? '',
    text: raw.text ?? '',
    likes: raw.likes ?? 0,
    replies: repliesOf(raw).map(normalizeComment),
  };
}