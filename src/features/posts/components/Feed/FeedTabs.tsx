import type { FeedTab } from '../../services/posts.service';

const TABS: { id: FeedTab; label: string }[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'top', label: 'Top' },
  { id: 'following', label: 'Following' },
];

export interface FeedTabsProps {
  activeTab: FeedTab;
  onChange: (tab: FeedTab) => void;
}

export function FeedTabs({ activeTab, onChange }: FeedTabsProps) {
  return (
    <div className="mb-4 flex gap-5 border-b border-border text-sm">
      {TABS.map(({ id, label }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`border-b-2 pb-2.5 ${isActive ? 'border-primary font-medium text-text' : 'border-transparent text-text-muted hover:text-text'}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}