export type HomeStackParamList = {
  Dashboard: undefined;
  Tips: undefined;
};

export type TransactionsStackParamList = {
  TransactionsList: undefined;
  AddTransaction: { type: 'income' | 'expense' } | undefined;
};

export type LoansStackParamList = {
  LoansList: undefined;
  AddLoan: undefined;
};

export type RootTabParamList = {
  HomeTab: undefined;
  TransactionsTab: undefined;
  LoansTab: undefined;
  SideHustlesTab: undefined;
};
