import { CommunitySummary, CommunityTab } from "./types";

// TODO: Replace with Express API integration — GET /api/communities/:slug
export const mockCommunity: CommunitySummary = {
  name: "MERN Developers",
  avatarLabel: "N",
  isVerified: true,
  memberCountLabel: "24.8K members",
  onlineCountLabel: "256 online",
  isJoined: true,
};

export const communityTabs: CommunityTab[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "members", label: "Members" },
  { id: "resources", label: "Resources" },
  { id: "settings", label: "Settings" },
];