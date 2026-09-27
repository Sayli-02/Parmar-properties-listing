'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, FileCode2, Sparkles, Check, ChevronRight, X } from 'lucide-react';
import { HOME_PAGE_CONTENT } from '@/data/content/home.content';

export function BossContentInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const SECTIONS_CATALOG = [
    {
      id: 'hero',
      label: '1. Hero Carousel & Search Console',
      fileKey: 'HOME_PAGE_CONTENT.hero',
      uiLocation: 'Top full-screen banner + floating search bar',
      headline: HOME_PAGE_CONTENT.hero.headline,
      subtext: HOME_PAGE_CONTENT.hero.subtext,
      extra: `${HOME_PAGE_CONTENT.hero.slides.length} rotating slides, Search filters: Location, BHK, Budget slider, Category`,
    },
    {
      id: 'featuredProperties',
      label: '2. Featured Properties Showcase',
      fileKey: 'HOME_PAGE_CONTENT.featuredProperties',
      uiLocation: 'First 3-column property grid below Hero',
      headline: HOME_PAGE_CONTENT.featuredProperties.heading,
      subtext: HOME_PAGE_CONTENT.featuredProperties.subheading,
      extra: `CTA Button: "${HOME_PAGE_CONTENT.featuredProperties.viewAllButton.text}" -> Links to ${HOME_PAGE_CONTENT.featuredProperties.viewAllButton.link}`,
    },
    {
      id: 'locationSection',
      label: '3. Explore Properties by Location',
      fileKey: 'HOME_PAGE_CONTENT.locationSection',
      uiLocation: '4 prominent neighbourhood cards + Future Locations bar',
      headline: HOME_PAGE_CONTENT.locationSection.heading,
      subtext: HOME_PAGE_CONTENT.locationSection.subheading,
      extra: `Locations: ${HOME_PAGE_CONTENT.locationSection.cards.map((c) => c.name).join(', ')} | Pipeline: ${HOME_PAGE_CONTENT.locationSection.futureLocationsStrip.description}`,
    },
    {
      id: 'privateOpportunities',
      label: '4. Private Opportunities (Off-Market)',
      fileKey: 'HOME_PAGE_CONTENT.privateOpportunities',
      uiLocation: 'Confidential lead conversion section with Lock icon & OTP modal',
      headline: HOME_PAGE_CONTENT.privateOpportunities.heading,
      subtext: HOME_PAGE_CONTENT.privateOpportunities.paragraphs[0],
      extra: `CTA Button: "${HOME_PAGE_CONTENT.privateOpportunities.ctaButton.text}" | Step 1, 2, 3 verification modal copy`,
    },
    {
      id: 'whyParmar',
      label: '5. Why Parmar Properties (Heritage & Trust)',
      fileKey: 'HOME_PAGE_CONTENT.whyParmar',
      uiLocation: 'Dark charcoal container with 4 value pillars & 4 trust metrics',
      headline: `${HOME_PAGE_CONTENT.whyParmar.titlePrefix} ${HOME_PAGE_CONTENT.whyParmar.titleHighlight}`,
      subtext: HOME_PAGE_CONTENT.whyParmar.subtitle,
      extra: `4 Pillars: Since 1981, Curated Inventory, Market Intelligence, End-to-End Advisory | 4 Metrics: 40+ Years, 100% Due Diligence, ₹5,000+ Cr, 1-on-1 Advisory`,
    },
    {
      id: 'marketIntelligence',
      label: '6. Market Intelligence & Research',
      fileKey: 'HOME_PAGE_CONTENT.marketIntelligence',
      uiLocation: 'Editorial article previews above footer',
      headline: HOME_PAGE_CONTENT.marketIntelligence.heading,
      subtext: HOME_PAGE_CONTENT.marketIntelligence.subheading,
      extra: `View All Link: "${HOME_PAGE_CONTENT.marketIntelligence.viewAllLink.text}" -> ${HOME_PAGE_CONTENT.marketIntelligence.viewAllLink.link}`,
    },
  ];

  return (
    <>
      {/* Floating Toggle Button for Boss / Content Editors */}
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full shadow-xl transition-all duration-300 border cursor-pointer ${
            isOpen
              ? 'bg-[#15181A] text-white border-amber-400/50 ring-2 ring-amber-400/30'
              : 'bg-white/95 text-[#15181A] hover:bg-white border-[#CFD1CA] backdrop-blur-md hover:shadow-2xl'
          }`}
          title="Toggle Boss Visual Content Map"
        >
          {isOpen ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-mono text-[11px] text-amber-300">CONTENT MAP: ON</span>
            </>
          ) : (
            <>
              <FileCode2 className="w-3.5 h-3.5 text-[#C5282F]" />
              <span className="text-[11px] font-sans font-medium text-[#15181A]">
                Boss Content Guide
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Side Drawer when Content Guide is Open */}
      {isOpen && (
        <div className="fixed top-24 left-5 bottom-20 z-50 w-80 sm:w-96 bg-[#1B1E21]/95 text-white border border-[#3C434B] shadow-2xl rounded-lg backdrop-blur-md flex flex-col overflow-hidden animate-in slide-in-from-left-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-[#3C434B] bg-[#15181A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div>
                <h3 className="font-serif text-sm font-semibold text-white tracking-wide">
                  Home Page Content Map
                </h3>
                <span className="text-[10px] text-[#A0A5A8] font-mono block">
                  File: data/content/home.content.ts
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A0A5A8] hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-200">
            💡 Click any section to see its location in the UI and variable in <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">home.content.ts</code>.
          </div>

          {/* Section List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {SECTIONS_CATALOG.map((sec) => {
              const isSelected = selectedSection === sec.id;
              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSection(isSelected ? null : sec.id)}
                  className={`p-3 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#24282D] border-amber-400/80 shadow-md'
                      : 'bg-[#15181A]/60 border-[#2E3339] hover:border-[#4B525B]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-amber-300 font-medium">{sec.label}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-[#A0A5A8] transition-transform ${
                        isSelected ? 'rotate-90 text-amber-300' : ''
                      }`}
                    />
                  </div>

                  <div className="text-[11px] text-[#8E9291] mt-1">
                    <span className="font-mono text-white/90">{sec.fileKey}</span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-[#3C434B] space-y-2 text-[11px]">
                      <div>
                        <span className="text-[#A0A5A8] block text-[10px] uppercase font-semibold">
                          UI Screen Location:
                        </span>
                        <span className="text-emerald-300 font-medium">{sec.uiLocation}</span>
                      </div>

                      <div>
                        <span className="text-[#A0A5A8] block text-[10px] uppercase font-semibold">
                          Active Heading:
                        </span>
                        <span className="text-white font-serif italic text-xs">&quot;{sec.headline}&quot;</span>
                      </div>

                      <div>
                        <span className="text-[#A0A5A8] block text-[10px] uppercase font-semibold">
                          Subtext / Description:
                        </span>
                        <p className="text-white/80 line-clamp-2">&quot;{sec.subtext}&quot;</p>
                      </div>

                      <div>
                        <span className="text-[#A0A5A8] block text-[10px] uppercase font-semibold">
                          Details & Components:
                        </span>
                        <span className="text-amber-200/90 text-[10px] leading-relaxed block">
                          {sec.extra}
                        </span>
                      </div>

                      <div className="pt-1">
                        <a
                          href={`#${sec.id}`}
                          onClick={() => {
                            const el = document.getElementById(sec.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5282F] hover:text-white bg-white/5 hover:bg-[#C5282F] px-2 py-1 rounded transition-colors"
                        >
                          <span>Scroll to Section</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer of Drawer */}
          <div className="p-3 border-t border-[#3C434B] bg-[#15181A] text-center text-[10px] text-[#A0A5A8]">
            To edit any text, simply update <span className="text-white font-mono">data/content/home.content.ts</span>.
          </div>
        </div>
      )}
    </>
  );
}
