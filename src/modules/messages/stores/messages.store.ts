import { create } from "zustand";
import type { Conversation, ConversationFilter } from "../types/conversation.types";
import type { Message } from "../types/message.types";

/**
 * Shared state for the Messages feature.
 *
 * This lives in Zustand (rather than local component state) specifically
 * because `activeConversationId` and the conversation/message data need to
 * be read by multiple, non-nested parts of the tree at once: the
 * conversation list, the chat panel, and — on small screens — whichever of
 * those two is currently visible. Kept to state + plain setters; the
 * hooks layer (see hooks/) is where orchestration and business rules live.
 */
interface MessagesState {
  conversations: Conversation[];
  messagesByConversation: Record<string, Message[]>;
  activeConversationId: string | null;
  searchQuery: string;
  activeFilter: ConversationFilter;

  setConversations: (conversations: Conversation[]) => void;
  setMessagesForConversation: (conversationId: string, messages: Message[]) => void;
  appendMessage: (conversationId: string, message: Message) => void;
  clearMessages: (conversationId: string) => void;
  selectConversation: (conversationId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: ConversationFilter) => void;
  toggleMute: (conversationId: string) => void;
  toggleBlock: (conversationId: string) => void;
  markConversationRead: (conversationId: string) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: [],
  messagesByConversation: {},
  activeConversationId: null,
  searchQuery: "",
  activeFilter: "all",

  setConversations: (conversations) => set({ conversations }),

  setMessagesForConversation: (conversationId, messages) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: messages,
      },
    })),

  appendMessage: (conversationId, message) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: [...(state.messagesByConversation[conversationId] ?? []), message],
      },
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessageAt: message.createdAt,
              lastMessagePreview:
                message.variant === "code"
                  ? message.code?.fileName ?? "Code snippet"
                  : message.text ?? "",
              lastMessagePreviewIcon: null,
            }
          : c,
      ),
    })),

  clearMessages: (conversationId) =>
    set((state) => ({
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: [],
      },
    })),

  selectConversation: (conversationId) =>
    set((state) => ({
      activeConversationId: conversationId,
      conversations:
        conversationId === null
          ? state.conversations
          : state.conversations.map((c) =>
              c.id === conversationId ? { ...c, unreadCount: 0 } : c,
            ),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilter: (filter) => set({ activeFilter: filter }),

  toggleMute: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, isMuted: !c.isMuted } : c,
      ),
    })),

  toggleBlock: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, isBlocked: !c.isBlocked } : c,
      ),
    })),

  markConversationRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c,
      ),
    })),
}));