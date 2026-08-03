interface TagChipProps {
  name: string;
  count: number | string;
  onClick?: () => void;
}

export function TagChip({ name, count, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-hover px-3.5 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-primary hover:text-text"
    >
      #{name}
      <span className="font-normal text-text-muted">{count}</span>
    </button>
  );
}