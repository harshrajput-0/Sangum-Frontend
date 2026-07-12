import { useState, type MouseEvent, type ReactNode } from "react";
import {
  IconBell,
  IconBook,
  IconBookmark,
  IconCalendar,
  IconChevronLeft,
  IconCompass,
  IconHome,
  IconMail,
  IconSettings,
  IconUsers,
} from "@/shared/components/ui/icons/SidebarIcons";
import { SangumIcon, SangumLogoHorizontal } from "@/shared/components/ui/icons/SangumLogo";
import { cn } from "@/shared/utils/cn";



export type SidebarBadgeVariant = "purple" | "danger" | "info" | "success";

export interface SidebarBadge {
  // Shown next to the label, e.g. an unread count. 
  label: ReactNode;
  variant?: SidebarBadgeVariant;
}

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  // Renders as a number, a small dot when collapsed. 
  badge?: SidebarBadge;
  // For Coming Soon 
  comingSoon?: boolean;
}

export interface SidebarCommunity {
  key: string;
  name: string;
  initials: string;
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

  logoHref?: string;    // Where links are wired

  // Number = px, or pass any CSS length.
  width?: number | string;                            // Expanded Sidebar Width
  collapsedWidth?: number | string;                   // Collapsed Siderbar Width

  height?: number | string;                           // Sidebar Height
  className?: string;
}

const toCssLength = (value: number | string) => (typeof value === "number" ? `${value}px` : value);

// Badge Color
const badgeColors: Record<SidebarBadgeVariant, string> = {
  purple: "var(--brand-purple,#6D5DFE)",
  danger: "var(--danger,#ef4444)",
  info: "var(--info,#3b82f6)",
  success: "var(--success,#22c55e)",
};

// Default Sidebar Items 
const defaultNavItems: SidebarNavItem[] = [
  { key: "home", label: "Home", icon: <IconHome /> },
  { key: "communities", label: "Communities", icon: <IconUsers /> },
  { key: "explore", label: "Explore", icon: <IconCompass /> },
  { key: "messages", label: "Messages", icon: <IconMail />, badge: { label: 3, variant: "purple" } },
  { key: "notifications", label: "Notifications", icon: <IconBell />, badge: { label: 5, variant: "danger" } },
  { key: "bookmarks", label: "Bookmarks", icon: <IconBookmark /> },
  { key: "resources", label: "Resources", icon: <IconBook /> },
  { key: "events", label: "Events", icon: <IconCalendar />, comingSoon: true },
];

// Communities
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

