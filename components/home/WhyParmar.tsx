'use client';

import React from 'react';
import { Award, Gem, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const WHY_POINTS = [
  {
    number: '01',
    title: 'SINCE 1981',
    subtitle: 'Over 4 Decades of Trust',
    description:
      'Four decades of continuous family-run integrity, unmatched relationship equity, and deep-rooted standing across Mumbai’s prime property corridors.',
    icon: Award,
  },
  {
    number: '02',
    title: 'CURATED INVENTORY',
    subtitle: 'Vetted & Trophy Assets',
    description:
      'Every home in our portfolio is personally hand-selected, verified for clear titles, superior layouts, panoramic vistas, and enduring luxury prestige.',
    icon: Gem,
  },
  {
    number: '03',
    title: 'MARKET INTELLIGENCE',
    subtitle: 'Hyper-Local Valuation Data',
    description:
      'Unrivaled micro-market data across Worli, Bandra, and South Mumbai, enabling confident decisions with transparent pricing and capital yield benchmarks.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'END-TO-END ADVISORY',
    subtitle: 'Discreet Private Consultation',
    description:
      'Bespoke white-glove guidance through confidential viewings, legal due diligence, title scrutiny, structuring, and seamless final handover.',
    icon: ShieldCheck,
  },
];

export function WhyParmar() {
  return (
    <section id="why-parmar" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
      <ScrollReveal animation="fade-up">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5B605F] mb-3 block">
            Our Legacy & Standards
          </span>
          {/* Bold Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15181A] tracking-tight mb-4">
            WHY PARMAR ?
          </h2>
          {/* User Requested Text */}
          <p className="text-base sm:text-lg text-[#5B605F] font-sans leading-relaxed">
            Parmar Properties combines curated property discovery with decades of Mumbai real estate experience, market knowledge and personalised advisory
          </p>
        </div>
      </ScrollReveal>

      {/* 4 Pointers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_POINTS.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <ScrollReveal key={pt.title} animation="fade-up" delay={idx * 100}>
              <div className="group relative bg-[#F7F7F4] border border-[#CFD1CA] p-7 hover:border-[#15181A] transition-all duration-300 flex flex-col justify-between h-full shadow-xs hover:shadow-md">
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#CFD1CA] mb-5">
                    <span className="font-mono text-xs text-[#5B605F] font-semibold tracking-wider">
                      {pt.number}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white border border-[#CFD1CA] flex items-center justify-center text-[#C5282F] group-hover:bg-[#C5282F] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-[#C5282F] font-semibold block mb-1">
                    {pt.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#15181A] mb-3 group-hover:text-[#C5282F] transition-colors">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-[#5B605F] leading-relaxed font-sans">
                    {pt.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#CFD1CA]/60 flex items-center gap-1.5 text-[11px] text-[#15181A] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>The Parmar Standard</span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
