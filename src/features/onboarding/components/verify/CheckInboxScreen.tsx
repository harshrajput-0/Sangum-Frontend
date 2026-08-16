'use client';

import { Button } from '@/shared/components/ui';

interface CheckInboxScreenProps {
  secondsLeft: number;
  isResendActive: boolean;
  onResendClick: () => void;
  onSkipClick: () => void;
}

export function CheckInboxScreen({ secondsLeft, isResendActive, onResendClick, onSkipClick }: CheckInboxScreenProps) {
  return (
    <section className="text-center">
      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
        <span className="pulse-ring absolute inset-0 rounded-full bg-primary/20" />
        <span className="absolute inset-0 rounded-full border-2 border-primary/40 bg-primary/10" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="relative z-10 text-primary-light"
        >
          <rect x="2" y="4" width="20" height="14" rx="2" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </div>
      <h1 className="mb-1.5 text-2xl font-bold text-text">Check your inbox</h1>
      <p className="mb-6 text-sm text-text-secondary">We sent a verification link to your email.</p>

      <div className="mb-5 flex items-center justify-center gap-1.5 text-xs">
        <span className="text-text-muted">Didn&apos;t receive it?</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResendClick}
          disabled={isResendActive}
          className="px-0! py-0! h-auto underline-offset-2 hover:underline"
        >
          {isResendActive ? `Resend in ${secondsLeft}s` : 'Resend email'}
        </Button>
      </div>

      <Button variant="ghost" size="sm" onClick={onSkipClick} className="px-0! py-0! h-auto underline-offset-2 hover:underline">
        Skip for now
      </Button>
    </section>
  );
}
