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
    <section id="waitlist" className="border-t border-[#313d4d] bg-[#0b0f14] py-16">
      <div className="mx-auto max-w-[680px] px-6 text-center">
        <SectionHeading
          eyebrow="Get in early"
          title="Want early access?"
          description="Be first in line when Sangum opens up."
          className="mb-8"
        />

        {status === 'submitted' ? (
          <p className="mx-auto max-w-[420px] rounded-[10px] border border-[#313d4d] bg-[#171d25] px-4 py-3 text-sm text-[#f8fafc]">
            Thanks — you&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-[200px] flex-1 rounded-[10px] border border-[#313d4d] bg-[#171d25] px-[14px] py-[13px] text-sm text-[#f8fafc] outline-none transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] placeholder:text-[#64748b] focus:border-[#6d5dfe]"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="whitespace-nowrap rounded-[10px] bg-[#6d5dfe] px-[22px] py-[13px] text-sm font-semibold text-white transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#5b4be8] disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Notify Me'}
            </button>
          </form>
        )}

        <div className="mt-4 text-xs text-[#64748b]">No spam, we promise. Unsubscribe anytime.</div>
      </div>
    </section>
  );
}