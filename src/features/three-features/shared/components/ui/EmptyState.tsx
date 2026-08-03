import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`px-5 py-12 text-center text-text-muted ${className}`}>
      <Icon className="mx-auto mb-3 h-9 w-9 opacity-50" strokeWidth={1.5} />
      <p className="text-base text-text-secondary">{title}</p>
      {description && <p className="mt-1 text-xs text-text-muted">{description}</p>}
    </div>
  );
}