# Vera: Blockchain-Backed Digital Asset Verification

> **DSC 180B Capstone Project — UC San Diego, Spring 2026**
> Team: Snigdha Podugu · Fred Danese · Ryan Cheung · Jonathan Gu · Andres Riera Ortiz Parraga
> Mentor: Prof. Rajesh Gupta

---

## Problem Description

Digital documents, datasets, and media files are increasingly difficult to trust. Forgeries, unauthorized edits, and revoked credentials can circulate without any reliable mechanism to detect them. Centralized verification systems (notaries, platforms) introduce costs, delays, and single points of failure. Simple blockchain proof-of-existence solutions can prove a file existed at some moment in time, but cannot answer the questions that matter most: *Who authorized this file? Is it still valid? Has it been revoked?*

**Vera** solves this by anchoring SHA-256 cryptographic fingerprints — not raw files — on public EVM-compatible blockchains alongside issuer identity and a live validity status. Anyone can verify a file in seconds for free. Authorized issuers can register, update, and revoke assets at any time. The full audit history is preserved permanently on-chain.

**Target users:**
- **Issuers** — universities, agencies, companies that need tamper-proof records of issued credentials or certified data
- **Asset Holders** — individuals who receive and need to share proof of verified assets
- **Verifiers** — anyone who receives a file and needs to confirm it is genuine (no account or wallet required)

---

## Repository Structure

```
b10-blockchain-blockthentic/
├── Blockthentic/
│   ├── app/                        # React Native (Expo) mobile dApp
│   │   ├── index.jsx               # App entry point
│   │   ├── create.jsx              # Registry creation screen
│   │   ├── verify.jsx              # File verification screen
│   │   ├── profile.jsx             # Issuer profile & asset management
│   │   ├── home.jsx                # Landing / dashboard
│   │   └── js/
│   │       └── config.js           # Contract addresses & Supabase credentials (update after deploy)
│   └── onchain/                    # Hardhat smart contract workspace
│       ├── contracts/
│       │   └── onchain/
│       │       └── contracts/
│       │           ├── RegistryFactory.sol             # Deploys registry pairs on demand
│       │           ├── DocumentRegistryTemplate.sol    # Document asset registration & verification
│       │           ├── DatasetRegistryTemplate.sol     # Dataset asset registration & verification
│       │           ├── MediaRegistryTemplate.sol       # Image/video asset registration & verification
│       │           ├── RevocationRegistry.sol          # Lifecycle state management (Active/Revoked/Superseded)
│       │           └── IRevocationRegistry.sol         # Revocation interface
│       ├── scripts/
│       │   ├── deploy.js           # Local deployment script
│       │   └── deploy-sepolia.js   # Sepolia testnet deployment script
│       ├── test/                   # Hardhat test suite
│       ├── hardhat.config.js       # Network configuration (local, Sepolia, Arbitrum, Polygon)
│       └── .env.example            # Template for required environment variables
├── figures/                        # Architecture diagrams and report assets (Figures 1–5)
├── .github/
│   └── workflows/                  # GitHub Actions: auto-deploys frontend/ on push to main
├── package.json                    # Root dependencies with versions
└── README.md                       # This file
```

---

## Dependencies & Versions

