import { AreaAnalysis, BusinessCategory, BusinessSample, SideHustleIdea } from '../types';
import { mockPlacesProvider } from './placesService';

interface IdeaTemplate {
  id: string;
  title: string;
  description: string;
  estimatedStartupCost: string;
  estimatedMonthlyIncome: string;
  /** Categories whose presence nearby signals unmet demand for this idea. */
  demandCategories: BusinessCategory[];
  /** Categories that directly compete with this idea; more of them lowers the score. */
  competitionCategories: BusinessCategory[];
}

const IDEA_TEMPLATES: IdeaTemplate[] = [
  {
    id: 'mobile-pet-grooming',
    title: 'Mobile Pet Grooming & Dog Walking',
    description: 'Offer at-home grooming, walking, and pet-sitting visits for busy pet owners.',
    estimatedStartupCost: '$300 - $1,200',
    estimatedMonthlyIncome: '$400 - $2,000',
    demandCategories: ['grocery', 'pharmacy', 'daycare'],
    competitionCategories: ['pet_services'],
  },
  {
    id: 'home-cleaning',
    title: 'Home & Small Office Cleaning',
    description: 'Recurring cleaning service for households and the small offices/coworking spaces nearby.',
    estimatedStartupCost: '$150 - $600',
    estimatedMonthlyIncome: '$500 - $2,500',
    demandCategories: ['coworking', 'gym', 'salon'],
    competitionCategories: ['cleaning'],
  },
  {
    id: 'fitness-coaching',
    title: 'Personal Training & Meal-Prep Coaching',
    description: 'Sell 1:1 or small-group coaching plus weekly meal-prep packages to the gym crowd in your area.',
    estimatedStartupCost: '$0 - $500',
    estimatedMonthlyIncome: '$300 - $3,000',
    demandCategories: ['gym'],
    competitionCategories: [],
  },
  {
    id: 'tutoring',
    title: 'Freelance Tutoring & Test Prep',
    description: 'Offer subject tutoring or standardized test prep to families near schools, daycares, and bookstores.',
    estimatedStartupCost: '$0 - $200',
    estimatedMonthlyIncome: '$300 - $1,800',
    demandCategories: ['daycare', 'bookstore'],
    competitionCategories: ['tutoring'],
  },
  {
    id: 'mobile-coffee-cart',
    title: 'Specialty Coffee or Snack Cart',
    description: 'Set up near coworking spaces and gyms during peak morning hours when cafes are scarce.',
    estimatedStartupCost: '$800 - $4,000',
    estimatedMonthlyIncome: '$500 - $2,500',
    demandCategories: ['coworking', 'gym'],
    competitionCategories: ['cafe'],
  },
  {
    id: 'mobile-car-detailing',
    title: 'Mobile Car Detailing',
    description: 'Bring detailing services directly to offices and gyms where commuters leave cars parked all day.',
    estimatedStartupCost: '$400 - $1,500',
    estimatedMonthlyIncome: '$400 - $2,200',
    demandCategories: ['gym', 'coworking'],
    competitionCategories: ['auto_repair'],
  },
  {
    id: 'dessert-delivery',
    title: 'Weekend Bakery / Dessert Delivery',
    description: 'Bake and deliver desserts to local cafes and restaurants that do not offer in-house pastries.',
    estimatedStartupCost: '$200 - $1,000',
    estimatedMonthlyIncome: '$300 - $1,600',
    demandCategories: ['cafe', 'restaurant'],
    competitionCategories: ['bakery'],
  },
  {
    id: 'laundry-pickup',
    title: 'Laundry Pickup & Delivery',
    description: 'Pick up and drop off laundry for busy professionals and parents who have no nearby laundromat.',
    estimatedStartupCost: '$100 - $500',
    estimatedMonthlyIncome: '$300 - $1,500',
    demandCategories: ['coworking', 'gym', 'daycare'],
    competitionCategories: ['laundry'],
  },
  {
    id: 'errand-running',
    title: 'Errand Running & Grocery Delivery',
    description: 'Run errands and deliver groceries or prescriptions for seniors and busy households in your area.',
    estimatedStartupCost: '$0 - $200',
    estimatedMonthlyIncome: '$300 - $1,800',
    demandCategories: ['pharmacy', 'grocery', 'daycare'],
    competitionCategories: [],
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management for Local Shops',
    description: 'Small shops rarely have time for marketing — offer content and social media management packages.',
    estimatedStartupCost: '$0 - $150',
    estimatedMonthlyIncome: '$400 - $2,500',
    demandCategories: ['cafe', 'restaurant', 'salon', 'bakery', 'gym'],
    competitionCategories: [],
  },
];

