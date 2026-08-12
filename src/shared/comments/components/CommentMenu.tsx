import { useState } from 'react';
import { MoreVertical, Pencil, Trash2, Flag } from 'lucide-react';
import { IconButton } from '../../components/ui';
import { ReportModalOverlay, type UseReportModalReturn } from '../../report';

export interface CommentMenuProps {
  isOwn: boolean;
  onEdit: () => void;
  onDelete: () => void;
  report: UseReportModalReturn;
}

export function CommentMenu({ isOwn, onEdit, onDelete, report }: CommentMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReportClick = () => {
    setIsOpen(false);
    report.open();
  };

  return (
    <div className="relative ml-auto">
      <IconButton icon={<MoreVertical size={15} />} label="Comment options" variant="ghost" size="xs" onClick={() => setIsOpen((v) => !v)} />
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1.5 flex min-w-35 flex-col gap-0.5 rounded-md border border-border bg-surface p-1.5 shadow-lg">
          {isOwn ? (
            <>
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
            </>
          ) : (
            <button
              type="button"
              onClick={handleReportClick}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text"
            >
              <Flag size={13} /> Report
            </button>
          )}
        </div>
      )}

      {report.isOpen && (
        <ReportModalOverlay
          title="Report this comment"
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