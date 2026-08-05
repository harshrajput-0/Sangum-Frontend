import { useState } from "react";
import type { ContentTab } from "../../types/profile.types";

export interface UseContentTabsResult {
  activeTab: ContentTab;
  setActiveTab: (tab: ContentTab) => void;
}

export function useContentTabs(
  initialTab: ContentTab = "posts",
): UseContentTabsResult {
  const [activeTab, setActiveTab] = useState<ContentTab>(initialTab);
  return { activeTab, setActiveTab };
}
