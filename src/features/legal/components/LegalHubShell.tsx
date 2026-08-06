import Link from "next/link";
import type { ReactNode } from "react";

export interface LegalHubLink {
  /** Route to the article page, e.g. "/legal/terms-of-service" */
  href: string;
  title: string;
  description: string;
  /** 17x17 stroke icon (svg). Falls back to a plain glyph box if omitted via `glyph`. */
  icon?: ReactNode;
  /** Short text glyph (e.g. "©", "™") used instead of an icon. */
  glyph?: string;
}

export interface LegalHubGroup {
  title: string;
  links: LegalHubLink[];
}

export interface LegalHubProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  groups: LegalHubGroup[];
}

const ArrowIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="mt-1 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary-light"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function LegalHubRow({ href, title, description, icon, glyph }: LegalHubLink) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 p-5 transition-colors hover:bg-surface-hover hover:border-text-disabled"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold text-text-muted transition-colors group-hover:border-text-muted hover:border-border-strong">
        {icon ?? glyph}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-sm font-semibold text-text">{title}</h3>
        <p className="text-xs leading-relaxed text-text-muted">{description}</p>
      </div>
      <ArrowIcon />
    </Link>
  );
}

/**
 * Landing page listing every legal document, grouped by category.
 * Pass `groups` to control which links are shown; each link should point
 * at a route rendered by a `page.tsx` that wraps `ArticleLayout`.
 */
export default function LegalHub({
  eyebrow = "Legal",
  title = "Legal documents",
  description = "Important information about your rights, our policies, and how we operate.",
  groups,
}: LegalHubProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-10">
       <span className="mb-3 block text-xs uppercase tracking-wide font-bold text-primary">
          {eyebrow}
        </span>
        <h1 className="mb-3 font-heading text-3xl font-bold text-text sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-lg text-md leading-relaxed text-text-secondary">{description}</p>
      </div>
      <hr className="mb-12 border-border" />

      {groups.map((group, i) => (
        <div key={group.title} className={i === groups.length - 1 ? "" : "mb-10"}>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
            {group.title}
          </h2>
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {group.links.map((link) => (
              <LegalHubRow key={link.href} {...link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}