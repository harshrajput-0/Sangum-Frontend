import type { SubmitReportPayload, SubmitReportResult } from '../types/report.types';

/**
 * TODO(api): swap for a real POST /api/reports endpoint once the
 * backend exists (payload already carries entityType/entityId so one
 * endpoint can cover posts, comments, and future reportable entities).
 * Mocked here with a small artificial delay so the flow is fully
 * demoable today.
 */
export async function submitReport(payload: SubmitReportPayload): Promise<SubmitReportResult> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!payload.reasonId) {
    throw new Error('A report reason is required');
  }

  return { success: true };
}