import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Loan, LoanPayment, Transaction } from '../types';
import { loadJSON, saveJSON } from '../services/storage';
import { uid } from '../utils/formatters';

interface FinanceContextValue {
  transactions: Transaction[];
  loans: Loan[];
  isLoading: boolean;
  addTransaction: (t: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addLoan: (l: Omit<Loan, 'id' | 'payments'>) => Promise<void>;
  deleteLoan: (id: string) => Promise<void>;
  addLoanPayment: (loanId: string, amount: number) => Promise<void>;
  totals: {
    income: number;
    expenses: number;
    balance: number;
    owedByMe: number;
    owedToMe: number;
  };
}

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export function loanRemainingBalance(loan: Loan): number {
  const paid = loan.payments.reduce((sum, p) => sum + p.amount, 0);
  return Math.max(0, loan.principal - paid);
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [storedTx, storedLoans] = await Promise.all([
        loadJSON<Transaction[]>('transactions', []),
        loadJSON<Loan[]>('loans', []),
      ]);
      setTransactions(storedTx);
      setLoans(storedLoans);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading) saveJSON('transactions', transactions);
  }, [transactions, isLoading]);

  useEffect(() => {
    if (!isLoading) saveJSON('loans', loans);
  }, [loans, isLoading]);

  const addTransaction: FinanceContextValue['addTransaction'] = async (t) => {
    setTransactions((prev) => [{ ...t, id: uid() }, ...prev]);
  };

  const deleteTransaction: FinanceContextValue['deleteTransaction'] = async (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addLoan: FinanceContextValue['addLoan'] = async (l) => {
    setLoans((prev) => [{ ...l, id: uid(), payments: [] }, ...prev]);
  };

  const deleteLoan: FinanceContextValue['deleteLoan'] = async (id) => {
    setLoans((prev) => prev.filter((l) => l.id !== id));
  };

  const addLoanPayment: FinanceContextValue['addLoanPayment'] = async (loanId, amount) => {
    const payment: LoanPayment = { id: uid(), amount, date: new Date().toISOString() };
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, payments: [...l.payments, payment] } : l))
    );
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const owedByMe = loans
      .filter((l) => l.direction === 'borrowed')
      .reduce((sum, l) => sum + loanRemainingBalance(l), 0);
    const owedToMe = loans
      .filter((l) => l.direction === 'lent')
      .reduce((sum, l) => sum + loanRemainingBalance(l), 0);
    return { income, expenses, balance: income - expenses, owedByMe, owedToMe };
  }, [transactions, loans]);

  const value: FinanceContextValue = {
    transactions,
    loans,
    isLoading,
    addTransaction,
    deleteTransaction,
    addLoan,
    deleteLoan,
    addLoanPayment,
    totals,
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance(): FinanceContextValue {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within a FinanceProvider');
  return ctx;
}
