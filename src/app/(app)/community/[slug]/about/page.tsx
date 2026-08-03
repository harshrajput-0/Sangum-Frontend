import {
  CommunityAboutShell,
  mockAboutInfo,
  mockRules,
  mockTopTopics,
  mockAdmins,
} from "@/features/communities/community-about"

export default function CommunityAboutPage() {
  // TODO: Replace with Express API integration — GET /api/communities/:slug/about
  return (
    <CommunityAboutShell
      aboutInfo={mockAboutInfo}
      rules={mockRules}
      topTopics={mockTopTopics}
      admins={mockAdmins}
    />
  );
}