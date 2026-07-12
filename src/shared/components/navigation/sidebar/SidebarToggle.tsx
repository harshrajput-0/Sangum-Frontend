import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

/**
 * SidebarToggle
 * Standalone hamburger button that drives the Sidebar's collapsed state
 * from outside — drop it into PublicHeader (YouTube-style) instead of
 * rendering a toggle inside the rail itself.
 *
 * Usage:
 *   const [collapsed, setCollapsed] = useState(false);
 *
 *   <PublicHeader>
 *     <SidebarToggle collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
 *   </PublicHeader>
 *   <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
 *
 * Sidebar already supports controlled `collapsed` / `onCollapsedChange`
 * props, so no other wiring is needed.
 */

export interface SidebarToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export default function SidebarToggle({
  collapsed,
  onToggle,
  className,
  ...rest
}: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-pressed={!collapsed}
      className={cn(
        "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-md,10px)]",
        "text-[var(--text-secondary,#b8b8c4)] transition-colors duration-150",
        "hover:bg-[var(--surface-hover,rgba(255,255,255,0.06))] hover:text-[var(--text,#f4f4f6)]",
        "active:scale-95",
        "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-purple,#6D5DFE)]",
        className
      )}
      {...rest}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
        <path
          d="M3.75 6.5h16.5M3.75 12h16.5M3.75 17.5h16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}