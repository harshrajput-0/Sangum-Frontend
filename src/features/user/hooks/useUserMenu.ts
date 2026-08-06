"use client";

import { useCallback, useState } from "react";
import { useClickOutside } from "../../../shared/hooks/useClickOutside";

interface UseUserMenuOptions {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}

export function useUserMenu({ onProfileClick, onSettingsClick, onLogout }: UseUserMenuOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const menuRef = useClickOutside<HTMLDivElement>(closeMenu, isOpen);

  const handleProfileClick = useCallback(() => {
    onProfileClick();
    closeMenu();
  }, [onProfileClick, closeMenu]);

  const handleSettingsClick = useCallback(() => {
    onSettingsClick();
    closeMenu();
  }, [onSettingsClick, closeMenu]);

  const handleLogoutClick = useCallback(() => {
    onLogout();
    closeMenu();
  }, [onLogout, closeMenu]);

  return {
    isOpen,
    menuRef,
    toggleMenu,
    closeMenu,
    handleProfileClick,
    handleSettingsClick,
    handleLogoutClick,
  };
}