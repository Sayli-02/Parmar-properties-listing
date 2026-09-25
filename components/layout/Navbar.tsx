'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

  const navLinks = [
    { href: '/', id: 'hero', label: 'Home' },
    { href: '/properties', id: 'properties', label: 'Properties' },
    { href: '/market-intelligence', id: 'intelligence', label: 'Insights' },
    { href: '/contact', id: 'contact', label: 'Contact' },
  ];

  const isLinkActive = (id: string) => {
    if (!pathname) return false;
    if (id === 'hero') {
      return pathname === '/';
    }
    if (id === 'properties') {
      return pathname.startsWith('/properties') || pathname.startsWith('/locations');
    }
    if (id === 'intelligence') {
      return pathname.startsWith('/market-intelligence');
    }
    if (id === 'contact') {
      return pathname.startsWith('/contact');
    }
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof navLinks)[0]) => {
    setMobileMenuOpen(false);
    if (link.id === 'hero' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#EDEEE9]/95 backdrop-blur-md text-[#15181A] border-b border-[#CFD1CA] shadow-xs transition-colors duration-200 py-[5px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
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
          </Link>

          {/* Desktop Navigation Links with Active Red Underline */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.id);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative text-xs font-sans tracking-[0.15em] uppercase py-1 transition-colors duration-300 group ${
                    isActive ? 'text-[#C5282F] font-semibold' : 'text-[#5B605F] hover:text-[#C5282F]'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Red underline: full width if active, expands from 0 on hover if inactive */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C5282F] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
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
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.id);
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`text-sm tracking-wide flex items-center justify-between py-2.5 px-3 transition-all duration-200 rounded-xs border-l-2 ${
                        isActive
                          ? 'bg-[#C5282F]/10 text-[#C5282F] font-semibold border-[#C5282F] pl-4'
                          : 'text-[#15181A] hover:bg-[#C5282F]/10 hover:text-[#C5282F] border-transparent hover:pl-4'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C5282F]" />}
                    </Link>
                  );
                })}
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
