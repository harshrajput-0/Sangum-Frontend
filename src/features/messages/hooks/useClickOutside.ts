"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Calls `onOutside` when a pointer event lands outside `ref.current`.
 * `enabled` lets callers skip attaching the listener entirely when the
 * target (e.g. a closed dropdown) isn't visible.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: PointerEvent) {
      const node = ref.current;
      if (node && !node.contains(event.target as Node)) {
        onOutside();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, onOutside, enabled]);
}