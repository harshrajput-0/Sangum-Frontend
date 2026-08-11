"use client"

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Detects whether a clamped block of text is overflowing, and
 * combines that with whether there's supplementary content (the
 * "Key Topics Covered" list) to decide if the more/less toggle
 * should show at all — matches the mock's initCardExtras() exactly:
 * needsHint = overflowing || hasTopicsBlock.
 */
export function useExcerptOverflow<T extends HTMLElement>(content: string, hasSupplementaryContent = false) {
  const ref = useRef<T | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
  }, [content]);

  const toggle = useCallback(() => setIsExpanded((v: any) => !v), []);

  return {
    ref,
    needsToggle: isOverflowing || hasSupplementaryContent,
    isExpanded,
    toggle,
  } as const;
}