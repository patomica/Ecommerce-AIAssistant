# Finance Tracker (mobile-app)

A React Native (Expo + TypeScript) mobile app for tracking personal income,
expenses, and loans, with a rotating financial tips bar and a Side Hustles
tab that recommends local business ideas based on your area.

## Features

- **Dashboard** — balance, income/expenses summary, net loan position, and
  recent activity, topped with a rotating financial tips banner.
- **Income & Expenses** — add/delete transactions, filter by type, categorized
  (Salary, Freelance, Groceries, Rent, Loan payments, etc.).
- **Loans** — track loans you've borrowed or lent out: principal, interest
  rate, due date, remaining balance with a payoff progress bar, and payment
  logging.
- **Financial Tips bar** — a mini notification bar on the dashboard that
  auto-rotates through curated money-management tips (budgeting, debt payoff,
  saving, investing); tap it to see the full tip list.
- **Side Hustles** — uses your device location to "analyze" nearby businesses
  (cafes, gyms, salons, laundromats, etc.) and ranks side-hustle ideas by how
  much local demand vs. competition they'd face, with estimated startup cost
  and monthly income for each.
- All data is persisted locally on-device with AsyncStorage — no backend or
  account required.

## Getting started

```bash
npm install
npm start        # then press i (iOS), a (Android), or w (web)
```

Requires the Expo Go app (or an iOS/Android simulator) to run on a device.

## Project structure

```
src/
  components/     Reusable UI: TipsBanner, SummaryCard, LoanCard, TransactionListItem, SideHustleCard
  context/        FinanceContext — transactions/loans state + AsyncStorage persistence
  data/           Curated financial tips
  navigation/     Bottom tab + stack navigators
  screens/        Dashboard, Transactions, Loans, Side Hustles, Tips
  services/       storage.ts, locationService.ts, placesService.ts, sideHustleEngine.ts
  types/          Shared TypeScript types
  theme.ts        Colors, spacing, radius tokens
```

## How the Side Hustles recommendation engine works

`src/services/placesService.ts` defines a `PlacesProvider` interface with a
`mockPlacesProvider` implementation that deterministically generates a
plausible mix of nearby businesses from your GPS coordinates, so the feature
works fully offline with no API key.

`src/services/sideHustleEngine.ts` scores a curated list of side-hustle ideas
against the nearby business mix: categories that signal demand (e.g. many
coworking spaces/gyms suggest busy professionals) raise an idea's score,
while categories that directly compete with the idea lower it. The result is
a ranked list with a match percentage and a plain-language rationale.

### Wiring in real business data

To use real nearby-business data instead of the mock provider, implement the
`PlacesProvider` interface against a live API (e.g. Google Places Nearby
Search or Foursquare Places) and use it in `analyzeArea()` in
`sideHustleEngine.ts` instead of `mockPlacesProvider`. No other code needs to
change — the scoring engine and UI work off `BusinessSample[]` regardless of
where it comes from.

## Notes

- Location permission (`expo-location`) is required for the Side Hustles tab;
  the app requests it only when you tap "Analyze my area" and falls back to a
  generic area label if reverse-geocoding is unavailable.
- All amounts are stored as plain numbers in USD; there is currently no
  multi-currency support.
