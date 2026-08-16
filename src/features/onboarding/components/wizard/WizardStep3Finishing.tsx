'use client';

import type { WizardSubmitPhase } from '../../types/onboarding.types';

interface WizardStep3FinishingProps {
  phase: WizardSubmitPhase;
}

// One step, two internal states — "finishing up" and "you're done" are
// the same beat, not two separate screens. onboarding.styles.css
// (feature-local, kept out of global.css deliberately — see prior
// discussion) supplies pulse-ring / animate-welcome-in keyframes.
export function WizardStep3Finishing({ phase }: WizardStep3FinishingProps) {
  if (phase === 'success') {
    return (
      <section className="animate-welcome-in text-center">
        <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-success/40 bg-success-bg text-success">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mb-1.5 text-2xl font-bold text-text">Welcome to Sangum!</h1>
        <p className="text-sm text-text-secondary">Your profile is ready to go.</p>
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-text-muted">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-border border-t-primary-light" />
          <span>Taking you to your feed…</span>
        </div>
      </section>
    );
  }

  // 'submitting' — this is where the real submitOnboarding() request is
  // in flight. No fixed timer here; phase flips to 'success' only once
  // the response actually resolves (see useOnboardingWizard.finish()).
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-border border-t-primary" />
      <span className="text-sm text-text-muted">Setting up your profile…</span>
    </section>
  );
}
