// src/features/posts/components/primitives/TagPill.tsx

interface TagPillProps {
  label: string;
}

/** Presentational pill for a single tag/topic. */
export function TagPill({ label }: TagPillProps) {
  return (
    <span className="rounded-full bg-neutral-bg px-2.5 py-1 text-xs text-text-secondary">
      {label}
    </span>
  );
}