import type { Conversation } from "../types/conversation.types";
import type { Message } from "../types/message.types";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../lib/mockData";

/**
 * External-communication boundary for the Messages feature.
 *
 * There is no backend yet, so every function reads from the in-memory mock
 * dataset. The async signatures are deliberate: swapping the bodies for
 * `fetch(...)` calls later requires no changes in hooks/stores that consume
 * this service.
 */

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export async function getConversations(): Promise<Conversation[]> {
  return clone(MOCK_CONVERSATIONS);
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  return clone(MOCK_MESSAGES[conversationId] ?? []);
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  return {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    conversationId: payload.conversationId,
    sender: "me",
    text: payload.text,
    createdAt: new Date().toISOString(),
    status: "sent",
  };
}