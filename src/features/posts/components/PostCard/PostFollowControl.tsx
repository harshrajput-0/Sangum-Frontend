import { useState } from 'react';
import { MoreVertical, Bookmark, Link2, Flag, Check, UserMinus, Plus } from 'lucide-react';
import { IconButton } from '../../../../shared/components/ui';
import { useTransientState } from '../../../../shared/hooks/useTransientState';
import { ReportModalOverlay, type UseReportModalReturn } from '../../../../shared/report';

export interface PostFollowControlProps {
  isFollowed: boolean;
  isSaved: boolean;
  onToggleFollow: () => void;
  onToggleBookmark: () => void;
  onCopyLink: () => void;
  report: UseReportModalReturn;
}

/**
 * The ⋯ menu (Save / Copy link / Report [/ Unfollow]) is ALWAYS
 * available, regardless of follow state, so a post from someone you
 * don't follow can still be reported. The "+ Follow" pill sits
 * alongside it and only shows while not yet following — once
 * followed, "Unfollow" lives inside the menu instead of a second pill.
 */
export function PostFollowControl({ isFollowed, isSaved, onToggleFollow, onToggleBookmark, onCopyLink, report }: PostFollowControlProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const copied = useTransientState(1600);

  const handleCopyLink = () => {
    onCopyLink();
    copied.activate();
  };

  const handleReportClick = () => {
    setIsMenuOpen(false);
    report.open();
  };

  return (
    <div className="ml-auto flex shrink-0 items-center gap-2">
      {!isFollowed && (
        <button
          type="button"
          onClick={onToggleFollow}
          className="flex items-center gap-1 rounded-full border border-primary px-3 py-1 text-xs font-medium text-primary-light hover:bg-primary/10"
        >
          <Plus size={12} strokeWidth={2.5} />
          Follow
        </button>
      )}

      <div className="relative">
        <IconButton icon={<MoreVertical size={16} />} label="Post options" variant="ghost" size="sm" onClick={() => setIsMenuOpen((v) => !v)} />
        {isMenuOpen && (
          <div className="absolute right-0 top-full z-20 mt-1.5 flex min-w-[170px] flex-col gap-0.5 rounded-md border border-border bg-surface p-1.5 shadow-lg">
            <button
              type="button"
              onClick={onToggleBookmark}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              {copied.isActive ? <Check size={13} /> : <Link2 size={13} />}
              {copied.isActive ? 'Copied!' : 'Copy link to post'}
            </button>
            <button
              type="button"
              onClick={handleReportClick}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              <Flag size={13} />
              Report
            </button>
            {isFollowed && (
              <button
                type="button"
                onClick={() => { onToggleFollow(); setIsMenuOpen(false); }}
                className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-danger hover:bg-danger/10"
              >
                <UserMinus size={13} /> Unfollow
              </button>
            )}
          </div>
        )}
      </div>

      {report.isOpen && (
        <ReportModalOverlay
          reasons={report.reasons}
          selectedReasonId={report.selectedReasonId}
          otherText={report.otherText}
          isSubmitDisabled={report.isSubmitDisabled}
          isSubmitting={report.isSubmitting}
          onSelectReason={report.onSelectReason}
          onOtherTextChange={report.onOtherTextChange}
          onCancel={report.close}
          onSubmit={report.onSubmit}
        />
      )}
    </div>
  );
}