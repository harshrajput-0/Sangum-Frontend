import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Community } from '../../types/community.types';

export interface PostToCommunityPickerProps {
  communities: Community[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PostToCommunityPicker({ communities, selectedId, onSelect }: PostToCommunityPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = communities.find((c) => c.id === selectedId) ?? null;

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-text-muted">Post to</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left hover:bg-surface-hover ${
            selected ? 'border-border bg-surface' : 'border-dashed border-border-strong bg-bg-elevated'
          }`}
        >
          {selected ? (
            <span className="flex min-w-0 items-center gap-3">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-text-on-primary ${selected.colorToken ?? 'bg-neutral'}`}>
                {selected.initial ?? '?'}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-text">{selected.name}</span>
                <span className="block truncate text-xs text-text-muted">{selected.memberLabel}</span>
              </span>
            </span>
          ) : (
            <span className="text-sm text-text-muted">Choose a community to post to</span>
          )}
          <ChevronDown size={16} className="shrink-0 text-text-muted" />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1.5 flex max-h-56 flex-col gap-0.5 overflow-y-auto rounded-md border border-border bg-surface p-1.5 shadow-lg">
            {communities.map((community) => (
              <button
                key={community.id}
                type="button"
                onClick={() => { onSelect(community.id); setIsOpen(false); }}
                className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left hover:bg-surface-hover"
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-text-on-primary ${community.colorToken ?? 'bg-neutral'}`}>
                  {community.initial ?? '?'}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-text">{community.name}</span>
                  <span className="block truncate text-xs text-text-muted">{community.memberLabel}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}