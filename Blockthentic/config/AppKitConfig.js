import "@walletconnect/react-native-compat";
import { createAppKit } from "@reown/appkit-react-native";
import { EthersAdapter } from "@reown/appkit-ethers-react-native";
import { storage } from "./StorageUtil";

const projectId = "0cce245d34bb09adb3aadf8f9616a9bc";

const mainnet = {
  id: 1,
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://cloudflare-eth.com"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
};

const sepolia = {
  id: 11155111,
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.org"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
  },
};

const metadata = {
  name: "Blockthentic",
  description: "Document verification on blockchain",
  url: "https://blockthentic.app",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "blockthentic://",
  },
};

const ethersAdapter = new EthersAdapter();

export const appKit = createAppKit({
  projectId,
  metadata,
  networks: [mainnet, sepolia],
  defaultNetwork: mainnet,
  adapters: [ethersAdapter],
  storage: storage,
});