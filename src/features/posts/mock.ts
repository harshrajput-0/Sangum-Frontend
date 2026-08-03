import type { Comment } from '@/features/comments';

const AUTHOR_YOU = { name: 'Arjun Sharma', initials: 'AV', accent: 'primary' as const, isOwn: true };
const AUTHOR_MEERA = { name: 'Meera Iyer', initials: 'MI', accent: 'success' as const, isOwn: false, badge: { label: 'Admin', tone: 'success' as const } };
const AUTHOR_KABIR = { name: 'Kabir Verma', initials: 'KV', accent: 'info' as const, isOwn: false };
const AUTHOR_ZARA = { name: 'Zara Khan', initials: 'ZK', accent: 'accent' as const, isOwn: false };

// TODO: Replace with Express API integration — GET /api/comments?entityType=post&entityId=
export const mockPostComments: Comment[] = [
  {
    id: 'p-1',
    author: AUTHOR_MEERA,
    time: '3h ago',
    text: 'Great write-up! Pinning this to the group resources.',
    likeCount: 22,
    liked: false,
    replies: [
      {
        id: 'p-2',
        author: AUTHOR_YOU,
        time: '2h ago',
        text: 'Thanks Meera! Let me know if anything needs updating.',
        likeCount: 4,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    id: 'p-3',
    author: AUTHOR_KABIR,
    time: '1h ago',
    text: 'Been looking for something like this all week, appreciate you sharing.',
    likeCount: 9,
    liked: false,
    replies: [],
  },
  {
    id: 'p-4',
    author: AUTHOR_ZARA,
    time: '35m ago',
    text: 'Bookmarking for later, thank you!',
    likeCount: 3,
    liked: false,
    replies: [],
  },
];