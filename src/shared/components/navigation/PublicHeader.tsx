"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";
import { SangumLogoHorizontal } from "../ui/icons/SangumLogo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Communities", href: "/community" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onClick = (e: MouseEvent) => {
      const nav = document.getElementById("publicNav");
      if (nav && !nav.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [mobileOpen]);

  return (
    <nav
      id="publicNav"
      className={[
        "sticky top-0 z-100 flex items-center justify-between h-16",
        "transition-[background,border-color,padding,backdrop-filter,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
        scrolled
          ? "bg-[rgba(11,15,20,0.55)] border-b border-[rgba(255,255,255,0.08)] px-10 py-3.5 backdrop-blur-xl backdrop-saturate-[1.6] shadow-[0_1px_2px_rgba(0,0,0,0.30)]"
          : "bg-transparent border-b border-transparent px-10 py-5",
      ].join(" ")}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-text">
        <SangumLogoHorizontal height={30}/>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-6 text-[13px] text-[#C5C7CB]">
        {NAV_LINKS.map((link) => (
          <NavItem key={link.href} label={link.label} href={link.href}/>
        ))}
      </div>

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-2">
        <Button variant="outline" href="/login">Log in</Button>
        <Button  href="/register">Register</Button>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="flex md:hidden items-center justify-center w-9 h-9 rounded-md bg-transparent border border-transparent text-[#C5C7CB] cursor-pointer hover:bg-[#1D2530] hover:text-[#FFFDFC] transition-colors"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile dropdown */}
      <div
        className={[
          "flex flex-col gap-1 absolute top-full left-0 right-0 z-50",
          "bg-[#0B0F14] border-b border-[#2A3441] shadow-[0_12px_32px_rgba(0,0,0,0.45)] px-4 py-3.5",
          "transition-[opacity,transform] duration-180 ease-[cubic-bezier(0.4,0,0.2,1)]",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        {NAV_LINKS.map((link) => (
          <NavItem key={link.href} label={link.label} href={link.href} className="px-3 py-2.5" />
        ))}
        <hr className="border-t border-[#2A3441] my-2.5" />
        <Button variant="outline" href="/login">Log in</Button>
        <Button  href="/register">Register</Button>
      </div>
    </nav>
  );
}

function NavItem({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <Link href={href}
      className={[
        "relative cursor-pointer inline-block text-[#C5C7CB] hover:text-[#6D5DFE] transition-colors duration-120 ease-[cubic-bezier(0.4,0,0.2,1)]",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

