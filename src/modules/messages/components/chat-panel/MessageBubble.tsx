import { Check } from "lucide-react";
import type { Message } from "../../types/message.types";
import { formatMessageClock } from "../../lib/formatConversationTime";
import { cn } from "../../utils/cn";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.sender === "me";

  return (
    <div className={cn("flex", isMine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5 shadow-xs",
          isMine
            ? "rounded-br-[4px] bg-primary text-text-on-primary"
            : "rounded-bl-[4px] bg-surface text-text",
        )}
      >
        {message.variant === "code" && message.code ? (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div
              className={cn(
                "border-b px-3 py-1.5 font-mono text-[11px]",
                isMine
                  ? "border-white/10 bg-black/10 text-text-on-primary/80"
                  : "border-border bg-bg-elevated text-text-muted",
              )}
            >
              {message.code.fileName}
            </div>
            <pre
              className={cn(
                "overflow-x-auto px-3 py-2.5 font-mono text-xs leading-relaxed",
                isMine ? "bg-black/10 text-text-on-primary" : "bg-bg-elevated text-text",
              )}
            >
              <code>{message.code.content}</code>
            </pre>
          </div>
        ) : (
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {message.text}
          </p>
        )}

        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[10px]",
            isMine ? "text-text-on-primary/70" : "text-text-muted",
          )}
        >
          {formatMessageClock(message.createdAt)}
          {isMine && <Check className="h-3 w-3" />}
        </div>
      </div>
    </div>
  );
}