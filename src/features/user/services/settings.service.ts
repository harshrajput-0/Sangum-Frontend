// NOTE: apiRequest from "./apiClient" isn't imported yet — every function
// below is still mocked. Import it once the TODOs are wired to real routes.
import { simulateLatency } from "../lib/simulateLatency";
import type {
  ConnectedProvider,
  ConnectedProviderId,
  MessagingOption,
  SessionInfo,
  VisibilityOption,
} from "../types/profile.types";

/* ============================================================
 * Privacy
 * ============================================================ */

export interface PrivacySettings {
  visibility: VisibilityOption;
  messaging: MessagingOption;
  showOnlineStatus: boolean;
  searchIndexing: boolean;
}

export async function fetchPrivacySettings(): Promise<PrivacySettings> {
  // TODO(express-integration): GET /api/users/me/privacy-settings
  await simulateLatency();
  return {
    visibility: "public",
    messaging: "followers",
    showOnlineStatus: true,
    searchIndexing: false,
  };
}

export async function updatePrivacySettings(
  payload: Partial<PrivacySettings>,
): Promise<Partial<PrivacySettings>> {
  // TODO(express-integration): PATCH /api/users/me/privacy-settings
  await simulateLatency();
  return payload;
}

/* ============================================================
 * Security — 2FA + login alerts are marked "Coming Soon" in the
 * mockup: no field/logic exists in auth.service yet.
 * ============================================================ */

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlertsEnabled: boolean;
}

export async function fetchSecuritySettings(): Promise<SecuritySettings> {
  // TODO(coming-soon): no 2FA or login-alert field exists in auth.service yet.
  // GET /api/users/me/security-settings once it does.
  await simulateLatency();
  return { twoFactorEnabled: true, loginAlertsEnabled: true };
}

export async function updateSecuritySettings(
  payload: Partial<SecuritySettings>,
): Promise<Partial<SecuritySettings>> {
  // TODO(coming-soon): PATCH /api/users/me/security-settings
  await simulateLatency();
  return payload;
}

/* ============================================================
 * Active sessions — "Coming Soon": account.model currently stores
 * a single refreshToken, not a list of sessions/devices.
 * ============================================================ */

const MOCK_SESSIONS: SessionInfo[] = [
  {
    id: "session_1",
    deviceLabel: "Chrome on Windows",
    locationLabel: "Jaipur, India",
    lastActiveLabel: "Active now",
    isCurrentDevice: true,
  },
  {
    id: "session_2",
    deviceLabel: "Safari on iPhone",
    locationLabel: "Jaipur, India",
    lastActiveLabel: "2 hours ago",
    isCurrentDevice: false,
  },
  {
    id: "session_3",
    deviceLabel: "Firefox on macOS",
    locationLabel: "Mumbai, India",
    lastActiveLabel: "3 days ago",
    isCurrentDevice: false,
  },
];

export async function fetchActiveSessions(): Promise<SessionInfo[]> {
  // TODO(coming-soon): requires a sessions/devices table, not just a single
  // refreshToken on the account model. GET /api/users/me/sessions once it exists.
  await simulateLatency();
  return MOCK_SESSIONS;
}

export async function signOutSession(
  sessionId: string,
): Promise<{ success: boolean }> {
  // TODO(coming-soon): DELETE /api/users/me/sessions/:sessionId
  void sessionId;
  await simulateLatency();
  return { success: true };
}

/* ============================================================
 * Connected accounts — "Coming Soon": handleOAuthLogin() only
 * auto-links a provider during LOGIN, not from an already-signed-in
 * Settings screen.
 * ============================================================ */

const MOCK_CONNECTED_PROVIDERS: ConnectedProvider[] = [
  { id: "google", label: "Google", connected: true },
  { id: "github", label: "GitHub", connected: false },
  { id: "linkedin", label: "LinkedIn", connected: false },
];

export async function fetchConnectedAccounts(): Promise<ConnectedProvider[]> {
  // TODO(coming-soon): GET /api/users/me/connected-accounts
  await simulateLatency();
  return MOCK_CONNECTED_PROVIDERS;
}

export async function connectProvider(
  providerId: ConnectedProviderId,
): Promise<{ success: boolean }> {
  // TODO(coming-soon): there's no "connect a provider while already signed in"
  // flow in auth.service yet — only login-time auto-linking exists.
  void providerId;
  await simulateLatency();
  return { success: true };
}
