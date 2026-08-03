interface DateDividerProps {
  label: string;
}

export function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="flex justify-center">
      <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold text-text-muted">
        {label}
      </span>
    </div>
  );
}