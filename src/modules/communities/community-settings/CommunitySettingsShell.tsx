"use client";

import { useState } from "react";
import { SettingsNav } from "./components/SettingsNav";
import { GeneralInfoForm } from "./components/GeneralInfoForm";
import { AvatarBannerUploader } from "./components/AvatarBannerUploader";
import { VisibilityTypeSelector } from "./components/VisibilityTypeSelector";
import { DangerZoneCard } from "./components/DangerZoneCard";
import { SettingsSection, GeneralInfo, VisibilityOption } from "./types";

interface CommunitySettingsShellProps {
  sections: SettingsSection[];
  initialGeneralInfo: GeneralInfo;
  visibilityOptions: VisibilityOption[];
  initialVisibilityId: string;
  avatarLabel: string;
  avatarImageUrl?: string;
  onSaveChanges?: (info: GeneralInfo, visibilityId: string) => void;
  onCancel?: () => void;
  onDeleteCommunity?: () => void;
}

export function CommunitySettingsShell({
  sections,
  initialGeneralInfo,
  visibilityOptions,
  initialVisibilityId,
  avatarLabel,
  avatarImageUrl,
  onSaveChanges,
  onCancel,
  onDeleteCommunity,
}: CommunitySettingsShellProps) {
  // Local visual/form state only — persistence wires up at integration time.
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "general");
  const [generalInfo, setGeneralInfo] = useState(initialGeneralInfo);
  const [selectedVisibilityId, setSelectedVisibilityId] = useState(initialVisibilityId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[180px_1fr]">
      <SettingsNav
        sections={sections}
        activeSectionId={activeSectionId}
        onSectionChange={setActiveSectionId}
      />

      {/* Only "General" has designed content today; other sections render here once designed */}
      <div className="space-y-5">
        <GeneralInfoForm value={generalInfo} onChange={setGeneralInfo} />
        <AvatarBannerUploader avatarLabel={avatarLabel} avatarImageUrl={avatarImageUrl} />
        <VisibilityTypeSelector
          options={visibilityOptions}
          selectedId={selectedVisibilityId}
          onSelect={setSelectedVisibilityId}
        />
        <DangerZoneCard onDelete={() => onDeleteCommunity?.()} />

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border-strong px-4 py-2 text-sm font-medium text-text hover:bg-surface-hover"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSaveChanges?.(generalInfo, selectedVisibilityId)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-on-primary hover:bg-primary-hover"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}