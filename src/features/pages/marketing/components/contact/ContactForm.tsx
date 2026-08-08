"use client";

import { Send } from "lucide-react";

import { useContactForm } from "./useContactForm";

export const ContactForm = () => {
  const { values, status, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-text-secondary mb-2"
        >
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
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-text-secondary mb-2"
        >
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
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-text-secondary mb-2"
        >
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
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-default text-white rounded-md px-6 py-3 text-sm font-semibold transition-colors active:translate-y-px"
      >
        <span>
          {status === "sending"
            ? "Sending..."
            : status === "success"
              ? "Sent"
              : "Send message"}
        </span>
        <Send
          className={`w-3.75 h-3.75 transition-transform duration-300 ${
            status === "success" ? "translate-x-0.75 -translate-y-0.75" : ""
          }`}
        />
      </button>

      <div
        className={`mt-4 text-sm min-h-4.5 ${
          status === "success" ? "text-accent" : "text-text-muted"
        }`}
      >
        {status === "success" &&
          "Thanks — got it. I'll get back to you personally."}
        {status === "error" && "Something went wrong. Please try again."}
      </div>
    </form>
  );
};
