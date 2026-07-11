import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LegalDoc {
  title: string;
  description: string;
  to: string;
  iconColor: string;
  iconBg: string;
  icon: ReactNode;
}

const legalDocs: LegalDoc[] = [
  {
    title: "Terms of Service",
    description: "The rules and guidelines for using Sangum and our platform.",
    to: "/legal/terms",
    iconColor: "var(--brand-purple-light)",
    iconBg: "rgba(109,93,254,0.15)",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
      </>
    ),
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information.",
    to: "/legal/privacy",
    iconColor: "var(--info)",
    iconBg: "rgba(59,130,246,0.15)",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "Disclaimer",
    description: "Information provided on Sangum is for general purposes only.",
    to: "/legal/disclaimer",
    iconColor: "var(--warning)",
    iconBg: "rgba(245,158,11,0.15)",
    icon: (
      <>
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </>
    ),
  },
  {
    title: "Cookie Policy",
    description: "Learn about the cookies we use and how to manage your choices.",
    to: "/legal/cookies",
    iconColor: "var(--success)",
    iconBg: "rgba(34,197,94,0.15)",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="9" r="1" />
        <circle cx="14" cy="11" r="1" />
      </>
    ),
  },
];

export default function LegalHubPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-4 pt-[60px] pb-10 text-center md:px-6">
        <span className="mb-2.5 block text-(length:--fs-xs) font-bold uppercase tracking-[0.08em] text-brand-purple">
          Legal
        </span>
        <h1 className="mb-3.5 text-[28px] font-bold leading-tight tracking-[-0.02em] text-text md:text-[36px]">
          Legal documents and policies
        </h1>
        <p className="mx-auto max-w-[480px] text-(length:var--fs-base) text-text-secondary mb-10">
          Important information about your rights, our policies, and how we operate.
        </p>
      </section>

      {/* Doc cards */}
      <section className="mx-auto mb-20 max-w-[1280px] px-4 md:px-6 ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {legalDocs.map((doc) => (
            <div
              key={doc.title}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div
                className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-md"
                style={{ background: doc.iconBg, color: doc.iconColor }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {doc.icon}
                </svg>
              </div>
              <span className="mb-1.5 block text-(length:--fs-lg) font-semibold text-text">
                {doc.title}
              </span>
              <p className="mb-3 text-(length:--fs-xs) text-text-muted">
                {doc.description}
              </p>
              <Link
                to={doc.to}
                className="text-(length:--fs-xs) font-medium text-brand-purple hover:underline"
              >
                Read {doc.title} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}