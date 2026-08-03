type DetailTab = 'overview' | 'comments' | 'related';

interface ResourceTabsProps {
  activeTab: DetailTab;
  onChange: (tab: DetailTab) => void;
  commentCount: number;
}

export function ResourceTabs({ activeTab, onChange, commentCount }: ResourceTabsProps) {
  const tabs: { id: DetailTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'comments', label: 'Comments', count: commentCount },
    { id: 'related', label: 'Related' },
  ];

  return (
    <div className="mb-5 flex gap-5 overflow-x-auto border-b border-border no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`shrink-0 border-b-2 pb-2.5 text-sm transition-colors ${
            activeTab === tab.id ? 'border-primary font-medium text-text' : 'border-transparent text-text-muted hover:text-text'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && <span className="ml-1.5 rounded-full bg-neutral-bg px-1.5 py-0.5 text-[10px]">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}