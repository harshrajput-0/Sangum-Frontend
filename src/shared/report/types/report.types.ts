export type ReportEntityType = 'post' | 'comment'; // TODO(api): extend as more reportable entity types are added

export interface ReportReasonOption {
  id: string;
  label: string;
}

export interface SubmitReportPayload {
  entityType: ReportEntityType;
  entityId: string;
  reasonId: string;
  details?: string;
}

export interface SubmitReportResult {
  success: boolean;
}