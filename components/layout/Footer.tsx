import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#15181A] text-white border-t border-[#23272A] pt-20 pb-14 text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Masthead */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-12 border-b border-[#23272A] gap-6">
          <div className="space-y-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase font-light text-white">
              PARMAR PROPERTIES
            </span>
            <p className="text-xs text-[#CFD1CA] tracking-widest uppercase">
              Mumbai · Prime Residential Real Estate Advisory
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="https://www.parmarproperties.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#A2432B] hover:bg-[#8C3822] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-[#33383D] rounded-none text-[#CFD1CA]">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>MahaRERA: A51900018442</span>
            </span>
          </div>
        </div>

        {/* Official Website Banner Callout */}
        <div className="mb-12 p-6 sm:p-8 bg-[#1B1E21] border border-[#2D3236] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#A2432B] block">
              Official Corporate Presence
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
              Parmar Properties &bull; Official Website
            </h3>
            <p className="text-xs text-[#CFD1CA] max-w-2xl font-light leading-relaxed">
              Explore our comprehensive portfolio, corporate background, investor relations, and institutional developments at <span className="text-white font-medium">parmarproperties.in</span>.
            </p>
          </div>
          <a
            href="https://www.parmarproperties.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#A2432B] hover:bg-[#8C3822] text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold transition-all shrink-0"
          >
            <span>Visit parmarproperties.in</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-[#23272A]">
          {/* Col 1: Corporate Profile */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Advisory Profile
            </h4>
            <p className="text-xs text-[#CFD1CA] leading-relaxed font-light">
              Parmar Properties provides fiduciary residential advisory services representing high-net-worth individuals, institutional family offices, and corporate leaders across Mumbai’s prime coastal enclaves.
            </p>
            <div className="pt-2 text-xs text-[#CFD1CA] space-y-1">
              <p className="text-white font-medium">Office Address</p>
              <p>Peninsula Center, Lower Parel</p>
              <p>Mumbai, Maharashtra 400013</p>
            </div>
            <div className="pt-1">
              <a
                href="https://www.parmarproperties.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#A2432B] hover:underline font-medium"
              >
                <span>parmarproperties.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Prime Locations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Mumbai Locations
            </h4>
            <ul className="space-y-2 text-xs text-[#9AA0A6]">
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Worli & Sea Face
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Bandra West & Pali Hill
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Juhu Coastal Belt
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Lower Parel High-Rises
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Malabar Hill & Walkeshwar
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Cuffe Parade & Colaba
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#9AA0A6]">
              <li>
                <a href="#hero" className="hover:text-[#A2432B] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-[#A2432B] transition-colors">
                  Property Portfolio
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-[#A2432B] transition-colors">
                  Property Comparison
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#A2432B] transition-colors">
                  About Parmar Properties
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#A2432B] transition-colors">
                  Office & Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.parmarproperties.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#A2432B] hover:underline pt-1 font-medium"
                >
                  <span>Official Corporate Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Communications */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Communications
            </h4>
            <div className="space-y-3 text-xs text-[#CFD1CA]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5B605F] block mb-0.5">Telephone</span>
                <a href="tel:+912249887700" className="text-white hover:text-[#A2432B]">
                  +91 (022) 4988 7700
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5B605F] block mb-0.5">Electronic Mail</span>
                <a href="mailto:contact@parmarproperties.com" className="text-white hover:text-[#A2432B]">
                  contact@parmarproperties.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5B605F] block mb-0.5">Hours of Advisory</span>
                <p className="text-white">Monday – Saturday: 10:00 AM – 7:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimers & Copyright */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] text-[#5B605F] leading-relaxed font-light">
            Statutory Legal Notice: Parmar Properties is an authorized real estate consulting advisory certified under the Maharashtra Real Estate Regulatory Authority (MahaRERA Registration No. A51900018442). All property details, architectural renderings, floor areas, and pricing representations are verified against developer documentation and official public registries. Prospective buyers are advised to review the official project MahaRERA certificates prior to executing transactions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#23272A] text-[11px] text-[#5B605F]">
            <p>&copy; {new Date().getFullYear()} Parmar Properties. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                Terms of Engagement
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                MahaRERA Disclosures
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
