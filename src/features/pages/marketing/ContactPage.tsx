'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactPage() {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with useContactForm hook -> contact.service.ts
    setStatus('sent');
  };

  return (
    <div className="max-w-150 mx-auto px-6 py-10 pb-16">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4 leading-tight">
          Say hi.
        </h1>
        <p className="text-base leading-relaxed text-text-secondary max-w-120">
          There&apos;s no support team on the other end — just me. Send
          whatever it is, and I&apos;ll read it myself.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            value={values.name}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-md px-3.5 py-3 text-base text-text outline-none placeholder:text-text-disabled focus:border-primary transition-colors"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={values.email}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-md px-3.5 py-3 text-base text-text outline-none placeholder:text-text-disabled focus:border-primary transition-colors"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="message" className="block text-sm font-semibold text-text-secondary mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="What's on your mind?"
            required
            rows={6}
            value={values.message}
            onChange={handleChange}
            className="w-full min-h-35 bg-surface border border-border rounded-md px-3.5 py-3 text-base leading-relaxed text-text outline-none resize-y placeholder:text-text-disabled focus:border-primary transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sent'}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-default text-white rounded-md px-6 py-3 text-sm font-semibold transition-colors active:translate-y-px"
        >
          <span>{status === 'sent' ? 'Sent' : 'Send message'}</span>
          <Send
            className={`w-3.75 h-3.75 transition-transform duration-300 ${
              status === 'sent' ? 'translate-x-0.75 -translate-y-0.75' : ''
            }`}
          />
        </button>

        <div
          className={`mt-4 text-sm min-h-4.5 ${
            status === 'sent' ? 'text-accent' : 'text-text-muted'
          }`}
        >
          {status === 'sent' && "Thanks — got it. I'll get back to you personally."}
        </div>
      </form>

      <div className="border-t border-border py-8 mt-2">
        <h2 className="font-heading text-base font-bold text-text mb-3">Prefer email?</h2>
        <p className="text-sm leading-relaxed text-text-muted mb-4 max-w-120">
          Skip the form and write directly — it goes to the same inbox I
          check every day.
        </p>
        <a
          href="mailto:hello@sangum.app"
          className="inline-flex items-center gap-2 font-heading text-base font-semibold text-text border-b border-border-strong pb-0.5 hover:text-accent hover:border-accent transition-colors"
        >
          hello@sangum.app
        </a>
      </div>

      <p className="text-sm text-text-disabled">
        I try to reply within a few days. I&apos;m one person, so bear with
        me if it takes a bit longer sometimes.
      </p>
    </div>
  );
}