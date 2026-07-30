import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Transaction } from '../types';
import { colors, radius, spacing } from '../theme';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Props {
  transaction: Transaction;
  onLongPress?: () => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  Salary: '💼',
  Freelance: '🧑‍💻',
  Groceries: '🛒',
  Rent: '🏠',
  Utilities: '💡',
  Transport: '🚗',
  Dining: '🍽️',
  Entertainment: '🎬',
  Health: '💊',
  Loan: '🏦',
  Other: '📦',
};

export default function TransactionListItem({ transaction, onLongPress }: Props) {
  const isIncome = transaction.type === 'income';
  const icon = CATEGORY_ICONS[transaction.category] ?? '📦';

  return (
    <Pressable style={styles.row} onLongPress={onLongPress}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.middle}>
        <Text style={styles.category}>{transaction.category}</Text>
        {!!transaction.note && (
          <Text style={styles.note} numberOfLines={1}>
            {transaction.note}
          </Text>
        )}
        <Text style={styles.date}>{formatDate(transaction.date)}</Text>
      </View>
      <Text style={[styles.amount, { color: isIncome ? colors.primary : colors.danger }]}>
        {isIncome ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  icon: { fontSize: 18 },
  middle: { flex: 1 },
  category: { color: colors.text, fontWeight: '700', fontSize: 14 },
  note: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  date: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  amount: { fontWeight: '800', fontSize: 14, marginLeft: spacing.sm },
});
