'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lock, Shield, EyeOff, Send, CheckCircle2, X, Phone, User, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface PrivateProperty {
  id: string;
  title: string;
  location: string;
  type: string;
  specs: string;
  priceEstimate: string;
  image: string;
  codeName: string;
}

const PRIVATE_LISTINGS: PrivateProperty[] = [
  {
    id: 'priv-1',
    codeName: 'PROJECT ZEPHYR',
    title: 'Crown Sky Penthouse',
    location: 'Worli Sea Face, South Mumbai',
    type: 'Penthouse',
    specs: '5 BHK · 8,400 sq.ft · 360° Ocean Deck',
    priceEstimate: '₹75 Cr – ₹90 Cr',
    image: '/hero/hero-1-crisp.jpg',
  },
  {
    id: 'priv-2',
    codeName: 'ESTATE SOVEREIGN',
    title: 'Heritage Seafront Villa',
    location: 'Malabar Hill, South Mumbai',
    type: 'Luxury Estate',
    specs: '6 BHK · 12,000 sq.ft · Private Gardens',
    priceEstimate: 'Price on Application',
    image: '/hero/hero-2-crisp.jpg',
  },
  {
    id: 'priv-3',
    codeName: 'SANCTUARY PACIFICA',
    title: 'Beachfront Glass Villa',
    location: 'Juhu Beachfront, Mumbai',
    type: 'Beachfront Villa',
    specs: '4 BHK · 6,800 sq.ft · Private Beach Access',
    priceEstimate: '₹55 Cr – ₹70 Cr',
    image: '/hero/hero-3-crisp.jpg',
  },
];

export function PrivateOpportunities() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>('All Private Listings');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (propertyName?: string) => {
    if (propertyName) setSelectedProperty(propertyName);
    setSubmitted(false);
    setOtpStep('phone');
    setOtpCode('');
    setModalOpen(true);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep('otp');
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpStep('details');
    }, 400);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#CFD1CA]">
      <ScrollReveal animation="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#CFD1CA] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/10 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#5B605F] mb-3">
              <Lock className="w-3 h-3 text-[#C5282F]" />
              <span>Confidential Real Estate</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#15181A]">
              PRIVATE OPPURTUNITIES
            </h2>
            <p className="text-sm text-[#5B605F] mt-2 font-sans italic tracking-wide">
              Not every property is listed online
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenModal('General Private Portfolio Access')}
              className="px-6 py-3 bg-[#15181A] hover:bg-[#C5282F] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#C5282F] group-hover:text-white" />
              <span>REQUEST ACCESS</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Blurred Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRIVATE_LISTINGS.map((item, idx) => (
          <ScrollReveal key={item.id} animation="fade-up" delay={idx * 120}>
            <div className="group relative bg-[#F7F7F4] border border-[#CFD1CA] overflow-hidden shadow-sm flex flex-col h-full">
              {/* Blurred Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-[#1C1C1C]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover filter blur-[7px] scale-110 opacity-75 group-hover:scale-115 transition-transform duration-700 pointer-events-none select-none"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                {/* Center Confidential Stamp */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center mb-2 shadow-lg backdrop-blur-md">
                    <Lock className="w-5 h-5 text-white/90" />
                  </div>
                  <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/90 font-semibold px-2.5 py-0.5 bg-black/50 border border-white/10">
                    {item.codeName}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#CFD1CA] mt-1">
                    Off-Market Trophy Asset
                  </span>
                </div>

                {/* Confidential Badge Top Left */}
                <div className="absolute top-3 left-3 bg-[#C5282F] text-white text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 flex items-center gap-1 shadow">
                  <EyeOff className="w-2.5 h-2.5" /> Private
                </div>
              </div>

              {/* Clear Details Box (Information Displayed) */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white relative">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-wider text-[#5B605F] font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#C5282F]" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#15181A] font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5B605F] font-sans">
                    {item.specs}
                  </p>
                  <p className="text-sm sm:text-base font-serif font-bold text-[#C5282F] pt-1">
                    {item.priceEstimate}
                  </p>
                </div>

                {/* Overlay Action Button */}
                <div className="mt-6 pt-4 border-t border-[#CFD1CA] flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#5B605F] font-semibold">
                    Confidential Dossier
                  </span>
                  <button
                    onClick={() => handleOpenModal(item.title)}
                    className="px-4 py-2 bg-[#C5282F] hover:bg-[#A31D23] text-white text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    REQUEST ACCESS
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* POPUP CONTACT MODAL FOR LEAD CONVERSION */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#F7F7F4] border border-[#CFD1CA] shadow-2xl p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#5B605F] hover:text-[#15181A] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-[#C5282F]/10 border border-[#C5282F]/20 text-[#C5282F] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#15181A] font-light">
                  Request Received
                </h3>
                <p className="text-xs sm:text-sm text-[#5B605F] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your request for private access to our confidential listings has been registered. Our Senior Portfolio Director will contact you discreetly at <strong>{phone}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 bg-[#15181A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5282F] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C5282F]/10 text-[#C5282F] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
                    <Lock className="w-3 h-3" /> Private Client Advisory
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#15181A] font-light">
                    REQUEST PRIVATE ACCESS
                  </h3>
                  <p className="text-xs text-[#5B605F] mt-1 font-sans">
                    Not every property is listed online. Enter your details to unlock off-market opportunities and private residences across Mumbai.
                  </p>
                </div>

                {/* 3-Step OTP Lead Conversion Form */}
                {otpStep === 'phone' && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                        Enter Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 text-xs bg-[#EDEEE9] border border-r-0 border-[#CFD1CA] text-[#5B605F] font-semibold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98200 00000"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-xs text-[#15181A]"
                        />
                      </div>
                      <p className="text-[10px] text-[#5B605F] mt-1.5">
                        We will send a quick verification code to your mobile number.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || phone.length < 10}
                      className="w-full py-3 bg-[#C5282F] hover:bg-[#A31D23] disabled:opacity-50 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-3"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{loading ? 'SENDING CODE...' : 'GET OTP'}</span>
                    </button>
                  </form>
                )}

                {otpStep === 'otp' && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="bg-[#EDEEE9]/60 p-3 border border-[#CFD1CA] mb-2 text-xs">
                      <p className="text-[#15181A] font-medium">Enter OTP sent to +91 {phone}</p>
                      <p className="text-[11px] text-[#C5282F] font-mono mt-0.5">Demo OTP: 4821</p>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1.5">
                        4-Digit Verification Code *
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="4821"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-base tracking-[0.3em] font-mono text-center text-[#15181A]"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpStep('phone')}
                        className="w-1/3 py-2.5 bg-[#EDEEE9] hover:bg-[#CFD1CA] text-[#15181A] text-xs uppercase tracking-wider font-semibold border border-[#CFD1CA]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading || otpCode.length < 4}
                        className="w-2/3 py-2.5 bg-[#C5282F] hover:bg-[#A31D23] disabled:opacity-50 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{loading ? 'VERIFYING...' : 'VERIFY OTP'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {otpStep === 'details' && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Mobile Verified (+91 {phone}). Please complete your details:</span>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#5B605F] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Singhania"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-xs text-[#15181A] placeholder:text-[#5B605F]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#15181A] mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#5B605F] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#CFD1CA] focus:border-[#C5282F] focus:outline-none text-xs text-[#15181A] placeholder:text-[#5B605F]/50"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-[#C5282F] hover:bg-[#A31D23] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-3"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'SUBMITTING...' : 'CONFIRM & REQUEST ACCESS'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
