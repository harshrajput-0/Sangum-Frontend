import React, { useEffect, useRef, useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { ProfileIcon, SettingsIcon, LogoutIcon } from "./icons";
import type { UserStatus } from "./OnlineIndicator";
import { cn } from "@/shared/utils/cn";

export interface UserMenuItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  /** Renders the row in the danger color, e.g. "Log out". */
  danger?: boolean;
  icon?: React.ReactNode;
}

export interface UserMenuProps {
  displayName: string;
  username: string;
  avatarUrl?: string;
  status?: UserStatus;
  /**
   * Menu rows. The last item is always separated from the rest with a
   * divider (matches the "Profile / Settings — Log out" pattern).
   */
  items?: UserMenuItem[];
  className?: string;
}

const DEFAULT_ITEMS: UserMenuItem[] = [
  { key: "profile", label: "Profile", href: "/profile", icon: <ProfileIcon className="w-4 h-4" /> },
  { key: "settings", label: "Settings", href: "/settings", icon: <SettingsIcon className="w-4 h-4" /> },
  { key: "logout", label: "Log out", danger: true, icon: <LogoutIcon className="w-4 h-4" /> },
];

export function UserMenu({ displayName, username, avatarUrl, status, items = DEFAULT_ITEMS, className }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const mainItems = items.slice(0, -1);
  const lastItem = items[items.length - 1];

  return (
    <div className={cn("relative inline-block", className)} ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UserAvatar displayName={displayName} username={username} avatarUrl={avatarUrl} status={status} size="sm" href={null} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-[170px] rounded-lg border border-border bg-surface p-1.5 shadow-(--shadow-lg) z-50"
        >
          {mainItems.map((item) => (
            <MenuRow key={item.key} item={item} onSelect={() => setOpen(false)} />
          ))}
          {items.length > 1 && <hr className="my-1 border-t border-border" />}
          {lastItem && <MenuRow item={lastItem} onSelect={() => setOpen(false)} />}
        </div>
      )}
    </div>
  );
}

function MenuRow({ item, onSelect }: { item: UserMenuItem; onSelect: () => void }) {
  const rowClass = cn(
    "flex items-center gap-2 rounded-[var(--radius-md)] px-2.5 py-[7px] text-[length:var(--fs-sm)] font-medium cursor-pointer transition-colors duration-150",
    item.danger
      ? "text-[var(--danger)] hover:bg-[var(--danger-bg-dark)]"
      : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
  );

  const handleClick = () => {
    item.onClick?.();
    onSelect();
  };

  if (item.href) {
    return (
      // TODO: swap <a> for your router's Link component
      <a href={item.href} className={rowClass} onClick={handleClick} role="menuitem">
        {item.icon}
        {item.label}
      </a>
    );
  }

  return (
    <div className={rowClass} onClick={handleClick} role="menuitem">
      {item.icon}
      {item.label}
    </div>
  );
}
