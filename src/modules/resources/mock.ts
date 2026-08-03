import type { Resource, ResourceDetail, Comment } from './types';

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

const AUTHOR_ARJUN = { name: 'Arjun Sharma', initials: 'AV', accent: 'primary' as const, isOwn: true, badge: { label: 'Author', tone: 'outline' as const } };
const AUTHOR_PRIYA = { name: 'Priya Patel', initials: 'PP', accent: 'success' as const, isOwn: false, badge: { label: 'Moderator', tone: 'success' as const } };
const AUTHOR_ROHIT = { name: 'Rohit Yadav', initials: 'RY', accent: 'info' as const, isOwn: false };

// TODO: Replace with Express API integration — GET /api/comments?entityType=resource&entityId=
export const mockResourceComments: Comment[] = [
  {
    id: 'node-1', author: AUTHOR_ARJUN, time: '2h ago', text: 'This feature is a game changer. Great work team!', likeCount: 48, liked: false,
    replies: [
      {
        id: 'node-2', author: AUTHOR_PRIYA, time: '1h ago', text: 'Thanks Arjun! Let us know if you have feedback 🙌', likeCount: 16, liked: false,
        replies: [
          { id: 'node-3', author: AUTHOR_ROHIT, time: '45m ago', text: 'Can we add keyboard shortcuts for quick actions?', likeCount: 6, liked: false,
            replies: [{ id: 'node-7', author: AUTHOR_ARJUN, time: '30m ago', text: 'Good idea — adding this to the backlog for next sprint.', likeCount: 5, liked: false, replies: [] }] },
          { id: 'node-6', author: AUTHOR_ARJUN, time: '50m ago', text: 'Same here — really appreciate you jumping in to help others, Priya!', likeCount: 9, liked: false, replies: [] },
        ],
      },
    ],
  },
  { id: 'node-4', author: AUTHOR_ARJUN, time: '1h ago', text: 'Also, huge thanks to everyone who tested the beta and sent feedback — it shaped a lot of this release.', likeCount: 21, liked: false, replies: [] },
  { id: 'node-5', author: AUTHOR_ARJUN, time: '40m ago', text: 'Quick update: the fix for the sync bug is going out with tomorrow’s release.', likeCount: 12, liked: false, replies: [] },
];

// TODO: Replace with Express API integration — GET /api/comments?entityType=resource&entityId=&page=2
export const mockMoreResourceComments: Comment[] = [
  {
    id: 'more-1', author: { name: 'Neha Kapoor', initials: 'NK', accent: 'accent', isOwn: false }, time: '38m ago',
    text: 'Any accessibility improvements planned alongside this? Would help a lot on our end.', likeCount: 9, liked: false,
    replies: [{ id: 'more-1-r1', author: { name: 'DevTeam_Anish', initials: 'DA', accent: 'info', isOwn: false }, time: '20m ago', text: 'Yes! Screen reader support is next sprint.', likeCount: 3, liked: false, replies: [] }],
  },
  { id: 'more-2', author: { name: 'Sameer Gupta', initials: 'SG', accent: 'primary', isOwn: false }, time: '22m ago', text: 'This finally fixed the lag issue for me 🙌', likeCount: 4, liked: false, replies: [] },
];