"use client";

import { useCallback, useState } from "react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useNotifications } from "./useNotifications";

export function useNotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const panelRef = useClickOutside<HTMLDivElement>(closeDropdown, isOpen);

  const { notifications, isLoading, handleMarkAllRead, handleNotificationClick } = useNotifications();

  return {
    isOpen,
    panelRef,
    toggleDropdown,
    closeDropdown,
    notifications,
    isLoading,
    handleMarkAllRead,
    handleNotificationClick,
  };
}