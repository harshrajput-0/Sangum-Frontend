import type { PostBookmark, ResourceBookmark } from './types';

// TODO: Replace with Express API integration — GET /api/bookmarks?type=posts
export const mockPostBookmarks: PostBookmark[] = [
  {
    id: 'post-bm-1',
    authorName: 'Sagar Sharma',
    communityName: 'MERN Developers',
    date: 'May 12',
    avatarInitials: 'N',
    avatarColor: 'var(--success)',
    title: 'Building Scalable APIs with Node.js and Express',
    description: 'A complete guide to building RESTful APIs with authentication, validation, and best practices.',
    likes: 342,
    comments: 28,
  },
  {
    id: 'post-bm-2',
    authorName: 'Priya Patel',
    communityName: 'TypeScript Nation',
    date: 'Apr 28',
    avatarInitials: 'PP',
    avatarColor: 'var(--info)',
    title: 'Advanced TypeScript Tips and Tricks',
    description: 'Level up your TypeScript skills with these advanced patterns and techniques.',
    likes: 210,
    comments: 16,
  },
  {
    id: 'post-bm-3',
    authorName: 'Rohit Yadav',
    communityName: 'DevOps Hub',
    date: 'Apr 14',
    avatarInitials: 'RY',
    avatarColor: 'var(--danger)',
    title: 'Docker Compose for Local Dev Environments',
    description: 'Set up a reproducible local stack for a Node + Postgres + Redis app in one file.',
    likes: 156,
    comments: 9,
  },
  {
    id: 'post-bm-4',
    authorName: 'Neha Singh',
    communityName: 'MERN Developers',
    date: 'Mar 30',
    avatarInitials: 'NS',
    avatarColor: 'var(--neutral)',
    title: 'Designing Resilient Microservices',
    description: 'Patterns for retries, circuit breakers, and graceful degradation across services.',
    likes: 189,
    comments: 22,
  },
];

// TODO: Replace with Express API integration — GET /api/bookmarks?type=resources
export const mockResourceBookmarks: ResourceBookmark[] = [
  {
    id: 'resource-bm-1',
    title: 'TS Config Cheat Sheet',
    communityName: 'TypeScript Nation',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    avatarColor: 'var(--warning)',
    badgeVariant: 'amber',
  },
  {
    id: 'resource-bm-2',
    title: 'CI/CD Pipeline Template',
    communityName: 'DevOps Hub',
    fileType: 'YAML',
    fileSize: '4 KB',
    avatarColor: 'var(--info)',
    badgeVariant: 'blue',
  },
  {
    id: 'resource-bm-3',
    title: 'REST API Postman Collection',
    communityName: 'MERN Developers',
    fileType: 'JSON',
    fileSize: '18 KB',
    avatarColor: 'var(--success)',
    badgeVariant: 'green',
  },
];