"use client";

import { useCallback, useEffect, useState } from "react";
import { useMessagesStore } from "../stores/messages.store";
import { getMessages, sendMessage as sendMessageRequest } from "../services/messages.service";

/**
 * Loads and manages the message thread for one conversation. Returns a
 * clean `sendMessage` / `clearChat` API so composer and header components
 * never touch the service or store directly.
 */
export function useMessageThread(conversationId: string | null) {
  const messagesByConversation = useMessagesStore((s) => s.messagesByConversation);
  const setMessagesForConversation = useMessagesStore((s) => s.setMessagesForConversation);
  const appendMessage = useMessagesStore((s) => s.appendMessage);
  const clearMessages = useMessagesStore((s) => s.clearMessages);

  const [isLoading, setIsLoading] = useState(false);

  const messages = conversationId ? messagesByConversation[conversationId] ?? [] : [];
  const isLoaded = conversationId ? conversationId in messagesByConversation : false;

  useEffect(() => {
    if (!conversationId || isLoaded) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    getMessages(conversationId).then((data) => {
      if (!cancelled) {
        setMessagesForConversation(conversationId, data);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [conversationId, isLoaded, setMessagesForConversation]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!conversationId) return;
      const message = await sendMessageRequest({ conversationId, text });
      appendMessage(conversationId, message);
    },
    [conversationId, appendMessage],
  );

  const clearChat = useCallback(() => {
    if (!conversationId) return;
    clearMessages(conversationId);
  }, [conversationId, clearMessages]);

  return { messages, isLoading, sendMessage, clearChat };
}