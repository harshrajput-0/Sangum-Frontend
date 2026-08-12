import { X } from 'lucide-react';
import { IconButton } from '../../../../shared/components/ui';

export interface CreatePostHeaderProps {
  title: string;
  onClose: () => void;
}

export function CreatePostHeader({ title, onClose }: CreatePostHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <h2 className="font-heading text-lg font-bold text-text">{title}</h2>
      <IconButton icon={<X size={16} />} label="Close" variant="ghost" size="sm" onClick={onClose} />
    </div>
  );
}