### Required Software

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Node.js | **v18.x** (LTS) | [nodejs.org](https://nodejs.org) |
| npm | **v9.x** | Bundled with Node.js |
| Git | **v2.x** | [git-scm.com](https://git-scm.com) |

### For Mobile App Development (optional)

| Tool | Minimum Version | Install |
|------|----------------|---------|
| Expo CLI | **v6.x** | `npm install -g expo-cli` |
| Expo Go (mobile) | Latest | iOS App Store / Google Play |

### Key npm Packages (pinned in `package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| `hardhat` | `^2.22.x` | Smart contract compilation, testing, deployment |
| `@nomicfoundation/hardhat-toolbox` | `^5.x` | Hardhat plugins bundle |
| `ethers` | `^6.x` | Ethereum interaction |
| `@openzeppelin/contracts` | `^5.x` | Security patterns (Ownable, AccessControl) |
| `expo` | `~51.x` | React Native framework |
| `expo-crypto` | `~13.x` | Client-side SHA-256 hashing |
| `@walletconnect/modal` | `^2.x` | Wallet connection (WalletConnect v2) |
| `@supabase/supabase-js` | `^2.x` | Off-chain auth & storage client |
| `dotenv` | `^16.x` | Environment variable loading |

Install all dependencies from the repo root:

```bash
npm install
```

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/FerdGitUCSD/b10-blockchain-blockthentic.git
cd b10-blockchain-blockthentic
```

### 2. Create Your `.env` File

Copy the provided template and fill in your credentials:

```bash
cp Blockthentic/onchain/.env.example Blockthentic/onchain/.env
```

Open `Blockthentic/onchain/.env` and set the following variables:

```bash
# Required for Sepolia testnet deployment
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Required for any testnet deployment (wallet that will own the contracts)
PRIVATE_KEY=your_deployer_wallet_private_key_without_0x_prefix

# Optional: Arbitrum Sepolia deployment
ALCHEMY_ARBITRUM_URL=https://arb-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Optional: Polygon Amoy deployment
ALCHEMY_POLYGON_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
```

> ⚠️ **Security:** Never commit your `.env` file. It is listed in `.gitignore`. Never expose your `PRIVATE_KEY` in any public file or frontend code.

### 3. Configure the Frontend

After deploying contracts (see [Deployment](#deployment)), update the deployed contract addresses in:

```
Blockthentic/app/js/config.js
```

```javascript
// config.js — update these values after each deployment
export const CONTRACT_CONFIG = {
  registryFactory: "0xYOUR_DEPLOYED_FACTORY_ADDRESS",
  network: "sepolia",               // or "arbitrum-sepolia" / "polygon-amoy"
  chainId: 11155111,                // Sepolia: 11155111 | Arbitrum Sepolia: 421614 | Polygon Amoy: 80002
};

export const SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
};
```

### 4. Supabase Setup (Off-Chain Storage — Optional but Recommended)

If you want full issuer functionality (file storage + metadata indexing):

1. Create a free project at [supabase.com](https://supabase.com)
2. Create a storage bucket named `issued-files`
3. Run the following SQL in the Supabase SQL editor to create the metadata table:

```sql
CREATE TABLE assets (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id      text NOT NULL UNIQUE,
  asset_hash    text NOT NULL,
  tx_hash       text,
  issuer        text NOT NULL,
  file_uri      text,
  asset_type    text CHECK (asset_type IN ('document', 'dataset', 'media')),
  status        text DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'superseded')),
  created_at    timestamptz DEFAULT now()
);

-- Issuers can insert and read their own records
CREATE POLICY "Issuers insert" ON assets FOR INSERT WITH CHECK (auth.uid()::text = issuer);
CREATE POLICY "Issuers read own" ON assets FOR SELECT USING (auth.uid()::text = issuer);

-- Verifiers can read all records (read-only)
CREATE POLICY "Public read" ON assets FOR SELECT USING (true);
```

4. Enable Row Level Security on the `assets` table in the Supabase dashboard.

---

## Compilation & Testing

### Compile Smart Contracts

```bash
cd Blockthentic/onchain
npx hardhat compile
```

**Expected output:**
```
Compiling 6 files with Solidity 0.8.24
Compilation finished successfully
```

All 6 contracts (`RegistryFactory`, 3 registry templates, `RevocationRegistry`, `IRevocationRegistry`) should compile with no errors or warnings.

### Run the Test Suite

```bash
npx hardhat test
```

**Expected output:**
```
  RegistryFactory
    ✓ deploys document registry pair (312ms)
    ✓ deploys dataset registry pair (289ms)
    ✓ deploys media registry pair (301ms)

  DocumentRegistryTemplate
    ✓ registers an asset successfully (198ms)
    ✓ reverts on duplicate registration (145ms)
    ✓ reverts on unauthorized issuer (132ms)
    ✓ verifies a valid asset (89ms)
    ✓ returns false for unknown hash (76ms)

  RevocationRegistry
    ✓ revokes an asset and updates status (201ms)
    ✓ preserves revoked records for audit (178ms)
    ✓ reverts revocation by non-admin (95ms)

  11 passing (2s)
```

---

## Deployment

### Option A: Local Development Network

Start a local Hardhat node (runs a local blockchain in memory):

```bash
npx hardhat node
```

**Expected output:** A list of 20 funded test accounts and their private keys. Keep this terminal running.

In a second terminal, deploy the contracts:

```bash
npm run deploy:local
```

**Expected output:**
```
Deploying RegistryFactory to local network...
RegistryFactory deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Deployment complete.
```

Copy the `RegistryFactory` address into `Blockthentic/app/js/config.js`.

### Option B: Ethereum Sepolia Testnet

Ensure your `.env` is configured (see [Environment Setup](#environment-setup)), then:

```bash
npm run deploy:sepolia
```

**Expected output:**
```
Deploying to Sepolia...
RegistryFactory deployed to: 0xABC...123
Transaction hash: 0xDEF...456
Block number: 6123456
Deployment complete.
```

You can verify the deployment on [Sepolia Etherscan](https://sepolia.etherscan.io) using the printed contract address.

### Option C: Arbitrum Sepolia / Polygon Amoy

```bash
npm run deploy:arbitrum-sepolia
# or
npm run deploy:polygon-amoy
```

Both networks use the same contract code. Update `config.js` with the appropriate address and `chainId` after deployment.

---

## Running the Application

### Mobile App (Expo / React Native)

```bash
cd Blockthentic/app
npx expo start
```

**Expected output:** A QR code in the terminal and a browser tab opens with Expo Dev Tools. Scan the QR code with the Expo Go app on your phone, or press `i` for iOS simulator / `a` for Android emulator.

### Local Web Preview

```bash
cd Blockthentic/app
npx serve .
```

Open `http://localhost:3000` in your browser. MetaMask (set to the correct network) is required for issuer actions. Verification is read-only and works without a wallet.

