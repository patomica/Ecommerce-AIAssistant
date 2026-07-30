import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TransactionListItem from '../components/TransactionListItem';
import { useFinance } from '../context/FinanceContext';
import { colors, radius, spacing } from '../theme';
import { TransactionsStackParamList } from '../navigation/types';
import { TransactionType } from '../types';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'TransactionsList'>;

type Filter = 'all' | TransactionType;

export default function TransactionsListScreen({ navigation }: Props) {
  const { transactions, deleteTransaction } = useFinance();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? transactions : transactions.filter((t) => t.type === filter)),
    [transactions, filter]
  );

  const confirmDelete = (id: string) => {
    Alert.alert('Delete transaction', 'Are you sure you want to remove this entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Income & Expenses</Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'income', 'expense'] as Filter[]).map((f) => (
          <Pressable
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All' : f === 'income' ? 'Income' : 'Expenses'}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TransactionListItem transaction={item} onLongPress={() => confirmDelete(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No transactions here yet. Tap + to add one.</Text>
        }
      />

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction', undefined)}
        accessibilityRole="button"
        accessibilityLabel="Add transaction"
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  filterRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontWeight: '700', fontSize: 12 },
  filterTextActive: { color: '#062A18' },
  list: { paddingHorizontal: spacing.md, paddingBottom: 100 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabIcon: { color: '#062A18', fontSize: 30, fontWeight: '800', marginTop: -2 },
});
