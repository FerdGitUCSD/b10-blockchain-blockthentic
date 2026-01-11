import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async getKeys() {
    return await AsyncStorage.getAllKeys();
  },
  async getEntries() {
    const keys = await AsyncStorage.getAllKeys();
    const entries = await AsyncStorage.multiGet(keys);
    return entries.map(([key, value]) => [key, value ? JSON.parse(value) : undefined]);
  },
  async getItem(key) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  },
  async setItem(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  async removeItem(key) {
    await AsyncStorage.removeItem(key);
  },
};