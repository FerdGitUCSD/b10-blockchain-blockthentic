import '@walletconnect/react-native-compat';
import { AppKit, AppKitProvider } from '@reown/appkit-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { Stack } from 'expo-router';
import { View, Platform } from 'react-native'; 

import { appKit, wagmiAdapter } from '../config/AppKitConfig';
import { AuthProvider } from '../context/AuthContext';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'ionicons';
      src: url('https://unpkg.com/ionicons@5.5.2/dist/fonts/ionicons.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Ionicons';
      src: url('https://unpkg.com/ionicons@5.5.2/dist/fonts/ionicons.ttf') format('truetype');
    }
    body, html, #root {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #bdc8fe; 
    }
  `;
  document.head.appendChild(style);
}

const queryClient = new QueryClient();

export default function Layout() {
  const isWeb = Platform.OS === 'web';

  const AppContent = (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      
      {!isWeb && <AppKit />}
    </AuthProvider>
  );

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {isWeb ? (
          AppContent 
        ) : (
          <AppKitProvider instance={appKit}>
            {AppContent}
          </AppKitProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}