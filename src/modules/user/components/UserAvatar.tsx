// modules/users/components/UserAvatar.tsx

import React from "react";
import { OnlineIndicator, type UserStatus } from "./OnlineIndicator";
import { cn } from "@/shared/utils/cn";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface UserAvatarProps {
  displayName: string;
  username: string;
  avatarUrl?: string;
  size?: AvatarSize;

  status?: UserStatus;          // Show user Status from Online Indicator
  href?: string | null;           // profile url

  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

// Avatar Size Class
const SIZE_CLASSES: Record<AvatarSize, { box: string; text: string }> = {
  xs: { box: "w-5 h-5", text: "text-[8px]" },
  sm: { box: "w-7 h-7", text: "text-[10px]" },
  md: { box: "w-9 h-9", text: "text-[12px]" },
  lg: { box: "w-12 h-12", text: "text-[15px]" },
  xl: { box: "w-16 h-16", text: "text-[20px]" },
  "2xl": { box: "w-[88px] h-[88px]", text: "text-[26px]" },
};

const DOT_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 9,
  lg: 11,
  xl: 14,
  "2xl": 18,
};

// Fallback background is derived from the username so a given person always
// gets the same color, rather than assigning it randomly on every render.
const PALETTE = [
  "var(--brand-purple)",
  "var(--info)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
  "var(--brand-cyan)",
  "var(--neutral)",
];

function colorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserAvatar({
  displayName,
  username,
  avatarUrl,
  size = "md",
  status,
  href,
  onClick,
  className,
}: UserAvatarProps) {
  const { box, text } = SIZE_CLASSES[size];

  // ToDo wire here
  const linkHref = href === null ? undefined : href ?? `/u/${username}`;

  const content = (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          box,
          text,
          "inline-flex items-center justify-center rounded-full font-semibold text-white overflow-hidden select-none"
        )}
        style={{ backgroundColor: avatarUrl ? undefined : colorFromString(username || displayName) }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          getInitials(displayName)
        )}
      </span>

      {status && (
        <OnlineIndicator status={status} size={DOT_SIZE[size]} className="absolute bottom-0 right-0" />
      )}
    </span>
  );

  const focusRing =
    "rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

  if (linkHref) {
    return (
      // TODO: swap <a> for your router's Link component (Next.js <Link>, React Router <Link>, etc.)
      <a href={linkHref} onClick={onClick} className={cn("inline-flex", focusRing)} aria-label={`View ${displayName}'s profile`}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn("inline-flex", focusRing)} aria-label={`${displayName}'s profile`}>
        {content}
      </button>
    );
  }

  // Purely decorative — e.g. nested inside a menu trigger button, or shown
  // in a hover-card header where the whole card isn't meant to be clickable.
  return content;
}
