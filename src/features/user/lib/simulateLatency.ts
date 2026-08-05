/**
 * Simulates network latency for service placeholders so loading states
 * (spinners, skeletons) can be developed/tested before a real backend exists.
 * Delete usages of this once real fetch calls replace the mocks.
 */
export function simulateLatency(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
