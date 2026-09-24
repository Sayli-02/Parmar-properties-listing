'use client';

import React from 'react';
import { Award, Gem, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const WHY_POINTS = [
  {
    number: '01',
    subtitle: 'OVER 4 DECADES OF TRUST',
    title: 'SINCE 1981',
    description:
      'Four decades of continuous family-run integrity, unmatched relationship equity, and deep-rooted standing across Mumbai’s prime property corridors.',
    icon: Award,
    badge: 'Generational Standing',
  },
  {
    number: '02',
    subtitle: 'VETTED & TROPHY ASSETS',
    title: 'CURATED INVENTORY',
    description:
      'Every home in our portfolio is personally hand-selected, verified for clear titles, superior layouts, panoramic vistas, and enduring luxury prestige.',
    icon: Gem,
    badge: '100% Verified Titles',
  },
  {
    number: '03',
    subtitle: 'HYPER-LOCAL VALUATION DATA',
    title: 'MARKET INTELLIGENCE',
    description:
      'Unrivaled micro-market data across Worli, Bandra, and South Mumbai, enabling confident decisions with transparent pricing and capital yield benchmarks.',
    icon: TrendingUp,
    badge: 'Micro-Market Pricing',
  },
  {
    number: '04',
    subtitle: 'DISCREET PRIVATE CONSULTATION',
    title: 'END-TO-END ADVISORY',
    description:
      'Bespoke white-glove guidance through confidential viewings, legal due diligence, title scrutiny, structuring, and seamless final handover.',
    icon: ShieldCheck,
    badge: 'Confidential White-Glove',
  },
];

export function WhyParmar() {
  return (
    <section id="why-parmar" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
      <ScrollReveal animation="fade-up">
        {/* Balanced Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F7F4] border border-[#CFD1CA] text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5282F] mb-4">
            <span>OUR LEGACY &amp; STANDARDS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15181A] tracking-tight mb-4 leading-tight">
            WHY PARMAR ?
          </h2>

          <p className="text-base sm:text-lg text-[#5B605F] font-sans leading-relaxed">
            Parmar Properties combines curated property discovery with decades of Mumbai real estate experience, market knowledge and personalised advisory.
          </p>
        </div>
      </ScrollReveal>

      {/* Balanced 2x2 Architectural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {WHY_POINTS.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <ScrollReveal key={pt.title} animation="fade-up" delay={idx * 100}>
              <div className="group bg-[#F7F7F4] border border-[#CFD1CA] p-8 sm:p-10 hover:border-[#15181A] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#CFD1CA] mb-6">
                    <span className="font-mono text-sm font-bold text-[#C5282F] tracking-widest">
                      {pt.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white border border-[#CFD1CA] flex items-center justify-center text-[#C5282F] group-hover:bg-[#C5282F] group-hover:text-white group-hover:border-[#C5282F] transition-all duration-300 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Subtitle & Title */}
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#5B605F] block mb-1">
                    {pt.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#15181A] mb-4 group-hover:text-[#C5282F] transition-colors">
                    {pt.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5B605F] leading-relaxed font-sans mb-6">
                    {pt.description}
                  </p>
                </div>

                {/* Bottom Standard Badge */}
                <div className="pt-4 border-t border-[#CFD1CA]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#15181A] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5282F]" />
                    <span className="text-[11px] uppercase tracking-wider">{pt.badge}</span>
                  </div>
                  <span className="text-[10px] text-[#5B605F] font-mono tracking-wider">
                    PARMAR STANDARD
                  </span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
