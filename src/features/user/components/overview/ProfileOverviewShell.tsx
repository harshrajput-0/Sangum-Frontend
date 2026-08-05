"use client";

import { useContentTabs } from "../../hooks/overview/useContentTabs";
import { useProfileActionState } from "../../hooks/overview/useProfileActionState";
import { useProfileContent } from "../../hooks/overview/useProfileContent";
import { useProfileData } from "../../hooks/overview/useProfileData";
import { ContentTabs } from "./ContentTabs";
import { IdentityCard } from "./IdentityCard";
import { StatsGrid } from "./StatsGrid";
import { CommunitiesPanel } from "./panels/CommunitiesPanel";
import { PostsPanel } from "./panels/PostsPanel";
import { ResourcesPanel } from "./panels/ResourcesPanel";
import { RightRail } from "./right-rail/RightRail";

export interface ProfileOverviewShellProps {
  username: string;
  onEditProfile: () => void;
}

export function ProfileOverviewShell({
  username,
  onEditProfile,
}: ProfileOverviewShellProps) {
  const { profile, isLoading, error } = useProfileData(username);
  const {
    posts,
    resources,
    communities,
    isLoading: isContentLoading,
  } = useProfileContent(username);
  const { activeTab, setActiveTab } = useContentTabs();

  const actionState = useProfileActionState(
    profile?.id ?? "",
    profile?.connectionStatus ?? "not_connected",
  );

  if (isLoading || !profile) {
    return <p className="text-sm text-text-muted">Loading profile…</p>;
  }
  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-4">
        <IdentityCard
          profile={profile}
          connectionStatus={actionState.status}
          isMenuOpen={actionState.isMenuOpen}
          isActionBusy={actionState.isBusy}
          menuRef={actionState.menuRef}
          onToggleMenu={actionState.toggleMenu}
          onConnect={actionState.connect}
          onCancelRequest={actionState.cancelRequest}
          onAccept={actionState.accept}
          onDecline={actionState.decline}
          onRemove={actionState.remove}
          onBlock={actionState.block}
          onReport={() => actionState.report()}
          onEditProfile={onEditProfile}
        />

        {/* Mobile stats strip — the desktop version lives in RightRail */}
        <StatsGrid stats={profile.stats} className="lg:hidden" />

        <div className="flex flex-col gap-4">
          <ContentTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === "posts" && (
            <PostsPanel posts={posts} isLoading={isContentLoading} />
          )}
          {activeTab === "resources" && (
            <ResourcesPanel resources={resources} isLoading={isContentLoading} />
          )}
          {activeTab === "communities" && (
            <CommunitiesPanel communities={communities} isLoading={isContentLoading} />
          )}
        </div>
      </div>

      <RightRail profile={profile} communities={communities} />
    </div>
  );
}
