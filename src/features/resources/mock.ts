import type { Resource, ResourceDetail } from './types';

// TODO: Replace with Express API integration — GET /api/resources
export const mockResources: Resource[] = [
  { id: 'react-complete-guide', title: 'React – The Complete Guide', type: 'Article', author: { name: 'John Doe', initials: 'JD', accent: 'primary' }, viewCount: 12400, bannerLabel: 'REACT', accent: 'primary' },
  { id: 'javascript-fundamentals', title: 'JavaScript Fundamentals', type: 'Article', author: { name: 'Jane Smith', initials: 'JS', accent: 'warning' }, viewCount: 8700, bannerLabel: 'JS', accent: 'warning' },
  { id: 'tailwind-crash-course', title: 'Tailwind CSS Crash Course', type: 'Course', author: { name: 'Alex Johnson', initials: 'AJ', accent: 'info' }, viewCount: 15200, bannerLabel: 'TW', accent: 'info' },
  { id: 'jwt-authentication-node', title: 'JWT Authentication in Node.js', type: 'Tool', author: { name: 'Sagar Sharma', initials: 'SS', accent: 'danger' }, viewCount: 6100, bannerLabel: 'JWT', accent: 'danger' },
];

// TODO: Replace with Express API integration — GET /api/communities
export const mockCommunities: string[] = ['MERN Developers'];

// TODO: Replace with Express API integration — GET /api/resources/:id
export const mockResourceDetail: ResourceDetail = {
  id: 'building-scalable-apis',
  title: 'Building Scalable APIs with Node.js and Express',
  type: 'Article',
  author: { name: 'Sagar Sharma', initials: 'SS', accent: 'primary' },
  viewCount: 24800,
  bannerLabel: 'NODE + EXPRESS',
  accent: 'primary',
  description: "In this comprehensive guide, we'll walk through best practices for building production-ready RESTful APIs using Node.js and Express, covering authentication, error handling, and security.",
  learnPoints: ['Project structure and setup', 'Routing and middleware', 'Authentication with JWT', 'Rate limiting and security'],
  language: 'English',
  categoryTags: ['Backend'],
  externalUrl: 'https://example.com/building-scalable-apis',
  commentCount: 28,
  publishedLabel: 'May 12, 2024',
  lastUpdatedLabel: 'May 12, 2024',
  readTimeLabel: '10 min read',
  relatedResources: [
    { id: 'error-handling-express', title: 'Error Handling in Express APIs', type: 'Article', author: { name: 'Jane Smith' }, viewCount: 4200, bannerLabel: 'JS', accent: 'warning' },
    { id: 'mongodb-schema-design', title: 'MongoDB Schema Design Patterns', type: 'Article', author: { name: 'David Brown' }, viewCount: 3100, bannerLabel: 'DB', accent: 'info' },
    { id: 'typescript-backend', title: 'TypeScript for Backend Developers', type: 'Course', author: { name: 'Tara Singh' }, viewCount: 9400, bannerLabel: 'TS', accent: 'success' },
  ],
  moreFromAuthor: [
    { id: 'error-handling-express', title: 'Error Handling in Express APIs', type: 'Article', author: { name: 'Jane Smith' }, viewCount: 4200, bannerLabel: 'JS', accent: 'warning' },
    { id: 'mongodb-schema-design', title: 'MongoDB Schema Design Patterns', type: 'Article', author: { name: 'David Brown' }, viewCount: 3100, bannerLabel: 'DB', accent: 'info' },
  ],
};