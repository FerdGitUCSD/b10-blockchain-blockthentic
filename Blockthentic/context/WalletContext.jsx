import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

const WalletContext = createContext(null);

const projectId = '0cce245d34bb09adb3aadf8f9616a9bc'; // Get from cloud.walletconnect.com

const providerMetadata = {
  name: 'Blockthentic',
  description: 'Secure Document Verification',
  url: 'https://blockthentic.app',
  icons: ['https://your-icon-url.com/icon.png'],
  redirect: {
    native: 'blockthentic://',
  },
};

export function WalletProvider({ children }) {
  const { open, isConnected, address, provider } = useWalletConnectModal();
  
  const connect = async () => {
    await open();
  };

  const disconnect = async () => {
    await provider?.disconnect();
  };

  return (
    <WalletContext.Provider value={{ connect, disconnect, isConnected, address, provider }}>
      {children}
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);