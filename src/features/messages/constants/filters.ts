import type { ConversationFilter } from "../types/conversation.types";

export interface FilterOption {
  value: ConversationFilter;
  label: string;
}

/**
 * Order matches the approved design: All, Unread, Groups.
 * "Unread" and "Groups" don't carry a static count here — the count shown
 * next to "Unread" in the UI is derived live from conversation state
 * (see hooks/useConversations.ts) rather than hardcoded.
 */
export const CONVERSATION_FILTERS: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "groups", label: "Groups" },
];