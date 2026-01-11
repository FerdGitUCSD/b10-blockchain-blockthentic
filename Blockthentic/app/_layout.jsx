import "@walletconnect/react-native-compat";
import { appKit } from "../config/AppKitConfig";
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppKitProvider, AppKit } from '@reown/appkit-react-native';
import { View } from 'react-native';

export default function Layout() {
  return (
    <AppKitProvider instance={appKit}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#003262',
            borderTopColor: '#FDB515',
            height: 60,
          },
          tabBarActiveTintColor: '#FDB515',
          tabBarInactiveTintColor: '#fff',
          headerStyle: { backgroundColor: '#003262' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      
      {/* AppKit modal - wrapped for Expo Router Android fix */}
      <View style={{ position: "absolute", height: "100%", width: "100%", pointerEvents: "box-none" }}>
        <AppKit />
      </View>
    </AppKitProvider>
  );
}