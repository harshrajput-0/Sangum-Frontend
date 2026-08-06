import { AlignLeft, ImageIcon, Video, FileText, BarChart3 } from 'lucide-react';
import type { PostType } from '../../types/post.types';

const TYPE_TILES: { type: PostType; label: string; icon: typeof AlignLeft }[] = [
  { type: 'text', label: 'Text', icon: AlignLeft },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'doc', label: 'Doc', icon: FileText },
  { type: 'poll', label: 'Poll', icon: BarChart3 },
];

export interface PostTypeSelectorProps {
  value: PostType;
  onChange: (type: PostType) => void;
}

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-muted">Post type</label>
      <div className="grid grid-cols-5 gap-2">
        {TYPE_TILES.map(({ type, label, icon: Icon }) => {
          const isActive = value === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center ${
                isActive ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:bg-surface-hover'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary-light' : 'text-text-muted'} />
              <span className={`text-xs ${isActive ? 'text-text' : 'text-text-muted'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}