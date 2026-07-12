import type { ReactNode } from "react";

export interface SidebarBadge {
  count: number;
  /** Tailwind background color class, e.g. "bg-violet-500" */
  color: string;
}

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: ReactNode;
  badge?: SidebarBadge;
  comingSoon?: boolean;
  href?: string;
}

export interface SidebarCommunity {
  key: string;
  name: string;
  initials: string;
  /** CSS color value, e.g. "var(--success)" or "#22c55e" */
  color: string;
  href?: string;
}

export function purpleBadge(count: number): SidebarBadge {
  return { count, color: "bg-violet-500" };
}

export function redBadge(count: number): SidebarBadge {
  return { count, color: "bg-red-500" };
}