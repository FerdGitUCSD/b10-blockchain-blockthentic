import AsyncStorage from '@react-native-async-storage/async-storage';
import { safeJsonParse, safeJsonStringify } from '@walletconnect/safe-json';

export const storage = {
  getKeys: async () => {
    return await AsyncStorage.getAllKeys();
  },
  getEntries: async () => {
    const keys = await AsyncStorage.getAllKeys();
    return await Promise.all(keys.map(async key => [
      key,
      safeJsonParse(await AsyncStorage.getItem(key) ?? ''),
    ]));
  },
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, safeJsonStringify(value));
  },
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    if (typeof item === 'undefined' || item === null) {
      return undefined;
    }
    return safeJsonParse(item);
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};