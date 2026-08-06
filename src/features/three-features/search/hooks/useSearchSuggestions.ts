"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { searchSuggestions } from "../services/search.service";
import type { SearchResultItem, SearchSuggestionsResult } from "../types/search.types";

const DEBOUNCE_MS = 250;
const EMPTY_RESULTS: SearchSuggestionsResult = { topSuggestions: [], people: [], communities: [] };

export function useSearchSuggestions() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchSuggestionsResult>(EMPTY_RESULTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closePanel = useCallback(() => setIsOpen(false), []);
  const panelRef = useClickOutside<HTMLDivElement>(closePanel, isOpen);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults(EMPTY_RESULTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchSuggestions(query);
      setResults(data);
      setIsLoading(false);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(true);
  }, []);

  const handleSelectResult = useCallback(
    (_item: SearchResultItem) => {
      closePanel();
    },
    [closePanel]
  );

  return {
    query,
    isOpen,
    isLoading,
    panelRef,
    topSuggestions: results.topSuggestions,
    people: results.people,
    communities: results.communities,
    handleQueryChange,
    handleSelectResult,
    closePanel,
  };
}