// src/features/posts/components/create-post/PostTypeSelector.tsx
import { AlignLeft, Image, Video, Link2, LineChart } from 'lucide-react';
import { POST_TYPE_OPTIONS } from '../../constants';
import type { PostType } from '../../types';

const TYPE_ICONS: Record<PostType, typeof AlignLeft> = {
  text: AlignLeft,
  image: Image,
  video: Video,
  link: Link2,
  poll: LineChart,
};

interface PostTypeSelectorProps {
  selectedType: PostType;
  onSelectType: (type: PostType) => void;
}

/**
 * Post-type picker. Selection state is owned by the caller
 * (`usePostForm()`); this only renders options and reports clicks.
 */
export function PostTypeSelector({ selectedType, onSelectType }: PostTypeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {POST_TYPE_OPTIONS.map(({ id, label }) => {
        const Icon = TYPE_ICONS[id];
        const isSelected = id === selectedType;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectType(id)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-center ${
              isSelected ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:bg-surface-hover'
            }`}
          >
            <Icon size={20} className={isSelected ? 'text-primary-light' : 'text-text-muted'} />
            <span className={`text-xs ${isSelected ? 'text-text' : 'text-text-muted'}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}