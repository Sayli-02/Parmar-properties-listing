'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  BedDouble,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Property } from '@/types/property';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { CompareBar } from '@/components/property/CompareBar';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { useSavedStore } from '@/store/saved';
import { useCompareStore } from '@/store/compare';
import { useRecentStore } from '@/store/recent';

interface PropertyDetailClientProps {
  property: Property;
}

export const PropertyDetailClient: React.FC<PropertyDetailClientProps> = ({ property }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I am interested in arranging a private viewing for ${property.title} (${property.bhk} - ${property.priceFormatted}).`,
  });

  const [mounted, setMounted] = useState(false);

  // Stores
  const addRecent = useRecentStore((s) => s.addRecent);
  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const isSavedFn = useSavedStore((s) => s.isSaved);
  const toggleCompare = useCompareStore((s) => s.toggleCompare);
  const isInCompareFn = useCompareStore((s) => s.isInCompare);

  // Record visit & client mount
  useEffect(() => {
    setMounted(true);
    addRecent(property.slug);
  }, [property.slug, addRecent]);

  const isSaved = mounted ? isSavedFn(property.id) : false;
  const isInCompare = mounted ? isInCompareFn(property.id) : false;

  const similarProperties = PROPERTIES.filter(
    (p) => p.id !== property.id && (p.location === property.location || p.propertyType === property.propertyType)
  ).slice(0, 3);

  const images = property.images && property.images.length > 0 ? property.images : [property.coverImage];

  // Touch swipe gestures for Lightbox
  const lightboxTouchStartX = useRef<number | null>(null);
  const lightboxTouchEndX = useRef<number | null>(null);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchEndX.current = null;
    lightboxTouchStartX.current = e.targetTouches[0].clientX;
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleLightboxTouchEnd = () => {
    if (!lightboxTouchStartX.current || !lightboxTouchEndX.current) return;
    const distance = lightboxTouchStartX.current - lightboxTouchEndX.current;
    if (distance > 45) {
      // swipe left -> next image
      setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (distance < -45) {
      // swipe right -> prev image
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-[#EDEEE9] text-[#15181A]">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Breadcrumbs */}
      <div className="text-xs uppercase tracking-widest text-[#5B605F] font-semibold mb-4">
        <Link href="/" className="hover:underline">Home</Link> &bull;{' '}
        <Link href="/properties" className="hover:underline">Properties</Link> &bull;{' '}
        <span>{property.location}</span>
      </div>

      {/* Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#CFD1CA]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5282F] mb-1 block">
            {property.propertyType} &bull; {property.location}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#15181A]">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#5B605F] mt-2">
            <MapPin className="w-4 h-4 text-[#C5282F]" />
            <span>{property.subLocation}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:text-right">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block">
              Investment Offering
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#15181A]">
              {property.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaved(property.id)}
              className={`p-3 rounded-none border transition-colors ${
                isSaved ? 'bg-[#C5282F] text-white border-[#C5282F]' : 'bg-[#F7F7F4] text-[#15181A] border-[#CFD1CA]'
              }`}
              title="Save Residence"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleCompare(property.id)}
              className={`p-3 rounded-none border transition-colors ${
                isInCompare ? 'bg-[#C5282F] text-white border-[#C5282F]' : 'bg-[#F7F7F4] text-[#15181A] border-[#CFD1CA]'
              }`}
              title="Compare Residence"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="md:col-span-2 relative h-[380px] sm:h-[480px] bg-[#CFD1CA] cursor-pointer group overflow-hidden border border-[#CFD1CA]"
        >
          <Image
            src={images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#15181A]/85 text-white text-xs uppercase tracking-wider">
            Click to View High-Resolution Lightbox
          </span>
        </div>

        <div className="grid grid-rows-2 gap-4">
          {images.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => {
                setLightboxIndex(idx + 1);
                setLightboxOpen(true);
              }}
              className="relative h-[180px] sm:h-[232px] bg-[#CFD1CA] cursor-pointer group overflow-hidden border border-[#CFD1CA]"
            >
              <Image
                src={img}
                alt={`${property.title} perspective ${idx + 2}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Bar */}
      <ScrollReveal animation="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#F7F7F4] border border-[#CFD1CA] mb-12 shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1">Configuration</span>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-serif font-medium text-[#15181A]">{property.bhk}</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1">Carpet Area</span>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-serif font-medium text-[#15181A]">{property.carpetArea} sq.ft</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1">Possession</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-serif font-medium text-[#15181A]">{property.possession}</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1">Elevation</span>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-serif font-medium text-[#15181A]">{property.floor}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Narrative & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-8 space-y-12">
          {/* Narrative */}
          <ScrollReveal animation="fade-up">
            <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#15181A]">
                Residence Narrative
              </h2>
              <p className="text-sm sm:text-base text-[#5B605F] leading-relaxed font-sans">
                {property.description}
              </p>

              <div className="pt-4 border-t border-[#CFD1CA]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#15181A] mb-4">
                  Signature Architectural Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(property.highlights || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#15181A]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5282F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Floor Plans */}
          {property.floorPlans && property.floorPlans.length > 0 && (
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#15181A] mb-6">
                  Architectural Floor Plans
                </h2>
                <div className="flex gap-2 mb-6 border-b border-[#CFD1CA] pb-3">
                  {property.floorPlans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFloorPlan(idx)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                        activeFloorPlan === idx
                          ? 'bg-[#C5282F] text-white'
                          : 'bg-[#EDEEE9] text-[#5B605F] hover:text-[#15181A]'
                      }`}
                    >
                      {plan.title}
                    </button>
                  ))}
                </div>

                <div className="p-6 bg-[#EDEEE9] border border-[#CFD1CA] text-center space-y-3">
                  <span className="text-xs font-mono uppercase text-[#5B605F]">
                    {property.floorPlans[activeFloorPlan]?.area}
                  </span>
                  <p className="text-sm text-[#15181A]">
                    {property.floorPlans[activeFloorPlan]?.description}
                  </p>
                  <p className="text-[11px] text-[#5B605F]">
                    Detailed CAD schematics and structural engineering blueprints available on NDA request.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Amenities Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#15181A] mb-6">
                Curated Amenities & Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(property.amenities || []).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#15181A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5282F]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Location Map Placeholder */}
          {property.coordinates && (
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#15181A] mb-2">
                  Enclave Context & Coordinates
                </h2>
                <p className="text-xs text-[#5B605F] mb-6">
                  Coordinates: {property.coordinates.lat.toFixed(4)}° N, {property.coordinates.lng.toFixed(4)}° E &bull; {property.subLocation}
                </p>
                <div className="relative w-full h-72 border border-[#CFD1CA] overflow-hidden">
                  <iframe
                    title="Enclave Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.coordinates.lng - 0.01}%2C${property.coordinates.lat - 0.01}%2C${property.coordinates.lng + 0.01}%2C${property.coordinates.lat + 0.01}&layer=mapnik&marker=${property.coordinates.lat}%2C${property.coordinates.lng}`}
                    className="w-full h-full grayscale opacity-85"
                  />
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Right Sticky Inquiry Card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-[#F7F7F4] border border-[#CFD1CA] p-6 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-[#CFD1CA]">
              <span className="text-xs uppercase tracking-widest text-[#5B605F] block mb-1">
                Direct Inquiry Desk
              </span>
              <p className="font-serif text-2xl font-bold text-[#15181A]">
                {property.priceFormatted}
              </p>
              <span className="text-xs text-[#5B605F] font-mono">
                MahaRERA: {property.reraId}
              </span>
            </div>

            {enquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C5282F] mx-auto" />
                <h3 className="font-serif text-lg text-[#15181A]">Inquiry Registered</h3>
                <p className="text-xs text-[#5B605F]">
                  An advisory partner will review your credentials and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                    placeholder="Aditya Birla"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                    placeholder="+91 98200 00000"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                    placeholder="aditya@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                    Confidential Note
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Private Viewing</span>
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#CFD1CA] space-y-2 text-xs text-[#5B605F]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5282F]" />
                <a href="tel:+912249887700" className="hover:text-[#15181A]">
                  +91 (022) 4988 7700
                </a>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5282F]" />
                <span>Strict Client Non-Disclosure Safeguard</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Residences */}
      {similarProperties.length > 0 && (
        <div className="pt-16 border-t border-[#CFD1CA]">
          <h2 className="font-serif text-3xl font-light text-[#15181A] mb-8">
            Similar Mumbai Residences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((p, idx) => (
              <ScrollReveal key={p.id} animation="fade-up" delay={idx * 100}>
                <PropertyCard property={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal with Touch Swipe */}
      {lightboxOpen && (
        <div
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#C5282F] p-2 cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl h-[70vh]">
            <Image
              src={images[lightboxIndex]}
              alt={`${property.title} full view`}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-6 mt-6 text-white">
            <button
              onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-sm font-sans tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <span className="text-xs text-white/50 mt-2 font-mono">
            Swipe left or right to browse photos
          </span>
        </div>
      )}

      {/* Floating Compare Bar */}
      <CompareBar />
    </div>
  );
};
