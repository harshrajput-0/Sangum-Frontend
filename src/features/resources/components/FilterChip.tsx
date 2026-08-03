interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-primary text-text-on-primary'
          : 'border border-border bg-surface text-text-secondary hover:bg-surface-hover'
      }`}
    >
      {label}
    </button>
  );
}