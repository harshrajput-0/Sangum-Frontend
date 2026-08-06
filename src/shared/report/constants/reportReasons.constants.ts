import type { ReportReasonOption } from '../types/report.types';

export const REPORT_REASONS: ReportReasonOption[] = [
  { id: 'spam', label: 'Spam or misleading' },
  { id: 'harassment', label: 'Harassment or bullying' },
  { id: 'hate', label: 'Hate speech' },
  { id: 'inappropriate', label: 'Inappropriate content' },
  { id: 'other', label: 'Other' },
];

// The one reason that reveals the free-text textarea.
export const OTHER_REASON_ID = 'other';