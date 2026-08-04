import Link from "next/link";
import { AUTH_ROUTES } from "../../constants/auth.constants";

const NAV_LINKS = ["Communities", "Resources", "About", "Pricing"];

export function PublicNav() {
  return (
    <nav className="flex items-center justify-between gap-4 border-b border-border/60 bg-bg/60 px-5 py-4 backdrop-blur-md sm:px-10">
      {/*
        The source design uses a plain gradient-text "SANGUM" wordmark
        here. The project already has SangumLogoHorizontal in
        shared/components/branding/SangumIcons.tsx (used in the
        Messages feature) — swap the span below for that once you
        confirm its prop signature, so the nav matches the rest of
        the app instead of re-implementing the logo.
      */}
      <span className="bg-gradient-to-br from-primary-light to-accent bg-clip-text font-[family-name:var(--font-heading)] text-lg font-extrabold tracking-wide text-transparent">
        SANGUM
      </span>

      <div className="hidden items-center gap-6 text-sm text-text-secondary md:flex">
        {NAV_LINKS.map((link) => (
          <span key={link} className="cursor-pointer hover:text-text">
            {link}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={AUTH_ROUTES.login}
          className="rounded-md border border-border-strong px-3.5 py-1.5 text-xs font-medium text-text hover:bg-surface-hover"
        >
          Log in
        </Link>
        <Link
          href={AUTH_ROUTES.register}
          className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-text-on-primary hover:bg-primary-hover"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}