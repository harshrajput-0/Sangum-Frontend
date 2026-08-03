"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { CommunityLayoutShell, mockCommunity, communityTabs } from "@/features/communities/community";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  // TODO: Replace with Express API integration — GET /api/communities/:slug
  const community = mockCommunity;

  const lastSegment = pathname.split("/").pop();
  const activeTabId = lastSegment === slug ? "home" : lastSegment ?? "home";

  const handleTabChange = (tabId: string) => {
    router.push(tabId === "home" ? `/c/${slug}` : `/c/${slug}/${tabId}`);
  };

  const handleToggleJoin = () => {
    // TODO: Replace with Express API integration — POST /api/communities/:slug/join
  };

  return (
    <CommunityLayoutShell
      community={community}
      tabs={communityTabs}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
      onToggleJoin={handleToggleJoin}
    >
      {children}
    </CommunityLayoutShell>
  );
}