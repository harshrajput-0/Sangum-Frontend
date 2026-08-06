// ============================================================
// Profile feature — shared type definitions
// ============================================================

/* ---------------- View / navigation state ---------------- */

export type ActiveView = "overview" | "edit" | "settings";

export type ContentTab = "posts" | "resources" | "communities";

/* ---------------- Connection / relationship ---------------- */

/**
 * Drives which action(s) render in the profile header action area.
 * "own" = viewing your own profile (Edit profile button).
 * Real value comes from the API (see useProfileData) — never user-toggled.
 */
export type ConnectionStatus =
  | "own"
  | "not_connected"
  | "pending"
  | "received"
  | "connected";

/* ---------------- Profile domain data ---------------- */

export interface SocialLinks {
  website?: string;
  github?: string;
  twitter?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
}

export interface ProfileStats {
  posts: number;
  comments: number;
  followers: number;
  following: number;
}

export type ExperienceLevel =
  | "student"
  | "junior"
  | "mid"
  | "senior"
  | "lead";

export type AvailabilityOption =
  | "open_to_work"
  | "open_to_freelance"
  | "not_looking";

export interface ProfileData {
  id: string;
  username: string;
  fullName: string;
  verified: boolean;
  avatarUrl?: string;
  coverUrl?: string;
  /** Small tag shown next to the username, e.g. "Developer". Optional/loose on purpose. */
  roleBadge?: string;
  headline: string;
  bio: string;
  location?: string;
  joinedAt: string; // ISO date string
  professionalTitle?: string;
  company?: string;
  experienceLevel?: ExperienceLevel;
  availability?: AvailabilityOption;
  socialLinks: SocialLinks;
  stats: ProfileStats;
  connectionStatus: ConnectionStatus;
}

/* ---------------- Profile content (tabs) ---------------- */

export interface PostReactions {
  likes: number;
  comments: number;
  shares: number;
}

export interface PostSummary {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  createdAtLabel: string; // e.g. "2h ago"
  body: string;
  reactions: PostReactions;
}

export interface ResourceItem {
  id: string;
  title: string;
  sourceLabel: string; // e.g. "Saved from dev.to · 3 days ago"
  url?: string;
}

export interface CommunitySummary {
  id: string;
  name: string;
  memberCountLabel: string; // e.g. "12.4K members"
  avatarInitials: string;
  avatarColorToken: string; // maps to a CSS color variable, e.g. "success"
}

/* ---------------- Account settings domain ---------------- */

export type VisibilityOption = "public" | "community_only" | "private";

export type MessagingOption = "everyone" | "followers" | "no_one";

export interface SessionInfo {
  id: string;
  deviceLabel: string;
  locationLabel: string;
  lastActiveLabel: string;
  isCurrentDevice: boolean;
}

export type ConnectedProviderId = "google" | "github" | "linkedin";

export interface ConnectedProvider {
  id: ConnectedProviderId;
  label: string;
  connected: boolean;
}

export type DeactivateOption = "temporary" | "permanent";

/* ---------------- Form data shapes ---------------- */

export interface EditProfileFormData {
  fullName: string;
  email: string;
  username: string;
  location: string;
  headline: string;
  bio: string;
  jobTitle: string;
  company: string;
  /** Loose string, not the ExperienceLevel union — keeps this form payload
   *  decoupled from whatever exact value set the Express backend ends up using. */
  experienceLevel: string;
  /** Loose string, not the AvailabilityOption union — same reasoning. */
  availability: string;
  links: SocialLinks;
}

export interface AccountInfoFormData {
  fullName: string;
  username: string;
}

export interface ChangeEmailFormData {
  newEmail: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeactivateAccountFormData {
  option: DeactivateOption;
  reason?: string;
  confirmChecked: boolean;
}

/* ---------------- Generic field-error map (used with Zod .safeParse) ---------------- */

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
