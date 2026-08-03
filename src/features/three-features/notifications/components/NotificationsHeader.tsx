import { Filter } from 'lucide-react';

interface NotificationsHeaderProps {
  onMarkAllRead: () => void;
  onFilterClick?: () => void;
}

export function NotificationsHeader({ onMarkAllRead, onFilterClick }: NotificationsHeaderProps) {
  return (
    <div className="mb-[18px] flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-text">Notifications</h1>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMarkAllRead}
          className="self-center text-xs font-medium text-primary hover:underline"
        >
          Mark all as read
        </button>
        <button
          type="button"
          onClick={onFilterClick}
          className="inline-flex items-center gap-2 rounded-md border border-border-strong px-3 py-[7px] text-xs font-semibold text-text transition-colors hover:bg-surface-hover"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>
    </div>
  );
}