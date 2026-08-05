// NOTE: apiRequest from "./apiClient" isn't imported yet — every function
// below is still mocked. Import it once the TODOs are wired to real routes.
import { simulateLatency } from "../lib/simulateLatency";
import type { ConnectionStatus } from "../types/profile.types";

export interface ConnectionActionResult {
  status: ConnectionStatus;
}

export async function sendConnectionRequest(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): POST /api/connections/:targetUserId/request
  void targetUserId;
  await simulateLatency();
  return { status: "pending" };
}

export async function cancelConnectionRequest(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): DELETE /api/connections/:targetUserId/request
  void targetUserId;
  await simulateLatency();
  return { status: "not_connected" };
}

export async function acceptConnectionRequest(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): POST /api/connections/:targetUserId/accept
  void targetUserId;
  await simulateLatency();
  return { status: "connected" };
}

export async function declineConnectionRequest(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): POST /api/connections/:targetUserId/decline
  void targetUserId;
  await simulateLatency();
  return { status: "not_connected" };
}

export async function removeConnection(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): DELETE /api/connections/:targetUserId
  void targetUserId;
  await simulateLatency();
  return { status: "not_connected" };
}

export async function blockUser(
  targetUserId: string,
): Promise<ConnectionActionResult> {
  // TODO(express-integration): POST /api/users/:targetUserId/block
  // NOTE: our ConnectionStatus union doesn't have a "blocked" state yet —
  // add one if the product needs the UI to reflect it distinctly.
  void targetUserId;
  await simulateLatency();
  return { status: "not_connected" };
}

export async function reportUser(
  targetUserId: string,
  reason?: string,
): Promise<{ success: boolean }> {
  // TODO(express-integration): POST /api/users/:targetUserId/report
  void targetUserId;
  void reason;
  await simulateLatency();
  return { success: true };
}
