import { useState } from 'react';
import { MoreVertical, Bookmark, Link2, Flag, Check, UserMinus, Plus } from 'lucide-react';
import { IconButton } from '../../../../shared/components/ui';
import { useTransientState } from '../../../../shared/hooks/useTransientState';

export interface PostFollowControlProps {
  isFollowed: boolean;
  isSaved: boolean;
  onToggleFollow: () => void;
  onToggleBookmark: () => void;
  onCopyLink: () => void;
  onReport: () => void;
}

/** Not-followed → a "+ Follow" pill. Followed → a ⋯ menu with Save / Copy link / Report / Unfollow. */
export function PostFollowControl({ isFollowed, isSaved, onToggleFollow, onToggleBookmark, onCopyLink, onReport }: PostFollowControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const copied = useTransientState(1600);
  const reported = useTransientState(700);

  if (!isFollowed) {
    return (
      <button
        type="button"
        onClick={onToggleFollow}
        className="flex shrink-0 items-center gap-1 rounded-full border border-primary px-3 py-1 text-xs font-medium text-primary-light hover:bg-primary/10"
      >
        <Plus size={12} strokeWidth={2.5} />
        Follow
      </button>
    );
  }

  const handleCopyLink = () => {
    onCopyLink();
    copied.activate();
  };

  const handleReport = () => {
    if (reported.isActive) return;
    onReport();
    reported.activate();
    setTimeout(() => setIsOpen(false), 700);
  };

  return (
    <div className="relative ml-auto shrink-0">
      <IconButton icon={<MoreVertical size={16} />} label="Following options" variant="ghost" size="sm" onClick={() => setIsOpen((v) => !v)} />
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1.5 flex min-w-[170px] flex-col gap-0.5 rounded-md border border-border bg-surface p-1.5 shadow-lg">
          <button
            type="button"
            onClick={onToggleBookmark}
            className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
          >
            <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
          >
            {copied.isActive ? <Check size={13} /> : <Link2 size={13} />}
            {copied.isActive ? 'Copied!' : 'Copy link to post'}
          </button>
          <button
            type="button"
            disabled={reported.isActive}
            onClick={handleReport}
            className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
          >
            {reported.isActive ? <Check size={13} /> : <Flag size={13} />}
            {reported.isActive ? 'Reported' : 'Report'}
          </button>
          <button
            type="button"
            onClick={() => { onToggleFollow(); setIsOpen(false); }}
            className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-danger hover:bg-danger/10"
          >
            <UserMinus size={13} /> Unfollow
          </button>
        </div>
      )}
    </div>
  );
}