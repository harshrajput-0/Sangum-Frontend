"use client"

import { useCallback, useState } from 'react';
import { OTHER_REASON_ID, REPORT_REASONS } from '../constants/reportReasons.constants';
import { submitReport } from '../services/report.service';
import type { ReportEntityType } from '../types/report.types';

export interface UseReportModalOptions {
  entityType: ReportEntityType;
  entityId: string;
  onSubmitted?: () => void;
}

/** Owns everything about one report flow, including open/closed — a consumer just calls report.open() and renders <ReportModalOverlay {...report} />. */
export function useReportModal({ entityType, entityId, onSubmitted }: UseReportModalOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);
  const [otherText, setOtherText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const open = useCallback(() => {
    setSelectedReasonId(null);
    setOtherText('');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const onSelectReason = useCallback((reasonId: string) => setSelectedReasonId(reasonId), []);
  const onOtherTextChange = useCallback((value: string) => setOtherText(value), []);

  const onSubmit = useCallback(async () => {
    if (!selectedReasonId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitReport({
        entityType,
        entityId,
        reasonId: selectedReasonId,
        details: selectedReasonId === OTHER_REASON_ID ? otherText : undefined,
      });
      setIsOpen(false);
      onSubmitted?.();
    } finally {
      setIsSubmitting(false);
    }
  }, [entityType, entityId, selectedReasonId, otherText, isSubmitting, onSubmitted]);

  return {
    isOpen,
    open,
    close,
    reasons: REPORT_REASONS,
    selectedReasonId,
    otherText,
    isSubmitDisabled: selectedReasonId === null || isSubmitting,
    isSubmitting,
    onSelectReason,
    onOtherTextChange,
    onSubmit,
  } as const;
}

export type UseReportModalReturn = ReturnType<typeof useReportModal>;