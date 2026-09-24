'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId === 'intelligence') {
      setMobileMenuOpen(false);
      return;
    }
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
    { href: '/market-intelligence', id: 'intelligence', label: 'Insights' },
    { href: pathname === '/' ? '#contact' : '/#contact', id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#EDEEE9]/95 backdrop-blur-md text-[#15181A] border-b border-[#CFD1CA] shadow-xs transition-colors duration-200 py-[5px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center group cursor-pointer py-0.5"
          >
            <Image
              src="/logo_without_bg.png"
              alt="Parmar Properties - Building Relationships"
              width={260}
              height={95}
              className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
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
                className="relative text-xs font-sans tracking-[0.15em] uppercase py-1 text-[#5B605F] hover:text-[#C5282F] transition-colors duration-300 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5282F] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 focus:outline-none text-[#15181A] cursor-pointer"
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
        <div 
          className="fixed inset-0 z-40 md:hidden bg-[#15181A]/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-[66px] sm:top-[74px] right-0 bottom-0 w-4/5 max-w-sm bg-[#EDEEE9] border-l border-[#CFD1CA] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
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
                    className="text-sm tracking-wide flex items-center justify-between py-2 px-3 transition-all duration-200 text-[#15181A] hover:bg-[#C5282F]/10 hover:text-[#C5282F] hover:pl-4 rounded-xs"
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