const DEMAND_WEIGHT = 12;
const COMPETITION_WEIGHT = 10;
const BASE_SCORE = 40;

function countFor(categoryCounts: Partial<Record<BusinessCategory, number>>, category: BusinessCategory): number {
  return categoryCounts[category] ?? 0;
}

function scoreIdea(
  template: IdeaTemplate,
  categoryCounts: Partial<Record<BusinessCategory, number>>
): number {
  const demandScore = template.demandCategories.reduce(
    (sum, c) => sum + Math.min(3, countFor(categoryCounts, c)) * DEMAND_WEIGHT,
    0
  );
  const competitionPenalty = template.competitionCategories.reduce(
    (sum, c) => sum + Math.min(3, countFor(categoryCounts, c)) * COMPETITION_WEIGHT,
    0
  );
  const raw = BASE_SCORE + demandScore - competitionPenalty;
  return Math.max(5, Math.min(100, Math.round(raw)));
}

function rationaleFor(
  template: IdeaTemplate,
  categoryCounts: Partial<Record<BusinessCategory, number>>
): string {
  const demandHits = template.demandCategories.filter((c) => countFor(categoryCounts, c) > 0);
  const competitorCount = template.competitionCategories.reduce(
    (sum, c) => sum + countFor(categoryCounts, c),
    0
  );

  const parts: string[] = [];
  if (demandHits.length > 0) {
    parts.push(`Nearby ${demandHits.map((c) => c.replace('_', ' ')).join(', ')} suggest steady demand`);
  } else {
    parts.push('No strong local demand signal yet, but low competition');
  }
  if (competitorCount === 0) {
    parts.push('no direct competitors found nearby');
  } else {
    parts.push(`${competitorCount} similar business${competitorCount > 1 ? 'es' : ''} already nearby`);
  }
  return `${parts.join(' — ')}.`;
}

export function analyzeBusinesses(businesses: BusinessSample[]): {
  categoryCounts: Partial<Record<BusinessCategory, number>>;
  ideas: SideHustleIdea[];
} {
  const categoryCounts: Partial<Record<BusinessCategory, number>> = {};
  businesses.forEach((b) => {
    categoryCounts[b.category] = (categoryCounts[b.category] ?? 0) + 1;
  });

  const ideas: SideHustleIdea[] = IDEA_TEMPLATES.map((template) => ({
    id: template.id,
    title: template.title,
    description: template.description,
    estimatedStartupCost: template.estimatedStartupCost,
    estimatedMonthlyIncome: template.estimatedMonthlyIncome,
    matchScore: scoreIdea(template, categoryCounts),
    rationale: rationaleFor(template, categoryCounts),
    relatedCategories: [...template.demandCategories, ...template.competitionCategories],
  })).sort((a, b) => b.matchScore - a.matchScore);

  return { categoryCounts, ideas };
}

export async function analyzeArea(
  latitude: number,
  longitude: number,
  areaLabel: string
): Promise<AreaAnalysis> {
  const businesses = await mockPlacesProvider.getNearbyBusinesses(latitude, longitude);
  const { categoryCounts, ideas } = analyzeBusinesses(businesses);
  return { areaLabel, businesses, categoryCounts, ideas };
}
