// src/app/posts/create/page.tsx
import { CreatePostShell } from '@/features/posts';
import type { PostGroup } from '@/features/posts';

// TODO: replace with the user's actual active group,
// e.g. fetched server-side or read from a groups store/service.
const mockGroup: PostGroup = {
  id: 'group-1',
  name: 'Frontend Engineers',
  avatarLabel: 'FE',
  visibility: 'Public',
  memberCount: '4.2k',
};

export default function CreatePostPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <CreatePostShell group={mockGroup} />
    </div>
  );
}