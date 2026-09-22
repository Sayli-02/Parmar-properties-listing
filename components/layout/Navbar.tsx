'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { href: pathname === '/' ? '#hero' : '/#hero', id: 'hero', label: 'Home' },
    { href: pathname === '/' ? '#properties' : '/#properties', id: 'properties', label: 'Properties' },
    { href: pathname === '/' ? '#contact' : '/#contact', id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#EDEEE9]/95 backdrop-blur-md text-[#15181A] border-b border-[#CFD1CA] shadow-xs transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center group cursor-pointer py-1"
          >
            <Image
              src="/logo.jpeg"
              alt="Parmar Properties - Building Relationships"
              width={180}
              height={70}
              className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-xs font-sans tracking-[0.15em] uppercase transition-colors flex items-center gap-1.5 py-1 text-[#5B605F] hover:text-[#C5282F]"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none text-[#15181A]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#15181A]/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="fixed top-20 right-0 bottom-0 w-4/5 max-w-sm bg-[#EDEEE9] border-l border-[#CFD1CA] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="space-y-6 pt-4">
              <div className="text-xs uppercase tracking-widest text-[#5B605F] font-semibold border-b border-[#CFD1CA] pb-2">
                Navigation
              </div>
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-sm tracking-wide flex items-center justify-between py-2 px-3 transition-colors text-[#15181A] hover:bg-[#CFD1CA]/40"
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#CFD1CA] space-y-3">
              <div className="text-xs text-[#5B605F]">
                Parmar Properties &bull; Mumbai Prime Real Estate
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
