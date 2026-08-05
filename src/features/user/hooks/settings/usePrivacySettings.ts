import { useCallback, useEffect, useState } from "react";
import {
  fetchPrivacySettings,
  updatePrivacySettings,
} from "../../services/settings.service";
import type { MessagingOption, VisibilityOption } from "../../types/profile.types";

export interface UsePrivacySettingsResult {
  visibility: VisibilityOption;
  messaging: MessagingOption;
  showOnlineStatus: boolean;
  searchIndexing: boolean;
  isLoading: boolean;
  setVisibility: (value: VisibilityOption) => void;
  setMessaging: (value: MessagingOption) => void;
  setShowOnlineStatus: (value: boolean) => void;
  setSearchIndexing: (value: boolean) => void;
}

export function usePrivacySettings(): UsePrivacySettingsResult {
  const [visibility, setVisibilityState] = useState<VisibilityOption>("public");
  const [messaging, setMessagingState] = useState<MessagingOption>("followers");
  const [showOnlineStatus, setShowOnlineStatusState] = useState(true);
  const [searchIndexing, setSearchIndexingState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPrivacySettings()
      .then((data) => {
        if (cancelled) return;
        setVisibilityState(data.visibility);
        setMessagingState(data.messaging);
        setShowOnlineStatusState(data.showOnlineStatus);
        setSearchIndexingState(data.searchIndexing);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setVisibility = useCallback((value: VisibilityOption) => {
    setVisibilityState(value);
    updatePrivacySettings({ visibility: value });
  }, []);

  const setMessaging = useCallback((value: MessagingOption) => {
    setMessagingState(value);
    updatePrivacySettings({ messaging: value });
  }, []);

  const setShowOnlineStatus = useCallback((value: boolean) => {
    setShowOnlineStatusState(value);
    updatePrivacySettings({ showOnlineStatus: value });
  }, []);

  const setSearchIndexing = useCallback((value: boolean) => {
    setSearchIndexingState(value);
    updatePrivacySettings({ searchIndexing: value });
  }, []);

  return {
    visibility,
    messaging,
    showOnlineStatus,
    searchIndexing,
    isLoading,
    setVisibility,
    setMessaging,
    setShowOnlineStatus,
    setSearchIndexing,
  };
}
