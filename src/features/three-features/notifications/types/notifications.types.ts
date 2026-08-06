// Notification Menu Dara
export interface NotificationItemData {
  id: string;
  /** Bold-rendered actor name, e.g. "Priya Patel". Omit for actor-less notifications. */
  actorName?: string;
  /** Rest of the sentence after the (optional) bold actor name. */
  message: string;
  timeAgo: string;
  avatarInitials: string;
  /** Any valid CSS color value, e.g. "var(--primary)". */
  avatarColor: string;
  isRead: boolean;
}