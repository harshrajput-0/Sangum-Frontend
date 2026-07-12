import { useState, type ReactNode } from "react";
import {
  IconBell,
  IconBook,
  IconBookmark,
  IconCalendar,
  IconCompass,
  IconHome,
  IconMail,
  IconSettings,
  IconUsers,
} from "./icons";
import { cn } from "@/shared/utils/cn";

/**
 * Sidebar
 * Primary app navigation with joined communities below. Collapses to an
 * icon-only rail — collapse is now driven from OUTSIDE this component
 * (e.g. a SidebarToggle button placed in PublicHeader, YouTube-style)
 * via the `collapsed` / `onCollapsedChange` props. While collapsed,
 * clicking anywhere on the rail expands it again, as a convenience.
 */

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
  /** Rail width when expanded. Number = px, or pass any CSS length. */
  width?: number | string;
  /** Rail width when collapsed. Number = px, or pass any CSS length. */
  collapsedWidth?: number | string;
  /** Rail height. Number = px, or pass any CSS length. Defaults to full viewport height. */
  height?: number | string;
  className?: string;
}

const toCssLength = (value: number | string) => (typeof value === "number" ? `${value}px` : value);

function purpleBadge(value: ReactNode) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[var(--radius-full,9999px)] bg-[var(--brand-purple,#6D5DFE)] px-[7px] py-[2px] text-[11px] font-semibold leading-none text-white">
      {value}
    </span>
  );
}

function redBadge(value: ReactNode) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[var(--radius-full,9999px)] bg-[var(--danger,#ef4444)] px-[7px] py-[2px] text-[11px] font-semibold leading-none text-white">
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
  { key: "mern", name: "MERN Developers", initials: "N", color: "var(--success,#22c55e)" },
  { key: "ts", name: "TypeScript Nation", initials: "TS", color: "var(--info,#3b82f6)" },
];

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple,#6D5DFE)]";

const ease = "ease-[var(--ease,cubic-bezier(0.4,0,0.2,1))]";

/** Wraps trailing label content (text, badges, "Soon" tag) so it can be
 *  animated open/shut with a grid-template-columns trick — this gives a
 *  smooth width+fade collapse instead of the content just disappearing. */
function CollapsingLabel({ collapsed, children }: { collapsed: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "grid overflow-hidden transition-[grid-template-columns,opacity] duration-200",
        ease,
        collapsed ? "grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100"
      )}
    >
      <span className="flex min-w-0 items-center gap-2 overflow-hidden">{children}</span>
    </span>
  );
}

export default function Sidebar({
  items = defaultNavItems,
  communities = defaultCommunities,
  activeKey: activeKeyProp,
  defaultActiveKey,
  onItemClick,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  width = 264,
  collapsedWidth = 76,
  height = "100vh",
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

  const itemBaseClasses = cn(
    "relative flex items-center rounded-[var(--radius-md,10px)] text-[13px] font-medium",
    "transition-all duration-200",
    ease,
    collapsed ? "justify-center gap-0 px-0 py-[9px]" : "gap-3 px-3 py-[9px]"
  );

  return (
    <aside
      onClick={handleRailClick}
      style={{ width: toCssLength(collapsed ? collapsedWidth : width), height: toCssLength(height) }}
      className={cn(
        "sticky top-0 flex shrink-0 flex-col overflow-y-auto",
        "border-r border-[var(--border,#242432)] bg-[var(--bg,#0b0b12)] p-3.5 font-[var(--font-sans,'Inter',ui-sans-serif,system-ui,sans-serif)]",
        "transition-[width] duration-200",
        ease,
        "motion-reduce:transition-none",
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar,rgba(255,255,255,0.15))] [&::-webkit-scrollbar-track]:bg-transparent",
        collapsed && "cursor-pointer",
        className
      )}
    >
      <nav aria-label="Primary" className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const iconEl = (
            <span className="h-[18px] w-[18px] shrink-0 [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
          );
          const label = (
            <CollapsingLabel collapsed={collapsed}>
              <span className="truncate">{item.label}</span>
              {item.badge}
              {item.comingSoon && (
                <span className="ml-auto shrink-0 whitespace-nowrap rounded-[var(--radius-full,9999px)] border border-[var(--border,#242432)] bg-[var(--surface-2,#17171f)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted,#7a7a8c)]">
                  Soon
                </span>
              )}
            </CollapsingLabel>
          );

          if (item.comingSoon) {
            return (
              <div
                key={item.key}
                aria-disabled="true"
                title={collapsed ? `${item.label} — coming soon` : undefined}
                className={cn(itemBaseClasses, "cursor-not-allowed text-[var(--text-secondary,#b8b8c4)] opacity-[0.55]")}
              >
                {iconEl}
                {label}
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
                  ? "bg-[var(--nav-active-bg,rgba(109,93,254,0.14))] text-[var(--nav-active-text,var(--brand-purple-light,#a996ff))]"
                  : "text-[var(--text-secondary,#b8b8c4)] hover:bg-[var(--surface-hover,rgba(255,255,255,0.06))] hover:text-[var(--text,#f4f4f6)]"
              )}
            >
              {iconEl}
              {label}
            </a>
          );
        })}
      </nav>

      <hr className="my-2.5 border-t border-[var(--border,#242432)]" />

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
          "cursor-pointer text-[var(--text-secondary,#b8b8c4)] hover:bg-[var(--surface-hover,rgba(255,255,255,0.06))] hover:text-[var(--text,#f4f4f6)]"
        )}
      >
        <IconSettings className="h-[18px] w-[18px] shrink-0" />
        <CollapsingLabel collapsed={collapsed}>
          <span className="truncate">Settings</span>
        </CollapsingLabel>
      </a>

      <div
        aria-hidden={collapsed}
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-200",
          ease,
          collapsed ? "pointer-events-none max-h-0 opacity-0" : "mt-4 max-h-[999px] opacity-100"
        )}
      >
        {communities.length > 0 && (
          <>
            <span className="mb-2 block px-1 text-[12px] text-[var(--text-muted,#7a7a8c)]">Your communities</span>
            <div className="flex flex-col gap-1">
              {communities.map((c) => (
                <a
                  key={c.key}
                  href={c.href ?? "#"}
                  className={cn(
                    "flex items-center gap-3 rounded-[var(--radius-md,10px)] px-3 py-1.5 text-[13px] font-medium",
                    "text-[var(--text-secondary,#b8b8c4)] transition-colors hover:bg-[var(--surface-hover,rgba(255,255,255,0.06))] hover:text-[var(--text,#f4f4f6)]",
                    focusRing
                  )}
                >
                  <span
                    className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[var(--radius-md,10px)] text-[10px] font-semibold text-white"
                    style={{ background: c.color ?? "var(--brand-purple,#6D5DFE)" }}
                  >
                    {c.initials}
                  </span>
                  <span className="truncate">{c.name}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}