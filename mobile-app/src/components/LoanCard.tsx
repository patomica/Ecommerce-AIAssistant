import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Loan } from '../types';
import { colors, radius, spacing } from '../theme';
import { formatCurrency, formatDate, daysUntil } from '../utils/formatters';
import { loanRemainingBalance } from '../context/FinanceContext';

interface Props {
  loan: Loan;
  onAddPayment: () => void;
  onDelete: () => void;
}

export default function LoanCard({ loan, onAddPayment, onDelete }: Props) {
  const remaining = loanRemainingBalance(loan);
  const paidPct = loan.principal > 0 ? 1 - remaining / loan.principal : 1;
  const isBorrowed = loan.direction === 'borrowed';
  const due = loan.dueDate ? daysUntil(loan.dueDate) : null;

  let dueLabel: string | null = null;
  let dueColor = colors.textMuted;
  if (due !== null) {
    if (due < 0) {
      dueLabel = `Overdue by ${Math.abs(due)}d`;
      dueColor = colors.danger;
    } else if (due <= 7) {
      dueLabel = `Due in ${due}d`;
      dueColor = colors.warning;
    } else {
      dueLabel = `Due ${formatDate(loan.dueDate!)}`;
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.badge, { backgroundColor: isBorrowed ? 'rgba(241,106,106,0.15)' : 'rgba(61,214,140,0.15)' }]}>
          <Text style={[styles.badgeText, { color: isBorrowed ? colors.danger : colors.primary }]}>
            {isBorrowed ? 'I owe' : 'Owed to me'}
          </Text>
        </View>
        {dueLabel && <Text style={[styles.due, { color: dueColor }]}>{dueLabel}</Text>}
      </View>

      <Text style={styles.counterparty}>{loan.counterparty}</Text>
      {!!loan.note && <Text style={styles.note}>{loan.note}</Text>}

      <View style={styles.amountsRow}>
        <View>
          <Text style={styles.amountLabel}>Remaining</Text>
          <Text style={styles.amountValue}>{formatCurrency(remaining)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.amountLabel}>Principal</Text>
          <Text style={styles.amountSub}>{formatCurrency(loan.principal)}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(100, paidPct * 100)}%` }]} />
      </View>

      {loan.interestRate > 0 && (
        <Text style={styles.interest}>Interest: {loan.interestRate}% APR</Text>
      )}

      <View style={styles.actions}>
        <Pressable style={styles.actionBtn} onPress={onAddPayment} disabled={remaining <= 0}>
          <Text style={styles.actionText}>{remaining <= 0 ? 'Paid off' : 'Log payment'}</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
          <Text style={[styles.actionText, { color: colors.danger }]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  badgeText: { fontSize: 11, fontWeight: '800' },
  due: { fontSize: 12, fontWeight: '700' },
  counterparty: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: spacing.sm },
  note: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  amountLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  amountValue: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 2 },
  amountSub: { color: colors.textMuted, fontSize: 14, fontWeight: '700', marginTop: 2 },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary },
  interest: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  actionBtn: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteBtn: { backgroundColor: 'transparent' },
  actionText: { color: colors.text, fontWeight: '700', fontSize: 13 },
});
