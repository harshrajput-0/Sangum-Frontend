import {
  CommunitySettingsShell,
  settingsSections,
  mockGeneralInfo,
  visibilityOptions,
} from "@/modules/communities/community-settings";

export default function CommunitySettingsPage() {
  // TODO: Replace with Express API integration — GET /api/communities/:slug/settings
  return (
    <CommunitySettingsShell
      sections={settingsSections}
      initialGeneralInfo={mockGeneralInfo}
      visibilityOptions={visibilityOptions}
      initialVisibilityId="public"
      avatarLabel="N"
    />
  );
}