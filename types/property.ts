export type MumbaiLocality =
  | 'Worli'
  | 'Bandra West'
  | 'Juhu'
  | 'Powai'
  | 'Lower Parel'
  | 'Prabhadevi'
  | 'Khar West'
  | 'Malabar Hill'
  | 'Cuffe Parade'
  | 'BKC';

export type PropertyType = 'Penthouse' | 'Sea-Facing Apartment' | 'Duplex' | 'Sky Villa' | 'Luxury Estate';

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: MumbaiLocality;
  subLocation: string;
  price: number; // in Crores INR (e.g. 18.5)
  priceFormatted: string; // e.g. "₹18.50 Cr"
  bhk: string; // e.g. "4 BHK"
  carpetArea: number; // in sq ft
  superArea: number; // in sq ft
  propertyType: PropertyType;
  possession: 'Ready to Move' | 'Under Construction' | 'Immediate';
  possessionDate?: string;
  floor: string;
  featured: boolean;
  recentlyAdded: boolean;
  recommended: boolean;
  images: string[];
  coverImage: string;
  amenities: string[];
  description: string;
  highlights: string[];
  reraId: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  floorPlans?: {
    title: string;
    area: string;
    description: string;
  }[];
}
