'use client';

import { useEffect, useRef, useState } from 'react';
import { MoreVertical, Pencil, Trash2, Flag } from 'lucide-react';

interface CommentMenuProps {
  isOwn: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
}

export function CommentMenu({ isOwn, onEdit, onDelete, onReport }: CommentMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={wrapRef} className="relative ml-auto">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-6 w-6 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-hover hover:text-text ${open ? 'bg-surface-hover text-text' : ''}`}
      >
        <MoreVertical size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-1.5 min-w-[150px] rounded-md border border-border bg-surface p-1.5 shadow-lg">
          {isOwn ? (
            <>
              <button
                onClick={() => { setOpen(false); onEdit(); }}
                className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
              >
                <Pencil size={13} />
                Edit
              </button>
              <button
                onClick={() => { setOpen(false); onDelete(); }}
                className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-xs font-medium text-danger hover:bg-danger/10"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => { setOpen(false); onReport(); }}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              <Flag size={13} />
              Report
            </button>
          )}
        </div>
      )}
    </div>
  );
}