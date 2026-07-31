import { MoreVertical } from "lucide-react";
import { Avatar, RoleBadge, IconButton } from "@/modules/communities/shared/components/ui";
import { Member } from "../types";

interface MemberListItemProps {
  member: Member;
  onMenuClick?: (id: string) => void;
}

export function MemberListItem({ member, onMenuClick }: MemberListItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
      <Avatar label={member.avatarLabel} imageUrl={member.avatarImageUrl} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text">{member.name}</span>
          <RoleBadge role={member.role} />
        </div>
        <p className="truncate text-xs text-text-muted">
          @{member.handle} · {member.joinedLabel}
        </p>
      </div>
      <IconButton
        icon={MoreVertical}
        ariaLabel={`More options for ${member.name}`}
        onClick={() => onMenuClick?.(member.id)}
      />
    </div>
  );
}