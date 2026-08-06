"use client";

import { forwardRef } from "react";
import { MenuItem } from "./MenuItem";

interface UserMenuProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
  ({ onProfileClick, onSettingsClick, onLogoutClick }, ref) => {
    return (
      <div
        ref={ref}
        role="menu"
        className="w-45 rounded-md border border-border bg-surface p-(--sp-2) shadow-md"
      >
        <MenuItem label="Profile" onClick={onProfileClick} />
        <MenuItem label="Settings" onClick={onSettingsClick} />
        <div className="my-(--sp-2) h-px bg-border" />
        <MenuItem label="Log out" onClick={onLogoutClick} variant="danger" />
      </div>
    );
  }
);

UserMenu.displayName = "UserMenu";