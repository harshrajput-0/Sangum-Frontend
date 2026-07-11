import React, { useState, useEffect } from "react";
import { Button } from "../../../shared/components/ui/Button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SangumLogoHorizontal } from "../ui/icons/SangumLogo";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? "bg-bg backdrop-blur-xl border-b border-border text-text"
          : "bg-bg text-text border-border"
        }
      `}
    >
      <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">

          {/* Sangam logo — two interlocking arcs */}
          <SangumLogoHorizontal height={32} />

        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary justify-center">

          <Link to="/" className=" hover:text-text transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-text transition-colors">Pricing</Link>
          <Link to="/legal" className="hover:text-text transition-colors">Legal</Link>
          <Link to="/about" className="hover:text-text transition-colors">About</Link>
          <Link to="/contact" className="hover:text-text transition-colors">Contact Us</Link>
        </div>

        <div className="flex items-center gap-2 justify-end">
            <ThemeToggle />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2 text-text-secondary">
            <Button variant="outline" size="sm">Login</Button>
            <Button size="sm">Register</Button>
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
          <Link to="/" className="p-4 text-text-secondary hover:bg-text/3 transition">Home</Link>
          <Link to="/pricing" className="p-4 text-text-secondary hover:bg-text/3 transition">Pricing</Link>
          <Link to="/legal" className="p-4 text-text-secondary hover:bg-text/3 transition">Legal</Link>
          <Link to="/about" className="p-4 text-text-secondary hover:bg-text/3 transition">About</Link>
          <Link to="/contact" className="p-4 text-text-secondary hover:bg-text/3 transition">Contact Us</Link>
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline">Login</Button>
              <Button variant="primary">Register</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
