import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  acceptConnectionRequest,
  blockUser,
  cancelConnectionRequest,
  declineConnectionRequest,
  removeConnection,
  reportUser,
  sendConnectionRequest,
} from "../../services/connection.service";
import type { ConnectionStatus } from "../../types/profile.types";

export interface UseProfileActionStateResult {
  status: ConnectionStatus;
  isMenuOpen: boolean;
  isBusy: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  connect: () => Promise<void>;
  cancelRequest: () => Promise<void>;
  accept: () => Promise<void>;
  decline: () => Promise<void>;
  remove: () => Promise<void>;
  block: () => Promise<void>;
  report: (reason?: string) => Promise<void>;
}

/**
 * NOTE: `initialStatus` should come from the real profile record
 * (see useProfileData) — never from user input. The mockup's demo
 * switcher for cycling statuses was preview-only and isn't reproduced.
 */
export function useProfileActionState(
  targetUserId: string,
  initialStatus: ConnectionStatus,
): UseProfileActionStateResult {
  const [status, setStatus] = useState<ConnectionStatus>(initialStatus);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Keep in sync if the underlying profile data changes (e.g. refetch).
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  // Close the dropdown on outside click — mirrors the mockup's behavior.
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  const runAction = useCallback(
    async (action: () => Promise<{ status: ConnectionStatus }>) => {
      setIsBusy(true);
      try {
        const result = await action();
        setStatus(result.status);
      } finally {
        setIsBusy(false);
        setIsMenuOpen(false);
      }
    },
    [],
  );

  const connect = useCallback(
    () => runAction(() => sendConnectionRequest(targetUserId)),
    [runAction, targetUserId],
  );
  const cancelRequest = useCallback(
    () => runAction(() => cancelConnectionRequest(targetUserId)),
    [runAction, targetUserId],
  );
  const accept = useCallback(
    () => runAction(() => acceptConnectionRequest(targetUserId)),
    [runAction, targetUserId],
  );
  const decline = useCallback(
    () => runAction(() => declineConnectionRequest(targetUserId)),
    [runAction, targetUserId],
  );
  const remove = useCallback(
    () => runAction(() => removeConnection(targetUserId)),
    [runAction, targetUserId],
  );
  const block = useCallback(
    () => runAction(() => blockUser(targetUserId)),
    [runAction, targetUserId],
  );
  const report = useCallback(
    async (reason?: string) => {
      setIsBusy(true);
      try {
        await reportUser(targetUserId, reason);
      } finally {
        setIsBusy(false);
        setIsMenuOpen(false);
      }
    },
    [targetUserId],
  );

  return {
    status,
    isMenuOpen,
    isBusy,
    menuRef,
    openMenu,
    closeMenu,
    toggleMenu,
    connect,
    cancelRequest,
    accept,
    decline,
    remove,
    block,
    report,
  };
}
