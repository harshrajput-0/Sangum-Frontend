import { type SidebarNavItem, purpleBadge, redBadge } from "./types";
import {
  IconHome,
  IconUsers,
  IconCompass,
  IconMail,
  IconBell,
  IconBookmark,
  IconBook,
  IconCalendar,
} from "./icons";

/**
 * Fixed navigation entries for the app shell. This list does not come from
 * the backend — edit it here directly when nav needs to change. Badge counts
 * that ARE dynamic (unread messages, notifications) should be wired up where
 * this constant is consumed, e.g. by mapping over it and overriding `badge`
 * with live counts from your store/query cache, rather than editing this file.
 */
export const navItems: SidebarNavItem[] = [
  { key: "home", label: "Home", icon: <IconHome /> },
  { key: "communities", label: "Communities", icon: <IconUsers /> },
  { key: "explore", label: "Explore", icon: <IconCompass /> },
  { key: "messages", label: "Messages", icon: <IconMail />, badge: purpleBadge(3) },
  { key: "notifications", label: "Notifications", icon: <IconBell />, badge: redBadge(5) },
  { key: "bookmarks", label: "Bookmarks", icon: <IconBookmark /> },
  { key: "resources", label: "Resources", icon: <IconBook /> },
  { key: "events", label: "Events", icon: <IconCalendar />, comingSoon: true },
];