"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SangumLogoHorizontal } from "../ui/icons/SangumLogo";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export const PublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu automatically on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/legal", label: "Legal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-50 border-border",
        "transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "bg-bg backdrop-blur-xl border-b border-border text-text shadow-[0_8px_24px_-16px_rgba(0,0,0,0.5)]"
          : "bg-bg text-text border-b border-transparent shadow-none"
      )}
    >
      <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Sangam logo — two interlocking arcs */}
          <span className="inline-flex transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95">
            <SangumLogoHorizontal height={32} />
          </span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary justify-center">
          {navItems.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative py-1 text-text-secondary transition-colors duration-200 hover:text-text",
                  "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full",
                  "after:origin-left after:scale-x-0 after:bg-white",
                  "after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
                  active && "text-text after:scale-x-100"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 justify-end">
          <ThemeToggle />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <Button variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>

            <Button size="sm">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile hamburger — 44px+ tap target, crossfades between Menu and X */}
          <button
            className="md:hidden relative flex items-center justify-center h-11 w-11 -mr-1 rounded-full transition-colors duration-200 hover:bg-white/10 active:scale-90"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="relative block h-5.5 w-5.5">
              <Menu
                size={22}
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-out",
                  isMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                size={22}
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-out",
                  isMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Backdrop — dims the page behind the mobile menu, tap to close */}
      <div
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "md:hidden fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Mobile menu — always mounted, animated open/close via grid-template-rows
          (so height animates without knowing the content's height up front),
          with nav items staggering in slightly after the panel starts opening. */}
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden relative z-50 grid transition-[grid-template-rows] duration-300 ease-out",
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-bg shadow-[0_16px_32px_-16px_rgba(0,0,0,0.6)] rounded-b-2xl">
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "px-3 py-3.5 rounded-xl text-base text-text-secondary transition-all duration-300 ease-out active:scale-[0.98]",
                      active
                        ? "text-text bg-white/10 font-medium"
                        : "hover:text-text hover:bg-white/5"
                    )}
                    style={{
                      transitionDelay: isMenuOpen ? `${i * 40 + 60}ms` : "0ms",
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateY(0)" : "translateY(-6px)",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}

              <div
                className="flex flex-col gap-3 mt-3 pt-4 border-t border-border transition-all duration-300 ease-out"
                style={{
                  transitionDelay: isMenuOpen ? `${navItems.length * 40 + 80}ms` : "0ms",
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-6px)",
                }}
              >
                <Button variant="outline" size="lg">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button  variant="primary" size="lg">
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};