interface RoleBadgeProps {
  role: "admin" | "moderator" | "member";
  label?: string;
}

const toneMap: Record<RoleBadgeProps["role"], string> = {
  admin: "bg-role-admin/15 text-role-admin",
  moderator: "bg-role-moderator/15 text-role-moderator",
  member: "bg-role-user/15 text-role-user",
};

const defaultLabel: Record<RoleBadgeProps["role"], string> = {
  admin: "Owner",
  moderator: "Moderator",
  member: "Member",
};

export function RoleBadge({ role, label }: RoleBadgeProps) {
  return (
    <span
      className={[
        "rounded-full px-2 py-0.5 text-[11px] font-medium",
        toneMap[role],
      ].join(" ")}
    >
      {label ?? defaultLabel[role]}
    </span>
  );
}