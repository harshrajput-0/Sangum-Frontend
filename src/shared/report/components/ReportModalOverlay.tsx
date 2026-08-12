'use client';

import { useEffect } from 'react';
import { ReportModal, type ReportModalProps } from './ReportModal';

/**
 * Adds the backdrop, Escape-to-close, click-outside-to-close, and
 * body-scroll-lock around the presentational ReportModal — same
 * pattern as CreatePostModalShell, just scoped locally to whichever
 * card/comment opened it rather than mounted once globally.
 */
export function ReportModalOverlay(props: ReportModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) props.onCancel(); }}
    >
      <ReportModal {...props} />
    </div>
  );
}