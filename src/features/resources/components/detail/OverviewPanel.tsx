import { ChecklistItem } from './ChecklistItem';

interface OverviewPanelProps {
  description: string;
  learnPoints: string[];
}

export function OverviewPanel({ description, learnPoints }: OverviewPanelProps) {
  return (
    <div className="rounded-sm border border-border/60 bg-bg-elevated p-4 sm:p-5">
      <p className="mb-2.5 text-sm font-semibold text-text">About this resource</p>
      <p className="mb-5 text-sm leading-relaxed text-text-secondary">{description}</p>
      <p className="mb-2.5 text-sm font-semibold text-text">What you&apos;ll learn</p>
      <div className="space-y-2">
        {learnPoints.map((point) => (
          <ChecklistItem key={point} label={point} />
        ))}
      </div>
    </div>
  );
}