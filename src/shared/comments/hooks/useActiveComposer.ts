'use client';

import { useCallback, useEffect } from 'react';
import { useActiveComposerStore } from '../stores/activeComposer.store';

/** Coordinates one composer instance (top-level or reply) with the page-wide "only one open at a time" rule. */
export function useActiveComposer(composerId: string) {
  const activeComposerId = useActiveComposerStore((s) => s.activeComposerId);
  const setActive = useActiveComposerStore((s) => s.setActive);
  const clear = useActiveComposerStore((s) => s.clear);

  const isActive = activeComposerId === composerId;
  const activate = useCallback(() => setActive(composerId), [composerId, setActive]);
  const deactivate = useCallback(() => clear(composerId), [composerId, clear]);

  useEffect(() => {
    // Clean up on unmount so a stale id never blocks a future composer.
    return () => clear(composerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [composerId]);

  return { isActive, activate, deactivate } as const;
}