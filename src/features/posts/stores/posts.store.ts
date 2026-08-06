import { create } from 'zustand';
import type { Post } from '../types/post.types';

interface PostsState {
  // Normalized cache: every post the app currently knows about, keyed
  // by id. Both the Feed and a user's profile section render views
  // over this SAME map, so liking/editing/deleting a post updates it
  // everywhere it's shown — no manual cross-view syncing needed
  // (unlike the reference mock, which had to hand-sync duplicate DOM
  // copies via uidBase scoping).
  posts: Record<string, Post>;

  // Ordered id lists per view. Kept separate from `posts` since
  // pagination/ordering differs per view (Feed tabs vs. a given
  // user's post list) while the underlying post data is shared.
  feedOrder: string[];
  userPostOrder: Record<string, string[]>; // keyed by author userId

  setFeedPage: (posts: Post[], mode: 'replace' | 'append') => void;
  setUserPosts: (userId: string, posts: Post[]) => void;
  addCreatedPost: (post: Post) => void;
  removePost: (postId: string) => void;
  patchPost: (postId: string, patch: Partial<Post>) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: {},
  feedOrder: [],
  userPostOrder: {},

  setFeedPage: (posts, mode) =>
    set((state) => {
      const nextPosts = { ...state.posts };
      posts.forEach((p) => { nextPosts[p.id] = p; });
      const incomingIds = posts.map((p) => p.id);
      return {
        posts: nextPosts,
        feedOrder: mode === 'replace' ? incomingIds : [...state.feedOrder, ...incomingIds],
      };
    }),

  setUserPosts: (userId, posts) =>
    set((state) => {
      const nextPosts = { ...state.posts };
      posts.forEach((p) => { nextPosts[p.id] = p; });
      return {
        posts: nextPosts,
        userPostOrder: { ...state.userPostOrder, [userId]: posts.map((p) => p.id) },
      };
    }),

  addCreatedPost: (post) =>
    set((state) => {
      const authorId = post.author?.id;
      return {
        posts: { ...state.posts, [post.id]: post },
        feedOrder: [post.id, ...state.feedOrder],
        userPostOrder: authorId
          ? { ...state.userPostOrder, [authorId]: [post.id, ...(state.userPostOrder[authorId] ?? [])] }
          : state.userPostOrder,
      };
    }),

  removePost: (postId) =>
    set((state) => {
      const nextPosts = { ...state.posts };
      delete nextPosts[postId];
      const nextUserPostOrder = Object.fromEntries(
        Object.entries(state.userPostOrder).map(([uid, ids]) => [uid, ids.filter((id) => id !== postId)])
      );
      return {
        posts: nextPosts,
        feedOrder: state.feedOrder.filter((id) => id !== postId),
        userPostOrder: nextUserPostOrder,
      };
    }),

  // Generic patch — usePostCard computes the next like/save/follow/
  // poll state and calls this after (optimistically) invoking the
  // relevant posts.service function. Keeps business logic out of the
  // store entirely.
  patchPost: (postId, patch) =>
    set((state) => {
      const existing = state.posts[postId];
      if (!existing) return state; // TODO(api): consider fetching the post if it's missing from cache
      return { posts: { ...state.posts, [postId]: { ...existing, ...patch } } };
    }),
}));