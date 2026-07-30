"use client";

import type { ReactNode } from "react";
import { Image as ImageIcon, LineChart, Link2 } from "lucide-react";
import { Button } from "@/shared/components/ui";

/**
 * PostActions
 * -------------------------------------------------------------------------
 * The Photo / Poll / Link action row shown below a post composer (or
 * anywhere else you need the same set of quick-attach actions).
 *
 * Standalone — depends only on the semantic tokens in global.css
 * (text-text-secondary, text-text-muted, etc.) via Tailwind utilities.
 */

export interface PostAction {
  key: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const defaultPostActions = (): PostAction[] => [
  { key: "photo", label: "Photo", icon: <ImageIcon className="size-4" strokeWidth={2} /> },
  { key: "poll", label: "Poll", icon: <LineChart className="size-4" strokeWidth={2} /> },
  { key: "link", label: "Link", icon: <Link2 className="size-4" strokeWidth={2} /> },
];

export interface PostActionsProps {
  /** Override the default Photo / Poll / Link actions. */
  actions?: PostAction[];
  /** Show a divider above the row (matches the composer's card style). */
  withDivider?: boolean;
  className?: string;
}

export default function PostActions({
  actions,
  withDivider = false,
  className = "",
}: PostActionsProps) {
  const items = actions ?? defaultPostActions();

  return (
    <div className={className}>
      {withDivider && <div className="mb-3 h-px w-full bg-border" />}

      <div className="flex items-center gap-5">
        {items.map((action) => (
          <Button
            key={action.key}
            type="button"
            variant="ghost"
            size="sm"
            iconLeft={action.icon}
            onClick={action.onClick}
            className="flex items-center gap-1.5 rounded-md text-md font-medium text-text-secondary transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className="text-text-muted"></span>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}