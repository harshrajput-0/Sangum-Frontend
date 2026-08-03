"use client";

import { useEffect, useRef } from "react";
import type { Conversation } from "../../types/conversation.types";
import type { Message } from "../../types/message.types";
import { formatDateDividerLabel, groupByCalendarDay } from "../../lib/formatConversationTime";
import { DateDivider } from "./DateDivider";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface MessageThreadProps {
  conversation: Conversation;
  messages: Message[];
}

export function MessageThread({ conversation, messages }: MessageThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const dayGroups = groupByCalendarDay(messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, conversation.isTyping]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-bg px-4 py-5 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        {dayGroups.map((group) => (
          <div key={group.dayKey} className="flex flex-col gap-4">
            <DateDivider label={formatDateDividerLabel(group.items[0].createdAt)} />
            {group.items.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        ))}

        {conversation.isTyping && (
          <TypingIndicator
            avatarInitials={conversation.avatarInitials}
            avatarColor={conversation.avatarColor}
            avatarRounded={conversation.avatarRounded}
          />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}