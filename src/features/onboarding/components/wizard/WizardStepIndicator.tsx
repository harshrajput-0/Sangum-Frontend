interface WizardStepIndicatorProps {
  step: 1 | 2;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function WizardStepIndicator({ step }: WizardStepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center">
      <StepCircle state={step === 1 ? 'current' : 'completed'} number={1} />
      <div
        className={`mx-2 h-0.5 flex-1 rounded-full transition-colors duration-200 ${
          step === 1 ? 'bg-border' : 'bg-primary'
        }`}
      />
      <StepCircle state={step === 1 ? 'upcoming' : 'current'} number={2} />
    </div>
  );
}

function StepCircle({ state, number }: { state: 'upcoming' | 'current' | 'completed'; number: number }) {
  const base = 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200';

  if (state === 'upcoming') {
    return <div className={`${base} border border-border bg-surface text-text-muted`}>{number}</div>;
  }
  if (state === 'current') {
    return <div className={`${base} bg-primary text-text-on-primary`}>{number}</div>;
  }
  return (
    <div className={`${base} bg-primary text-text-on-primary`}>
      <CheckIcon />
    </div>
  );
}
