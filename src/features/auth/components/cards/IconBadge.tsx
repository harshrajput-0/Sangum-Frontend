import type { ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  spacingClassName?: string;
}

export function IconBadge({ icon, spacingClassName = "mb-4" }: IconBadgeProps) {
  return (
    <div
      className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-light ${spacingClassName}`}
    >
      {icon}
    </div>
  );
}