'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowUpDown,
  Filter,
  Building,
} from 'lucide-react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { CompareBar } from '@/components/property/CompareBar';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { PROPERTIES } from '@/data/properties';

function PropertiesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter States
  const [selectedLocality, setSelectedLocality] = useState<string>(searchParams.get('location') || 'All');
  const [selectedBhk, setSelectedBhk] = useState<string>(searchParams.get('bhk') || 'All');
  const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'All');
  const [selectedPossession, setSelectedPossession] = useState<string>(searchParams.get('possession') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 60);
  const [selectedAmenity, setSelectedAmenity] = useState<string>(searchParams.get('amenity') || 'All');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedLocality !== 'All') params.set('location', selectedLocality);
    if (selectedBhk !== 'All') params.set('bhk', selectedBhk);
    if (selectedType !== 'All') params.set('type', selectedType);
    if (selectedPossession !== 'All') params.set('possession', selectedPossession);
    if (maxPrice < 60) params.set('maxPrice', maxPrice.toString());
    if (selectedAmenity !== 'All') params.set('amenity', selectedAmenity);
    if (sortBy !== 'featured') params.set('sort', sortBy);

    const query = params.toString();
    const newPath = query ? `/properties?${query}` : '/properties';
    router.replace(newPath, { scroll: false });
  }, [selectedLocality, selectedBhk, selectedType, selectedPossession, maxPrice, selectedAmenity, sortBy, router]);

  const resetFilters = () => {
    setSelectedLocality('All');
    setSelectedBhk('All');
    setSelectedType('All');
    setSelectedPossession('All');
    setMaxPrice(60);
    setSelectedAmenity('All');
    setSortBy('featured');
  };

  const filteredAndSortedProperties = useMemo(() => {
    let list = PROPERTIES.filter((p) => {
      if (selectedLocality !== 'All' && p.location !== selectedLocality) return false;
      if (selectedBhk !== 'All' && !p.bhk.includes(selectedBhk)) return false;
      if (selectedType !== 'All' && p.propertyType !== selectedType) return false;
      if (selectedPossession !== 'All' && p.possession !== selectedPossession) return false;
      if (p.price > maxPrice) return false;
      if (selectedAmenity !== 'All' && !p.amenities.includes(selectedAmenity)) return false;
      return true;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'area-desc') {
      list.sort((a, b) => b.carpetArea - a.carpetArea);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.recentlyAdded ? 1 : 0) - (a.recentlyAdded ? 1 : 0));
    }

    return list;
  }, [selectedLocality, selectedBhk, selectedType, selectedPossession, maxPrice, selectedAmenity, sortBy]);

  const allAmenities = [
    'All',
    'Infinity Sky Pool',
    'Private Elevator',
    'Private Plunge Pool',
    'Sea-Facing Balconies',
    'Automated Smart Home',
    'Clubhouse & Spa',
    'Valet Parking for 4 Cars',
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-[#EDEEE9] text-[#15181A]">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#CFD1CA]">
        <div className="text-xs uppercase tracking-widest text-[#5B605F] font-semibold mb-2">
          <Link href="/" className="hover:underline">Home</Link> &bull; Mumbai Luxury Portfolio
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#15181A]">
              Prime Mumbai Residences
            </h1>
            <p className="text-sm text-[#5B605F] mt-2 font-sans max-w-xl">
              Showing {filteredAndSortedProperties.length} hand-curated residences across Worli, Bandra, Juhu, Lower Parel, and Malabar Hill.
            </p>
          </div>

          {/* Quick Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#F7F7F4] border border-[#CFD1CA] text-xs uppercase tracking-wider font-semibold text-[#15181A]"
            >
              <Filter className="w-3.5 h-3.5 text-[#A2432B]" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 text-xs bg-[#F7F7F4] border border-[#CFD1CA] px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A2432B]" />
              <span className="text-[#5B605F] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#15181A] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Carpet Area: Largest First</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-[#F7F7F4] border border-[#CFD1CA] p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#CFD1CA]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#15181A] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#A2432B]" />
                Filter Portfolio
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-[#A2432B] hover:text-[#8C3822] flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Locality */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                Locality
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full p-2.5 bg-[#EDEEE9] border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#A2432B]"
              >
                <option value="All">All Localities ({PROPERTIES.length})</option>
                <option value="Worli">Worli & Sea Face</option>
                <option value="Bandra West">Bandra West & Pali Hill</option>
                <option value="Juhu">Juhu Beachfront</option>
                <option value="Lower Parel">Lower Parel</option>
                <option value="Prabhadevi">Prabhadevi</option>
                <option value="Powai">Powai Waterfront</option>
                <option value="Malabar Hill">Malabar Hill</option>
                <option value="Cuffe Parade">Cuffe Parade</option>
                <option value="BKC">Bandra Kurla Complex</option>
                <option value="Khar West">Khar West</option>
              </select>
            </div>

            {/* BHK */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                Configuration (BHK)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['All', '3', '4', '5'].map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => setSelectedBhk(bhk)}
                    className={`py-1.5 text-xs font-semibold border transition-colors ${
                      selectedBhk === bhk
                        ? 'bg-[#A2432B] text-white border-[#A2432B]'
                        : 'bg-[#EDEEE9] text-[#5B605F] border-[#CFD1CA] hover:bg-[#CFD1CA]'
                    }`}
                  >
                    {bhk === 'All' ? 'All' : `${bhk} BHK`}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                Property Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2.5 bg-[#EDEEE9] border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#A2432B]"
              >
                <option value="All">All Types</option>
                <option value="Sea-Facing Apartment">Sea-Facing Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Sky Villa">Sky Villa</option>
                <option value="Duplex">Duplex</option>
                <option value="Luxury Estate">Luxury Estate</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#15181A]">
                  Max Budget
                </label>
                <span className="text-xs font-serif font-bold text-[#A2432B]">
                  ₹{maxPrice} Cr
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="60"
                step="2"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#A2432B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5B605F] mt-1">
                <span>₹14 Cr</span>
                <span>₹60 Cr</span>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                Possession
              </label>
              <div className="space-y-1.5 text-xs text-[#15181A]">
                {['All', 'Ready to Move', 'Immediate'].map((pos) => (
                  <label key={pos} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="possession"
                      checked={selectedPossession === pos}
                      onChange={() => setSelectedPossession(pos)}
                      className="accent-[#A2432B]"
                    />
                    <span>{pos === 'All' ? 'Any Possession' : pos}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Signature Amenities */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#15181A] mb-2">
                Prime Amenity
              </label>
              <select
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
                className="w-full p-2.5 bg-[#EDEEE9] border border-[#CFD1CA] text-xs focus:outline-none focus:border-[#A2432B]"
              >
                {allAmenities.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-sm bg-[#EDEEE9] h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#CFD1CA]">
                <span className="font-serif text-lg font-medium text-[#15181A]">Filter Portfolio</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-[#15181A]" />
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-2">Locality</label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full p-2.5 bg-[#F7F7F4] border border-[#CFD1CA] text-xs"
                >
                  <option value="All">All Localities</option>
                  <option value="Worli">Worli</option>
                  <option value="Bandra West">Bandra West</option>
                  <option value="Juhu">Juhu</option>
                  <option value="Lower Parel">Lower Parel</option>
                  <option value="Prabhadevi">Prabhadevi</option>
                  <option value="Malabar Hill">Malabar Hill</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-2">BHK</label>
                <div className="grid grid-cols-4 gap-2">
                  {['All', '3', '4', '5'].map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBhk(bhk)}
                      className={`py-2 text-xs font-semibold border ${
                        selectedBhk === bhk ? 'bg-[#A2432B] text-white border-[#A2432B]' : 'bg-[#F7F7F4] border-[#CFD1CA]'
                      }`}
                    >
                      {bhk === 'All' ? 'All' : `${bhk} BHK`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">Max Price</span>
                  <span className="text-[#A2432B] font-bold font-serif">₹{maxPrice} Cr</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="60"
                  step="2"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#A2432B]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="w-1/2 py-3 border border-[#CFD1CA] text-xs uppercase tracking-wider font-semibold bg-[#F7F7F4]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-1/2 py-3 bg-[#A2432B] text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right Property Grid */}
        <main className="lg:col-span-9">
          {filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-20 bg-[#F7F7F4] border border-[#CFD1CA] p-8">
              <Building className="w-12 h-12 text-[#5B605F] mx-auto mb-4 opacity-40" />
              <h3 className="font-serif text-2xl text-[#15181A] mb-2 font-light">
                No Residences Match These Filters
              </h3>
              <p className="text-sm text-[#5B605F] max-w-md mx-auto mb-6">
                Try widening your budget slider or clearing specific locality filters to view other premier residences.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-[#A2432B] hover:bg-[#8C3822] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProperties.map((property, idx) => (
                <ScrollReveal key={property.id} animation="fade-up" delay={(idx % 3) * 100}>
                  <PropertyCard property={property} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </main>
      </div>

      <CompareBar />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs">Loading Mumbai Residences...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
