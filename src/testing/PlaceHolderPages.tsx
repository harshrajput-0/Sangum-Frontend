import type { ReactNode } from "react";
import {
  IconHome,
  IconUsers,
  IconCompass,
  IconMail,
  IconBell,
  IconBookmark,
  IconBook,
  IconCalendar,
} from "@/shared/components/ui/icons/SidebarIcons"; // adjust to wherever these icons actually live in your project


/**
 * Shared layout only — this is not itself a page and nothing below loops
 * over defaultNavItems. Each export is its own standalone function so you
 * can import just the one you need into each route file.
 */
function RouteCheck({ icon, pageKey }: { icon: ReactNode; pageKey: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-bg text-3xl text-text">
        {icon}
      </div>
<div className="bg-red-500 sm:bg-green-500 h-20 w-20" />
<div className="phone:bg-blue-500 bg-red-500 h-20 w-20" />
      <p className="text-lg font-medium text-text">This is {pageKey} Page</p>
    </div>
  );
}

export function HomePage() {
  return <RouteCheck icon={<IconHome />} pageKey="home" />;
}

export function CommunitiesPage() {
  return <RouteCheck icon={<IconUsers />} pageKey="communities" />;
}

export function ExplorePage() {
  return <RouteCheck icon={<IconCompass />} pageKey="explore" />;
}

export function MessagesPage() {
  return <RouteCheck icon={<IconMail />} pageKey="messages" />;
}

export function NotificationsPage() {
  return <RouteCheck icon={<IconBell />} pageKey="notifications" />;
}

export function BookmarksPage() {
  return <RouteCheck icon={<IconBookmark />} pageKey="bookmarks" />;
}

export function ResourcesPage() {
  return <RouteCheck icon={<IconBook />} pageKey="resources" />;
}

export function EventsPage() {
  return <RouteCheck icon={<IconCalendar />} pageKey="events" />;
}


export function MernPage() {
  return <RouteCheck icon={<IconUsers />} pageKey="Mern Community" />;
}

export function TsPage() {
  return <RouteCheck icon={<IconUsers />} pageKey="Mern Community" />;
}