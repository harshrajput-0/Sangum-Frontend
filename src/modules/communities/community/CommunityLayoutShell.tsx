import { ReactNode } from "react";
import { Card } from "../shared/components/ui";
import { CommunityHeader } from "./components/CommunityHeader";
import { CommunityTabs } from "./components/CommunityTabs";
import { CommunitySummary, CommunityTab } from "./types";

interface CommunityLayoutShellProps {
  community: CommunitySummary;
  tabs: CommunityTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  onToggleJoin: () => void;
  children: ReactNode;
}

export function CommunityLayoutShell({
  community,
  tabs,
  activeTabId,
  onTabChange,
  onToggleJoin,
  children,
}: CommunityLayoutShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Card  className="mb-5 overflow-hidden">
        <CommunityHeader community={community} onToggleJoin={onToggleJoin} />
        <CommunityTabs tabs={tabs} activeTabId={activeTabId} onTabChange={onTabChange} />
      </Card>
      {children}
    </div>
  );
}