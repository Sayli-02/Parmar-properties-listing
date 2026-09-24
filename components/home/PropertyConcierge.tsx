'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  BedDouble, 
  IndianRupee, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Phone,
  Sliders,
  BookmarkCheck
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property } from '@/types/property';

export function PropertyConcierge() {
  const [location, setLocation] = useState('All');
  const [configuration, setConfiguration] = useState('3BHK');
  const [budget, setBudget] = useState('20-35');
  const [preferredRequirement, setPreferredRequirement] = useState('Sea-Facing View');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  
  const [shortlistResults, setShortlistResults] = useState<Property[] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleGetShortlist = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      // Find matching properties
      const matches = PROPERTIES.filter((p) => {
        // Location match
        const matchLoc = location === 'All' || p.location.toLowerCase().includes(location.toLowerCase());
        
        // Configuration match
        let matchBhk = true;
        if (configuration === '2BHK') matchBhk = p.bhk.includes('2') || p.bhk.includes('3');
        else if (configuration === '3BHK') matchBhk = p.bhk.includes('3');
        else if (configuration === '4BHK') matchBhk = p.bhk.includes('4') || p.bhk.includes('5');
        else if (configuration === 'VILLA') matchBhk = p.propertyType === 'Sky Villa' || p.propertyType === 'Penthouse' || p.propertyType === 'Luxury Estate';

        // Budget match
        let matchBudget = true;
        if (budget === 'under-20') matchBudget = p.price <= 22;
        else if (budget === '20-35') matchBudget = p.price >= 18 && p.price <= 36;
        else if (budget === '35-50') matchBudget = p.price >= 30 && p.price <= 52;
        else if (budget === '50+') matchBudget = p.price >= 45;

        return matchLoc && (matchBhk || matchBudget);
      });

      // Fallback to top curated if exact match is empty
      const finalResults = matches.length > 0 ? matches.slice(0, 3) : PROPERTIES.slice(0, 3);
      setShortlistResults(finalResults);
      setIsSearching(false);
      setSubmitted(true);

      // Smooth scroll down to results if needed
      setTimeout(() => {
        const el = document.getElementById('shortlist-results');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 450);
  };

  return (
    <section id="concierge" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
      <ScrollReveal animation="fade-up">
        <div className="max-w-3xl mb-12">
          {/* Small font tag */}
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5282F] mb-2 block">
            PROPERTY CONCIERGE
          </span>
          {/* Headline in a little big font */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#15181A] tracking-tight">
            TELL US WHAT YOU&apos;RE LOOKING FOR
          </h2>
          <p className="text-sm text-[#5B605F] mt-2 font-sans">
            Tell us your requirement. Our bespoke concierge algorithm and seasoned Mumbai advisors will assemble a hand-tailored shortlist for you.
          </p>
        </div>
      </ScrollReveal>

      {/* Main Concierge Interactive Card */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5282F]/5 rounded-bl-full pointer-events-none" />

          <form onSubmit={handleGetShortlist} className="space-y-8">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#15181A] border-b border-[#CFD1CA] pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C5282F]" />
              <span>Tell us your requirement</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#15181A]">
                  <MapPin className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>1. Location</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs font-medium text-[#15181A] focus:border-[#C5282F] focus:outline-none cursor-pointer"
                >
                  <option value="All">All Premier Enclaves</option>
                  <option value="Worli">Worli & Sea Face</option>
                  <option value="Bandra West">Bandra West & Pali Hill</option>
                  <option value="Juhu">Juhu Beachfront</option>
                  <option value="Lower Parel">Lower Parel</option>
                  <option value="Prabhadevi">Prabhadevi</option>
                  <option value="Malabar Hill">Malabar Hill</option>
                  <option value="Cuffe Parade">Cuffe Parade</option>
                  <option value="Powai">Powai Waterfront</option>
                </select>
                <span className="text-[10px] text-[#5B605F] block">Select target micro-market</span>
              </div>

              {/* 2. Configuration */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#15181A]">
                  <BedDouble className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>2. Configuration</span>
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { label: '2 BHK', val: '2BHK' },
                    { label: '3 BHK', val: '3BHK' },
                    { label: '4 BHK', val: '4BHK' },
                    { label: 'VILLA', val: 'VILLA' },
                  ].map((cfg) => (
                    <button
                      type="button"
                      key={cfg.val}
                      onClick={() => setConfiguration(cfg.val)}
                      className={`py-2 text-[11px] font-semibold transition-all border cursor-pointer ${
                        configuration === cfg.val
                          ? 'bg-[#15181A] text-white border-[#15181A] shadow-xs'
                          : 'bg-white text-[#5B605F] border-[#CFD1CA] hover:text-[#15181A]'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[#5B605F] block">2BHK, 3BHK, 4BHK, or Luxury Villa</span>
              </div>

              {/* 3. Budget */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#15181A]">
                  <IndianRupee className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>3. Budget</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs font-medium text-[#15181A] focus:border-[#C5282F] focus:outline-none cursor-pointer"
                >
                  <option value="under-20">Under ₹20 Cr</option>
                  <option value="20-35">₹20 Cr – ₹35 Cr</option>
                  <option value="35-50">₹35 Cr – ₹50 Cr</option>
                  <option value="50+">₹50 Cr+ (Ultra Trophy)</option>
                </select>
                <span className="text-[10px] text-[#5B605F] block">Capital allocation target</span>
              </div>

              {/* 4. Preferred Requirement */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#15181A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>4. Preferred Requirement</span>
                </label>
                <select
                  value={preferredRequirement}
                  onChange={(e) => setPreferredRequirement(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs font-medium text-[#15181A] focus:border-[#C5282F] focus:outline-none cursor-pointer"
                >
                  <option value="Sea-Facing View">Unobstructed Sea-Facing View</option>
                  <option value="Ready Possession">Ready-to-Move / Immediate</option>
                  <option value="Penthouse Terrace">High Floor / Penthouse Terrace</option>
                  <option value="Private Pool">Private Pool & Elevator</option>
                  <option value="Investment Grade">High Yield / Prime Heritage</option>
                </select>
                <span className="text-[10px] text-[#5B605F] block">Signature requirement preference</span>
              </div>
            </div>

            {/* Recipient Details & Submission Button */}
            <div className="pt-6 border-t border-[#CFD1CA] grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#5B605F] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Vikram Singhal"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-xs text-[#15181A]"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                  Contact Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#5B605F] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-xs text-[#15181A]"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-2.5 px-6 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer h-[42px]"
                >
                  {isSearching ? (
                    <span>CURATING MATCHES...</span>
                  ) : (
                    <>
                      <span>GET MY SHORTLIST</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </ScrollReveal>

      {/* Dynamic Matched Shortlist Results */}
      {submitted && shortlistResults && (
        <div id="shortlist-results" className="mt-14 scroll-mt-28">
          <div className="p-4 bg-white border border-[#CFD1CA] shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C5282F]/10 flex items-center justify-center text-[#C5282F] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#15181A] font-medium">
                  Bespoke Shortlist Generated for {clientName || 'You'}
                </h4>
                <p className="text-xs text-[#5B605F]">
                  Criteria: <strong>{configuration}</strong> &bull; Budget <strong>{budget}</strong> &bull; <strong>{preferredRequirement}</strong> &bull; Sent to <strong>{clientPhone}</strong>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#C5282F] font-semibold tracking-wider uppercase shrink-0">
              <BookmarkCheck className="w-4 h-4" />
              <span>{shortlistResults.length} Matched Residences</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlistResults.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
