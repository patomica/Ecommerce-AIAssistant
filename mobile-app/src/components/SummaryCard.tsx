import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { formatCurrency } from '../utils/formatters';

interface SummaryCardProps {
  label: string;
  amount: number;
  tone?: 'positive' | 'negative' | 'neutral';
}

export default function SummaryCard({ label, amount, tone = 'neutral' }: SummaryCardProps) {
  const color =
    tone === 'positive' ? colors.primary : tone === 'negative' ? colors.danger : colors.text;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.amount, { color }]}>{formatCurrency(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginBottom: 6 },
  amount: { fontSize: 20, fontWeight: '800' },
});