// Icon wrapper with small dot
function NavIcon({
  icon,
  badge,
  collapsed,
}: {
  icon: ReactNode;
  badge?: SidebarBadge;
  collapsed: boolean;
}) {
  return (
    <span className="relative flex h-[18px] w-[18px] shrink-0 [&>svg]:h-full [&>svg]:w-full">
      {icon}
      {badge && collapsed && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
          style={{
            background: badgeColors[badge.variant ?? "purple"],
            boxShadow: "0 0 0 2px var(--bg,#0b0b12)",
          }}
        />
      )}
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
  logoHref = "/",
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

  // Clicking empty space on the rail only ever EXPANDS it. Real nav items
  // stop this from firing (see stopPropagation below) so a click either
  // navigates OR expands, never both.
  const handleRailClick = () => {
    if (collapsed) setCollapsed(false);
  };

  const handleLogoClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (collapsed) {
      e.preventDefault();
      setCollapsed(false);
      return;
    }
    handleItemClick("logo");
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
        "border-r border-(--border,#242432) bg-(--bg,#0b0b12) p-3.5 font-(--font-sans,'Inter',ui-sans-serif,system-ui,sans-serif)",
        "transition-[width] duration-200",
        ease,
        "motion-reduce:transition-none",
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--scrollbar,rgba(255,255,255,0.15)) [&::-webkit-scrollbar-track]:bg-transparent",
        collapsed && "cursor-pointer",
        className
      )}
    >
      <div className={cn("mb-3 flex items-center", collapsed ? "justify-center" : "justify-between gap-2")}>
        <a
          href={logoHref}
          onClick={handleLogoClick}
          title={collapsed ? "Expand sidebar" : undefined}
          aria-label={collapsed ? "Expand sidebar" : "Go to home"}
          className={cn(
            "flex shrink-0 items-center rounded-(--radius-md,10px) transition-colors duration-150",
            "hover:bg-(--surface-hover,rgba(255,255,255,0.06))",
            collapsed ? "h-9 w-9 justify-center" : "h-9 px-1",
            focusRing
          )}
        >
          {collapsed ? (
            <SangumIcon className="h-6 w-6" />
          ) : (
            <SangumLogoHorizontal className="h-6 w-auto text-text" />
          )}
        </a>

        {!collapsed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(true);
            }}
            aria-label="Collapse sidebar"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-(--radius-md,10px) text-(--text-secondary,#b8b8c4) transition-colors duration-150",
              "hover:bg-(--surface-hover,rgba(255,255,255,0.06)) hover:text-(--text,#f4f4f6)",
              focusRing
            )}
          >
            <IconChevronLeft className="h-[18px] w-[18px]" />
          </button>
        )}
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const iconEl = <NavIcon icon={item.icon} badge={item.badge} collapsed={collapsed} />;
          const label = (
            <CollapsingLabel collapsed={collapsed}>
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span
                  className="inline-flex shrink-0 items-center justify-center rounded-(--radius-full,9999px) px-[7px] py-[2px] text-[11px] font-semibold leading-none text-white"
                  style={{ background: badgeColors[item.badge.variant ?? "purple"] }}
                >
                  {item.badge.label}
                </span>
              )}
              {item.comingSoon && (
                <span className="ml-auto shrink-0 whitespace-nowrap rounded-(--radius-full,9999px) border border-(--border,#242432) bg-(--surface-2,#17171f) px-1.5 py-0.5 text-[10px] font-bold text-(--text-muted,#7a7a8c)">
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
                onClick={(e) => e.stopPropagation()}
                className={cn(itemBaseClasses, "cursor-not-allowed text-(--text-secondary,#b8b8c4) opacity-[0.55]")}
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
                e.stopPropagation();
                if (!item.href) e.preventDefault();
                handleItemClick(item.key);
              }}
              className={cn(
                itemBaseClasses,
                focusRing,
                "cursor-pointer",
                isActive
                  ? "bg-(--nav-active-bg,rgba(109,93,254,0.14)) text-(--nav-active-text,var(--brand-purple-light,#a996ff))"
                  : "text-(--text-secondary,#b8b8c4) hover:bg-(--surface-hover,rgba(255,255,255,0.06)) hover:text-(--text,#f4f4f6)"
              )}
            >
              {iconEl}
              {label}
            </a>
          );
        })}
      </nav>

      <hr className="my-2.5 border-t border-(--border,#242432)" />

      <a
        href="#settings"
        title={collapsed ? "Settings" : undefined}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleItemClick("settings");
        }}
        className={cn(
          itemBaseClasses,
          focusRing,
          "cursor-pointer text-(--text-secondary,#b8b8c4) hover:bg-(--surface-hover,rgba(255,255,255,0.06)) hover:text-(--text,#f4f4f6)"
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
            <span className="mb-2 block px-1 text-[12px] text-(--text-muted,#7a7a8c)">Your communities</span>
            <div className="flex flex-col gap-1">
              {communities.map((c) => (
                <a
                  key={c.key}
                  href={c.href ?? "#"}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "flex items-center gap-3 rounded-(--radius-md,10px) px-3 py-1.5 text-[13px] font-medium",
                    "text-(--text-secondary,#b8b8c4) transition-colors hover:bg-(--surface-hover,rgba(255,255,255,0.06)) hover:text-(--text,#f4f4f6)",
                    focusRing
                  )}
                >
                  <span
                    className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-(--radius-md,10px) text-[10px] font-semibold text-white"
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