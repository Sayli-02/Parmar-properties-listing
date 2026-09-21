'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useCompareStore } from '@/store/compare';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Zustand stores
  const compareIds = useCompareStore((state) => state.compareIds);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { href: pathname === '/' ? '#compare' : '/#compare', id: 'compare', label: 'Compare', badge: mounted ? compareIds.length : 0 },
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
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center font-serif text-sm font-semibold border border-[#15181A] text-[#15181A] bg-[#F7F7F4]">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-base sm:text-lg font-normal uppercase leading-tight text-[#15181A]">
                Parmar Properties
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#5B605F]">
                Mumbai
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-xs font-sans tracking-[0.15em] uppercase transition-colors flex items-center gap-1.5 py-1 text-[#5B605F] hover:text-[#A2432B]"
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-medium transition-all bg-[#A2432B] text-white">
                    {link.badge}
                  </span>
                )}
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
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#A2432B] text-white font-medium">
                        {link.badge}
                      </span>
                    )}
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
