export const SLIDE_DURATION_MS = 2200; // Quick rotation as requested
export const TOTAL_SLIDES = 3;
export const ALLOW_SKIP_INTRO = false;
export const PERSIST_HERO_COMPLETED = true;

export interface HeroSlideData {
  id: number;
  image: string;
  tagline: string;
  subtext: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 1,
    image: "/hero/hero-1-crisp.jpg",
    tagline: "MUMBAI'S FINEST ADDRESSES",
    subtext: "Curated residences, private oppurtunities and investment properties across Mumbai's most sought after neighbourhoods",
    alt: "Luxury residence overlooking Mumbai coastal skyline",
  },
  {
    id: 2,
    image: "/hero/hero-2-crisp.jpg",
    tagline: "MUMBAI'S FINEST ADDRESSES",
    subtext: "Curated residences, private oppurtunities and investment properties across Mumbai's most sought after neighbourhoods",
    alt: "Contemporary penthouse architecture in Mumbai",
  },
  {
    id: 3,
    image: "/hero/hero-3-crisp.jpg",
    tagline: "MUMBAI'S FINEST ADDRESSES",
    subtext: "Curated residences, private oppurtunities and investment properties across Mumbai's most sought after neighbourhoods",
    alt: "Prime skyline property in Mumbai commercial and luxury hub",
  },
];
