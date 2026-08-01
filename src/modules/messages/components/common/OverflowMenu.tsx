"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cn } from "@/shared/utils/cn";

export interface OverflowMenuItem {
  id: string;
  label: string;
  onSelect: () => void;
  variant?: "default" | "danger";
}

export type OverflowMenuEntry = OverflowMenuItem | { id: string; type: "divider" };

interface OverflowMenuProps {
  items: OverflowMenuEntry[];
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}

function isDivider(entry: OverflowMenuEntry): entry is { id: string; type: "divider" } {
  return "type" in entry && entry.type === "divider";
}

export function OverflowMenu({ items, ariaLabel, size = "md", className }: OverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const triggerSizeClass = size === "sm" ? "h-[30px] w-[30px]" : "h-9 w-9";
  const iconSizeClass = size === "sm" ? "h-[15px] w-[15px]" : "h-[18px] w-[18px]";

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex flex-shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text",
          triggerSizeClass,
        )}
      >
        <MoreVertical className={iconSizeClass} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[210px] rounded-lg border border-border bg-surface p-1.5 shadow-lg"
        >
          {items.map((entry) =>
            isDivider(entry) ? (
              <div key={entry.id} className="my-1.5 h-px bg-border" />
            ) : (
              <button
                key={entry.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  entry.onSelect();
                  setIsOpen(false);
                }}
                className={cn(
                  "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover",
                  entry.variant === "danger" ? "text-danger" : "text-text",
                )}
              >
                {entry.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}