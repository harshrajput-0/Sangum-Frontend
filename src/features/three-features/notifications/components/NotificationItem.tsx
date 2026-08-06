"use client";

import type { NotificationItemData } from "../types/notifications.types";

interface NotificationItemProps {
  notification: NotificationItemData;
  onClick: (id: string) => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { id, actorName, message, timeAgo, avatarInitials, avatarColor, isRead } = notification;

  return (
    <div
      onClick={() => onClick(id)}
      className="flex cursor-pointer items-start gap-(--sp-3) px-(--sp-4) py-(--sp-3) transition-colors duration-120 ease-brand hover:bg-surface-hover"
    >
      <div
        style={{ background: avatarColor }}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-text-on-primary"
      >
        {avatarInitials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-base leading-[1.4] text-text">
          {actorName && <b className="font-semibold">{actorName} </b>}
          {message}
        </p>
        <p className="mb-0 mt-0.5 text-xs text-text-muted">{timeAgo}</p>
      </div>
      {!isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
    </div>
  );
}