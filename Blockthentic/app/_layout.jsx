import '@walletconnect/react-native-compat';
import { AppKit, AppKitProvider } from '@reown/appkit-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { appKit, wagmiAdapter } from '../config/AppKitConfig';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider instance={appKit}>
          <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="auth" />
              <Stack.Screen name="(tabs)" />
            </Stack>

            <View style={{ position: "absolute", height: "100%", width: "100%", pointerEvents: "box-none" }}>
              <AppKit />
            </View>
          </AuthProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
