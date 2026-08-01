import { ChevronLeft } from "lucide-react";
import type { Conversation } from "../../types/conversation.types";
import { Avatar } from "../common/Avatar";
import { OverflowMenu, type OverflowMenuEntry } from "../common/OverflowMenu";

interface ChatHeaderProps {
  conversation: Conversation;
  onBack: () => void;
  onToggleMute: () => void;
  onClearChat: () => void;
  onToggleBlock: () => void;
}

export function ChatHeader({
  conversation,
  onBack,
  onToggleMute,
  onClearChat,
  onToggleBlock,
}: ChatHeaderProps) {
  const menuItems: OverflowMenuEntry[] = [
    { id: "view-contact", label: "View contact", onSelect: () => {} },
    { id: "search-in-conversation", label: "Search in conversation", onSelect: () => {} },
    {
      id: "mute",
      label: conversation.isMuted ? "Unmute notifications" : "Mute notifications",
      onSelect: onToggleMute,
    },
    { id: "clear-chat", label: "Clear chat", onSelect: onClearChat },
    { id: "divider-1", type: "divider" },
    {
      id: "block",
      label: conversation.isBlocked ? `Unblock ${conversation.name}` : `Block ${conversation.name}`,
      onSelect: onToggleBlock,
      variant: "danger",
    },
  ];

  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-border bg-bg-elevated px-4 py-3.5 lg:px-[22px]">
      <div className="flex min-w-0 items-center gap-2.5 lg:gap-3">
        <button
          type="button"
          aria-label="Back to conversation list"
          onClick={onBack}
          className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-surface-hover hover:text-text lg:hidden"
        >
          <ChevronLeft className="h-[18px] w-[18px]" />
        </button>

        <Avatar
          initials={conversation.avatarInitials}
          colorKey={conversation.avatarColor}
          rounded={conversation.avatarRounded}
          showStatusDot={conversation.isOnline}
        />

        <div className="min-w-0">
          <div className="truncate text-[15px] font-semibold text-text">{conversation.name}</div>
          {conversation.isOnline && (
            <div className="flex items-center gap-1.5 text-[11px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Online
            </div>
          )}
        </div>
      </div>

      <OverflowMenu ariaLabel="Conversation options" items={menuItems} size="sm" />
    </div>
  );
}