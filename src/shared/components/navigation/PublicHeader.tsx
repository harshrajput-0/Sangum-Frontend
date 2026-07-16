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


  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/legal", label: "Legal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ];
  return (
    <nav
      className={`
        sticky top-0 left-0 right-0 z-50
        transition-all duration-300 border-border
        ${scrolled
          ? "bg-bg backdrop-blur-xl border-b border-border text-text"
          : "bg-bg text-text"
        }
      `}
    >
      <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">

          {/* Sangam logo — two interlocking arcs */}
          <SangumLogoHorizontal height={32} />

        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary justify-center">

          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors text-text-secondary hover:text-text",
                pathname === href && "text-text"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-end">
          <ThemeToggle />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild size="sm">
              <Link href="/register" >Register</Link>
            </Button>
          </div>


          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>


      {isMenuOpen && (

        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">

          <div className="flex flex-col  gap-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "transition-colors text-text-secondary hover:text-text",
                  pathname === href && "text-text"
                )}
              >
                {label}
              </Link>
            ))}


            <div className="flex flex-col gap-3 pt-4">
              <Button asChild variant="outline">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>

              <Button asChild variant="primary">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
