"use client";

import { CommunityTab } from "../types";

interface CommunityTabsProps {
  tabs: CommunityTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

export function CommunityTabs({ tabs, activeTabId, onTabChange }: CommunityTabsProps) {
  return (
    <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 pb-0 sm:px-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={[
            "shrink-0 border-b-2 pb-2.5 text-sm transition-colors",
            tab.id === activeTabId
              ? "border-primary font-medium text-text"
              : "border-transparent text-text-muted hover:text-text",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}