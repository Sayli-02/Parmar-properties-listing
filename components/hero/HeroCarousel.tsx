'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES, SLIDE_DURATION_MS, TOTAL_SLIDES, PERSIST_HERO_COMPLETED } from '@/lib/constants';

interface HeroCarouselProps {
  onUnlockStateChange?: (unlocked: boolean) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onUnlockStateChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
      className="group relative w-full h-[100svh] min-h-[550px] overflow-hidden bg-[#1C1C1C] select-none"
    >
      {/* Side Swipe / Navigation Controls */}
      <button
        onClick={goToPrevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-black/40 hover:bg-[#A2432B] text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={goToNextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center bg-black/40 hover:bg-[#A2432B] text-white/80 hover:text-white border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slides */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
            </div>

            {/* Slide Content: Tagline, Subtext, CTA with Staggered Entrance */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
              {/* Highlighted Parmar Properties Branding */}
              <div
                className={`inline-flex items-center gap-3 px-5 py-2 border border-white/30 bg-black/40 backdrop-blur-md mb-6 shadow-sm transition-all duration-700 ease-out ${
                  isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-95'
                }`}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <span className="font-serif tracking-[0.35em] uppercase text-xs sm:text-sm text-white font-medium">
                  PARMAR PROPERTIES
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/75 border-l border-white/30 pl-3 hidden sm:inline">
                  MUMBAI
                </span>
              </div>

              <h1
                className={`font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-wide leading-tight drop-shadow-md mb-5 sm:mb-6 transition-all duration-800 delay-150 ease-out ${
                  isActive ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-[4px]'
                }`}
              >
                {slide.tagline}
              </h1>

              <p
                className={`font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-2xl font-light tracking-wide mb-8 sm:mb-10 leading-relaxed drop-shadow transition-all duration-800 delay-300 ease-out ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {slide.subtext}
              </p>

              <div
                className={`flex items-center justify-center transition-all duration-700 delay-450 ease-out ${
                  isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
                }`}
              >
                <a
                  href="#properties"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', '#properties');
                  }}
                  className="px-10 py-4 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-[#A2432B]/30 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom Bar: Indicators & Subtle Scroll Cue */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        {/* Slide Indicator Dots (Visual Only) */}
        <div className="flex items-center gap-3 mb-4 pointer-events-auto" aria-label="Hero Slide Progress">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentSlide === idx ? 'w-8 bg-[#A2432B]' : 'w-2 bg-white/40 hover:bg-white/70'
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
