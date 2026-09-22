'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { HERO_SLIDES, SLIDE_DURATION_MS, TOTAL_SLIDES, PERSIST_HERO_COMPLETED } from '@/lib/constants';

export interface HeroSearchParams {
  location?: string;
  bhk?: string;
  budget?: string;
  type?: string;
}

interface HeroCarouselProps {
  onUnlockStateChange?: (unlocked: boolean) => void;
  onSearch?: (params: HeroSearchParams) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onUnlockStateChange, onSearch }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Search bar form state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchBhk, setSearchBhk] = useState('Any');
  const [searchBudget, setSearchBudget] = useState('Any');
  const [searchType, setSearchType] = useState('Any');
  // Default to unlocked initially until client checks sessionStorage to avoid flashes on return visits
  const [isLocked, setIsLocked] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Swipe gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Track slides seen to unlock when returning to slide 0 after viewing all 3
  const visitedSlidesRef = useRef<Set<number>>(new Set([0]));
  const isLockedRef = useRef(false);

  const unlockScroll = useCallback(() => {
    isLockedRef.current = false;
    setIsLocked(false);
    setHasUnlocked(true);

    if (PERSIST_HERO_COMPLETED) {
      try {
        sessionStorage.setItem('heroCompleted', 'true');
      } catch (e) {
        // Handle storage quota or private browsing exceptions
      }
    }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (onUnlockStateChange) {
      onUnlockStateChange(true);
    }
  }, [onUnlockStateChange]);

  // Initial setup: Check sessionStorage, reduced motion, and initialize scroll-lock if fresh visit
  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
      unlockScroll();
      return;
    }

    // 2. Check returning visitor in sessionStorage
    let alreadyCompleted = false;
    if (PERSIST_HERO_COMPLETED) {
      try {
        alreadyCompleted = sessionStorage.getItem('heroCompleted') === 'true';
      } catch (e) {
        alreadyCompleted = false;
      }
    }

    if (alreadyCompleted) {
      setHasUnlocked(true);
      setIsLocked(false);
      isLockedRef.current = false;
      return;
    }

    // 3. Safeguard: If reloaded while scrolled past the hero, immediately unlock
    if (typeof window !== 'undefined' && window.scrollY > 50) {
      unlockScroll();
      return;
    }

    // 4. Fresh visit at top: activate scroll-lock until all 3 slides cycle
    isLockedRef.current = true;
    setIsLocked(true);
    setHasUnlocked(false);

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Lock html & body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Prevent scrolling events
    const preventScroll = (e: Event) => {
      if (isLockedRef.current) {
        e.preventDefault();
      }
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      const blockedKeys = [
        ' ',
        'Spacebar',
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    return () => {
      // Clean up completely on unmount so navigating away never leaves page locked
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [unlockScroll]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const nextSlide = (prev + 1) % TOTAL_SLIDES;
      visitedSlidesRef.current.add(nextSlide);
      if (
        isLockedRef.current &&
        visitedSlidesRef.current.size >= TOTAL_SLIDES &&
        nextSlide === 0
      ) {
        unlockScroll();
      }
      return nextSlide;
    });
  }, [unlockScroll]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const prevSlide = (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
      visitedSlidesRef.current.add(prevSlide);
      return prevSlide;
    });
  }, []);

  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }
  };

  // Slide rotation timer
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <section
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full h-[calc(100svh-80px)] min-h-[700px] md:min-h-[780px] lg:min-h-[820px] overflow-hidden bg-[#1C1C1C] select-none"
    >
      {/* Side Swipe / Navigation Controls */}
      <button
        onClick={goToPrevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-black/40 hover:bg-[#C5282F] text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-black/40 hover:bg-[#C5282F] text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = currentSlide === index;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            } ${reducedMotion ? 'transition-none' : ''}`}
            aria-hidden={!isActive}
          >
            {/* Background Full-Bleed Image with Gentle Cinematic Zoom */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[5000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                sizes="100vw"
              />
              {/* Gradient Overlays for High Legibility & Cinematic Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            </div>
          </div>
        );
      })}

      {/* Persistent Content Overlay: Tagline, Subtext & Floating Search Bar */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-6 pb-20 sm:pb-24">
        {/* Highlighted Parmar Properties Branding */}
        <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/30 bg-black/40 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#C5282F] rounded-full animate-pulse" />
          <span className="font-serif tracking-[0.35em] uppercase text-xs sm:text-sm text-white font-medium">
            PARMAR PROPERTIES
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-white/75 border-l border-white/30 pl-3 hidden sm:inline">
            MUMBAI
          </span>
        </div>

        {/* Unified Tagline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide leading-tight drop-shadow-md mb-3">
          Find Your Home
        </h1>

        {/* Dynamic Subtext */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#CFD1CA] max-w-2xl font-light tracking-wide mb-2 leading-relaxed drop-shadow">
          {HERO_SLIDES[currentSlide]?.subtext || 'Exclusive waterfront residences and architectural marvels in South Mumbai'}
        </p>

        {/* Floating Search Bar (Lowered position with website architectural theme) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSearch) {
              onSearch({
                location: searchLocation,
                bhk: searchBhk,
                budget: searchBudget,
                type: searchType,
              });
            }
            const el = document.getElementById('properties');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-full mt-8 sm:mt-12 md:mt-14 bg-[#15181A]/90 backdrop-blur-md border border-[#CFD1CA]/30 p-5 sm:p-6 shadow-2xl text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            {/* Location */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#CFD1CA] mb-2 font-sans">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Worli, Malabar Hill..."
                  className="w-full h-11 px-3.5 bg-[#101214]/70 border border-[#CFD1CA]/30 text-white placeholder-[#8A9090] text-base sm:text-xs focus:outline-none focus:border-[#C5282F] transition-colors"
                />
              </div>
            </div>

            {/* BHK */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#CFD1CA] mb-2 font-sans">
                BHK
              </label>
              <div className="relative">
                <select
                  value={searchBhk}
                  onChange={(e) => setSearchBhk(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#101214]/70 border border-[#CFD1CA]/30 text-white text-base sm:text-xs focus:outline-none focus:border-[#C5282F] transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="Any" className="bg-[#15181A] text-white">Any</option>
                  <option value="3 BHK" className="bg-[#15181A] text-white">3 BHK</option>
                  <option value="4 BHK" className="bg-[#15181A] text-white">4 BHK</option>
                  <option value="5 BHK" className="bg-[#15181A] text-white">5 BHK</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#CFD1CA]/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Budget */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#CFD1CA] mb-2 font-sans">
                Budget
              </label>
              <div className="relative">
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#101214]/70 border border-[#CFD1CA]/30 text-white text-base sm:text-xs focus:outline-none focus:border-[#C5282F] transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="Any" className="bg-[#15181A] text-white">Any</option>
                  <option value="Under 20" className="bg-[#15181A] text-white">Under ₹20 Cr</option>
                  <option value="20-35" className="bg-[#15181A] text-white">₹20 - ₹35 Cr</option>
                  <option value="35-50" className="bg-[#15181A] text-white">₹35 - ₹50 Cr</option>
                  <option value="50+" className="bg-[#15181A] text-white">₹50 Cr+</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#CFD1CA]/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Type */}
            <div className="lg:col-span-3">
              <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#CFD1CA] mb-2 font-sans">
                Type
              </label>
              <div className="relative">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#101214]/70 border border-[#CFD1CA]/30 text-white text-base sm:text-xs focus:outline-none focus:border-[#C5282F] transition-colors appearance-none cursor-pointer pr-8"
                >
                  <option value="Any" className="bg-[#15181A] text-white">Any</option>
                  <option value="Sea-Facing Apartment" className="bg-[#15181A] text-white">Sea-Facing Apartment</option>
                  <option value="Penthouse" className="bg-[#15181A] text-white">Penthouse</option>
                  <option value="Sky Villa" className="bg-[#15181A] text-white">Sky Villa</option>
                  <option value="Duplex" className="bg-[#15181A] text-white">Duplex</option>
                  <option value="Luxury Estate" className="bg-[#15181A] text-white">Luxury Estate</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#CFD1CA]/70 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-11 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5282F]/30 active:scale-95"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Bar: Indicators & Subtle Scroll Cue */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        {/* Slide Indicator Dots (Visual Only) */}
        <div className="flex items-center gap-3 mb-4 pointer-events-auto" aria-label="Hero Slide Progress">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentSlide === idx ? 'w-8 bg-[#C5282F]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Cue (Fades in when unlocked or returning visit) */}
        <div
          className={`flex flex-col items-center text-white/70 transition-opacity duration-700 ${
            hasUnlocked ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium mb-1">
            Scroll To Discover
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
