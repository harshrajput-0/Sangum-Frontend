'use client';

import { useState, type FormEvent } from 'react';
import SectionHeading from './SectionHeading';

/**
 * Example email signup. Swap the `handleSubmit` body for a real call to
 * your API route / mailing-list provider (e.g. POST /api/waitlist).
 */
export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    try {
      // Example: replace with your real endpoint.
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus('submitted');
    } catch {
      setStatus('idle');
    }
  }

  return (
    <section id="waitlist" className="border-t border-dborder  py-16">
      <div className="mx-auto max-w-170 px-6 text-center">
        <SectionHeading
          eyebrow="Get in early"
          title="Want early access?"
          description="Be first in line when Sangum opens up."
          className="mb-8"
        />

        {status === 'submitted' ? (
          <p className="mx-auto max-w-105 rounded-md border border-dborder bg-dsurface px-4 py-3 text-sm text-dtext">
            Thanks — you&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-105 flex-wrap justify-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-50 flex-1 rounded-md border border-dborder bg-dsurface px-3.5 py-3.25 text-sm text-dtext outline-none transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] placeholder:text-dtext-disabled focus:border-[#6d5dfe]"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="whitespace-nowrap rounded-md bg-[#6d5dfe] px-5.5 py-3.25 text-sm font-semibold text-white transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#5b4be8] disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Notify Me'}
            </button>
          </form>
        )}

        <div className="mt-4 text-xs text-dtext-disabled">No spam, we promise. Unsubscribe anytime.</div>
      </div>
    </section>
  );
}