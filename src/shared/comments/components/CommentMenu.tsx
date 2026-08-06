import { useState } from 'react';
import { MoreVertical, Pencil, Trash2, Flag, Check } from 'lucide-react';
import { IconButton } from '../../components/ui';
import { useTransientState } from '../../hooks/useTransientState';

export interface CommentMenuProps {
  isOwn: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
}

export function CommentMenu({ isOwn, onEdit, onDelete, onReport }: CommentMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reported = useTransientState(700);

  const handleReport = () => {
    if (reported.isActive) return;
    onReport();
    reported.activate();
    setTimeout(() => setIsOpen(false), 700);
  };

  return (
    <div className="relative ml-auto">
      <IconButton
        icon={<MoreVertical size={15} />}
        label="Comment options"
        variant="ghost"
        size="xs"
        onClick={() => setIsOpen((v) => !v)}
      />
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1.5 flex min-w-[140px] flex-col gap-0.5 rounded-md border border-border bg-surface p-1.5 shadow-lg">
          {isOwn ? (
            <>
              <button
                type="button"
                onClick={() => { onEdit(); setIsOpen(false); }}
                className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
              >
                <Pencil size={13} /> Edit
              </button>
              <button
                type="button"
                onClick={() => { onDelete(); setIsOpen(false); }}
                className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-danger hover:bg-danger/10"
              >
                <Trash2 size={13} /> Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={reported.isActive}
              onClick={handleReport}
              className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              {reported.isActive ? <Check size={13} /> : <Flag size={13} />}
              {reported.isActive ? 'Reported' : 'Report'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}