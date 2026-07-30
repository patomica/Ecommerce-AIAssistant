import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TipsBanner from '../components/TipsBanner';
import SummaryCard from '../components/SummaryCard';
import TransactionListItem from '../components/TransactionListItem';
import { useFinance } from '../context/FinanceContext';
import { colors, spacing } from '../theme';
import { HomeStackParamList } from '../navigation/types';
import { formatCurrency } from '../utils/formatters';

type Props = NativeStackScreenProps<HomeStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const { transactions, totals } = useFinance();
  const recent = transactions.slice(0, 5);
  const netLoanPosition = totals.owedToMe - totals.owedByMe;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.greeting}>Your finances</Text>

        <TipsBanner onPress={() => navigation.navigate('Tips')} />

        <View style={styles.row}>
          <SummaryCard label="Balance" amount={totals.balance} tone={totals.balance >= 0 ? 'positive' : 'negative'} />
          <View style={{ width: spacing.sm }} />
          <SummaryCard label="This period income" amount={totals.income} tone="positive" />
        </View>
        <View style={[styles.row, { marginTop: spacing.sm }]}>
          <SummaryCard label="This period expenses" amount={totals.expenses} tone="negative" />
          <View style={{ width: spacing.sm }} />
          <SummaryCard
            label="Net loan position"
            amount={netLoanPosition}
            tone={netLoanPosition >= 0 ? 'positive' : 'negative'}
          />
        </View>

        <View style={styles.loanSummaryCard}>
          <Text style={styles.loanSummaryTitle}>Loans at a glance</Text>
          <View style={styles.loanSummaryRow}>
            <Text style={styles.loanSummaryLabel}>I owe</Text>
            <Text style={[styles.loanSummaryValue, { color: colors.danger }]}>
              {formatCurrency(totals.owedByMe)}
            </Text>
          </View>
          <View style={styles.loanSummaryRow}>
            <Text style={styles.loanSummaryLabel}>Owed to me</Text>
            <Text style={[styles.loanSummaryValue, { color: colors.primary }]}>
              {formatCurrency(totals.owedToMe)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
        </View>
        {recent.length === 0 ? (
          <Text style={styles.empty}>No transactions yet. Add your first income or expense.</Text>
        ) : (
          recent.map((t) => <TransactionListItem key={t.id} transaction={t} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  greeting: { color: colors.text, fontSize: 24, fontWeight: '800', marginBottom: spacing.md },
  row: { flexDirection: 'row' },
  loanSummaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  loanSummaryTitle: { color: colors.text, fontWeight: '800', marginBottom: spacing.sm },
  loanSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  loanSummaryLabel: { color: colors.textMuted, fontSize: 13 },
  loanSummaryValue: { fontWeight: '800', fontSize: 13 },
  sectionHeader: { marginTop: spacing.lg, marginBottom: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  empty: { color: colors.textMuted, fontSize: 13 },
});
