import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../shared/components/ui';

export interface PostOwnMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function PostOwnMenu({ onEdit, onDelete }: PostOwnMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-auto shrink-0">
      <IconButton icon={<MoreVertical size={16} />} label="Post options" variant="ghost" size="sm" onClick={() => setIsOpen((v) => !v)} />
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1.5 flex min-w-[140px] flex-col gap-0.5 rounded-md border border-border bg-surface p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => { onEdit(); setIsOpen(false); }}
            className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            type="button"
            onClick={() => { onDelete(); setIsOpen(false); }}
            className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-danger hover:bg-danger/10"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}