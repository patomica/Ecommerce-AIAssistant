import React, { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoanCard from '../components/LoanCard';
import { useFinance } from '../context/FinanceContext';
import { colors, radius, spacing } from '../theme';
import { LoansStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<LoansStackParamList, 'LoansList'>;

export default function LoansListScreen({ navigation }: Props) {
  const { loans, deleteLoan, addLoanPayment } = useFinance();
  const [paymentLoanId, setPaymentLoanId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const confirmDelete = (id: string) => {
    Alert.alert('Delete loan', 'This will remove the loan and its payment history.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteLoan(id) },
    ]);
  };

  const submitPayment = async () => {
    const numeric = parseFloat(paymentAmount);
    if (!paymentLoanId || !numeric || numeric <= 0) {
      Alert.alert('Invalid amount', 'Enter a payment amount greater than zero.');
      return;
    }
    await addLoanPayment(paymentLoanId, numeric);
    setPaymentLoanId(null);
    setPaymentAmount('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loans</Text>
        <Text style={styles.headerSubtitle}>Track money you owe and money owed to you.</Text>
      </View>

      <FlatList
        data={loans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <LoanCard
            loan={item}
            onAddPayment={() => setPaymentLoanId(item.id)}
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No loans tracked yet. Tap + to add one.</Text>
        }
      />

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('AddLoan')}
        accessibilityRole="button"
        accessibilityLabel="Add loan"
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <Modal visible={!!paymentLoanId} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Log a payment</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="decimal-pad"
              placeholder="Amount"
              placeholderTextColor={colors.textMuted}
              value={paymentAmount}
              onChangeText={setPaymentAmount}
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalBtn, styles.modalCancel]}
                onPress={() => {
                  setPaymentLoanId(null);
                  setPaymentAmount('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, styles.modalConfirm]} onPress={submitPayment}>
                <Text style={styles.modalConfirmText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.sm, paddingBottom: spacing.sm },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  headerSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  modalTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: spacing.md },
  modalInput: {
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: 18,
    fontWeight: '700',
  },
  modalActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: radius.sm, alignItems: 'center' },
  modalCancel: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border },
  modalCancelText: { color: colors.text, fontWeight: '700' },
  modalConfirm: { backgroundColor: colors.primary },
  modalConfirmText: { color: '#062A18', fontWeight: '800' },
});
