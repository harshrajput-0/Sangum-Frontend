export interface CategoryOption {
  id: string;
  label: string;
}

export interface CommunitySummaryCard {
  id: string;
  name: string;
  avatarLabel: string;
  avatarImageUrl?: string;
  isVerified?: boolean;
  description: string;
  memberCountLabel: string;
  isJoined: boolean;
  bannerGradientClassName?: string;
}