'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '₹20 Cr - ₹40 Cr',
    locality: 'Worli',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      // Fallback
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Parmar Properties Advisory, I would like to enquire about luxury residences in Mumbai.`
  );
  const whatsappUrl = `https://wa.me/919820000000?text=${whatsappMessage}`;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-[#EDEEE9] text-[#15181A]">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest text-[#5B605F] font-semibold mb-2">
          <Link href="/" className="hover:underline">Home</Link> &bull; Communications
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#15181A]">
          Inquiries & Advisory Office
        </h1>
        <p className="text-sm text-[#5B605F] mt-2 max-w-2xl font-sans">
          Submit an inquiry or contact our corporate headquarters at Peninsula Center, Lower Parel regarding Mumbai prime residential acquisitions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Form */}
        <div className="lg:col-span-7 bg-[#F7F7F4] border border-[#CFD1CA] p-8 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-[#A2432B] mx-auto" />
              <h2 className="font-serif text-2xl sm:text-3xl text-[#15181A]">
                Inquiry Received
              </h2>
              <p className="text-sm text-[#5B605F] max-w-md mx-auto leading-relaxed">
                Thank you for contacting Parmar Properties. An advisory director will review your specifications and contact you within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 border border-[#CFD1CA] text-[#15181A] hover:bg-[#EDEEE9] text-xs uppercase tracking-wider font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
                    placeholder="Aditya Birla"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
                    placeholder="+91 98200 00000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
                    placeholder="aditya@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                    Location of Interest
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs cursor-pointer"
                  >
                    <option value="Worli">Worli & Sea Face</option>
                    <option value="Bandra West">Bandra West & Pali Hill</option>
                    <option value="Juhu">Juhu Beachfront</option>
                    <option value="Lower Parel">Lower Parel Skyline</option>
                    <option value="Prabhadevi">Prabhadevi</option>
                    <option value="Malabar Hill">Malabar Hill</option>
                    <option value="Cuffe Parade">Cuffe Parade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                  Target Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs cursor-pointer"
                >
                  <option value="₹15 Cr - ₹25 Cr">₹15 Cr &ndash; ₹25 Cr</option>
                  <option value="₹25 Cr - ₹40 Cr">₹25 Cr &ndash; ₹40 Cr</option>
                  <option value="₹40 Cr+">₹40 Cr+ (Penthouses & Villas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                  Inquiry Note
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#CFD1CA] focus:border-[#A2432B] focus:outline-none text-xs"
                  placeholder="Provide specifications regarding preferred square footage, views, or move-in timeline..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 space-y-6 shadow-xs">
            <h2 className="font-serif text-xl font-medium text-[#15181A]">
              Corporate Headquarters
            </h2>
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
                <a href="tel:+912249887700" className="hover:text-[#A2432B] transition-colors">
                  +91 (022) 4988 7700
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A2432B] shrink-0" />
                <a href="mailto:contact@parmarproperties.com" className="hover:text-[#A2432B] transition-colors">
                  contact@parmarproperties.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#5B605F] shrink-0" />
                <span>Monday &ndash; Saturday: 10:00 AM &ndash; 7:30 PM IST</span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="pt-4 border-t border-[#CFD1CA]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#15181A] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Advisory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 text-xs text-[#5B605F] space-y-2">
            <div className="font-semibold text-[#15181A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#A2432B]" />
              <span>MahaRERA Advisory Compliance</span>
            </div>
            <p>Registration No. A51900018442. Certified under Government of Maharashtra Real Estate Regulatory Authority.</p>
          </div>
        </div>
      </div>

      {/* Map Embed of Lower Parel */}
      <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-8 shadow-xs">
        <h3 className="font-serif text-2xl font-light text-[#15181A] mb-4">
          Visit Our Lower Parel Advisory Office
        </h3>
        <p className="text-xs text-[#5B605F] mb-6">
          Conveniently located in Mumbai’s premier business district at Peninsula Center, Lower Parel.
        </p>
        <div className="relative w-full h-80 bg-[#EDEEE9] border border-[#CFD1CA] overflow-hidden">
          <iframe
            title="Parmar Properties Lower Parel Office Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.8220%2C18.9920%2C72.8380%2C19.0080&layer=mapnik&marker=19.0002%2C72.8302"
          />
        </div>
      </div>
    </div>
  );
}
