import type { Conversation, ConversationFilter } from "../../types/conversation.types";
import { ConversationListHeader } from "./ConversationListHeader";
import { ConversationSearchInput } from "./ConversationSearchInput";
import { ConversationFilterChips } from "./ConversationFilterChips";
import { ConversationRow } from "./ConversationRow";

interface ConversationListPanelProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  searchQuery: string;
  activeFilter: ConversationFilter;
  unreadCount: number;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: ConversationFilter) => void;
  onSelectConversation: (conversationId: string) => void;
  onNewMessage: () => void;
}

export function ConversationListPanel({
  conversations,
  activeConversationId,
  searchQuery,
  activeFilter,
  unreadCount,
  onSearchChange,
  onFilterChange,
  onSelectConversation,
  onNewMessage,
}: ConversationListPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-3.5 px-4 pb-3.5 pt-5">
        <ConversationListHeader onNewMessage={onNewMessage} />
        <ConversationSearchInput value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="px-4 pb-3.5">
        <ConversationFilterChips
          activeFilter={activeFilter}
          unreadCount={unreadCount}
          onChange={onFilterChange}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-3.5">
        {conversations.length === 0 ? (
          <p className="px-2 pt-6 text-center text-sm text-text-muted">
            No conversations match your search.
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {conversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onSelect={onSelectConversation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}