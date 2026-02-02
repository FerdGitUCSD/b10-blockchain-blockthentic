import "@walletconnect/react-native-compat";
import { createAppKit } from "@reown/appkit-react-native";
import { WagmiAdapter } from "@reown/appkit-wagmi-react-native";
import { mainnet, sepolia } from "@wagmi/core/chains"; 
import { storage } from "./StorageUtil";

// 1. Project ID from Reown Cloud
const projectId = "0cce245d34bb09adb3aadf8f9616a9bc";

// 2. App metadata
const metadata = {
  name: "Blockthentic",
  description: "Document verification on blockchain",
  url: "https://blockthentic.app",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "blockthentic://",
  },
};

// 3. Define networks (Sepolia first)
const networks = [sepolia, mainnet];

// 4. Create Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  defaultChain: sepolia, // Set default to Sepolia
});

// 5. Create AppKit instance
export const appKit = createAppKit({
  projectId,
  metadata,
  networks,
  defaultNetwork: sepolia, // Set default to Sepolia
  adapters: [wagmiAdapter],
  storage,
  enableAnalytics: false,
});