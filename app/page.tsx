'use client';

import React, { useState, useEffect } from 'react';
import {
  Scale,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { HeroCarousel } from '@/components/hero/HeroCarousel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { CompareBar } from '@/components/property/CompareBar';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { PROPERTIES } from '@/data/properties';
import { useCompareStore } from '@/store/compare';
import { useRecentStore } from '@/store/recent';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'recent' | 'recommended'>('all');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Stores
  const compareIds = useCompareStore((s) => s.compareIds);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);

  const recentSlugs = useRecentStore((s) => s.recentSlugs);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Worli',
    message: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter properties for main grid
  const displayedProperties = PROPERTIES.filter((p) => {
    if (activeTab === 'featured' && !p.featured) return false;
    if (activeTab === 'recent' && !p.recentlyAdded) return false;
    if (activeTab === 'recommended' && !p.recommended) return false;
    const matchLocality = selectedLocality === 'All' || p.location === selectedLocality;
    const matchType = selectedType === 'All' || p.propertyType === selectedType;
    return matchLocality && matchType;
  });

  const featuredProperties = PROPERTIES.filter((p) => p.featured);
  const recentlyAddedProperties = PROPERTIES.filter((p) => p.recentlyAdded);
  const recommendedProperties = PROPERTIES.filter((p) => p.recommended);
  const recentlyViewedProperties = mounted
    ? PROPERTIES.filter((p) => recentSlugs.includes(p.slug))
    : [];

  const comparedProperties = mounted
    ? PROPERTIES.filter((p) => compareIds.includes(p.id))
    : [];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="w-full relative bg-[#EDEEE9] text-[#15181A] pt-20">
      {/* Scroll Progress Indicator & Back-to-Top */}
      <ScrollProgressBar />

      {/* 1. HERO SECTION */}
      <HeroCarousel />

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
                    ? 'bg-[#A2432B] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                All ({PROPERTIES.length})
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'featured'
                    ? 'bg-[#A2432B] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>Featured ({featuredProperties.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'recent'
                    ? 'bg-[#A2432B] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>New ({recentlyAddedProperties.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('recommended')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-medium transition-all duration-200 active:scale-95 flex items-center gap-1.5 ${
                  activeTab === 'recommended'
                    ? 'bg-[#A2432B] text-white shadow-xs'
                    : 'text-[#5B605F] hover:text-[#15181A]'
                }`}
              >
                <span>Curated ({recommendedProperties.length})</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

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
                      ? 'bg-[#A2432B] text-white font-medium'
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
              className="mt-4 px-5 py-2 bg-[#A2432B] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. RECENTLY VIEWED (Hidden if empty) */}
      {recentlyViewedProperties.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA] bg-[#F7F7F4]">
          <ScrollReveal animation="fade-up">
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#5B605F] mb-1 block">
                History
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#15181A]">
                Recently Viewed Residences
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentlyViewedProperties.slice(0, 3).map((property, idx) => (
              <ScrollReveal key={property.id} animation="fade-up" delay={idx * 100}>
                <PropertyCard property={property} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* COMPARE SECTION (Side-by-Side Table) */}
      <section id="compare" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#CFD1CA]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#5B605F] mb-2 block">
                Analysis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">
                Property Comparison ({comparedProperties.length}/4)
              </h2>
            </div>
            {comparedProperties.length > 0 && (
              <button
                onClick={clearCompare}
                className="mt-4 md:mt-0 flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#A2432B] hover:text-[#8C3822] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Comparison</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {comparedProperties.length === 0 ? (
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="text-center py-16 bg-[#F7F7F4] border border-[#CFD1CA] p-8">
              <Scale className="w-10 h-10 text-[#5B605F] mx-auto mb-3 opacity-50" />
              <h3 className="font-serif text-xl text-[#15181A] mb-1 font-medium">
                No Properties Selected
              </h3>
              <p className="text-xs text-[#5B605F] max-w-md mx-auto mb-6">
                Click the scale icon on any residence card above to compare pricing, carpet areas, and specifications.
              </p>
              <a
                href="#properties"
                className="inline-block px-6 py-2.5 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Browse Residences
              </a>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="overflow-x-auto bg-[#F7F7F4] border border-[#CFD1CA]">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-[#CFD1CA] bg-[#EDEEE9]">
                    <th className="p-4 text-xs uppercase tracking-wider text-[#5B605F] w-1/5">Specification</th>
                    {comparedProperties.map((p) => (
                      <th key={p.id} className="p-4 text-sm font-serif font-medium text-[#15181A] relative">
                        <div className="flex items-start justify-between gap-2">
                          <span className="line-clamp-1">{p.title}</span>
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="text-[#5B605F] hover:text-[#A2432B] p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CFD1CA] text-xs sm:text-sm">
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">Offered Price</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 font-serif text-base font-bold text-[#15181A]">
                        {p.priceFormatted}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">Location</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 text-[#15181A]">
                        {p.subLocation}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">Configuration</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 text-[#15181A]">
                        {p.bhk} ({p.propertyType})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">Carpet Area</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 text-[#15181A]">
                        {p.carpetArea} sq.ft
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">Possession</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 text-[#15181A]">
                        {p.possession}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-[#15181A] bg-[#EDEEE9]">MahaRERA ID</td>
                    {comparedProperties.map((p) => (
                      <td key={p.id} className="p-4 text-xs font-mono text-[#5B605F]">
                        {p.reraId}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* OFFICE & CONTACT INQUIRIES */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
        <ScrollReveal animation="fade-up">
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#5B605F] mb-2 block">
              Communications &bull; Lower Parel Headquarters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#15181A]">
              Inquiries & Advisory Office
            </h2>
            <p className="text-xs sm:text-sm text-[#5B605F] mt-1 font-sans">
              Submit a direct inquiry or contact our corporate headquarters at Peninsula Center, Lower Parel, Mumbai.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 sm:p-10 shadow-xs">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#A2432B] mx-auto" />
                    <h3 className="font-serif text-xl text-[#15181A]">Inquiry Submitted</h3>
                    <p className="text-xs text-[#5B605F] max-w-sm mx-auto">
                      Your inquiry has been logged. Our advisory desk will respond within one business day.
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
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
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
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
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
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
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
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
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
                        Inquiry Details
                      </label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
                        placeholder="Provide details regarding target BHK, carpet area requirements, or specific buildings..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Corporate Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-5 shadow-xs">
                <h3 className="font-serif text-lg font-medium text-[#15181A]">
                  Corporate Headquarters
                </h3>
                <div className="space-y-4 text-xs text-[#5B605F]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#A2432B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#15181A]">Parmar Properties Advisory</p>
                      <p>Peninsula Center, Lower Parel</p>
                      <p>Mumbai, Maharashtra 400013</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#A2432B] shrink-0" />
                    <span>+91 (022) 4988 7700</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#A2432B] shrink-0" />
                    <span>contact@parmarproperties.com</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 text-xs text-[#5B605F] space-y-1.5 shadow-xs">
                <div className="font-semibold text-[#15181A] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A2432B]" />
                  <span>MahaRERA Registration: A51900018442</span>
                </div>
                <p>Operating in strict compliance with Maharashtra Real Estate Regulatory Authority statutory mandates.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Floating Compare Bar */}
      <CompareBar />
    </div>
  );
}
