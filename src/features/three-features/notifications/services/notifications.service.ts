import type { NotificationItemData } from "../types/notifications.types";

const MOCK_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: "1",
    actorName: "Priya Patel",
    message: "mentioned you in a comment",
    timeAgo: "2m ago",
    avatarInitials: "PP",
    avatarColor: "var(--primary)",
    isRead: false,
  },
  {
    id: "2",
    message: "New reply to your post",
    timeAgo: "15m ago",
    avatarInitials: "J",
    avatarColor: "var(--info)",
    isRead: false,
  },
  {
    id: "3",
    actorName: "Arjun Sharma",
    message: "started following you",
    timeAgo: "1h ago",
    avatarInitials: "AS",
    avatarColor: "var(--success)",
    isRead: true,
  },
];

/**
 * Mock-backed for now — swap the body for a real API call without
 * touching any hook or component that calls this.
 */
export async function getRecentNotifications(limit = 5): Promise<NotificationItemData[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_NOTIFICATIONS.slice(0, limit);
}

export async function markAllNotificationsRead(): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { success: true };
}