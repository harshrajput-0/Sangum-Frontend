"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * NOTE: this is intentionally duplicated from the equivalent hook in
 * `features/messages`. Once a third feature needs it, promote a single
 * copy to `shared/hooks/useClickOutside.ts` and update both imports.
 */
export function useClickOutside<T extends HTMLElement>(
  onOutsideClick: () => void,
  enabled: boolean = true
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [onOutsideClick, enabled]);

  return ref;
}