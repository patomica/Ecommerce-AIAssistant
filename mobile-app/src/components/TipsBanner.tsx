import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { FINANCIAL_TIPS } from '../data/financialTips';
import { colors, radius, spacing } from '../theme';

const ROTATE_INTERVAL_MS = 6000;

interface TipsBannerProps {
  onPress?: () => void;
}

export default function TipsBanner({ onPress }: TipsBannerProps) {
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fade, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
        setIndex((prev) => (prev + 1) % FINANCIAL_TIPS.length);
        Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
      });
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [fade]);

  const tip = FINANCIAL_TIPS[index];

  return (
    <Pressable style={styles.container} onPress={onPress} accessibilityRole="button">
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>💡</Text>
      </View>
      <Animated.View style={[styles.textWrap, { opacity: fade }]}>
        <Text style={styles.label}>Tip of the moment</Text>
        <Text style={styles.title} numberOfLines={1}>
          {tip.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {tip.body}
        </Text>
      </Animated.View>
      <View style={styles.dots}>
        {FINANCIAL_TIPS.slice(0, 5).map((t, i) => (
          <View
            key={t.id}
            style={[styles.dot, i === index % 5 && styles.dotActive]}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(61, 214, 140, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 18 },
  textWrap: { flex: 1 },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: { color: colors.text, fontSize: 14, fontWeight: '700', marginTop: 2 },
  body: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  dots: { flexDirection: 'column', gap: 3, marginLeft: spacing.xs },
  dot: {
    width: 5,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
});
