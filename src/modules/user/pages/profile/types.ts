// modules/profile/components/types.ts

export interface ProfileData {
  displayName: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  verified?: boolean;
  /** e.g. "Developer" — shown as a subtle badge next to the handle */
  roleLabel?: string;
  bio?: string;
  location?: string;
  website?: { label: string; url: string };
  /** e.g. "Joined May 2021" */
  joinedLabel: string;
  stats: {
    posts: number;
    comments: number;
    followers: number;
    following: number;
  };
}

export type ProfileTab = "posts" | "comments" | "resources" | "communities";
