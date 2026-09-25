'use client';

import React, { useState } from 'react';
import { Award, Gem, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
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

const TRUST_METRICS = [
  { value: '40+', label: 'Years of Proven Heritage', sub: 'Active in South & West Mumbai since 1981' },
  { value: '100%', label: 'RERA & Title Due Diligence', sub: 'Every listing undergoes strict legal vetting' },
  { value: '₹5,000+ Cr', label: 'Portfolio Transaction Equity', sub: 'High-value transactions advised discreetly' },
  { value: '1-on-1', label: 'Bespoke Advisory Desk', sub: 'Confidential viewings & direct promoter access' },
];

export function WhyParmar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="why-parmar"
      className="w-full bg-[#15181A] text-white border-y border-[#23272A] relative overflow-hidden py-24 sm:py-28 font-sans"
    >
      {/* Dynamic Background Architectural Animations */}
      {/* 1. Subtle glowing ambient light orbs */}
      <div className="absolute -top-36 -left-36 w-96 h-96 bg-[#C5282F]/12 rounded-full blur-[110px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute -bottom-36 -right-36 w-96 h-96 bg-[#C5282F]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />

      {/* 2. Architectural Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. Subtle Heritage Watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-serif text-[100px] sm:text-[140px] font-bold text-white/[0.015] pointer-events-none select-none tracking-widest leading-none hidden lg:block">
        PARMAR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Reveal Animation */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#23272A] gap-6 mb-12">
            <div className="max-w-3xl">
              {/* Animated Live Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#1C2024] border border-[#33383D] text-[10px] uppercase tracking-[0.25em] font-bold text-[#C5282F] mb-4 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5282F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5282F]" />
                </span>
                <span>OUR LEGACY &amp; STANDARDS</span>
              </div>

              {/* Updated Section Title: WHY PARMAR PROPERTIES */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 leading-tight">
                WHY <span className="font-semibold text-white">PARMAR PROPERTIES</span>
              </h2>

              <p className="text-base sm:text-lg text-[#CFD1CA] font-sans leading-relaxed font-light">
                Parmar Properties combines curated property discovery with decades of Mumbai real estate experience, hyper-local market intelligence, and discreet advisory.
              </p>
            </div>

            {/* Quick Contact Link */}
            <div className="shrink-0">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-5 py-3 bg-[#1C2024] hover:bg-[#C5282F] border border-[#33383D] hover:border-[#C5282F] text-xs uppercase tracking-[0.15em] font-semibold text-white transition-all duration-300 shadow-sm"
              >
                <span>REQUEST PRIVATE CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Vertical Layout: Stacked Architectural Rows */}
        <div className="flex flex-col space-y-5 mb-16">
          {WHY_POINTS.map((pt, idx) => {
            const Icon = pt.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <ScrollReveal key={pt.title} animation="fade-up" delay={idx * 100}>
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative bg-[#1A1D20] border transition-all duration-500 ease-out p-6 sm:p-8 lg:p-10 overflow-hidden shadow-lg ${
                    isHovered
                      ? 'border-[#C5282F]/70 -translate-y-1 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(197,40,47,0.18)]'
                      : 'border-[#262B30] hover:border-[#33383D]'
                  }`}
                >
                  {/* Top Animated Shimmer Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5282F] to-transparent transition-all duration-700 ${
                      isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />

                  {/* Ambient Light Sweep Hover Animation */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

                  {/* Vertical Card Inner Layout: Responsive 3-Part Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
                    {/* Part 1: Index Number, Icon & Headings */}
                    <div className="lg:col-span-5 flex items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-mono text-base font-bold text-[#C5282F] tracking-widest group-hover:tracking-[0.25em] transition-all duration-300">
                          {pt.number}
                        </span>
                        <div className="w-12 h-12 rounded-full bg-[#15181A] border border-[#33383D] flex items-center justify-center text-[#C5282F] group-hover:bg-[#C5282F] group-hover:text-white group-hover:border-[#C5282F] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md shrink-0">
                          <Icon className="w-5 h-5 transition-transform duration-500" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8E9291] group-hover:text-[#CFD1CA] transition-colors block mb-1 font-sans">
                          {pt.subtitle}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors flex items-center gap-2">
                          <span>{pt.title}</span>
                          <Sparkles className="w-4 h-4 text-[#C5282F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </h3>
                      </div>
                    </div>

                    {/* Part 2: Description */}
                    <div className="lg:col-span-4">
                      <p className="text-xs sm:text-sm text-[#CFD1CA] leading-relaxed font-sans font-light">
                        {pt.description}
                      </p>
                    </div>

                    {/* Part 3: Standard Badge & Stamp */}
                    <div className="lg:col-span-3 flex lg:flex-col lg:items-end justify-between items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#23272A] w-full">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#C5282F] group-hover:scale-125 transition-transform duration-300" />
                        <span className="text-[11px] uppercase tracking-wider">{pt.badge}</span>
                      </div>
                      <span className="text-[10px] text-[#5B605F] font-mono tracking-wider group-hover:text-[#8E9291] transition-colors">
                        PARMAR STANDARD
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Animated Trust Metrics Bar */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#181B1E] border border-[#262B30]">
            {TRUST_METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className={`p-4 transition-all duration-300 ${
                  i < TRUST_METRICS.length - 1 ? 'sm:border-r border-[#23272A]' : ''
                } hover:bg-[#1F2327] group`}
              >
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C5282F] transition-colors mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white mb-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[#8E9291] font-sans">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
