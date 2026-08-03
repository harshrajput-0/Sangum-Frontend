import { CONVERSATION_FILTERS } from "../../constants/filters";
import type { ConversationFilter } from "../../types/conversation.types";
import { cn } from "../../utils/cn";

interface ConversationFilterChipsProps {
  activeFilter: ConversationFilter;
  unreadCount: number;
  onChange: (filter: ConversationFilter) => void;
}

export function ConversationFilterChips({
  activeFilter,
  unreadCount,
  onChange,
}: ConversationFilterChipsProps) {
  return (
    <div className="flex gap-2">
      {CONVERSATION_FILTERS.map((filter) => {
        const isActive = filter.value === activeFilter;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              isActive
                ? "border-primary bg-primary/15 text-primary-light"
                : "border-border bg-surface text-text-secondary hover:bg-surface-hover",
            )}
          >
            {filter.label}
            {filter.value === "unread" && unreadCount > 0 && (
              <span className="font-bold opacity-80">{unreadCount}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}