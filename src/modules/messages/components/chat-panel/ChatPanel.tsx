import type { ChangeEvent } from "react";
import type { Conversation } from "../../types/conversation.types";
import type { Message } from "../../types/message.types";
import { ChatHeader } from "./ChatHeader";
import { MessageThread } from "./MessageThread";
import { MessageComposer } from "./composer/MessageComposer";

interface ChatPanelComposerProps {
  value: string;
  error: string | null;
  isSendDisabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect: (emoji: string) => void;
  onFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

interface ChatPanelProps {
  conversation: Conversation;
  messages: Message[];
  onBack: () => void;
  onToggleMute: () => void;
  onClearChat: () => void;
  onToggleBlock: () => void;
  composer: ChatPanelComposerProps;
}

export function ChatPanel({
  conversation,
  messages,
  onBack,
  onToggleMute,
  onClearChat,
  onToggleBlock,
  composer,
}: ChatPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        onToggleMute={onToggleMute}
        onClearChat={onClearChat}
        onToggleBlock={onToggleBlock}
      />
      <MessageThread conversation={conversation} messages={messages} />
      <MessageComposer
        value={composer.value}
        error={composer.error}
        isSendDisabled={composer.isSendDisabled}
        disabled={conversation.isBlocked}
        onChange={composer.onChange}
        onEmojiSelect={composer.onEmojiSelect}
        onFilesSelected={composer.onFilesSelected}
        onSend={composer.onSend}
      />
    </div>
  );
}