// import { useState, type MouseEvent, type ReactNode } from "react";
import { useState, type ReactNode } from "react";
import {
  IconBell,
  IconBook,
  IconBookmark,
  IconCalendar,
  // IconChevronLeft,
  // IconChevronRight,
  IconCompass,
  IconHome,
  IconMail,
  IconSettings,
  IconUsers,
} from "./Logo";
// import { LogoMark } from "./icons";
import { cn } from "@/shared/utils/cn";

/**
 * Sidebar
 * Primary app navigation with joined communities below. Collapses to an
 * icon-only rail via the toggle button — while collapsed, clicking
 * anywhere on the rail expands it again (the toggle button itself is
 * exempt so it can also be used to re-collapse).
 */

const SIDEBAR_COLLAPSED = "276px";
const SIDEBAR_UNCOLLAPSED = "64px";

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  badge?: ReactNode;
  /** Renders dimmed with a "Soon" tag and isn't clickable. */
  comingSoon?: boolean;
}

export interface SidebarCommunity {
  key: string;
  name: string;
  initials: string;
  /** Any valid CSS color, e.g. "var(--success)" or a hex code. */
  color?: string;
  href?: string;
}

export interface SidebarProps {
  items?: SidebarNavItem[];
  communities?: SidebarCommunity[];
  activeKey?: string;
  defaultActiveKey?: string;
  onItemClick?: (key: string) => void;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
}

function purpleBadge(value: ReactNode) {
  return (
    <span className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--brand-purple)] px-[7px] py-[2px] text-[11px] font-semibold leading-none text-white">
      {value}
    </span>
  );
}

function redBadge(value: ReactNode) {
  return (
    <span className="inline-flex items-center justify-center rounded-[var(--radius-full)] bg-[var(--danger)] px-[7px] py-[2px] text-[11px] font-semibold leading-none text-white">
      {value}
    </span>
  );
}

const defaultNavItems: SidebarNavItem[] = [
  { key: "home", label: "Home", icon: <IconHome /> },
  { key: "communities", label: "Communities", icon: <IconUsers /> },
  { key: "explore", label: "Explore", icon: <IconCompass /> },
  { key: "messages", label: "Messages", icon: <IconMail />, badge: purpleBadge(3) },
  { key: "notifications", label: "Notifications", icon: <IconBell />, badge: redBadge(5) },
  { key: "bookmarks", label: "Bookmarks", icon: <IconBookmark /> },
  { key: "resources", label: "Resources", icon: <IconBook /> },
  { key: "events", label: "Events", icon: <IconCalendar />, comingSoon: true },
];

const defaultCommunities: SidebarCommunity[] = [
  { key: "mern", name: "MERN Developers", initials: "N", color: "var(--success)" },
  { key: "ts", name: "TypeScript Nation", initials: "TS", color: "var(--info)" },
];

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple)]";

export default function Sidebar({
  items = defaultNavItems,
  communities = defaultCommunities,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onItemClick,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsedControlled = collapsedProp !== undefined;
  const collapsed = isCollapsedControlled ? collapsedProp : internalCollapsed;

  const setCollapsed = (value: boolean) => {
    if (!isCollapsedControlled) setInternalCollapsed(value);
    onCollapsedChange?.(value);
  };

  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey ?? items[0]?.key);
  const isActiveControlled = activeKeyProp !== undefined;
  const activeKey = isActiveControlled ? activeKeyProp : internalActiveKey;

  const handleItemClick = (key: string) => {
    if (!isActiveControlled) setInternalActiveKey(key);
    onItemClick?.(key);
  };

  const handleRailClick = () => {
    if (collapsed) setCollapsed(false);
  };

  // const handleToggleClick = (e: MouseEvent) => {
  //   e.stopPropagation();
  //   setCollapsed(!collapsed);
  // };

  const itemBaseClasses = cn(
    "relative flex items-center gap-3 rounded-[var(--radius-md)] text-[13px] font-medium transition-all duration-[120ms]",
    collapsed ? "justify-center px-0 py-[9px]" : "px-3 py-[9px]"
  );

  return (
    <aside
      onClick={handleRailClick}
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)] p-1.5 font-[var(--font-sans)]",
        "transition-[width] duration-200 ease-[var(--ease)] motion-reduce:transition-none",
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar)] [&::-webkit-scrollbar-track]:bg-transparent",
          collapsed
    ? `w-${SIDEBAR_COLLAPSED} cursor-pointer`
    : `w-${SIDEBAR_UNCOLLAPSED}`,
        className
      )}
    >
      {/* <div className={cn("mb-4 flex items-center gap-2", collapsed ? "flex-col" : "justify-between")}>
        <LogoMark className="h-6 w-8 shrink-0" />
        <button
          type="button"LogoMark
          onClick={handleToggleClick}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-7 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-md)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
            focusRing
          )}
        >
          {collapsed ? <IconChevronRight className="h-[30px] w-[30px]" /> : <IconChevronLeft className="h-[30px] w-[30px]" />}
        </button>
      </div> */}







      <nav aria-label="Primary" className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const content = (
            <>
              <span className="h-[30px] w-[30px] shrink-0 [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge}
              {!collapsed && item.comingSoon && (
                <span className="ml-auto shrink-0 rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface-2)]  py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                  Soon
                </span>
              )}
            </>
          );

          if (item.comingSoon) {
            return (
              <div
                key={item.key}
                aria-disabled="true"
                title={collapsed ? `${item.label} — coming soon` : undefined}
                className={cn(itemBaseClasses, "cursor-not-allowed text-[var(--text-secondary)] opacity-[0.55]")}
              >
                {content}
              </div>
            );
          }

          return (
            <a
              key={item.key}
              href={item.href ?? "#"}
              title={collapsed ? item.label : undefined}
              onClick={(e) => {
                if (!item.href) e.preventDefault();
                handleItemClick(item.key);
              }}
              className={cn(
                itemBaseClasses,
                focusRing,
                "cursor-pointer",
                isActive
                  ? "bg-[var(--nav-active-bg,rgba(109,93,254,0.14))] text-[var(--nav-active-text,var(--brand-purple-light))]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
              )}
            >
              {content}
            </a>
          );
        })}
      </nav>

      {/* <hr className="my-2.5 border-t border-[var(--border)]" /> */}

      <a
        href="#settings"
        title={collapsed ? "Settings" : undefined}
        onClick={(e) => {
          e.preventDefault();
          handleItemClick("settings");
        }}
        className={cn(
          itemBaseClasses,
          focusRing,
          "cursor-pointer text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)] p-2 scale-150"
        )}
      >
        <IconSettings className="h-[18px] w-[18px] shrink-0" />
        {!collapsed && <span>Settings</span>}
      </a>

      {!collapsed && communities.length > 0 && (
        <div className="mt-4">
          <span className="mb-2 block px-1 text-[12px] text-[var(--text-muted)]">Your communities</span>
          <div className="flex flex-col gap-1">
            {communities.map((c) => (
              <a
                key={c.key}
                href={c.href ?? "#"}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]",
                  focusRing
                )}
              >
                <span
                  className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[10px] font-semibold text-white"
                  style={{ background: c.color ?? "var(--brand-purple)" }}
                >
                  {c.initials}
                </span>
                <span className="truncate">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
