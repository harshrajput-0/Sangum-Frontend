import type { DeactivateOption } from "../types/profile.types";

/**
 * Pure copy derivation for the Deactivate Account flow.
 * Mirrors the two text variants driven by sgSelectDeactivateOption in the mockup.
 */

export function getDeactivateConfirmText(option: DeactivateOption): string {
  return option === "permanent"
    ? "I understand this will permanently delete my account and all my data after 30 days. This cannot be undone."
    : "I understand this will deactivate my account and hide my content until I sign back in.";
}

export function getDeactivateSubmitLabel(option: DeactivateOption): string {
  return option === "permanent"
    ? "Delete Account Permanently"
    : "Deactivate Account";
}
