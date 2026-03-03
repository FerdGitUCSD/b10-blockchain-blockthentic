import React from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { sepolia, polygonAmoy, arbitrumSepolia } from '@reown/appkit/networks';

const projectId = '0cce245d34bb09adb3aadf8f9616a9bc';

const metadata = {
  name: 'Vera',
  description: 'Document verification on blockchain',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://blockthentic.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const networks = [sepolia, polygonAmoy, arbitrumSepolia];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  defaultNetwork: sepolia,
  features: {
    analytics: false,
    swaps: false,
    onramp: false,
    email: false,
    socials: false,
  },
});

export { useAppKit } from '@reown/appkit/react';
export const AppKitProvider = ({ children }) => <>{children}</>;
export const AppKit = () => null;
