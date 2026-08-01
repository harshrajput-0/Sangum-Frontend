/**
 * Domain types for individual messages within a conversation thread.
 */

export type MessageSender = "me" | "contact";

export type MessageStatus = "sent" | "delivered" | "read";

export type MessageVariant = "text" | "code";

export interface CodePayload {
  fileName: string;
  content: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  variant: MessageVariant;
  /** Present when variant === "text". */
  text?: string;
  /** Present when variant === "code". */
  code?: CodePayload;
  /** ISO timestamp. */
  createdAt: string;
  status: MessageStatus;
}