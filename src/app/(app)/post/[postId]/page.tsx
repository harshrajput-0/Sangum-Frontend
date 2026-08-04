// src/app/posts/[postId]/page.tsx
import { PostDetailShell } from '@/features/posts';
import type { PostSummary } from '@/features/posts';
import { mockPostComments } from '@/features/posts/mock';

// TODO: replace with usePostDetail(postId) / a server fetch once the API exists.
const mockPost: PostSummary = {
  id: 'post-1',
  title: 'How we cut our bundle size by 40%',
  author: { id: 'author-1', name: 'Jane Cooper', avatarLabel: 'JC', role: 'Admin' },
  date: 'Aug 2, 2026',
  edited: true,
  pinned: true,
  tags: [
    { id: 't1', label: 'performance' },
    { id: 't2', label: 'webpack' },
  ],
  excerpt: 'A breakdown of the exact steps we took to shrink our production bundle...',
  expandedContent: {
    coverImageUrl: 'placeholder',
    keyTopics: ['Code splitting', 'Tree shaking', 'Dynamic imports'],
  },
  stats: { likes: 342, commentCount: mockPostComments.length },
};

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <PostDetailShell
        groupName="Frontend Engineers"
        post={mockPost}
        comments={mockPostComments}
        currentUserAvatarLabel="YOU" // required by the prop type but unused — see note below
        postCount={24}
        followerCount="1.1k"
        relatedTopics={['performance', 'webpack', 'react']}
      />
    </div>
  );
}