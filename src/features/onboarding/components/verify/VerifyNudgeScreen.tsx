'use client';

import { Button } from '@/shared/components/ui';

interface VerifyNudgeScreenProps {
  isSending: boolean;
  error: string | null;
  onVerifyClick: () => void;
  onSkipClick: () => void;
}

export function VerifyNudgeScreen({ isSending, error, onVerifyClick, onSkipClick }: VerifyNudgeScreenProps) {
  return (
    <section className="animate-welcome-in text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10 text-primary-light">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="2" y="4" width="20" height="14" rx="2" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </div>
      <h1 className="mb-1.5 text-2xl font-bold text-text">Verify your email</h1>
      <p className="mb-6 text-sm text-text-secondary">
        Verify your email address to unlock all features on Sangum.
      </p>
      {error && <p className="mb-4 text-xs text-danger">{error}</p>}

      <div className="flex gap-2">
        <Button variant="outline" size="lg" fullWidth onClick={onSkipClick}>
          Later
        </Button>
        <Button variant="primary" size="lg" fullWidth onClick={onVerifyClick} disabled={isSending}>
          {isSending ? 'Sending…' : 'Verify'}
        </Button>
      </div>
      <p className="mt-4 text-xs text-text-muted">
        This&apos;ll show up again next time you sign in until it&apos;s verified.
      </p>
    </section>
  );
}
