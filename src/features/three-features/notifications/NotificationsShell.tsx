'use client';

import { useMemo, useState } from 'react';
import { Bell } from 'lucide-react';
import { TabNav, EmptyState } from '../shared/components/ui';
import { NotificationsHeader } from './components/NotificationsHeader';
import { NotificationRow } from './components/NotificationRow';
import { mockNotifications } from './mock';
import type { NotificationFilter, NotificationGroup } from './types';

const GROUP_ORDER: NotificationGroup[] = ['today', 'yesterday'];
const GROUP_LABELS: Record<NotificationGroup, string> = { today: 'Today', yesterday: 'Yesterday' };

export function NotificationsShell() {
  // TODO: Replace with useNotifications() hook — GET /api/notifications, PATCH /api/notifications/:id/read, PATCH /api/notifications/read-all
  const notifications = mockNotifications;

  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(notifications.filter((n) => n.isRead).map((n) => n.id))
  );
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');

  const unreadCount = notifications.length - readIds.size;

  const markOneRead = (id: string) => setReadIds((prev) => new Set(prev).add(id));
  const markAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));

  // NOTE: once wired to real data, unreadCount should come from a global notifications
  // store so the sidebar and topbar bell badges stay in sync with this page — see Phase 1 notes.

  const tabs = useMemo(
    () => [
      { key: 'all', label: 'All' },
      { key: 'unread', label: 'Unread', count: unreadCount },
      { key: 'mention', label: 'Mentions' },
      { key: 'reply', label: 'Replies' },
      { key: 'follow', label: 'Follows' },
    ],
    [unreadCount]
  );

  const visibleNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !readIds.has(n.id);
    return n.type === activeFilter;
  });

  return (
    <div>
      <NotificationsHeader onMarkAllRead={markAllRead} />
      <TabNav
        tabs={tabs}
        activeKey={activeFilter}
        onChange={(key) => setActiveFilter(key as NotificationFilter)}
        className="mb-2"
      />

      {visibleNotifications.length === 0 ? (
        <EmptyState icon={Bell} title="Nothing here yet" description="This filter has no notifications right now." />
      ) : (
        GROUP_ORDER.map((group) => {
          const groupNotifications = visibleNotifications.filter((n) => n.group === group);
          if (groupNotifications.length === 0) return null;

          return (
            <div key={group}>
              <span className="mb-1 mt-[18px] block text-xs text-text-muted first:mt-0">
                {GROUP_LABELS[group]}
              </span>
              {groupNotifications.map((n) => (
                <NotificationRow
                  key={n.id}
                  type={n.type}
                  actorName={n.actorName}
                  message={n.message}
                  avatarInitials={n.avatarInitials}
                  avatarColor={n.avatarColor}
                  avatarShape={n.avatarShape}
                  timestamp={n.timestamp}
                  isRead={readIds.has(n.id)}
                  onMarkRead={() => markOneRead(n.id)}
                />
              ))}
            </div>
          );
        })
      )}

      <div className="flex justify-center p-5">
        <button
          type="button"
          className="rounded-sm border border-border-strong px-3 py-[7px] text-xs font-semibold text-text transition-colors hover:bg-surface-hover"
        >
          Load more
        </button>
      </div>
    </div>
  );
}