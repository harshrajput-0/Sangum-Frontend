import type { WizardStep } from '../../types/onboarding.types';

interface WizardStepIndicatorProps {
  step: WizardStep;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// 3 steps: 1 identity, 2 avatar, 3 finishing (loading + success message).
export function WizardStepIndicator({ step }: WizardStepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center">
      <StepCircle state={circleState(1, step)} number={1} />
      <Connector filled={step > 1} />
      <StepCircle state={circleState(2, step)} number={2} />
      <Connector filled={step > 2} />
      <StepCircle state={circleState(3, step)} number={3} />
    </div>
  );
}

function circleState(circleNumber: number, activeStep: WizardStep): 'upcoming' | 'current' | 'completed' {
  if (activeStep === circleNumber) return 'current';
  if (activeStep > circleNumber) return 'completed';
  return 'upcoming';
}

function Connector({ filled }: { filled: boolean }) {
  return (
    <div
      className={`mx-2 h-0.5 flex-1 rounded-full transition-colors duration-200 ${
        filled ? 'bg-primary' : 'bg-border'
      }`}
    />
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
