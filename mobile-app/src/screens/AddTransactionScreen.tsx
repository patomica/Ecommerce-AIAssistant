import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFinance } from '../context/FinanceContext';
import { colors, radius, spacing } from '../theme';
import { TransactionsStackParamList } from '../navigation/types';
import { TransactionType } from '../types';

type Props = NativeStackScreenProps<TransactionsStackParamList, 'AddTransaction'>;

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Business', 'Gift', 'Other'];
const EXPENSE_CATEGORIES = [
  'Groceries',
  'Rent',
  'Utilities',
  'Transport',
  'Dining',
  'Entertainment',
  'Health',
  'Loan',
  'Other',
];

export default function AddTransactionScreen({ navigation, route }: Props) {
  const { addTransaction } = useFinance();
  const [type, setType] = useState<TransactionType>(route.params?.type ?? 'expense');
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleTypeChange = (nextType: TransactionType) => {
    setType(nextType);
    setCategory(nextType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  };

  const handleSave = async () => {
    const numeric = parseFloat(amount);
    if (!numeric || numeric <= 0) {
      Alert.alert('Invalid amount', 'Please enter an amount greater than zero.');
      return;
    }
    await addTransaction({
      type,
      amount: numeric,
      category,
      note: note.trim() || undefined,
      date: new Date().toISOString(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.typeToggle}>
            <Pressable
              style={[styles.typeBtn, type === 'expense' && styles.typeBtnExpenseActive]}
              onPress={() => handleTypeChange('expense')}
            >
              <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>
                Expense
              </Text>
            </Pressable>
            <Pressable
              style={[styles.typeBtn, type === 'income' && styles.typeBtnIncomeActive]}
              onPress={() => handleTypeChange('income')}
            >
              <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>
                Income
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
            value={amount}
            onChangeText={setAmount}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.chipsWrap}>
            {categories.map((c) => (
              <Pressable
                key={c}
                style={[styles.chip, category === c && styles.chipActive]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a note"
            placeholderTextColor={colors.textMuted}
            value={note}
            onChangeText={setNote}
            multiline
          />

          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save {type === 'income' ? 'income' : 'expense'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginBottom: spacing.lg,
  },
  typeBtn: { flex: 1, paddingVertical: 10, borderRadius: radius.sm, alignItems: 'center' },
  typeBtnExpenseActive: { backgroundColor: colors.danger },
  typeBtnIncomeActive: { backgroundColor: colors.primary },
  typeText: { color: colors.textMuted, fontWeight: '700' },
  typeTextActive: { color: '#12100F' },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.md },
  amountInput: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontWeight: '600', fontSize: 12 },
  chipTextActive: { color: '#062A18' },
  noteInput: {
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  saveText: { color: '#062A18', fontWeight: '800', fontSize: 15 },
});
