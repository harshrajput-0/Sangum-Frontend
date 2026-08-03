import { LucideIcon } from "lucide-react";

export interface AboutStat {
  icon: LucideIcon;
  label: string;
  value: string;
}

export interface AboutRule {
  title: string;
  description: string;
}

export interface TopTopic {
  label: string;
  postCountLabel: string;
}

export interface AdminMember {
  id: string;
  name: string;
  avatarLabel: string;
  avatarImageUrl?: string;
}

export interface CommunityAboutInfo {
  description: string;
  stats: AboutStat[];
}