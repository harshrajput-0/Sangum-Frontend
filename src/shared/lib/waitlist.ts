export type WaitlistResult = { ok: true } | { ok: false; error: string };

// Express backend lives on a separate port from Next.js — set this in
// .env.local. Must be prefixed with NEXT_PUBLIC_ so it's readable in
// browser-side code (this function runs client-side, in a form handler).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

/**
 * Shared submit logic for the waitlist form — used by both the hero
 * waitlist and the bottom WaitlistSection so there's a single place
 * that talks to POST /api/waitlist.
 */
export async function joinWaitlist(email: string): Promise<WaitlistResult> {
  try {
    const res = await fetch(`${API_URL}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      // Adjust this if your waitlistController returns errors in a
      // different shape (e.g. { errors: [...] } from the validate middleware).
      const data = await res.json().catch(() => null);
      return { ok: false, error: data?.message ?? 'Something went wrong. Please try again.' };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' };
  }
}