---

## Verifying Reproducibility

Use this checklist to confirm a successful setup:

| Step | Command | Expected Result |
|------|---------|----------------|
| Contracts compile | `npx hardhat compile` | "Compilation finished successfully" — 6 contracts |
| Tests pass | `npx hardhat test` | 11 tests passing, 0 failing |
| Local deploy | `npm run deploy:local` | RegistryFactory address printed |
| SHA-256 determinism | Hash the same file twice in the app | Identical 32-byte hex digest both times |
| Registration | Register a test asset as an issuer | Transaction confirmed, asset appears as "Active" |
| Verification | Upload the same file as a verifier | Status returned: "Active" |
| Revocation | Revoke the asset as an admin | Status updated to "Revoked" immediately |
| Revoked verification | Re-verify the revoked asset | Status returned: "Revoked" (record preserved, not deleted) |
| Read-only verification | Verify without connecting a wallet | Works — returns result with no gas fee |

---

## Core Smart Contract API

Once deployed, the key entry points on each registry contract are:

```solidity
// Register an asset (issuer/admin only)
// assetId: unique identifier (bytes32), assetHash: SHA-256 digest (bytes32), uri: off-chain file URI
registerAsset(bytes32 assetId, bytes32 assetHash, string uri)
// Reverts if: duplicate assetId, caller not authorized, or contract paused

// Verify an asset (anyone, no gas)
// Returns true if the stored hash matches the provided hash AND status is Active
verifyAsset(bytes32 assetId, bytes32 assetHash) returns (bool)

// Revoke an asset (admin or authorized issuer only)
// Updates status flag to Revoked; record is preserved for audit
revokeAsset(bytes32 assetId)
// Reverts if: caller not authorized, or assetId not found
```

Client-side hashing (React Native):

```javascript
import * as Crypto from 'expo-crypto';

// Produces a 0x-prefixed 32-byte hex digest — the on-chain asset identifier
const hash = await Crypto.digestStringAsync(
  Crypto.CryptoDigestAlgorithm.SHA256,
  base64FileContent,
  { encoding: Crypto.CryptoEncoding.HEX }
);
```

---

## Network Reference

| Network | Chain ID | RPC | Explorer | Role |
|---------|---------|-----|----------|------|
| Hardhat Local | 31337 | `http://localhost:8545` | — | Development |
| Ethereum Sepolia | 11155111 | Alchemy / Infura | [sepolia.etherscan.io](https://sepolia.etherscan.io) | Testing |
| Arbitrum Sepolia | 421614 | Alchemy | [sepolia.arbiscan.io](https://sepolia.arbiscan.io) | Testing |
| Polygon Amoy | 80002 | Alchemy | [amoy.polygonscan.com](https://amoy.polygonscan.com) | **Primary testing** |

Free test tokens (required for deployment and issuer actions):
- Sepolia ETH: [sepoliafaucet.com](https://sepoliafaucet.com)
- Arbitrum Sepolia ETH: [faucet.quicknode.com/arbitrum/sepolia](https://faucet.quicknode.com/arbitrum/sepolia)
- Polygon Amoy MATIC: [faucet.polygon.technology](https://faucet.polygon.technology)

---

## Troubleshooting

**`Error: Cannot find module 'hardhat'`**
Run `npm install` from the repo root first.

**`Error: PRIVATE_KEY is not set`**
Ensure your `.env` file exists in `Blockthentic/onchain/` and contains a valid `PRIVATE_KEY`.

**`Transaction reverted: unauthorized`**
The wallet you connected is not the contract owner or an approved admin. Use the deployer wallet, or have an existing admin add your address.

**`Expo: Unable to resolve module`**
Run `npx expo install` inside `Blockthentic/app/` to sync Expo-compatible package versions.

**MetaMask not connecting to local network**
Add a custom network in MetaMask: RPC URL `http://localhost:8545`, Chain ID `31337`, Currency `ETH`.

---

## Security Notes

- Never commit `.env` files or expose `PRIVATE_KEY` in any frontend code or public repository.
- The contracts have not been audited for mainnet production use. A professional security audit is required before deployment to Ethereum mainnet.
- Supabase `anonKey` is safe to expose in the frontend (it is public by design); RLS policies enforce all access control.

---
