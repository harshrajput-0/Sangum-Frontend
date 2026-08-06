import { Flag } from 'lucide-react';
import type { ReportReasonOption } from '../types/report.types';
import { OTHER_REASON_ID } from '../constants/reportReasons.constants';
import { Button, Textarea } from '../../components/ui';

export interface ReportModalProps {
  title?: string;
  subtitle?: string;
  reasons: ReportReasonOption[];
  selectedReasonId: string | null;
  otherText: string;
  isSubmitDisabled: boolean;
  isSubmitting?: boolean;
  onSelectReason: (reasonId: string) => void;
  onOtherTextChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export function ReportModal({
  title = 'Report this post',
  subtitle = 'Your report is anonymous',
  reasons,
  selectedReasonId,
  otherText,
  isSubmitDisabled,
  isSubmitting,
  onSelectReason,
  onOtherTextChange,
  onCancel,
  onSubmit,
}: ReportModalProps) {
  const isOtherOpen = selectedReasonId === OTHER_REASON_ID;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="report-modal-title" className="w-[340px] rounded-lg border border-border bg-surface p-5 shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-danger/35 bg-danger-bg">
          <Flag className="h-5 w-5 text-danger" strokeWidth={2} />
        </div>
        <div>
          <p id="report-modal-title" className="m-0 mb-0.5 text-lg font-bold text-text">{title}</p>
          <p className="m-0 text-sm text-text-muted">{subtitle}</p>
        </div>
      </div>

      <p className="mb-3 mt-5 text-sm text-text-secondary">Why are you reporting this?</p>

      <div role="radiogroup" aria-label="Report reason">
        {reasons.map((reason) => {
          const isChecked = reason.id === selectedReasonId;
          return (
            <label key={reason.id} className="flex cursor-pointer items-center gap-3 py-2 text-sm text-text">
              <input
                type="radio"
                name="report-reason"
                value={reason.id}
                checked={isChecked}
                onChange={() => onSelectReason(reason.id)}
                className="sr-only"
              />
              <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 ${isChecked ? 'border-primary' : 'border-border-strong'}`}>
                {isChecked && <span className="h-2 w-2 rounded-full bg-primary" />}
              </span>
              {reason.label}
            </label>
          );
        })}
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity,margin-top] duration-200 ease-brand ${
          isOtherOpen ? 'mt-2 max-h-[120px] opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <Textarea
          value={otherText}
          onChange={(e) => onOtherTextChange(e.target.value)}
          placeholder="Tell us more about the issue…"
          resize="y"
          rows={3}
          className="min-h-[72px] text-sm"
        />
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" disabled={isSubmitDisabled} onClick={onSubmit}>
          {isSubmitting ? 'Submitting…' : 'Submit Report'}
        </Button>
      </div>
    </div>
  );
}