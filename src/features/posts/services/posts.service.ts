import type { Post } from '../types/post.types';
import type { CreatePostServiceInput } from '../types/createPost.types';

/**
 * TODO(api): backend is still in development. This entire module is
 * a PLACEHOLDER operating on an in-memory array, seeded with the
 * reference mockup's posts, so the Feed and Profile UI are fully
 * clickable/demoable today. Expected Express routes are noted above
 * each function — swap the body for a real fetch call once they
 * exist; keep signatures stable so hooks don't need to change.
 * TODO(api): once endpoints exist, replace with the project's shared
 * HTTP client (see features/auth/services for the existing pattern)
 * and consider React Query for caching/pagination instead of
 * hook-local state.
 */

export type FeedTab = 'latest' | 'top' | 'following';

let MOCK_POSTS: Post[] = [
  {
    id: 'p7',
    author: { id: 'u-meera-kapoor', name: 'Meera Kapoor', initials: 'MK', avatarColor: 'bg-warning', badge: null },
    date: '6h ago',
    title: 'System Design Cheat Sheet — v2',
    type: 'doc',
    tags: ['System Design', 'Interview Prep'],
    excerpt:
      "Updated my system design cheat sheet with load balancing, caching layers, sharding strategies, and a quick reference for CAP theorem trade-offs. Grab it before your next interview. This revision adds a whole section on load balancer algorithms — round robin, least connections, and consistent hashing — with a one-line note on when each one actually matters in practice rather than just the textbook definition.",
    topics: [],
    likes: 58,
    commentCount: 1,
    followedByCurrentUser: false,
    pinned: false,
  },
  {
    id: 'p8',
    author: { id: 'u-vikram-shah', name: 'Vikram Shah', initials: 'VS', avatarColor: 'bg-danger', badge: null },
    date: '10h ago',
    title: 'Which state management approach do you reach for first in a new React app?',
    type: 'poll',
    tags: ['React', 'Poll · 3 days'],
    excerpt: 'Which state management approach do you reach for first in a new React app?',
    topics: ['Context + useReducer', 'Redux Toolkit', 'Zustand', 'Jotai', 'React Query only, no client state lib'],
    pollVotes: [14, 11, 9, 4, 3],
    pollVotedIndex: null,
    likes: 41,
    commentCount: 0,
    followedByCurrentUser: true,
    pinned: false,
  },
  {
    id: 'p9',
    author: { id: 'u-rahul-dev', name: 'Rahul Dev', initials: 'RD', avatarColor: 'bg-success', badge: null },
    date: '7h ago',
    title: 'Standing desk + monitor arm finally installed',
    type: 'image',
    imageAspect: '4:5',
    image: 'https://picsum.photos/seed/sangum-desk-setup/800/1000',
    tags: ['Workspace', 'Setup'],
    excerpt:
      "Took me three weekends longer than planned but the standing desk and monitor arm are finally in. Cable management still isn't perfect but I'll take the win. Worth mentioning for anyone attempting this — check your desk thickness against the clamp's rated range before you order, it'll save you a return.",
    topics: [],
    likes: 74,
    commentCount: 1,
    followedByCurrentUser: true,
    pinned: false,
  },
  {
    id: 'p10',
    author: { id: 'u-arjun-sharma', name: 'Arjun Sharma', initials: 'AV', avatarColor: 'bg-primary', badge: 'Author' },
    date: '9h ago',
    title: 'Team offsite recap: two days, way too much whiteboard',
    type: 'image',
    imageAspect: '5:3',
    image: 'https://picsum.photos/seed/sangum-team-offsite/1000/600',
    tags: ['Team', 'Offsite'],
    excerpt:
      "Spent two days offsite with the team mapping out next quarter's roadmap. More useful than any number of Slack threads could've been, and the whiteboard photos alone are worth archiving. Being away from desks and notifications for two straight days made a real difference — half the good ideas came out during lunch walks, not in the structured sessions.",
    topics: [],
    likes: 128,
    commentCount: 4,
    followedByCurrentUser: true,
    pinned: false,
  },
  {
    id: 'p11',
    author: { id: 'u-neha-singh', name: 'Neha Singh', initials: 'NS', avatarColor: 'bg-info', badge: null },
    date: '11h ago',
    title: 'Shipped the new dashboard redesign today',
    type: 'image',
    imageAspect: '16:9',
    image: 'https://picsum.photos/seed/sangum-dashboard-launch/1200/675',
    tags: ['Product', 'Launch'],
    excerpt:
      'After three months of iteration the redesigned analytics dashboard is live for everyone. Faster load times, clearer charts, and a layout that actually scales down to tablet without falling apart.',
    topics: [],
    likes: 211,
    commentCount: 0,
    followedByCurrentUser: false,
    pinned: false,
  },
];

function sortForTab(posts: Post[], tab: FeedTab): Post[] {
  if (tab === 'top') return [...posts].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  if (tab === 'following') return posts.filter((p) => p.followedByCurrentUser);
  return posts;
}

// TODO(api): GET /api/posts?tab=:tab&cursor=:cursor&pageSize=:pageSize
export async function getFeedPosts(params: {
  tab: FeedTab;
  cursor: number;
  pageSize?: number;
}): Promise<{ posts: Post[]; nextCursor: number; hasMore: boolean }> {
  const pageSize = params.pageSize ?? 2; // matches the mock's PAGE_SIZE
  const source = sortForTab(MOCK_POSTS, params.tab);
  const slice = source.slice(params.cursor, params.cursor + pageSize);
  const nextCursor = params.cursor + slice.length;
  return Promise.resolve({ posts: slice, nextCursor, hasMore: nextCursor < source.length });
}

