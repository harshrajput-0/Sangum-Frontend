"use client";

import { forwardRef } from "react";
import type { NotificationItemData } from "../types/notifications.types";
import { NotificationItem } from "./NotificationItem";

interface NotificationDropdownProps {
  notifications: NotificationItemData[];
  onMarkAllRead: () => void;
  onNotificationClick: (id: string) => void;
  onViewAll: () => void;
}

export const NotificationDropdown = forwardRef<HTMLDivElement, NotificationDropdownProps>(
  ({ notifications, onMarkAllRead, onNotificationClick, onViewAll }, ref) => {
    return (
      <div
        ref={ref}
        className="w-90 overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
      >
        <div className="flex items-center justify-between px-(--sp-4) pb-(--sp-3) pt-(--sp-4)">
          <h3 className="m-0 text-md font-bold text-text">Notifications</h3>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="cursor-pointer border-none bg-transparent p-0 font-sans text-sm font-semibold text-primary-light hover:text-primary"
          >
            Mark all read
          </button>
        </div>

        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onClick={onNotificationClick} />
        ))}

        <div className="border-t border-border px-(--sp-4) py-(--sp-3) text-center">
          <button
            type="button"
            onClick={onViewAll}
            className="cursor-pointer border-none bg-transparent font-sans text-sm font-semibold text-primary-light hover:text-primary"
          >
            View all notifications
          </button>
        </div>
      </div>
    );
  }
);

NotificationDropdown.displayName = "NotificationDropdown";