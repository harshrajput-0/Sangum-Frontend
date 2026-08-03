import { CommunityHomeShell, mockPosts, mockAboutSummary } from "@/features/communities/community-home";

export default function CommunityHomePage() {
  // TODO: Replace with Express API integration — GET /api/communities/:slug/posts
  return (
    <CommunityHomeShell
      posts={mockPosts}
      aboutSummary={mockAboutSummary}
      currentUserAvatarLabel="AV"
    />
  );
}