"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useMessagesStore } from "../stores/messages.store";
import { getConversations } from "../services/messages.service";
import type { ConversationFilter } from "../types/conversation.types";

/**
 * Loads conversations on mount and exposes the search/filter/selection API
 * that both the sidebar and the mobile list screen render from. Sorting and
 * filtering are derived here rather than stored, so the store stays plain
 * state instead of accumulating cached-and-possibly-stale derived data.
 */
export function useConversations() {
  const conversations = useMessagesStore((s) => s.conversations);
  const searchQuery = useMessagesStore((s) => s.searchQuery);
  const activeFilter = useMessagesStore((s) => s.activeFilter);
  const activeConversationId = useMessagesStore((s) => s.activeConversationId);

  const setConversations = useMessagesStore((s) => s.setConversations);
  const setSearchQuery = useMessagesStore((s) => s.setSearchQuery);
  const setFilter = useMessagesStore((s) => s.setFilter);
  const selectConversation = useMessagesStore((s) => s.selectConversation);
  const toggleMute = useMessagesStore((s) => s.toggleMute);
  const toggleBlock = useMessagesStore((s) => s.toggleBlock);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    getConversations().then((data) => {
      if (!cancelled) {
        setConversations(data);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
    // Intentionally run once on mount — this feature has no dependency that
    // should re-trigger a full conversation-list refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = useMemo(
    () => conversations.filter((c) => c.unreadCount > 0).length,
    [conversations],
  );

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return conversations
      .filter((c) => {
        if (activeFilter === "unread" && c.unreadCount === 0) return false;
        if (activeFilter === "groups" && c.type !== "group") return false;
        if (query && !c.name.toLowerCase().includes(query)) return false;
        return true;
      })
      .sort(
        (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
      );
  }, [conversations, activeFilter, searchQuery]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? null,
    [conversations, activeConversationId],
  );

  const handleSetFilter = useCallback(
    (filter: ConversationFilter) => setFilter(filter),
    [setFilter],
  );

  return {
    isLoading,
    conversations: filteredConversations,
    unreadCount,
    searchQuery,
    activeFilter,
    activeConversationId,
    activeConversation,
    setSearchQuery,
    setFilter: handleSetFilter,
    selectConversation,
    toggleMute,
    toggleBlock,
  };
}