import { MessageCircle } from "lucide-react";

interface ChatEmptyStateProps {
  onNewMessage: () => void;
}

export function ChatEmptyState({ onNewMessage }: ChatEmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-bg px-10 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] shadow-lg">
        <MessageCircle className="h-[42px] w-[42px] text-white" />
      </div>
      <h3 className="text-xl font-bold text-text">Select a conversation</h3>
      <p className="max-w-xs text-sm text-text-muted">
        Choose someone from your list on the left, or start a brand new conversation.
      </p>
      <button
        type="button"
        onClick={onNewMessage}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-text-on-primary shadow-sm transition-colors hover:bg-primary-hover"
      >
        + New Message
      </button>
    </div>
  );
}