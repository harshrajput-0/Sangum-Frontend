"use client";

import { useCallback, useEffect, useState } from "react";
import { getRecentNotifications, markAllNotificationsRead } from "../services/notifications.service";
import type { NotificationItemData } from "../types/notifications.types";

const RECENT_LIMIT = 5;

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getRecentNotifications(RECENT_LIMIT).then((data) => {
      if (isMounted) {
        setNotifications(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMarkAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    await markAllNotificationsRead();
  }, []);

  const handleNotificationClick = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  }, []);

  return {
    notifications,
    isLoading,
    handleMarkAllRead,
    handleNotificationClick,
  };
}