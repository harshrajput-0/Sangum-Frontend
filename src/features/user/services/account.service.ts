// NOTE: apiRequest from "./apiClient" isn't imported yet — every function
// below is still mocked. Import it once the TODOs are wired to real routes.
import { simulateLatency } from "../lib/simulateLatency";
import type {
  AccountInfoFormData,
  ChangeEmailFormData,
  ChangePasswordFormData,
  DeactivateAccountFormData,
} from "../types/profile.types";

/* ============================================================
 * Account info — the small "Profile Information" card in Settings
 * (full name + username). Not marked "Coming Soon" in the mockup.
 * ============================================================ */

export async function updateAccountInfo(
  payload: Partial<AccountInfoFormData>,
): Promise<Partial<AccountInfoFormData>> {
  // TODO(express-integration): PATCH /api/users/me/account-info
  await simulateLatency();
  return payload;
}

/* ============================================================
 * Change email — "Coming Soon": auth.service's completeEmail() only
 * fires for accounts with NO email on file. There's no path today
 * to change an existing, already-verified email.
 * ============================================================ */

export async function changeEmail(
  payload: ChangeEmailFormData,
): Promise<{ success: boolean }> {
  // TODO(coming-soon): POST /api/auth/change-email once auth.service
  // supports changing an already-verified email.
  void payload;
  await simulateLatency();
  return { success: true };
}

/* ============================================================
 * Change password — "Coming Soon": only resetPassword() exists
 * (forgot-password token flow). No "change while logged in with
 * current-password verification" function yet.
 * ============================================================ */

export async function changePassword(
  payload: ChangePasswordFormData,
): Promise<{ success: boolean }> {
  // TODO(coming-soon): POST /api/auth/change-password once auth.service
  // supports current-password-verified changes for logged-in users.
  void payload;
  await simulateLatency();
  return { success: true };
}

/* ============================================================
 * Deactivate / delete account — "Coming Soon": neither user.service
 * nor auth.service has a deactivate/delete function yet — no
 * isActive=false path, no soft-delete, no 30-day grace-period job.
 * ============================================================ */

export async function deactivateAccount(
  payload: DeactivateAccountFormData,
): Promise<{ success: boolean }> {
  // TODO(coming-soon): POST /api/users/me/deactivate once a soft-delete /
  // grace-period job exists on the backend.
  void payload;
  await simulateLatency();
  return { success: true };
}
