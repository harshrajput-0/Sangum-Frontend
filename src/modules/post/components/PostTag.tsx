// modules/posts/components/PostTag.tsx

import { cn } from "@/shared/utils/cn";

export interface PostTagProps {
  /** With or without a leading "#" — normalized automatically. */
  label: string;
  onClick?: (label: string) => void;
  className?: string;
}

/** Small hashtag chip shown under post content. Reusable in tag pickers, filters, or trending-tags lists. */
export function PostTag({ label, onClick, className }: PostTagProps) {
  const text = label.startsWith("#") ? label : `#${label}`;
  const classes = cn(
    "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[length:var(--fs-xs)] font-medium text-[var(--text-secondary)] transition-colors duration-150",
    onClick && "cursor-pointer hover:border-[var(--primary)] hover:text-[var(--primary-light)]",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          // A tag click means "filter by this tag", not "open this post" —
          // stop it from bubbling into a parent PostCard's click-to-navigate.
          e.stopPropagation();
          onClick(label);
        }}
        className={classes}
      >
        {text}
      </button>
    );
  }

  return <span className={classes}>{text}</span>;
}
