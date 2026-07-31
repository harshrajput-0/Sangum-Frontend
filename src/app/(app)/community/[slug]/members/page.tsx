import { CommunityMembersShell, mockMembers } from "@/modules/communities/community-members";

export default function CommunityMembersPage() {
  // TODO: Replace with Express API integration — GET /api/communities/:slug/members
  return <CommunityMembersShell members={mockMembers} hasMore />;
}