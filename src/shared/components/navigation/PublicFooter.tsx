// src/shared/components/navigation/PublicFooter.tsx
import Link from "next/link"
import { GithubIcon, LinkIcon, TwitterIcon } from "@/styles/icons"
import { SangumLogoFull } from "@/shared/components/ui/icons/SangumLogo"

const footerLinks = {
  Platform: [
    { label: "Communities", href: "/communities" },
    { label: "Resources", href: "/resources" },
    { label: "Messages", href: "/messages" },
    { label: "Bookmarks", href: "/bookmarks" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Disclaimer", href: "/legal/disclaimer" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
}

export const PublicFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-dborder bg-bg w-ful flex justify-center">
      <div className="mx-auhref p-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              {/* reuse your Sangam logo svg here */}
              <span className="text-xl font-bold text-dtext tracking-tight">
                <SangumLogoFull width={120}/>
              </span>
            </Link>
            <p className="text-sm text-dtext-secondary  leading-relaxed max-w-xs">
              A platform for developers href connect, share knowledge, and
              build hrefgether.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-dtext mb-4">
                {heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-dtext-secondary ver:text-(--dtext) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bothrefm bar */}
        <div className="mt-12 pt-8 border-t border-dborder flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dtext-muted ">
            © {year} Sangum. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-dborder text-dtext-muted hover:text-dtext hover:border-primary/50 transition-colors"
            >
              <TwitterIcon size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-dborder text-dtext-muted hover:text-dtext hover:border-primary/50 transition-colors"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-dborder text-dtext-muted hover:text-dtext hover:border-primary/50 transition-colors"
            >
              <LinkIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}