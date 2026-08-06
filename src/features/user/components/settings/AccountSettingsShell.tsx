"use client";

import { useAccountInfoForm } from "../../hooks/settings/useAccountInfoForm";
import { useChangeEmailForm } from "../../hooks/settings/useChangeEmailForm";
import { useChangePasswordForm } from "../../hooks/settings/useChangePasswordForm";
import { useConnectedAccounts } from "../../hooks/settings/useConnectedAccounts";
import { useDeactivateAccount } from "../../hooks/settings/useDeactivateAccount";
import { useDisplaySettings } from "../../hooks/settings/useDisplaySettings";
import { usePrivacySettings } from "../../hooks/settings/usePrivacySettings";
import { useSecuritySettings } from "../../hooks/settings/useSecuritySettings";
import { useSessions } from "../../hooks/settings/useSessions";
// Reuses the overview view's data hook — same feature, different view.
import { useProfileData } from "../../hooks/overview/useProfileData";

import { ActiveSessionsSection } from "./ActiveSessionsSection";
import { ChangeEmailSection } from "./ChangeEmailSection";
import { ChangePasswordSection } from "./ChangePasswordSection";
import { ConnectedAccountsSection } from "./ConnectedAccountsSection";
import { DeactivateAccountSection } from "./DeactivateAccountSection";
import { DisplayPreferencesSection } from "./DisplayPreferencesSection";
import { LoginAlertsSection } from "./LoginAlertsSection";
import { MessagingSection } from "./MessagingSection";
import { OnlineStatusSection } from "./OnlineStatusSection";
import { ProfileInformationSection } from "./ProfileInformationSection";
import { ProfileVisibilitySection } from "./ProfileVisibilitySection";
import { TwoFactorSection } from "./TwoFactorSection";
import type { ProfileData } from "../../types/profile.types";

export interface AccountSettingsShellProps {
  username: string;
}

export function AccountSettingsShell({ username }: AccountSettingsShellProps) {
  const { profile, isLoading, error } = useProfileData(username);

  if (isLoading || !profile) {
    return <p className="text-sm text-text-muted">Loading settings…</p>;
  }
  if (error) {
    return <p className="text-sm text-danger">{error}</p>;
  }

  return <AccountSettingsBody profile={profile} />;
}

// Split out for the same rules-of-hooks reason as EditProfileShell.
function AccountSettingsBody({ profile }: { profile: ProfileData }) {
  const accountInfoForm = useAccountInfoForm(profile);
  const display = useDisplaySettings();
  const security = useSecuritySettings();
  const sessions = useSessions();
  const privacy = usePrivacySettings();
  // TODO: pass the real current email once it's sourced from the auth/session layer.
  const changeEmailForm = useChangeEmailForm("");
  const changePasswordForm = useChangePasswordForm();
  const connectedAccounts = useConnectedAccounts();
  const deactivateForm = useDeactivateAccount();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ProfileInformationSection form={accountInfoForm} />
      <DisplayPreferencesSection theme={display.theme} onThemeChange={display.setTheme} />

      <TwoFactorSection
        enabled={security.twoFactorEnabled}
        isLoading={security.isLoading}
        onToggle={security.toggleTwoFactor}
      />
      <ActiveSessionsSection
        sessions={sessions.sessions}
        isLoading={sessions.isLoading}
        signingOutId={sessions.signingOutId}
        onSignOut={sessions.signOut}
      />
      <LoginAlertsSection
        enabled={security.loginAlertsEnabled}
        isLoading={security.isLoading}
        onToggle={security.toggleLoginAlerts}
      />

      <ProfileVisibilitySection
        visibility={privacy.visibility}
        onChange={privacy.setVisibility}
      />
      <MessagingSection messaging={privacy.messaging} onChange={privacy.setMessaging} />
      <OnlineStatusSection
        showOnlineStatus={privacy.showOnlineStatus}
        searchIndexing={privacy.searchIndexing}
        onToggleOnlineStatus={privacy.setShowOnlineStatus}
        onToggleSearchIndexing={privacy.setSearchIndexing}
      />

      <ChangeEmailSection form={changeEmailForm} />
      <ChangePasswordSection form={changePasswordForm} />
      <ConnectedAccountsSection
        providers={connectedAccounts.providers}
        isLoading={connectedAccounts.isLoading}
        connectingId={connectedAccounts.connectingId}
        onConnect={connectedAccounts.connect}
      />

      <DeactivateAccountSection form={deactivateForm} />
    </div>
  );
}
