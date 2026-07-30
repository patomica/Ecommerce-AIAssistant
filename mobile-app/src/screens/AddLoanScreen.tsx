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
import { LoansStackParamList } from '../navigation/types';
import { LoanDirection } from '../types';

type Props = NativeStackScreenProps<LoansStackParamList, 'AddLoan'>;

export default function AddLoanScreen({ navigation }: Props) {
  const { addLoan } = useFinance();
  const [direction, setDirection] = useState<LoanDirection>('borrowed');
  const [counterparty, setCounterparty] = useState('');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');

  const handleSave = async () => {
    const principalValue = parseFloat(principal);
    if (!counterparty.trim()) {
      Alert.alert('Missing name', 'Enter who you borrowed from or lent to.');
      return;
    }
    if (!principalValue || principalValue <= 0) {
      Alert.alert('Invalid amount', 'Enter a principal amount greater than zero.');
      return;
    }
    let dueDateIso: string | undefined;
    if (dueDate.trim()) {
      const parsed = new Date(dueDate.trim());
      if (isNaN(parsed.getTime())) {
        Alert.alert('Invalid date', 'Enter the due date as YYYY-MM-DD.');
        return;
      }
      dueDateIso = parsed.toISOString();
    }

    await addLoan({
      direction,
      counterparty: counterparty.trim(),
      principal: principalValue,
      interestRate: parseFloat(interestRate) || 0,
      dueDate: dueDateIso,
      startDate: new Date().toISOString(),
      note: note.trim() || undefined,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.typeToggle}>
            <Pressable
              style={[styles.typeBtn, direction === 'borrowed' && styles.typeBtnBorrowedActive]}
              onPress={() => setDirection('borrowed')}
            >
              <Text style={[styles.typeText, direction === 'borrowed' && styles.typeTextActive]}>
                I borrowed
              </Text>
            </Pressable>
            <Pressable
              style={[styles.typeBtn, direction === 'lent' && styles.typeBtnLentActive]}
              onPress={() => setDirection('lent')}
            >
              <Text style={[styles.typeText, direction === 'lent' && styles.typeTextActive]}>
                I lent
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>{direction === 'borrowed' ? 'Lender name' : 'Borrower name'}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Bank of America, Alex"
            placeholderTextColor={colors.textMuted}
            value={counterparty}
            onChangeText={setCounterparty}
          />

          <Text style={styles.label}>Principal amount</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.textMuted}
            value={principal}
            onChangeText={setPrincipal}
          />

          <Text style={styles.label}>Interest rate (APR %, optional)</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textMuted}
            value={interestRate}
            onChangeText={setInterestRate}
          />

          <Text style={styles.label}>Due date (YYYY-MM-DD, optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="2026-12-31"
            placeholderTextColor={colors.textMuted}
            value={dueDate}
            onChangeText={setDueDate}
          />

          <Text style={styles.label}>Note (optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="What's this loan for?"
            placeholderTextColor={colors.textMuted}
            value={note}
            onChangeText={setNote}
            multiline
          />

          <Pressable style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save loan</Text>
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
  typeBtnBorrowedActive: { backgroundColor: colors.danger },
  typeBtnLentActive: { backgroundColor: colors.primary },
  typeText: { color: colors.textMuted, fontWeight: '700' },
  typeTextActive: { color: '#12100F' },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: 15,
    fontWeight: '600',
  },
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
