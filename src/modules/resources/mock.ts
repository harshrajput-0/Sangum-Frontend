import type { Resource } from './types';

// TODO: Replace with Express API integration — GET /api/resources
export const mockResources: Resource[] = [
  {
    id: 'react-complete-guide',
    title: 'React – The Complete Guide',
    type: 'Article',
    author: { name: 'John Doe', initials: 'JD', accent: 'primary' },
    viewCount: 12400,
    bannerLabel: 'REACT',
    accent: 'primary',
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    type: 'Article',
    author: { name: 'Jane Smith', initials: 'JS', accent: 'warning' },
    viewCount: 8700,
    bannerLabel: 'JS',
    accent: 'warning',
  },
  {
    id: 'tailwind-crash-course',
    title: 'Tailwind CSS Crash Course',
    type: 'Course',
    author: { name: 'Alex Johnson', initials: 'AJ', accent: 'info' },
    viewCount: 15200,
    bannerLabel: 'TW',
    accent: 'info',
  },
  {
    id: 'jwt-authentication-node',
    title: 'JWT Authentication in Node.js',
    type: 'Tool',
    author: { name: 'Sagar Sharma', initials: 'SS', accent: 'danger' },
    viewCount: 6100,
    bannerLabel: 'JWT',
    accent: 'danger',
  },
];

// TODO: Replace with Express API integration — GET /api/communities
export const mockCommunities: string[] = ['MERN Developers'];