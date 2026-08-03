interface DividerProps {
  label?: string;
  spacingClassName?: string;
}

export function Divider({ label = "or continue with", spacingClassName = "mb-4" }: DividerProps) {
  return (
    <div className={`flex items-center gap-3 ${spacingClassName}`}>
      <hr className="flex-1 border-border" />
      <span className="text-[11px] text-text-muted">{label}</span>
      <hr className="flex-1 border-border" />
    </div>
  );
}