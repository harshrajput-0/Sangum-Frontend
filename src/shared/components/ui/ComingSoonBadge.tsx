export interface ComingSoonBadgeProps {
  className?: string;
}

export function ComingSoonBadge({ className = "" }: ComingSoonBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full bg-warning-bg px-2 py-0.5 text-xs font-medium text-warning",
        className,
      ].join(" ")}
    >
      Coming Soon
    </span>
  );
}
