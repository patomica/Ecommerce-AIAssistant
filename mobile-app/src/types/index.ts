export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO string
}

export type LoanDirection = 'borrowed' | 'lent';

export interface LoanPayment {
  id: string;
  amount: number;
  date: string; // ISO string
}

export interface Loan {
  id: string;
  direction: LoanDirection; // 'borrowed' = money I owe, 'lent' = money owed to me
  counterparty: string; // who I borrowed from / lent to
  principal: number;
  interestRate: number; // annual %, 0 if none
  dueDate?: string; // ISO string
  startDate: string; // ISO string
  note?: string;
  payments: LoanPayment[];
}

export interface FinancialTip {
  id: string;
  title: string;
  body: string;
  category: 'saving' | 'debt' | 'budgeting' | 'investing' | 'general';
}

export interface BusinessSample {
  id: string;
  name: string;
  category: BusinessCategory;
  rating: number; // 1-5
  reviewCount: number;
}

export type BusinessCategory =
  | 'cafe'
  | 'restaurant'
  | 'gym'
  | 'laundry'
  | 'grocery'
  | 'salon'
  | 'pet_services'
  | 'auto_repair'
  | 'bookstore'
  | 'tutoring'
  | 'daycare'
  | 'cleaning'
  | 'coworking'
  | 'bakery'
  | 'pharmacy';

export interface SideHustleIdea {
  id: string;
  title: string;
  description: string;
  rationale: string;
  estimatedStartupCost: string;
  estimatedMonthlyIncome: string;
  matchScore: number; // 0-100
  relatedCategories: BusinessCategory[];
}

export interface AreaAnalysis {
  areaLabel: string;
  businesses: BusinessSample[];
  categoryCounts: Partial<Record<BusinessCategory, number>>;
  ideas: SideHustleIdea[];
}
