import '@walletconnect/react-native-compat';
import { AppKit, AppKitProvider } from '@reown/appkit-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Stack } from 'expo-router'; // CHANGED: Imported Stack instead of Tabs
import { View } from 'react-native';

import { appKit, wagmiAdapter } from '../config/AppKitConfig';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider instance={appKit}>
          
          {/* CHANGED: Swapped <Tabs> for <Stack> */}
          <Stack screenOptions={{ headerShown: false }}>
            
            {/* Screen 1: The Landing Page (index.jsx) */}
            <Stack.Screen name="index" />

            {/* Screen 2: The Main App (The (tabs) folder) */}
            <Stack.Screen name="(tabs)" />
            
          </Stack>

          <View style={{ position: "absolute", height: "100%", width: "100%", pointerEvents: "box-none" }}>
            <AppKit />
          </View>

        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}