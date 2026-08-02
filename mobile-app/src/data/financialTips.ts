import { FinancialTip } from '../types';

export const FINANCIAL_TIPS: FinancialTip[] = [
  {
    id: 'tip-1',
    title: 'Follow the 50/30/20 rule',
    body: 'Aim for 50% of income on needs, 30% on wants, and 20% on savings or debt payoff.',
    category: 'budgeting',
  },
  {
    id: 'tip-2',
    title: 'Pay off high-interest debt first',
    body: 'Tackle loans with the highest interest rate first (avalanche method) to minimize total interest paid.',
    category: 'debt',
  },
  {
    id: 'tip-3',
    title: 'Build a 3-6 month emergency fund',
    body: 'Keep 3-6 months of essential expenses in an easily accessible savings account.',
    category: 'saving',
  },
  {
    id: 'tip-4',
    title: 'Automate your savings',
    body: 'Set up an automatic transfer to savings right after payday so you save before you spend.',
    category: 'saving',
  },
  {
    id: 'tip-5',
    title: 'Track every expense for a month',
    body: 'Logging every purchase for 30 days reveals spending leaks you can cut immediately.',
    category: 'budgeting',
  },
  {
    id: 'tip-6',
    title: 'Avoid minimum-payment traps',
    body: 'Paying only the minimum on a loan can double the time and interest needed to pay it off.',
    category: 'debt',
  },
  {
    id: 'tip-7',
    title: 'Negotiate your loan interest rate',
    body: "If your credit score improved since taking a loan, ask your lender about refinancing to a lower rate.",
    category: 'debt',
  },
  {
    id: 'tip-8',
    title: 'Use windfalls wisely',
    body: 'Put bonuses, tax refunds, or gifts toward debt payoff or savings instead of lifestyle upgrades.',
    category: 'general',
  },
  {
    id: 'tip-9',
    title: 'Review subscriptions quarterly',
    body: 'Cancel recurring subscriptions you no longer use — small amounts add up fast over a year.',
    category: 'budgeting',
  },
  {
    id: 'tip-10',
    title: 'Start investing early, even small amounts',
    body: 'Consistent small contributions compounding over years often beat larger contributions started later.',
    category: 'investing',
  },
  {
    id: 'tip-11',
    title: 'Separate needs from wants before buying',
    body: 'Wait 24 hours before non-essential purchases over a set amount to avoid impulse spending.',
    category: 'budgeting',
  },
  {
    id: 'tip-12',
    title: 'Know your loan payoff date',
    body: 'Calculate the exact payoff date for each loan — seeing an end date increases motivation to pay faster.',
    category: 'debt',
  },
  {
    id: 'tip-13',
    title: 'Diversify income with a side hustle',
    body: 'A second income stream speeds up debt payoff and savings goals, and adds a safety net.',
    category: 'general',
  },
  {
    id: 'tip-14',
    title: 'Set specific, measurable savings goals',
    body: 'Instead of "save more," aim for "save $200/month toward a $2,400 emergency fund."',
    category: 'saving',
  },
  {
    id: 'tip-15',
    title: 'Check your credit report annually',
    body: 'Errors on your credit report can raise loan interest rates — review and dispute mistakes yearly.',
    category: 'general',
  },
];

export function getRandomTip(excludeId?: string): FinancialTip {
  const pool = excludeId ? FINANCIAL_TIPS.filter((t) => t.id !== excludeId) : FINANCIAL_TIPS;
  return pool[Math.floor(Math.random() * pool.length)];
}
