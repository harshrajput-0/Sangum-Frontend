/**
 * NEXT_PUBLIC_API_URL should be the bare backend origin — no /api/v1 —
 * since that's what the rest of the app (contact, waitlist) already
 * expects it to be:
 *
 *   NEXT_PUBLIC_API_URL=https://sangum.onrender.com
 *
 * Falls back to the documented local dev server's origin.
 *
 * Auth (and any other versioned module — user, messages, etc.) lives
 * under /api/v1, so that prefix is appended here in code rather than
 * baked into the env var, to avoid the two conflicting expectations
 * of the same variable.
 */
const API_ROOT = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
 
export const API_BASE_URL = `${API_ROOT}/api/v1`;