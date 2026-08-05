"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export interface ArticleSection {
  /** Used as the element id, TOC anchor, and scrollspy target. */
  id: string;
  /** TOC + heading label, e.g. "1. Introduction" */
  title: string;
  content: ReactNode;
}

export interface ArticleData {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  sections: ArticleSection[];
  backHref?: string;
  backLabel?: string;
}

export interface ArticleLayoutProps {
  data: ArticleData;
}

const SCROLLSPY_OFFSET = 110; // px — clears the sticky header + breathing room

/** Renders any legal/article document from structured `data`. */
export default function ArticleLayout({ data }: ArticleLayoutProps) {
  const {
    eyebrow = "Legal",
    title,
    lastUpdated,
    sections,
    backHref = "/legal",
    backLabel = "Back to Legal",
  } = data;

  const [activeId, setActiveId] = useState(sections[0]?.id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;
      let currentId = sections[0]?.id;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (!el) continue;
        if (el.getBoundingClientRect().top - SCROLLSPY_OFFSET <= 0) {
          currentId = section.id;
        } else {
          break;
        }
      }
      if (currentId) setActiveId(currentId);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveFromScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <Link
        href={backHref}
        className="mb-8 flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {backLabel}
      </Link>

      {/* mobile: jump-to-section dropdown */}
      <select
        value={activeId}
        onChange={(e) => scrollToSection(e.target.value)}
        className="mb-6 w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm text-text outline-none lg:hidden"
      >
        {sections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-wide text-text-muted">
            On this page
          </span>
          <ul className="space-y-0.5 border-l border-border">
            {sections.map((s) => {
              const active = s.id === activeId;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(s.id)}
                    className={`-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-sm transition-colors ${
                      active
                        ? "border-primary text-text"
                        : "border-transparent text-text-muted hover:text-text"
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <article className="min-w-0 max-w-170">
          <span className="mb-3 block text-xs font-medium uppercase tracking-wide text-text-muted">
            {eyebrow}
          </span>
          <h1 className="mb-2 font-heading text-3xl font-bold text-text sm:text-4xl">
            {title}
          </h1>
          <p className="mb-12 text-xs text-text-muted">Last updated: {lastUpdated}</p>

          <div className="space-y-12">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => {
                  sectionRefs.current[s.id] = el;
                }}
                className="scroll-mt-24"
              >
                <h2 className="mb-3 text-xl font-semibold text-text">{s.title}</h2>
                {s.content}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}