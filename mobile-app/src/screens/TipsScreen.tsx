import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FINANCIAL_TIPS } from '../data/financialTips';
import { colors, radius, spacing } from '../theme';
import { FinancialTip } from '../types';

const CATEGORY_LABEL: Record<FinancialTip['category'], string> = {
  saving: 'Saving',
  debt: 'Debt',
  budgeting: 'Budgeting',
  investing: 'Investing',
  general: 'General',
};

export default function TipsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={FINANCIAL_TIPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.tagRow}>
              <Text style={styles.tag}>{CATEGORY_LABEL[item.category]}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  tagRow: { flexDirection: 'row', marginBottom: spacing.xs },
  tag: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(61,214,140,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  title: { color: colors.text, fontSize: 15, fontWeight: '800', marginBottom: 4 },
  body: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
});
