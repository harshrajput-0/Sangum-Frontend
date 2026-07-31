"use client";

export type FeedSort = "latest" | "top" | "unanswered";

interface FeedTabsProps {
  activeSort: FeedSort;
  onSortChange: (sort: FeedSort) => void;
}

const sortOptions: { id: FeedSort; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "top", label: "Top" },
  { id: "unanswered", label: "Unanswered" },
];

export function FeedTabs({ activeSort, onSortChange }: FeedTabsProps) {
  return (
    <div className="mb-4 flex gap-5 border-b border-border text-sm">
      {sortOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSortChange(option.id)}
          className={[
            "border-b-2 pb-2.5 transition-colors",
            option.id === activeSort
              ? "border-primary font-medium text-text"
              : "border-transparent text-text-muted hover:text-text",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
      <span className="ml-auto flex items-center gap-1.5 border-b-2 border-transparent pb-2.5 text-text-disabled">
        Discussions
        <span className="rounded-full bg-neutral-bg px-1.5 py-0.5 text-[10px]">Soon</span>
      </span>
    </div>
  );
}