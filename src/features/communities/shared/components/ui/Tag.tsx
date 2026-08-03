interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="rounded-full bg-neutral-bg px-2.5 py-1 text-xs text-text-secondary">
      {label}
    </span>
  );
}