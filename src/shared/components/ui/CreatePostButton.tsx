// Trigger Create Post Model/Page
import { Plus } from 'lucide-react';
import { IconButton } from '@/shared/components/ui';
import { useCreatePostTrigger } from '@/features/posts/hooks/useCreatePostTrigger';

export function CreatePostButton() {
  const { openCreatePost } = useCreatePostTrigger();
  return <IconButton icon={<Plus size={18} />} label="Create post" onClick={openCreatePost} />;
}