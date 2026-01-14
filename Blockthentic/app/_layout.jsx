import "@walletconnect/react-native-compat";
import { AppKit, AppKitProvider } from "@reown/appkit-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { appKit, wagmiAdapter } from "../config/AppKitConfig";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
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
              headerStyle: {
                backgroundColor: '#003262',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
                headerShown: false,
                tabBarStyle: { display: 'none' },
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
          
          <View style={{ position: "absolute", height: "100%", width: "100%", pointerEvents: "box-none" }}>
            <AppKit />
          </View>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}