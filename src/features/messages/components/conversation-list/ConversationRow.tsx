import { BellOff, Check } from "lucide-react";
import type { Conversation } from "../../types/conversation.types";
import { formatConversationTimestamp } from "../../lib/formatConversationTime";
import { Avatar } from "../common/Avatar";
import { UnreadBadge } from "../common/UnreadBadge";
import { cn } from "../../utils/cn";

interface ConversationRowProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (conversationId: string) => void;
}

export function ConversationRow({ conversation, isActive, onSelect }: ConversationRowProps) {
  const isUnread = conversation.unreadCount > 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-2.5 py-[11px] text-left transition-colors",
        isActive ? "bg-primary/10" : "hover:bg-surface-hover",
      )}
    >
      <Avatar
        initials={conversation.avatarInitials}
        colorKey={conversation.avatarColor}
        rounded={conversation.avatarRounded}
        showStatusDot={conversation.isOnline}
      />

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[15px] font-semibold text-text">
            {conversation.name}
          </span>
          <span
            className={cn(
              "flex-shrink-0 text-[11px]",
              isUnread ? "font-bold text-primary-light" : "text-text-muted",
            )}
          >
            {formatConversationTimestamp(conversation.lastMessageAt)}
          </span>
        </span>

        <span className="mt-[3px] flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 truncate text-sm text-text-muted">
            {conversation.lastMessagePreviewIcon === "read" && (
              <Check className="h-[13px] w-[13px] flex-shrink-0" />
            )}
            {conversation.lastMessagePreviewIcon === "muted" && (
              <BellOff className="h-[13px] w-[13px] flex-shrink-0" />
            )}
            <span className="truncate">{conversation.lastMessagePreview}</span>
          </span>
          <UnreadBadge count={conversation.unreadCount} />
        </span>
      </span>
    </button>
  );
}