// TODO(api): GET /api/users/:userId/posts
export async function getPostsByUser(userId: string): Promise<Post[]> {
  return Promise.resolve(MOCK_POSTS.filter((p) => p.author?.id === userId));
}

// TODO(api): POST /api/posts
export async function createPost(input: CreatePostServiceInput): Promise<Post> {
  const newPost: Post = {
    id: `p-new-${Date.now()}`,
    author: input.author,
    date: 'Just now',
    title: input.title,
    type: input.type,
    tags: input.tags,
    excerpt: input.excerpt,
    topics: input.topics,
    pollVotes: input.pollVotes,
    pollVotedIndex: input.type === 'poll' ? null : undefined,
    likes: 0,
    commentCount: 0,
    followedByCurrentUser: true,
    communityId: input.communityId,
    pinned: false,
  };
  MOCK_POSTS = [newPost, ...MOCK_POSTS];
  return Promise.resolve(newPost);
}

// TODO(api): PATCH /api/posts/:postId
export async function updatePost(postId: string, input: Omit<CreatePostServiceInput, 'author'>): Promise<Post> {
  const existing = MOCK_POSTS.find((p) => p.id === postId);
  if (!existing) throw new Error(`Post ${postId} not found`); // TODO(api): real 404 handling

  const updated: Post = {
    ...existing,
    title: input.title,
    type: input.type,
    tags: input.tags,
    excerpt: input.excerpt,
    topics: input.topics,
    pollVotes: input.pollVotes,
    communityId: input.communityId,
    edited: true,
  };
  MOCK_POSTS = MOCK_POSTS.map((p) => (p.id === postId ? updated : p));
  return Promise.resolve(updated);
}

// TODO(api): DELETE /api/posts/:postId
export async function deletePost(postId: string): Promise<void> {
  MOCK_POSTS = MOCK_POSTS.filter((p) => p.id !== postId);
  return Promise.resolve();
}

// TODO(api): POST /api/posts/:postId/like (toggle)
export async function toggleLike(postId: string, nextLikedState: boolean): Promise<{ likedByCurrentUser: boolean; likes: number }> {
  let result = { likedByCurrentUser: nextLikedState, likes: 0 };
  MOCK_POSTS = MOCK_POSTS.map((p) => {
    if (p.id !== postId) return p;
    const likes = (p.likes ?? 0) + (nextLikedState ? 1 : -1);
    result = { likedByCurrentUser: nextLikedState, likes };
    return { ...p, likes, likedByCurrentUser: nextLikedState };
  });
  return Promise.resolve(result);
}

// TODO(api): POST /api/posts/:postId/bookmark (toggle)
export async function toggleBookmark(postId: string, nextSavedState: boolean): Promise<{ savedByCurrentUser: boolean }> {
  MOCK_POSTS = MOCK_POSTS.map((p) => (p.id === postId ? { ...p, savedByCurrentUser: nextSavedState } : p));
  return Promise.resolve({ savedByCurrentUser: nextSavedState });
}

// TODO(api): POST /api/posts/:postId/follow (toggle) — follows the post's author
export async function toggleFollow(postId: string, nextFollowedState: boolean): Promise<{ followedByCurrentUser: boolean }> {
  MOCK_POSTS = MOCK_POSTS.map((p) => (p.id === postId ? { ...p, followedByCurrentUser: nextFollowedState } : p));
  return Promise.resolve({ followedByCurrentUser: nextFollowedState });
}

// TODO(api): POST /api/posts/:postId/vote  { optionIndex }  — toggles:
// voting the currently-selected option again clears your vote; voting
// a different option moves it. Matches the mock's pollVote() exactly.
export async function votePoll(postId: string, optionIndex: number): Promise<{ pollVotes: number[]; pollVotedIndex: number | null }> {
  let result: { pollVotes: number[]; pollVotedIndex: number | null } = { pollVotes: [], pollVotedIndex: null };
  MOCK_POSTS = MOCK_POSTS.map((p) => {
    if (p.id !== postId) return p;
    const pollVotes = [...(p.pollVotes ?? (p.topics ?? []).map(() => 0))];
    const currentVoted = p.pollVotedIndex ?? null;

    let nextVoted: number | null;
    if (currentVoted === optionIndex) {
      pollVotes[optionIndex] = Math.max(0, (pollVotes[optionIndex] ?? 0) - 1);
      nextVoted = null;
    } else {
      if (currentVoted !== null && currentVoted !== undefined) {
        pollVotes[currentVoted] = Math.max(0, (pollVotes[currentVoted] ?? 0) - 1);
      }
      pollVotes[optionIndex] = (pollVotes[optionIndex] ?? 0) + 1;
      nextVoted = optionIndex;
    }

    result = { pollVotes, pollVotedIndex: nextVoted };
    return { ...p, pollVotes, pollVotedIndex: nextVoted };
  });
  return Promise.resolve(result);
}

// TODO(api): POST /api/posts/:postId/report
export async function reportPost(_postId: string): Promise<void> {
  return Promise.resolve();
}