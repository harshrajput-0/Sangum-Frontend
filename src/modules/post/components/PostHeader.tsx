import { cn } from "@/shared/utils/cn";
import { UserAvatar } from "@/modules/user/components/UserAvatar";
import { RoleBadge } from "@/modules/user/components/UserBadge";



import { MoreHorizontalIcon, EditIcon, DeleteIcon, ReportContentIcon, PinIcon } from "@/shared/components/ui/icons/SangumIcons";
import { formatRelativeTime } from "../../../shared/utils/formatRelativeTime";
import { useRef, useState, useEffect } from "react";
import type { PostAuthor } from "../types/types";

export interface PostHeaderProps {
    author: PostAuthor;
    community?: string;
    createdAt: string | Date;
    pinned?: boolean;

    canEdit?: boolean;
    canDelete?: boolean;
    canReport?: boolean;
    canPin?: boolean;

  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onPin?: () => void;

  className?: string;
}

export function PostHeader({
    author,
    community,
    createdAt,
    pinned = false,
    canDelete = false,
    canEdit = false,
    canReport = false,
    canPin = false,

    onEdit,
    onDelete,
    onReport,
    onPin,

    className
} : PostHeaderProps) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const hasMenu = canEdit || canDelete || canPin || canReport

      useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const metaLine = [community ? `in ${community}` : null, formatRelativeTime(createdAt)].filter(Boolean).join(" · ");

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-3 min-w-0">
        <UserAvatar displayName={author.displayName} username={author.username} avatarUrl={author.avatarUrl} size="md" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-(length:--fs-sm) font-semibold text-text truncate">{author.displayName}</span>
            {author.role && <RoleBadge role={author.role} size="xs" />}
            {pinned && (
              <span className="inline-flex items-center gap-1 text-(length:--fs-xs) font-medium text-(--brand-purple-light) shrink-0">
                <PinIcon className="w-3 h-3" />
                Pinned
              </span>
            )}
          </div>
          <p className="text-(length:--fs-xs) text-text-muted truncate">{metaLine}</p>
        </div>
      </div>

      {hasMenu && (
        <div className="relative shrink-0" ref={rootRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Post options"
            className="flex items-center justify-center w-8 h-8 rounded-md text-text-muted hover:bg-surface-hover hover:text-text transition-colors duration-150"
          >
            <MoreHorizontalIcon className="w-4 h-4" />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-1.5 w-[170px] rounded-lg border border-border bg-surface p-1.5 shadow-(--shadow-lg) z-50"
            >
              {canPin && (
                <MenuRow
                  icon={<PinIcon className="w-4 h-4" />}
                  label={pinned ? "Unpin post" : "Pin post"}
                  onClick={() => {
                    onPin?.();
                    setOpen(false);
                  }}
                />
              )}
              {canEdit && (
                <MenuRow
                  icon={<EditIcon className="w-4 h-4" />}
                  label="Edit"
                  onClick={() => {
                    onEdit?.();
                    setOpen(false);
                  }}
                />
              )}
              {canDelete && (
                <MenuRow
                  icon={<DeleteIcon className="w-4 h-4" />}
                  label="Delete"
                  danger
                  onClick={() => {
                    onDelete?.();
                    setOpen(false);
                  }}
                />
              )}
              {canReport && (
                <MenuRow
                  icon={<ReportContentIcon className="w-4 h-4" />}
                  label="Report"
                  danger
                  onClick={() => {
                    onReport?.();
                    setOpen(false);
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

}



function MenuRow({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-md px-2.5 py-[7px] text-(length:--fs-sm) font-medium cursor-pointer transition-colors duration-150",
        danger
          ? "text-danger hover:bg-(--danger-bg-dark)"
          : "text-text-secondary hover:bg-surface-hover hover:text-text"
      )}
    >
      {icon}
      {label}
    </div>
  );
}