'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { HeroCarousel, HeroSearchParams } from '@/components/hero/HeroCarousel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { PROPERTIES } from '@/data/properties';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'recent' | 'recommended'>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [heroSearch, setHeroSearch] = useState<HeroSearchParams | null>(null);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Worli',
    message: '',
  });

  const handleHeroSearch = (params: HeroSearchParams) => {
    setHeroSearch(params);
    if (params.type && params.type !== 'Any') {
      setSelectedType(params.type);
    }
  };

  // Filter properties for main grid
  const displayedProperties = PROPERTIES.filter((p) => {
    if (activeTab === 'featured' && !p.featured) return false;
    if (activeTab === 'recent' && !p.recentlyAdded) return false;
    if (activeTab === 'recommended' && !p.recommended) return false;
    const matchLocality = selectedLocality === 'All' || p.location === selectedLocality;
    const matchType = selectedType === 'All' || p.propertyType === selectedType;
    if (!matchLocality || !matchType) return false;

    // Apply Hero Search if active
    if (heroSearch) {
      if (heroSearch.location && heroSearch.location.trim()) {
        const q = heroSearch.location.toLowerCase().trim();
        const matchLoc =
          p.location.toLowerCase().includes(q) ||
          p.subLocation.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q);
        if (!matchLoc) return false;
      }
      if (heroSearch.bhk && heroSearch.bhk !== 'Any' && p.bhk !== heroSearch.bhk) {
        return false;
      }
      if (heroSearch.budget && heroSearch.budget !== 'Any') {
        if (heroSearch.budget === 'Under 20' && p.price >= 20) return false;
        if (heroSearch.budget === '20-35' && (p.price < 20 || p.price > 35)) return false;
        if (heroSearch.budget === '35-50' && (p.price < 35 || p.price > 50)) return false;
        if (heroSearch.budget === '50+' && p.price < 50) return false;
      }
      if (heroSearch.type && heroSearch.type !== 'Any' && p.propertyType !== heroSearch.type) {
        return false;
      }
    }

    return true;
  });

  const featuredProperties = PROPERTIES.filter((p) => p.featured);
  const recentlyAddedProperties = PROPERTIES.filter((p) => p.recentlyAdded);
  const recommendedProperties = PROPERTIES.filter((p) => p.recommended);


  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="w-full relative bg-[#EDEEE9] text-[#15181A] pt-20">
      {/* Scroll Progress Indicator & Back-to-Top */}
      <ScrollProgressBar />

      {/* 1. HERO SECTION */}
      <HeroCarousel onSearch={handleHeroSearch} />

      {/* 2. PROPERTIES PORTFOLIO */}
      <section id="properties" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#CFD1CA] gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#5B605F] mb-2 block">
                Residential Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#15181A]">
                Selected Mumbai Residences
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-[#F7F7F4] p-1 border border-[#CFD1CA] overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 ${
                  activeTab === 'all'
                    ? 'bg-[#C5282F] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                All ({PROPERTIES.length})
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'featured'
                    ? 'bg-[#C5282F] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>Featured ({featuredProperties.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'recent'
                    ? 'bg-[#C5282F] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>New ({recentlyAddedProperties.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'recommended'
                    ? 'bg-[#C5282F] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>Curated ({recommendedProperties.length})</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Active Filter Banner */}
        {heroSearch && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#F7F7F4] border border-[#CFD1CA] text-xs gap-3">
            <div className="flex items-center gap-2 text-[#15181A]">
              <span className="font-semibold uppercase tracking-wider text-[10px] bg-[#C5282F] text-white px-2 py-0.5">
                Filtered
              </span>
              <span>
                Search results for:{' '}
                <strong>
                  {[
                    heroSearch.location ? `"${heroSearch.location}"` : '',
                    heroSearch.bhk !== 'Any' ? heroSearch.bhk : '',
                    heroSearch.budget !== 'Any' ? `Budget: ${heroSearch.budget}` : '',
                    heroSearch.type !== 'Any' ? heroSearch.type : '',
                  ]
                    .filter(Boolean)
                    .join(' · ') || 'Custom Search'}
                </strong>{' '}
                ({displayedProperties.length} found)
              </span>
            </div>
            <button
              onClick={() => {
                setHeroSearch(null);
                setSelectedType('All');
                setSelectedLocality('All');
              }}
              className="text-xs uppercase tracking-wider text-[#C5282F] hover:underline font-semibold cursor-pointer shrink-0"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Filter Controls */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-4 sm:p-5 mb-10 space-y-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mr-2 shrink-0">
                Location:
              </span>
              {['All', 'Worli', 'Bandra West', 'Juhu', 'Lower Parel', 'Prabhadevi', 'Powai', 'Malabar Hill', 'Cuffe Parade'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocality(loc)}
                  className={`px-3 py-1 text-xs font-sans tracking-wide rounded-none transition-all shrink-0 ${
                    selectedLocality === loc
                      ? 'bg-[#15181A] text-white font-medium'
                      : 'bg-[#EDEEE9] text-[#5B605F] border border-[#CFD1CA] hover:text-[#15181A]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#CFD1CA] scrollbar-none">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mr-2 shrink-0">
                Category:
              </span>
              {['All', 'Sea-Facing Apartment', 'Penthouse', 'Sky Villa', 'Duplex', 'Luxury Estate'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedType(cat)}
                  className={`px-3 py-1 text-xs font-sans tracking-wide rounded-none transition-all shrink-0 ${
                    selectedType === cat
                      ? 'bg-[#C5282F] text-white font-medium'
                      : 'bg-[#EDEEE9] text-[#5B605F] border border-[#CFD1CA] hover:text-[#15181A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Property Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property, idx) => (
            <ScrollReveal key={property.id} animation="fade-up" delay={(idx % 3) * 120}>
              <PropertyCard property={property} />
            </ScrollReveal>
          ))}
        </div>

        {displayedProperties.length === 0 && (
          <div className="text-center py-16 bg-[#F7F7F4] border border-[#CFD1CA] p-8">
            <p className="text-[#5B605F] text-sm">No residences match your current filter selections.</p>
            <button
              onClick={() => {
                setSelectedLocality('All');
                setSelectedType('All');
                setActiveTab('all');
              }}
              className="mt-4 px-5 py-2 bg-[#C5282F] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* OFFICE & CONTACT */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
        <ScrollReveal animation="fade-up">
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#5B605F] mb-2 block">
              Office &bull; Lower Parel, Mumbai
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">
              CONTACT US
            </h2>
            <p className="text-xs sm:text-sm text-[#5B605F] mt-1 font-sans">
              Get in touch with us or visit our office at Peninsula Center, Lower Parel, Mumbai.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 sm:p-10 shadow-xs">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#C5282F] mx-auto" />
                    <h3 className="font-serif text-xl text-[#15181A]">Message Sent</h3>
                    <p className="text-xs text-[#5B605F] max-w-sm mx-auto">
                      Thank you for reaching out. We will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base sm:text-xs"
                          placeholder="Aditya Birla"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base sm:text-xs"
                          placeholder="+91 98200 00000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base sm:text-xs"
                          placeholder="aditya@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                          Location of Interest
                        </label>
                        <select
                          value={contactForm.locality}
                          onChange={(e) => setContactForm({ ...contactForm, locality: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base sm:text-xs"
                        >
                          <option value="Worli">Worli & South Mumbai</option>
                          <option value="Bandra West">Bandra West & Pali Hill</option>
                          <option value="Juhu">Juhu Beachfront</option>
                          <option value="Lower Parel">Lower Parel</option>
                          <option value="Prabhadevi">Prabhadevi</option>
                          <option value="Malabar Hill">Malabar Hill</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base sm:text-xs"
                        placeholder="Provide details regarding target BHK, carpet area preferences, or locations..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>CONTACT US</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-5 shadow-xs">
                <h3 className="font-serif text-lg font-medium text-[#15181A]">
                  Office
                </h3>
                <div className="space-y-4 text-xs text-[#5B605F]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5282F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#15181A]">Parmar Properties Office</p>
                      <p>Peninsula Center, Lower Parel</p>
                      <p>Mumbai, Maharashtra 400013</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C5282F] shrink-0" />
                    <span>+91 (022) 4988 7700</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C5282F] shrink-0" />
                    <span>contact@parmarproperties.com</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 text-xs text-[#5B605F] space-y-1.5 shadow-xs">
                <div className="font-semibold text-[#15181A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5282F]" />
                  <span>MahaRERA Registration: A51900018442</span>
                </div>
                <p>Operating in strict compliance with Maharashtra Real Estate Regulatory Authority statutory mandates.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
