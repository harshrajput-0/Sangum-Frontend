import { Check } from 'lucide-react';

interface GuidelinesCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function GuidelinesCheckbox({ checked, onChange }: GuidelinesCheckboxProps) {
  return (
    <label className="mt-3.5 flex cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${
          checked ? 'bg-primary text-text-on-primary' : 'border border-border-strong text-transparent'
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </span>
      <span className="text-sm text-text-secondary">I agree to the community guidelines</span>
    </label>
  );
}