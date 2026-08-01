/**
 * Domain types for conversations in the Messages feature.
 * Kept intentionally loose (optional-friendly) per project conventions —
 * strengthen once the feature and its backing API stabilize.
 */

export type ConversationType = "dm" | "group";

/**
 * Named color keys, not raw hex/CSS values. Presentation components map
 * these to literal Tailwind classes (see components/common/Avatar.tsx) so
 * Tailwind's compiler can statically discover every class name used.
 */
export type AvatarColorKey =
  | "primary"
  | "primary-light"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type LastMessagePreviewIcon = "read" | "muted" | null;

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  avatarInitials: string;
  avatarColor: AvatarColorKey;
  /** Circle for DMs, rounded-square for groups — matches the approved design. */
  avatarRounded: boolean;
  isOnline: boolean;
  isMuted: boolean;
  isBlocked: boolean;
  isTyping: boolean;
  /** ISO timestamp — source of truth for sorting and time-label formatting. */
  lastMessageAt: string;
  lastMessagePreview: string;
  lastMessagePreviewIcon: LastMessagePreviewIcon;
  unreadCount: number;
}

export type ConversationFilter = "all" | "unread" | "groups";