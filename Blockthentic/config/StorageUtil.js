import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 1. Web Environment Check
const isWeb = Platform.OS === 'web';
const isBrowser = isWeb && typeof window !== 'undefined';

export const storage = {
  removeItem: async (key) => {
    if (isWeb && !isBrowser) return;
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },

  setItem: async (key, value) => {
    if (isWeb && !isBrowser) return;
    try {
      // 2. TRANSLATION: Convert Object -> String before saving
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error setting item:', error);
    }
  },

  getItem: async (key) => {
    if (isWeb && !isBrowser) return undefined;
    try {
      const value = await AsyncStorage.getItem(key);
      // 3. SAFETY: Return undefined (not null) if missing
      if (value === null || value === undefined) {
        return undefined; 
      }
      // 4. TRANSLATION: Convert String -> Object after reading
      return JSON.parse(value);
    } catch (error) {
      console.error('Error getting item:', error);
      return undefined;
    }
  },

  getKeys: async () => {
    if (isWeb && !isBrowser) return [];
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  },

  getEntries: async () => {
    if (isWeb && !isBrowser) return [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      const entries = await Promise.all(
        keys.map(async (key) => {
          const value = await AsyncStorage.getItem(key);
          // 5. PARSING LOOP: Ensure every entry is parsed correctly
          let parsedValue = undefined;
          try {
             parsedValue = value ? JSON.parse(value) : undefined;
          } catch (e) { 
             parsedValue = undefined; 
          }
          return [key, parsedValue];
        })
      );
      return entries;
    } catch (error) {
      console.error('Error getting entries:', error);
      return [];
    }
  },
};