import { Check } from 'lucide-react';

interface ChecklistItemProps {
  label: string;
}

export function ChecklistItem({ label }: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
        <Check size={11} strokeWidth={3} />
      </span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}