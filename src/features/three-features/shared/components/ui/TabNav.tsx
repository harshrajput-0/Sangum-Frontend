export interface TabNavItem {
  key: string;
  label: string;
  count?: number | string;
}

interface TabNavProps {
  tabs: TabNavItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function TabNav({ tabs, activeKey, onChange, className = '' }: TabNavProps) {
  return (
    <div role="tablist" className={`flex gap-5 border-b border-border ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`-mb-px border-b-2 px-0.5 py-3 text-sm font-medium transition-colors ${
              isActive
                ? 'border-primary text-text font-semibold'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 font-normal text-text-muted">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}