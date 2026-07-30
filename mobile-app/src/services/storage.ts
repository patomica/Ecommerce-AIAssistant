import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  transactions: '@finance/transactions',
  loans: '@finance/loans',
};

export async function loadJSON<T>(key: keyof typeof KEYS, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(KEYS[key]);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveJSON<T>(key: keyof typeof KEYS, value: T): Promise<void> {
  await AsyncStorage.setItem(KEYS[key], JSON.stringify(value));
}

export const storageKeys = KEYS;
