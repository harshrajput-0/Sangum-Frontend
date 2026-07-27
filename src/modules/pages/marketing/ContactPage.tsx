"use client";

import { useState } from "react";
import type { ReactNode, ChangeEvent, FormEvent } from "react";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactPageProps {
  /** Called with the form values on submit. Handle the actual network request here. */
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface ReachItem {
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: ReactNode;
}

const reachItems: ReachItem[] = [
  {
    title: "Email",
    description: "support@sangum.dev",
    iconBg: "rgba(109,93,254,0.15)",
    iconColor: "var(--primary-light)",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    title: "Live Chat",
    description: "Available Mon–Fri, 9am–6pm UTC",
    iconBg: "rgba(20,216,196,0.15)",
    iconColor: "var(--accent)",
    icon: <path d="M21 11.5a8.38 8.38 0 01-7.6 8.5" />,
  },
  {
    title: "Community",
    description: "Join the conversation, ask questions, and get help.",
    iconBg: "rgba(59,130,246,0.15)",
    iconColor: "var(--info)",
    icon: <path d="M17 20h5v-2a4 4 0 00-3-3.87" />,
  },
];

interface Faq {
  id: string;
  question: string;
  answer: string;
}

const faqs: Faq[] = [
  {
    id: "create-community",
    question: "How do I create a community?",
    answer:
      'Click the "+ Create" button in the top bar or visit the Communities page and select "Create Community." Fill in a name, description, and category, then choose whether it\'s public, restricted, or private.',
  },
  {
    id: "is-free",
    question: "Is Sangum free to use?",
    answer:
      "Yes — creating an account, joining communities, posting, and browsing resources are all free. A Pro plan with extra tools and analytics is available for power users and community owners.",
  },
  {
    id: "report-issue",
    question: "How do I report an issue?",
    answer:
      'Use the Report button found on any post, comment, or profile\'s "···" menu, or email support@sangum.dev with details and we\'ll take a look within 24 hours.',
  },
];

const inputClasses =
  "w-full rounded-sm border border-border bg-[var(--input-bg)] px-3.5 py-2.5 text-(length:--fs-sm) text-text placeholder:text-text-muted transition-colors focus:outline-none focus:border-[var(--primary)] focus:[box-shadow:var(--shadow-glow-purple)]";

function FaqAccordionItem({ faq, isOpen, onToggle }: { faq: Faq; isOpen: boolean; onToggle: () => void }) {

    usePageTitle("Contact Us — Sangum");
  
  return (
    <div className="mb-2.5 overflow-hidden rounded-lg border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-[18px] py-4 text-left"
      >
        <span className="text-(length:--fs-sm) text-text">{faq.question}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-[18px] pb-4 text-(length:--fs-xs) text-text-muted">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage({ onSubmit }: ContactPageProps) {

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(new Set());

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      setSubmitted(false);
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    try {
      setSubmitting(true);
      await onSubmit(values);
      setSubmitted(true);
      setValues(initialValues);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-4 pt-[60px] pb-10 md:px-6">
        <span className="mb-2.5 block text-(length:--fs-xs) font-bold uppercase tracking-[0.08em] text-(--primary-light)">
          Get In Touch
        </span>
        <h1 className="mb-3.5 text-[28px] font-bold leading-tight tracking-[-0.02em] text-text md:text-[36px]">
          We&apos;d love to hear from you
        </h1>
        <p className="max-w-[480px] text-(length:--fs-base) text-text-secondary">
          Have questions, suggestions, or just want to say hello? We&apos;re here to help!
        </p>
      </section>

      {/* Form + reach us */}
      <section className="mx-auto mb-[50px] max-w-[1280px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* Form card */}
          <div className="rounded-md border border-border bg-surface p-5">
            <span className="mb-4 block text-(length:--fs-lg) font-semibold text-text">
              Send us a message
            </span>
            <form onSubmit={handleSubmit}>
              <div className="mb-3.5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-(length:--fs-sm) font-medium text-text-secondary"
                  >
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    className={inputClasses}
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange("name")}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-(length:--fs-sm) font-medium text-text-secondary"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={inputClasses}
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
              </div>

              <label
                htmlFor="contact-subject"
                className="mb-2 block text-(length:--fs-sm) font-medium text-text-secondary"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                className={`${inputClasses} mb-3.5`}
                placeholder="How can we help?"
                value={values.subject}
                onChange={handleChange("subject")}
                required
              />

              <label
                htmlFor="contact-message"
                className="mb-2 block text-(length:--fs-sm) font-medium text-text-secondary"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                className={`${inputClasses} mb-4 min-h-[90px] resize-y`}
                placeholder="Type your message here…"
                value={values.message}
                onChange={handleChange("message")}
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-(length:--fs-sm) font-semibold text-white [box-shadow:var(--shadow-sm)] transition-colors hover:bg-(--primary-dark) disabled:cursor-not-allowed disabled:opacity-45"
              >
                {submitting ? "Sending…" : "Send Message →"}
              </button>

              <p className="mt-2.5 text-(length:--fs-xs) text-text-muted">
                {submitted
                  ? "Thanks — your message is on its way. We'll be in touch soon."
                  : "We typically respond within 24–48 hours."}
              </p>
            </form>
          </div>

          {/* Other ways to reach us */}
          <div className="rounded-lg border border-border bg-surface p-5">
            <span className="mb-4 block text-(length:--fs-lg) font-semibold text-text">
              Other ways to reach us
            </span>
            <div className="flex flex-col gap-4">
              {reachItems.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                    style={{ background: item.iconBg, color: item.iconColor }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <span className="block text-(length:--fs-sm) font-semibold text-text">
                      {item.title}
                    </span>
                    <p className="text-(length:--fs-xs) text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mb-[60px] max-w-[1280px] px-4 md:px-6">
        <span className="mb-4 block text-(length:--fs-xl) font-semibold text-text">
          Frequently asked questions
        </span>
        {faqs.map((faq) => (
          <FaqAccordionItem
            key={faq.id}
            faq={faq}
            isOpen={openFaqs.has(faq.id)}
            onToggle={() => toggleFaq(faq.id)}
          />
        ))}
      </section>
    </div>
  );
}