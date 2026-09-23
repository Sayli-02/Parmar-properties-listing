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
  Sparkles,
  Lock,
  Download,
  PhoneCall,
  Compass,
  FileText,
  Shield,
  Eye,
  Check,
} from 'lucide-react';
import { Property } from '@/types/property';
import { PROPERTIES } from '@/data/properties';
import { PropertyCard } from '@/components/property/PropertyCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { useRecentStore } from '@/store/recent';

interface PropertyDetailClientProps {
  property: Property;
}

interface LeadModalContext {
  title: string;
  subtitle: string;
  tag: string;
  type: 'map' | 'floorplan' | 'brochure' | 'viewing' | 'general';
}

export const PropertyDetailClient: React.FC<PropertyDetailClientProps> = ({ property }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Lead Generation Gate Modal State
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalContext, setLeadModalContext] = useState<LeadModalContext>({
    title: 'Register to Unlock Complete Details',
    subtitle: 'Please register your details to unlock confidential coordinates, architectural floor plans, and receive priority advisory.',
    tag: 'Confidential Access',
    type: 'general',
  });
  const [isVerifiedLead, setIsVerifiedLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Direct Inquiry Desk state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: `I am interested in arranging a private viewing for ${property.title} (${property.bhk} - ${property.priceFormatted}).`,
  });

  // Stores
  const addRecent = useRecentStore((s) => s.addRecent);

  // Check verified status from localStorage on mount
  useEffect(() => {
    addRecent(property.slug);
    try {
      const savedLead = localStorage.getItem('parmar_verified_lead');
      if (savedLead) {
        setIsVerifiedLead(true);
        const parsed = JSON.parse(savedLead);
        if (parsed.name) {
          setLeadForm((prev) => ({ ...prev, name: parsed.name, phone: parsed.phone || '' }));
          setEnquiryForm((prev) => ({ ...prev, name: parsed.name, phone: parsed.phone || '' }));
        }
      }
    } catch {
      // Ignore local storage errors
    }
  }, [property.slug, addRecent]);

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
      setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (distance < -45) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  // Open Lead Gate Modal with tailored context
  const openLeadGate = (
    title: string,
    subtitle: string,
    tag: string,
    type: 'map' | 'floorplan' | 'brochure' | 'viewing' | 'general'
  ) => {
    if (isVerifiedLead) {
      return; // Already unlocked!
    }
    setLeadModalContext({ title, subtitle, tag, type });
    setLeadSuccess(false);
    setLeadModalOpen(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    try {
      localStorage.setItem('parmar_verified_lead', JSON.stringify(leadForm));
    } catch {
      // Storage unavailable
    }

    setIsVerifiedLead(true);
    setLeadSuccess(true);
    setEnquiryForm((prev) => ({
      ...prev,
      name: leadForm.name,
      phone: leadForm.phone,
      email: leadForm.email || prev.email,
    }));

    setTimeout(() => {
      setLeadModalOpen(false);
    }, 1800);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifiedLead(true);
    try {
      localStorage.setItem(
        'parmar_verified_lead',
        JSON.stringify({ name: enquiryForm.name, phone: enquiryForm.phone, email: enquiryForm.email })
      );
    } catch {
      // Storage unavailable
    }
    setEnquirySubmitted(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-[#EDEEE9] text-[#15181A] font-sans">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Breadcrumbs */}
      <div className="text-xs uppercase tracking-widest text-[#5B605F] font-semibold mb-4">
        <Link href="/" className="hover:underline">Home</Link> &bull;{' '}
        <Link href="/properties" className="hover:underline">Properties</Link> &bull;{' '}
        <span>{property.location}</span>
      </div>

      {/* Title & Price Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#CFD1CA]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5282F] mb-1.5 block">
            {property.propertyType} &bull; {property.location}
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#15181A]">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#5B605F] mt-2.5">
            <MapPin className="w-4 h-4 text-[#C5282F]" />
            <span className="font-medium">{property.subLocation}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:text-right">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block font-medium mb-0.5">
              Investment Offering
            </span>
            <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#15181A]">
              {property.priceFormatted}
            </span>
          </div>

          {/* Primary Lead Action Button */}
          <button
            onClick={() =>
              openLeadGate(
                'Schedule Private Residence Tour',
                'Register with your name and mobile number to arrange an executive site visit escorted by a senior partner.',
                'VIP Viewing',
                'viewing'
              )
            }
            className="px-5 py-3 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Schedule Private Tour</span>
          </button>
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
          <span className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-[#15181A]/90 text-white text-xs uppercase tracking-wider font-medium backdrop-blur-sm">
            Click to View High-Resolution Gallery
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
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1 font-medium">Configuration</span>
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-bold tracking-tight text-[#15181A]">{property.bhk}</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1 font-medium">Carpet Area</span>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-bold tracking-tight text-[#15181A]">{property.carpetArea} sq.ft</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1 font-medium">Possession</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-bold tracking-tight text-[#15181A]">{property.possession}</span>
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#5B605F] block mb-1 font-medium">Elevation</span>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C5282F]" />
              <span className="text-lg font-bold tracking-tight text-[#15181A]">{property.floor}</span>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFD1CA] pb-4">
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#15181A]">
                  Residence Narrative
                </h2>
                <button
                  onClick={() =>
                    openLeadGate(
                      'Download Full Brochure & Specifications',
                      'Please register with your name and mobile number to receive the comprehensive PDF brochure with architectural specifications.',
                      'Brochure Download',
                      'brochure'
                    )
                  }
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EDEEE9] hover:bg-[#CFD1CA] text-[#15181A] text-xs uppercase tracking-wider font-semibold border border-[#CFD1CA] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5282F]" />
                  <span>Download Brochure</span>
                </button>
              </div>

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

          {/* Gated Floor Plans Section */}
          {property.floorPlans && property.floorPlans.length > 0 && (
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#15181A]">
                      Architectural Floor Plans
                    </h2>
                    <p className="text-xs text-[#5B605F] mt-1">
                      Official structural master layout & unit floor plate
                    </p>
                  </div>

                  {!isVerifiedLead && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#15181A] text-white text-[11px] uppercase tracking-wider font-medium">
                      <Lock className="w-3 h-3 text-[#C5282F]" />
                      <span>Registration Required</span>
                    </span>
                  )}
                </div>

                {/* Floor Plan Tabs */}
                <div className="flex gap-2 mb-6 border-b border-[#CFD1CA] pb-3 overflow-x-auto">
                  {property.floorPlans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isVerifiedLead) {
                          openLeadGate(
                            'Unlock Full Architectural Floor Plans',
                            'Please register with your name and mobile number to unlock CAD blueprints, room dimensions, and carpet measurements.',
                            'Floor Plans Gate',
                            'floorplan'
                          );
                        } else {
                          setActiveFloorPlan(idx);
                        }
                      }}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors shrink-0 cursor-pointer ${
                        activeFloorPlan === idx
                          ? 'bg-[#C5282F] text-white'
                          : 'bg-[#EDEEE9] text-[#5B605F] hover:text-[#15181A]'
                      }`}
                    >
                      {plan.title}
                    </button>
                  ))}
                </div>

                {/* Floor Plan Blueprint Preview (Gated for Lead Generation) */}
                <div className="relative overflow-hidden border border-[#CFD1CA] bg-[#15181A] min-h-[300px] flex items-center justify-center p-6 text-center">
                  {/* Stylized Architectural Blueprint Background Grid */}
                  <div
                    className={`absolute inset-0 opacity-25 bg-[radial-gradient(#CFD1CA_1px,transparent_1px)] [background-size:16px_16px] ${
                      !isVerifiedLead ? 'blur-xs' : ''
                    }`}
                  />

                  {/* Blueprint Graphic Lines */}
                  <div
                    className={`absolute inset-4 sm:inset-8 border border-white/20 rounded-none pointer-events-none flex flex-col justify-between p-4 ${
                      !isVerifiedLead ? 'blur-[3px]' : ''
                    }`}
                  >
                    <div className="flex justify-between text-[10px] font-mono text-white/50">
                      <span>DIM: 48&apos;-6&quot; × 32&apos;-0&quot;</span>
                      <span>CARPET: {property.floorPlans[activeFloorPlan]?.area}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 h-36 border border-dashed border-white/20 p-2">
                      <div className="border border-white/15 flex items-center justify-center text-[10px] text-white/40">
                        Master Suite
                      </div>
                      <div className="border border-white/15 col-span-2 flex items-center justify-center text-[10px] text-white/40">
                        Grand Living & Sea-Facing Deck
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-white/50">
                      <span>ORIENTATION: VASTU COMPLIANT</span>
                      <span>ELEVATION: {property.floor}</span>
                    </div>
                  </div>

                  {/* If NOT verified: Show High-Converting Lock Card */}
                  {!isVerifiedLead ? (
                    <div
                      onClick={() =>
                        openLeadGate(
                          'Unlock Full Architectural Floor Plans',
                          'Please register with your name and mobile number to unlock CAD blueprints, room dimensions, and carpet measurements.',
                          'Floor Plans Gate',
                          'floorplan'
                        )
                      }
                      className="relative z-10 max-w-md w-full bg-[#F7F7F4]/95 backdrop-blur-md border border-[#CFD1CA] p-6 sm:p-7 shadow-2xl cursor-pointer group hover:border-[#C5282F] transition-all"
                    >
                      <div className="w-12 h-12 bg-[#EDEEE9] border border-[#CFD1CA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#C5282F] group-hover:scale-110 transition-transform">
                        <Lock className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5282F] block mb-1">
                        Developer Confidentiality Protocol
                      </span>
                      <h3 className="font-sans text-lg sm:text-xl font-bold text-[#15181A] mb-2 tracking-tight">
                        Architectural Floor Plans Gated
                      </h3>
                      <p className="text-xs text-[#5B605F] mb-5 leading-relaxed">
                        Detailed room dimensions, structural column grids, and custom CAD blueprints are confidential under developer NDA.
                      </p>
                      <button
                        type="button"
                        className="w-full py-3 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock Floor Plans & Dimensions</span>
                      </button>
                    </div>
                  ) : (
                    /* If Verified: Reveal Plan Specifications & Direct Download */
                    <div className="relative z-10 max-w-md w-full bg-[#F7F7F4] border border-[#CFD1CA] p-6 shadow-xl space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#15181A] text-white text-[10px] uppercase tracking-wider font-semibold">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Verified Client Access</span>
                      </div>
                      <h4 className="font-sans text-lg font-bold text-[#15181A]">
                        {property.floorPlans[activeFloorPlan]?.title}
                      </h4>
                      <p className="text-xs font-mono font-semibold text-[#C5282F]">
                        Carpet Area: {property.floorPlans[activeFloorPlan]?.area}
                      </p>
                      <p className="text-xs text-[#5B605F]">
                        {property.floorPlans[activeFloorPlan]?.description}
                      </p>
                      <p className="text-[11px] text-[#5B605F] pt-2 border-t border-[#CFD1CA]">
                        High-resolution vector blueprints dispatched to your registered phone number.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Curated Amenities Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8">
              <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#15181A] mb-6">
                Curated Amenities & Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(property.amenities || []).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#15181A] font-medium">
                    <Sparkles className="w-4 h-4 text-[#C5282F] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Gated Location Section (Business Concern: No Open Map Disclosure) */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#15181A]">
                    Enclave Location & Vicinity
                  </h2>
                  <p className="text-xs text-[#5B605F] mt-1">
                    Prime locality: {property.subLocation}, {property.location}
                  </p>
                </div>
                {!isVerifiedLead && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#15181A] text-white text-[11px] uppercase tracking-wider font-medium">
                    <Shield className="w-3 h-3 text-[#C5282F]" />
                    <span>Protected Geolocation</span>
                  </span>
                )}
              </div>

              {/* Designed Confidential Location Blueprint (No raw street map exposed) */}
              <div className="relative w-full h-80 sm:h-96 border border-[#CFD1CA] bg-[#121517] overflow-hidden flex items-center justify-center p-6 text-center select-none">
                {/* Stylized Nautical / Topographic Radar Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#CFD1CA_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-48 h-48 border border-white/20 rounded-full" />
                  <div className="absolute w-72 h-72 border border-dashed border-white/15 rounded-full" />
                  <div className="absolute w-96 h-96 border border-white/10 rounded-full" />
                  <div className="absolute w-full h-[1px] bg-white/10" />
                  <div className="absolute h-full w-[1px] bg-white/10" />
                </div>

                {/* Location Marker Radar Pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5282F] opacity-60" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-[#C5282F] items-center justify-center text-white">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </div>

                {/* If NOT verified: Prominent Gate Card for Lead Generation */}
                {!isVerifiedLead ? (
                  <div
                    onClick={() =>
                      openLeadGate(
                        'Unlock Location & Neighborhood Map',
                        'Please register with your name and mobile number to view verified enclave coordinates, access corridors, and neighborhood infrastructure analytics.',
                        'Location Gate',
                        'map'
                      )
                    }
                    className="relative z-10 max-w-md w-full bg-[#F7F7F4]/95 backdrop-blur-md border border-[#CFD1CA] p-6 sm:p-7 shadow-2xl cursor-pointer group hover:border-[#C5282F] transition-all"
                  >
                    <div className="w-12 h-12 bg-[#EDEEE9] border border-[#CFD1CA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#C5282F] group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5282F] block mb-1">
                      Precise Geolocation Restricted
                    </span>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-[#15181A] mb-2 tracking-tight">
                      Register to View Enclave Map
                    </h3>
                    <p className="text-xs text-[#5B605F] mb-5 leading-relaxed">
                      Due to developer exclusivity and client privacy protocols, exact gate coordinates and private landmark routes are accessible only to registered buyers.
                    </p>
                    <button
                      type="button"
                      className="w-full py-3 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Unlock Location & Vicinity Blueprint</span>
                    </button>
                  </div>
                ) : (
                  /* If Verified: Show Verified Enclave Clearance Card */
                  <div className="relative z-10 max-w-md w-full bg-[#F7F7F4] border border-[#CFD1CA] p-6 shadow-xl space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#15181A] text-white text-[10px] uppercase tracking-wider font-semibold">
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Verified Client Location Access</span>
                    </div>
                    <h4 className="font-sans text-lg font-bold text-[#15181A]">
                      Enclave Context: {property.subLocation}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-[#CFD1CA]">
                      <div className="bg-[#EDEEE9] p-2.5 text-xs">
                        <span className="text-[10px] uppercase tracking-wider text-[#5B605F] block">Zone</span>
                        <span className="font-semibold text-[#15181A]">{property.location} Prime</span>
                      </div>
                      <div className="bg-[#EDEEE9] p-2.5 text-xs">
                        <span className="text-[10px] uppercase tracking-wider text-[#5B605F] block">Connectivity</span>
                        <span className="font-semibold text-[#15181A]">Sea Link 5 Mins</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#5B605F] pt-1">
                      Our Senior Advisory Partner will guide you with direct GPS entry gates upon visit confirmation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Sticky Inquiry Card */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-[#F7F7F4] border border-[#CFD1CA] p-6 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-[#CFD1CA]">
              <span className="text-xs uppercase tracking-widest text-[#5B605F] block mb-1 font-medium">
                Direct Inquiry Desk
              </span>
              <p className="font-sans text-2xl font-bold tracking-tight text-[#15181A]">
                {property.priceFormatted}
              </p>
              <span className="text-xs text-[#5B605F] font-mono block mt-1">
                MahaRERA: {property.reraId}
              </span>
            </div>

            {enquirySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#C5282F] mx-auto" />
                <h3 className="font-sans text-lg font-bold text-[#15181A]">Inquiry Registered</h3>
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
                    Mobile Number *
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
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
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
                  className="w-full py-3.5 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Private Viewing</span>
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#CFD1CA] space-y-2 text-xs text-[#5B605F]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5282F]" />
                <a href="tel:+912249887700" className="hover:text-[#15181A] font-medium">
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
          <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#15181A] mb-8">
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

      {/* High-Converting Lead Generation Pop-up Modal */}
      {leadModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#15181A]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLeadModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#F7F7F4] border border-[#CFD1CA] shadow-2xl p-6 sm:p-8 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-4 right-4 text-[#5B605F] hover:text-[#15181A] p-1.5 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {leadSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-[#EDEEE9] border border-[#CFD1CA] rounded-full flex items-center justify-center mx-auto text-[#C5282F]">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#15181A] tracking-tight">
                  Access Granted
                </h3>
                <p className="text-xs text-[#5B605F] leading-relaxed">
                  Thank you, <strong>{leadForm.name}</strong>. Full confidential coordinates, floor plans, and portfolio details are now unlocked for your session.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] text-[#C5282F] font-semibold">
                    An advisory partner will reach out at {leadForm.phone}.
                  </span>
                </div>
              </div>
            ) : (
              <div>
                {/* Brand Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#C5282F]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5B605F]">
                    Parmar Properties &bull; {leadModalContext.tag}
                  </span>
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#15181A] mb-2">
                  {leadModalContext.title}
                </h3>
                <p className="text-xs text-[#5B605F] mb-6 leading-relaxed">
                  {leadModalContext.subtitle}
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Aditya Birla"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs bg-[#EDEEE9] border border-r-0 border-[#CFD1CA] text-[#5B605F] font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="98200 00000"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="aditya@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#C5282F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Details & Continue</span>
                  </button>
                </form>

                <div className="mt-5 pt-3.5 border-t border-[#CFD1CA] flex items-center justify-between text-[10px] text-[#5B605F]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C5282F]" /> Zero spam guarantee
                  </span>
                  <span>MahaRERA Compliant</span>
                </div>
              </div>
            )}
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
    </div>
  );
};
