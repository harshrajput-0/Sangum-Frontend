import { Card, Avatar, RoleBadge } from "@/modules/communities/shared/components/ui";
import { AdminMember } from "../types";

interface AdminsListProps {
  admins: AdminMember[];
}

export function AdminsList({ admins }: AdminsListProps) {
  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-text">Admins</p>
      <div className="space-y-2.5">
        {admins.map((admin) => (
          <div key={admin.id} className="flex items-center gap-2.5">
            <Avatar label={admin.avatarLabel} imageUrl={admin.avatarImageUrl} size="xs" />
            <span className="text-sm text-text">{admin.name}</span>
            <RoleBadge role="admin" />
          </div>
        ))}
      </div>
    </Card>
  );
}