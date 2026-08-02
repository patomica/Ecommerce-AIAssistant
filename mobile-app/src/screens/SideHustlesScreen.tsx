import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideHustleCard from '../components/SideHustleCard';
import { colors, radius, spacing } from '../theme';
import { resolveCurrentLocation } from '../services/locationService';
import { analyzeArea } from '../services/sideHustleEngine';
import { AreaAnalysis, BusinessCategory } from '../types';

const CATEGORY_LABEL: Record<BusinessCategory, string> = {
  cafe: 'Cafes',
  restaurant: 'Restaurants',
  gym: 'Gyms',
  laundry: 'Laundromats',
  grocery: 'Grocery stores',
  salon: 'Salons',
  pet_services: 'Pet services',
  auto_repair: 'Auto repair',
  bookstore: 'Bookstores',
  tutoring: 'Tutoring centers',
  daycare: 'Daycares',
  cleaning: 'Cleaning services',
  coworking: 'Coworking spaces',
  bakery: 'Bakeries',
  pharmacy: 'Pharmacies',
};

type Status = 'idle' | 'loading' | 'error' | 'ready';

export default function SideHustlesScreen() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AreaAnalysis | null>(null);

  const runAnalysis = async () => {
    setStatus('loading');
    setError(null);
    try {
      const location = await resolveCurrentLocation();
      const result = await analyzeArea(location.latitude, location.longitude, location.label);
      setAnalysis(result);
      setStatus('ready');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not analyze your area.');
      setStatus('error');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Side Hustles</Text>
        <Text style={styles.subtitle}>
          We scan the businesses around you and suggest side hustles with the least
          competition and the strongest local demand.
        </Text>

        {status !== 'ready' && (
          <View style={styles.ctaCard}>
            <Text style={styles.ctaIcon}>📍</Text>
            <Text style={styles.ctaTitle}>Analyze businesses near me</Text>
            <Text style={styles.ctaBody}>
              We'll use your device location to look at nearby cafes, gyms, salons and
              more, then match you with side hustle ideas worth trying in your area.
            </Text>
            <Pressable style={styles.ctaButton} onPress={runAnalysis} disabled={status === 'loading'}>
              {status === 'loading' ? (
                <ActivityIndicator color="#062A18" />
              ) : (
                <Text style={styles.ctaButtonText}>
                  {status === 'error' ? 'Try again' : 'Analyze my area'}
                </Text>
              )}
            </Pressable>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}

        {status === 'ready' && analysis && (
          <>
            <View style={styles.areaCard}>
              <Text style={styles.areaLabel}>Analyzed area</Text>
              <Text style={styles.areaName}>{analysis.areaLabel}</Text>
              <Pressable onPress={runAnalysis} style={styles.refreshBtn}>
                <Text style={styles.refreshText}>Refresh</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Nearby business mix</Text>
            <View style={styles.categoryWrap}>
              {(Object.entries(analysis.categoryCounts) as [BusinessCategory, number][])
                .sort((a, b) => b[1] - a[1])
                .map(([category, count]) => (
                  <View key={category} style={styles.categoryChip}>
                    <Text style={styles.categoryChipText}>
                      {CATEGORY_LABEL[category]} · {count}
                    </Text>
                  </View>
                ))}
              {Object.keys(analysis.categoryCounts).length === 0 && (
                <Text style={styles.subtitle}>No businesses detected nearby — great, less competition!</Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Recommended for you</Text>
            {analysis.ideas.slice(0, 6).map((idea, i) => (
              <SideHustleCard key={idea.id} idea={idea} rank={i + 1} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.textMuted, fontSize: 13, marginTop: spacing.xs, lineHeight: 18 },
  ctaCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  ctaIcon: { fontSize: 32, marginBottom: spacing.sm },
  ctaTitle: { color: colors.text, fontSize: 16, fontWeight: '800', textAlign: 'center' },
  ctaBody: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
    minWidth: 180,
    alignItems: 'center',
  },
  ctaButtonText: { color: '#062A18', fontWeight: '800' },
  errorText: { color: colors.danger, fontSize: 12, marginTop: spacing.sm, textAlign: 'center' },
  areaCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', position: 'absolute', top: 8, left: spacing.md },
  areaName: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 10, flex: 1 },
  refreshBtn: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  refreshText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
  categoryWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  categoryChipText: { color: colors.text, fontSize: 12, fontWeight: '700' },
});
