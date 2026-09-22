import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Landmark, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen bg-[#EDEEE9] text-[#15181A]">
      {/* Header */}
      <div className="mb-14 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5B605F] mb-3 block">
          Our Heritage &bull; Established 2008
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#15181A] mb-6">
          Parmar Properties
        </h1>
        <p className="text-base sm:text-lg text-[#5B605F] leading-relaxed font-sans">
          Mumbai’s premier discreet real estate advisory, representing generational family offices, business titans, and discerning tastemakers in prime residential acquisitions.
        </p>
      </div>

      {/* Story & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-3xl font-light text-[#15181A]">
            A Legacy of Discretion & Architectural Integrity
          </h2>
          <p className="text-sm sm:text-base text-[#5B605F] leading-relaxed">
            Founded in Mumbai in 2008, Parmar Properties has developed an unparalleled reputation for curating and closing the city’s most significant residential transactions.
          </p>
          <p className="text-sm sm:text-base text-[#5B605F] leading-relaxed">
            From the iconic coastal towers along Worli Sea Face and Marine Drive to secluded estate villas in Bandra’s Pali Hill and Juhu Tara Road, we operate with surgical precision, absolute confidentiality, and deep legal mastery under MahaRERA.
          </p>

          <div className="pt-4 border-t border-[#CFD1CA] flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F7F7F4] border border-[#15181A] flex items-center justify-center font-serif text-lg text-[#15181A] font-bold">
              VP
            </div>
            <div>
              <p className="font-serif text-base font-medium text-[#15181A]">Vikram Parmar</p>
              <p className="text-xs text-[#5B605F]">Founder & Principal Managing Director</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[420px] bg-[#CFD1CA] border border-[#CFD1CA] overflow-hidden shadow-xs">
          <Image
            src="/hero/hero-1-crisp.jpg"
            alt="Parmar Properties Heritage"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Key Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center p-8 bg-[#F7F7F4] border border-[#CFD1CA] mb-16 shadow-xs">
        <div className="space-y-1">
          <span className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">₹1,800+ Cr</span>
          <p className="text-xs uppercase tracking-wider text-[#5B605F]">Transacted Portfolio</p>
        </div>
        <div className="space-y-1">
          <span className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">18+ Years</span>
          <p className="text-xs uppercase tracking-wider text-[#5B605F]">Mumbai Market Pedigree</p>
        </div>
        <div className="space-y-1">
          <span className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">100%</span>
          <p className="text-xs uppercase tracking-wider text-[#5B605F]">MahaRERA Vetted</p>
        </div>
        <div className="space-y-1">
          <span className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">A51900018442</span>
          <p className="text-xs uppercase tracking-wider text-[#5B605F]">MahaRERA Registration</p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-4">
          <ShieldCheck className="w-8 h-8 text-[#C5282F]" />
          <h3 className="font-serif text-xl font-medium text-[#15181A]">Fiduciary Rigor</h3>
          <p className="text-xs text-[#5B605F] leading-relaxed">
            Every listing undergoes legal due diligence by senior conveyancing counsels specializing in Maharashtra land and development statutes.
          </p>
        </div>
        <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-4">
          <Landmark className="w-8 h-8 text-[#C5282F]" />
          <h3 className="font-serif text-xl font-medium text-[#15181A]">Coastal Exclusivity</h3>
          <p className="text-xs text-[#5B605F] leading-relaxed">
            Deep relationships with Mumbai’s premier legacy families and landmark developers, providing direct access to off-market penthouses.
          </p>
        </div>
        <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-4">
          <Users className="w-8 h-8 text-[#C5282F]" />
          <h3 className="font-serif text-xl font-medium text-[#15181A]">Confidential Advisory</h3>
          <p className="text-xs text-[#5B605F] leading-relaxed">
            Strict non-disclosure standards safeguard buyer identities and financial negotiations from public exposure.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#15181A] font-light">
          Experience Bespoke Mumbai Real Estate
        </h3>
        <p className="text-sm text-[#5B605F]">
          Contact our principal partners for a confidential discussion regarding your residential portfolio.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            <span>Consult With Principal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
