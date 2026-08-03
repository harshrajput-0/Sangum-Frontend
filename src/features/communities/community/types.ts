export interface CommunitySummary {
  name: string;
  avatarLabel: string;
  avatarImageUrl?: string;
  isVerified?: boolean;
  memberCountLabel: string;
  onlineCountLabel?: string;
  isJoined: boolean;
}

export interface CommunityTab {
  id: string;
  label: string;
}