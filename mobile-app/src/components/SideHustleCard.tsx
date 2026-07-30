import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SideHustleIdea } from '../types';
import { colors, radius, spacing } from '../theme';

interface Props {
  idea: SideHustleIdea;
  rank: number;
}

function scoreColor(score: number): string {
  if (score >= 70) return colors.primary;
  if (score >= 45) return colors.warning;
  return colors.danger;
}

export default function SideHustleCard({ idea, rank }: Props) {
  const color = scoreColor(idea.matchScore);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{rank}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {idea.title}
        </Text>
      </View>

      <Text style={styles.description}>{idea.description}</Text>

      <View style={styles.scoreRow}>
        <View style={styles.scoreTrack}>
          <View style={[styles.scoreFill, { width: `${idea.matchScore}%`, backgroundColor: color }]} />
        </View>
        <Text style={[styles.scoreText, { color }]}>{idea.matchScore}% match</Text>
      </View>

      <Text style={styles.rationale}>{idea.rationale}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Startup cost</Text>
          <Text style={styles.metaValue}>{idea.estimatedStartupCost}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>Est. monthly income</Text>
          <Text style={styles.metaValue}>{idea.estimatedMonthlyIncome}</Text>
        </View>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: { color: colors.textMuted, fontWeight: '800', fontSize: 12 },
  title: { color: colors.text, fontSize: 15, fontWeight: '800', flex: 1 },
  description: { color: colors.textMuted, fontSize: 13, marginTop: spacing.sm, lineHeight: 18 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  scoreTrack: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  scoreFill: { height: '100%' },
  scoreText: { fontSize: 12, fontWeight: '800', width: 78, textAlign: 'right' },
  rationale: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm, fontStyle: 'italic' },
  metaRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  metaItem: { flex: 1 },
  metaLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  metaValue: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 2 },
});
