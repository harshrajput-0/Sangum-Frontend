export type NotificationType = 'mention' | 'post' | 'reply' | 'resource' | 'like' | 'follow';
export type NotificationFilter = 'all' | 'unread' | 'mention' | 'reply' | 'follow';
export type NotificationGroup = 'today' | 'yesterday';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  actorName: string;
  message: string;
  avatarInitials: string;
  avatarColor: string;
  avatarShape?: 'circle' | 'rounded';
  timestamp: string;
  group: NotificationGroup;
  isRead: boolean;
}