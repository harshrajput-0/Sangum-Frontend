import type { ReactNode } from "react";
import { FileText, MessageSquare, Users } from "lucide-react";
import { SegmentedControl } from "../primitives/SegmentedControl";
import { CONTENT_TABS } from "../../constants/profile.constants";
import type { ContentTab } from "../../types/profile.types";

export interface ContentTabsProps {
  activeTab: ContentTab;
  onChange: (tab: ContentTab) => void;
  className?: string;
}

const TAB_ICONS: Record<ContentTab, ReactNode> = {
  posts: <FileText size={15} />,
  resources: <MessageSquare size={15} />,
  communities: <Users size={15} />,
};

export function ContentTabs({ activeTab, onChange, className = "" }: ContentTabsProps) {
  const options = CONTENT_TABS.map((tab) => ({
    ...tab,
    icon: TAB_ICONS[tab.value],
  }));

  return (
    <SegmentedControl
      options={options}
      value={activeTab}
      onChange={onChange}
      className={className}
    />
  );
}
