import { ContactForm } from "./components/contact/ContactForm";

export function ContactPage() {


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

 <ContactForm />

      <div className="border-t border-border py-8 mt-2">
        <h2 className="font-heading text-base font-bold text-text mb-3">Prefer email?</h2>
        <p className="text-sm leading-relaxed text-text-muted mb-4 max-w-120">
          Skip the form and write directly — it goes to the same inbox I
          check every day.
        </p>
        <a
          href="mailto:sangum.dev@proton.me"
          className="inline-flex items-center gap-2 font-heading text-base font-semibold text-text border-b border-border-strong pb-0.5 hover:text-accent hover:border-accent transition-colors"
        >
          sangum.dev@proton.me
        </a>
      </div>

      <p className="text-sm text-text-disabled">
        I try to reply within a few days. I&apos;m one person, so bear with
        me if it takes a bit longer sometimes.
      </p>
    </div>
  );
}