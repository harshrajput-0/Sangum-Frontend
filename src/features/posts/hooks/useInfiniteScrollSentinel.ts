import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a sentinel element and fires
 * onIntersect when it scrolls into view. Kept local to this feature
 * (only Feed needs it right now) rather than promoted to shared.
 */
export function useInfiniteScrollSentinel<T extends HTMLElement>(onIntersect: () => void, isActive: boolean) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) onIntersect();
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect, isActive]);

  return ref;
}