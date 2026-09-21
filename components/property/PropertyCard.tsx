'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Scale, MapPin, Maximize2, BedDouble, ArrowRight } from 'lucide-react';
import { Property } from '@/types/property';
import { useSavedStore } from '@/store/saved';
import { useCompareStore } from '@/store/compare';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const isSaved = useSavedStore((s) => s.isSaved);

  const toggleCompare = useCompareStore((s) => s.toggleCompare);
  const isInCompare = useCompareStore((s) => s.isInCompare);

  useEffect(() => {
    setMounted(true);
  }, []);

  const saved = mounted ? isSaved(property.id) : false;
  const compared = mounted ? isInCompare(property.id) : false;

  return (
    <div className="group bg-[#F7F7F4] rounded-none border border-[#CFD1CA] hover:border-[#15181A] hover:-translate-y-2 hover:shadow-2xl transition-all duration-400 ease-out flex flex-col overflow-hidden will-change-transform relative">
      {/* Top interactive accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#A2432B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full bg-[#EDEEE9] overflow-hidden">
        {!imgError && property.coverImage ? (
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#EDEEE9] flex flex-col items-center justify-center p-6 text-center">
            <span className="font-serif text-base text-[#15181A] font-medium">
              {property.title}
            </span>
            <span className="text-[11px] text-[#5B605F] uppercase tracking-wider mt-1">
              {property.location} &bull; {property.propertyType}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-medium bg-[#15181A] text-white">
            {property.propertyType}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-medium bg-[#A2432B] text-white">
              Prime
            </span>
          )}
        </div>

        {/* Bottom Left Price Badge (matching reference mockup: From ₹X Cr on Ink black) */}
        <div className="absolute bottom-0 left-0 bg-[#15181A] text-white px-3.5 py-1.5 z-10">
          <span className="font-serif text-xs sm:text-sm font-medium tracking-wide">
            {property.priceFormatted}
          </span>
        </div>

        {/* Action Buttons: Save & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property.id);
            }}
            aria-label={compared ? 'Remove from compare' : 'Add to compare'}
            className={`p-2 backdrop-blur-md transition-all hover:scale-110 active:scale-90 ${
              compared
                ? 'bg-[#A2432B] text-white'
                : 'bg-white/90 hover:bg-white text-[#15181A]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaved(property.id);
            }}
            aria-label={saved ? 'Remove from saved' : 'Save property'}
            className={`p-2 backdrop-blur-md transition-all hover:scale-110 active:scale-90 ${
              saved
                ? 'bg-[#A2432B] text-white'
                : 'bg-white/90 hover:bg-white text-[#15181A]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#5B605F] mb-2 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#A2432B]" />
            <span>{property.subLocation}</span>
          </div>

          <h3 className="font-serif text-xl font-normal text-[#15181A] group-hover:text-[#A2432B] transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          <p className="text-xs text-[#5B605F] line-clamp-2 mb-5 font-sans leading-relaxed">
            {property.tagline}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#CFD1CA] text-xs text-[#15181A]">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-[#5B605F]" />
              <span>{property.bhk}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#5B605F]" />
              <span>{property.carpetArea} sq.ft</span>
            </div>
            <div className="text-right text-[#5B605F] truncate text-[11px]">
              {property.possession}
            </div>
          </div>
        </div>

        {/* Card Footer: Brick Action Button matching reference mockup */}
        <div className="pt-5 flex items-center justify-between gap-4">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 py-2.5 px-4 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs font-sans uppercase tracking-[0.12em] font-semibold text-center transition-all flex items-center justify-center gap-2 hover:shadow-md active:scale-98"
          >
            <span>View Residence</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <span className="text-[10px] text-[#5B605F] font-mono shrink-0">
            {property.reraId}
          </span>
        </div>
      </div>
    </div>
  );
};
