import type { SearchResults } from './types/types';

// TODO: Replace with Express API integration — GET /api/search?q=&type=
export const mockSearchResults: SearchResults = {
  query: 'authentication jwt',
  counts: {
    posts: 128,
    people: 13,
    communities: 6,
    resources: 24,
    tags: 3,
  },
  posts: [
    {
      id: 'post-1',
      title: 'JWT Authentication in Node.js – Best Practices',
      communityName: 'MERN Developers',
      date: 'May 10, 2024',
      likes: 128,
      comments: 24,
      avatarInitials: 'JWT',
      avatarColor: 'var(--danger)',
    },
    {
      id: 'post-2',
      title: 'Implementing JWT Authentication in Express APIs',
      communityName: 'DevOps Hub',
      date: 'Apr 28, 2024',
      likes: 96,
      comments: 18,
      avatarColor: 'var(--surface-hover)',
    },
    {
      id: 'post-3',
      title: 'Refresh Tokens vs Sessions: Choosing an Auth Strategy',
      communityName: 'TypeScript Nation',
      date: 'Mar 2, 2024',
      likes: 74,
      comments: 11,
      avatarInitials: 'RBAC',
      avatarColor: 'var(--info)',
    },
  ],
  people: [
    { id: 'person-1', name: 'Sagar Sharma', handle: '@sagar.sharma', avatarInitials: 'SS', avatarColor: 'var(--primary)' },
    { id: 'person-2', name: 'Priya Patel', handle: '@priya.patel', avatarInitials: 'PP', avatarColor: 'var(--info)' },
    { id: 'person-3', name: 'Rohit Yadav', handle: '@rohit.yadav', avatarInitials: 'RY', avatarColor: 'var(--danger)' },
  ],
  communities: [
    {
      id: 'community-1',
      name: 'Authentication & Security',
      visibility: 'Public',
      memberCount: '12.4K',
      avatarInitials: 'N',
      avatarColor: 'var(--success)',
    },
  ],
  resources: [
    {
      id: 'resource-1',
      title: 'JWT Auth Flow Diagram Pack',
      communityName: 'TypeScript Nation',
      fileType: 'PDF',
      avatarColor: 'var(--warning)',
    },
  ],
  tags: [
    { id: 'tag-1', name: 'jwt', count: 312 },
    { id: 'tag-2', name: 'authentication', count: '1.1k' },
    { id: 'tag-3', name: 'nodejs', count: '2.4k' },
  ],
};