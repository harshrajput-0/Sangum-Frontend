import { useCallback, useEffect, useState } from "react";
import {
  fetchSecuritySettings,
  updateSecuritySettings,
} from "../../services/settings.service";

export interface UseSecuritySettingsResult {
  twoFactorEnabled: boolean;
  loginAlertsEnabled: boolean;
  isLoading: boolean;
  isSaving: boolean;
  toggleTwoFactor: (enabled: boolean) => void;
  toggleLoginAlerts: (enabled: boolean) => void;
}

export function useSecuritySettings(): UseSecuritySettingsResult {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSecuritySettings()
      .then((data) => {
        if (cancelled) return;
        setTwoFactorEnabled(data.twoFactorEnabled);
        setLoginAlertsEnabled(data.loginAlertsEnabled);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleTwoFactor = useCallback((enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    setIsSaving(true);
    updateSecuritySettings({ twoFactorEnabled: enabled }).finally(() =>
      setIsSaving(false),
    );
  }, []);

  const toggleLoginAlerts = useCallback((enabled: boolean) => {
    setLoginAlertsEnabled(enabled);
    setIsSaving(true);
    updateSecuritySettings({ loginAlertsEnabled: enabled }).finally(() =>
      setIsSaving(false),
    );
  }, []);

  return {
    twoFactorEnabled,
    loginAlertsEnabled,
    isLoading,
    isSaving,
    toggleTwoFactor,
    toggleLoginAlerts,
  };
}
