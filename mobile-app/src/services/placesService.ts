import { BusinessCategory, BusinessSample } from '../types';

/**
 * Local business data provider.
 *
 * This app ships with a deterministic mock provider so the Side Hustles tab
 * works fully offline with no API key. To use real nearby-business data,
 * implement `PlacesProvider` against a service such as Google Places
 * Nearby Search or Foursquare Places, and swap `mockPlacesProvider` for it
 * in `sideHustleEngine.ts`.
 */
export interface PlacesProvider {
  getNearbyBusinesses(latitude: number, longitude: number): Promise<BusinessSample[]>;
}

const CATEGORY_NAME_POOL: Record<BusinessCategory, string[]> = {
  cafe: ['Corner Coffee Co.', 'Daily Grind Cafe', 'Steamside Espresso', 'The Roasted Bean'],
  restaurant: ['Main Street Grill', 'Sunny Bowl Kitchen', 'La Piazza Trattoria', 'Harbor Diner'],
  gym: ['Iron Works Fitness', 'Pulse Athletic Club', 'CoreFit Studio', 'Summit Strength Gym'],
  laundry: ['QuickWash Laundromat', 'Spin Cycle Cleaners', 'FreshFold Laundry'],
  grocery: ['Neighborhood Market', 'GreenLeaf Grocers', 'Corner Pantry', 'FreshMart'],
  salon: ['Glow Hair Studio', 'The Trim Shop', 'Luxe Nails & Spa', 'Sharp Cuts Barber'],
  pet_services: ['Happy Tails Grooming', 'Pawsitive Pet Care', 'Bark Avenue Boarding'],
  auto_repair: ['Precision Auto Care', 'City Garage', 'QuickFix Motors'],
  bookstore: ['Chapter One Books', 'The Reading Nook', 'Paperback Corner'],
  tutoring: ['Bright Minds Tutoring', 'Prep Academy', 'Study Circle Learning'],
  daycare: ['Little Explorers Daycare', 'Sunshine Kids Center', 'Bright Beginnings Preschool'],
  cleaning: ['Sparkle Cleaning Co.', 'FreshStart Cleaners', 'Tidy Homes Service'],
  coworking: ['Hub & Desk Coworking', 'The Workshop Space', 'Nexus Work Lounge'],
  bakery: ['Sweet Crumb Bakery', 'Golden Oven Bakeshop', 'Rise & Shine Bakery'],
  pharmacy: ['MedFirst Pharmacy', 'CarePlus Drugstore', 'Wellness Pharmacy'],
};

const ALL_CATEGORIES = Object.keys(CATEGORY_NAME_POOL) as BusinessCategory[];

function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function coordsToSeed(latitude: number, longitude: number): number {
  const rounded = `${latitude.toFixed(2)}:${longitude.toFixed(2)}`;
  let hash = 0;
  for (let i = 0; i < rounded.length; i++) {
    hash = (hash * 31 + rounded.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 1;
}

export const mockPlacesProvider: PlacesProvider = {
  async getNearbyBusinesses(latitude, longitude) {
    const rand = seededRandom(coordsToSeed(latitude, longitude));
    const businesses: BusinessSample[] = [];

    ALL_CATEGORIES.forEach((category) => {
      const pool = CATEGORY_NAME_POOL[category];
      // Between 0 and pool.length businesses of this category "exist" nearby.
      const count = Math.floor(rand() * (pool.length + 1));
      const shuffled = [...pool].sort(() => rand() - 0.5);
      shuffled.slice(0, count).forEach((name, i) => {
        businesses.push({
          id: `${category}-${i}-${name.replace(/\s+/g, '')}`,
          name,
          category,
          rating: Math.round((3 + rand() * 2) * 10) / 10,
          reviewCount: Math.floor(rand() * 400) + 5,
        });
      });
    });

    return businesses;
  },
};
