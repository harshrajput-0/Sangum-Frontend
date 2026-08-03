/**
 * Domain types for individual messages within a conversation thread.
 */

export type MessageSender = "me" | "contact";

export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  text: string;
  /** ISO timestamp. */
  createdAt: string;
  status: MessageStatus;
}