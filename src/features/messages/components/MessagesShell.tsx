"use client";

import { useConversations } from "../hooks/useConversations";
import { useMessageThread } from "../hooks/useMessageThread";
import { useMessageComposer } from "../hooks/useMessageComposer";
import { ConversationListPanel } from "./conversation-list/ConversationListPanel";
import { ChatPanel } from "./chat-panel/ChatPanel";
import { ChatEmptyState } from "./chat-panel/ChatEmptyState";
import { MobileBottomNav } from "./MobileBottomNav";
import { cn } from "../utils/cn";

/**
 * The only Client Component boundary in this feature and the only place
 * that calls hooks / touches the store. Everything below (ConversationListPanel,
 * ChatPanel, and their children) is pure presentation driven by props.
 *
 * Layout is a single responsive tree — not separate desktop/mobile trees —
 * switched purely with Tailwind's `lg:` breakpoint plus `activeConversationId`,
 * so there's no `matchMedia`/viewport JS and therefore no hydration mismatch.
 */
export function MessagesShell() {
  const {
    conversations,
    unreadCount,
    searchQuery,
    activeFilter,
    activeConversationId,
    activeConversation,
    setSearchQuery,
    setFilter,
    selectConversation,
    toggleMute,
    toggleBlock,
  } = useConversations();

  const { messages, sendMessage, clearChat } = useMessageThread(activeConversationId);

  const composer = useMessageComposer({ onSend: sendMessage });

  // No compose/new-conversation screen exists in the approved design —
  // intentional no-op stub rather than invented UI. Wire this up once
  // that screen is designed.
  function handleNewMessage() {}

  function handleBack() {
    selectConversation(null);
  }

  function handleToggleMute() {
    if (activeConversationId) toggleMute(activeConversationId);
  }

  function handleToggleBlock() {
    if (activeConversationId) toggleBlock(activeConversationId);
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[1600px] flex-col bg-bg lg:flex-row lg:overflow-hidden lg:shadow-xl">
      <aside
        className={cn(
          "w-full flex-col lg:w-[400px] lg:flex-shrink-0 lg:border-r lg:border-border",
          activeConversationId ? "hidden lg:flex" : "flex",
        )}
      >
        <div className="min-h-0 flex-1">
          <ConversationListPanel
            conversations={conversations}
            activeConversationId={activeConversationId}
            searchQuery={searchQuery}
            activeFilter={activeFilter}
            unreadCount={unreadCount}
            onSearchChange={setSearchQuery}
            onFilterChange={setFilter}
            onSelectConversation={selectConversation}
            onNewMessage={handleNewMessage}
          />
        </div>
        <MobileBottomNav onNewMessage={handleNewMessage} className="lg:hidden" />
      </aside>

      <section
        className={cn(
          "min-w-0 flex-col lg:flex-1",
          activeConversationId ? "flex" : "hidden lg:flex",
        )}
      >
        {activeConversation ? (
          <ChatPanel
            conversation={activeConversation}
            messages={messages}
            onBack={handleBack}
            onToggleMute={handleToggleMute}
            onClearChat={clearChat}
            onToggleBlock={handleToggleBlock}
            composer={{
              value: composer.value,
              error: composer.error,
              isSendDisabled: composer.isSendDisabled,
              onChange: composer.handleChange,
              onEmojiSelect: composer.handleEmojiSelect,
              onFilesSelected: composer.handleFilesSelected,
              onSend: composer.handleSend,
            }}
          />
        ) : (
          <ChatEmptyState onNewMessage={handleNewMessage} />
        )}
      </section>
    </div>
  );
}