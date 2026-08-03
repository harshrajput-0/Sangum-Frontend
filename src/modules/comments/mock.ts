import type { Comment } from './types';

const AUTHOR_ARJUN = { name: 'Arjun Sharma', initials: 'AV', accent: 'primary' as const, isOwn: true, badge: { label: 'Author', tone: 'outline' as const } };
const AUTHOR_PRIYA = { name: 'Priya Patel', initials: 'PP', accent: 'success' as const, isOwn: false, badge: { label: 'Moderator', tone: 'success' as const } };
const AUTHOR_ROHIT = { name: 'Rohit Yadav', initials: 'RY', accent: 'info' as const, isOwn: false };

// TODO: Replace with Express API integration — GET /api/comments?entityType=&entityId=
export const mockComments: Comment[] = [
  {
    id: 'node-1',
    author: AUTHOR_ARJUN,
    time: '2h ago',
    text: 'This feature is a game changer. Great work team!',
    likeCount: 48,
    liked: false,
    replies: [
      {
        id: 'node-2',
        author: AUTHOR_PRIYA,
        time: '1h ago',
        text: 'Thanks Arjun! Let us know if you have feedback 🙌',
        likeCount: 16,
        liked: false,
        replies: [
          {
            id: 'node-3',
            author: AUTHOR_ROHIT,
            time: '45m ago',
            text: 'Can we add keyboard shortcuts for quick actions?',
            likeCount: 6,
            liked: false,
            replies: [
              {
                id: 'node-7',
                author: AUTHOR_ARJUN,
                time: '30m ago',
                text: 'Good idea — adding this to the backlog for next sprint.',
                likeCount: 5,
                liked: false,
                replies: [],
              },
            ],
          },
          {
            id: 'node-6',
            author: AUTHOR_ARJUN,
            time: '50m ago',
            text: 'Same here — really appreciate you jumping in to help others, Priya!',
            likeCount: 9,
            liked: false,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 'node-4',
    author: AUTHOR_ARJUN,
    time: '1h ago',
    text: 'Also, huge thanks to everyone who tested the beta and sent feedback — it shaped a lot of this release.',
    likeCount: 21,
    liked: false,
    replies: [],
  },
  {
    id: 'node-5',
    author: AUTHOR_ARJUN,
    time: '40m ago',
    text: 'Quick update: the fix for the sync bug is going out with tomorrow’s release.',
    likeCount: 12,
    liked: false,
    replies: [],
  },
];

// TODO: Replace with Express API integration — GET /api/comments?entityType=&entityId=&page=2
export const mockMoreComments: Comment[] = [
  {
    id: 'more-1',
    author: { name: 'Neha Kapoor', initials: 'NK', accent: 'accent', isOwn: false },
    time: '38m ago',
    text: 'Any accessibility improvements planned alongside this? Would help a lot on our end.',
    likeCount: 9,
    liked: false,
    replies: [
      {
        id: 'more-1-r1',
        author: { name: 'DevTeam_Anish', initials: 'DA', accent: 'info', isOwn: false },
        time: '20m ago',
        text: 'Yes! Screen reader support is next sprint.',
        likeCount: 3,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    id: 'more-2',
    author: { name: 'Sameer Gupta', initials: 'SG', accent: 'primary', isOwn: false },
    time: '22m ago',
    text: 'This finally fixed the lag issue for me 🙌',
    likeCount: 4,
    liked: false,
    replies: [],
  },
];