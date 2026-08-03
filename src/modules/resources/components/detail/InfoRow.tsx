import type { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-text-muted">
        <Icon size={13} />
        {label}
      </span>
      <span className="text-text">{value}</span>
    </div>
  );
}