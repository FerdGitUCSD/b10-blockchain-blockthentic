# Vera: Blockchain-Backed Trust

A multi-registry blockchain verification platform where authorized issuers anchor digital assets on-chain, store files off-chain, and provide a browser-based decentralized application (dApp) for secure registration and verification.

---

## Repository Contents

This repository contains:

- **Hardhat workspace** (`contracts/`, `scripts/`, `test/`) for Solidity smart contracts  
- **Production dApp** in `frontend/` (deployable via GitHub Pages)  
- **Optional backend/database configuration** for off-chain metadata storage  
- **Architecture diagrams and report assets** in `figures/`  
- **Legacy or experimental components** preserved for reference  

---

## Highlights

### Multi-Registry Architecture

Separate smart contracts for documents, datasets, and media assets. Each registry enforces issuer authorization and lifecycle management.

### On-Chain Anchoring

Files are hashed locally using Web Crypto SHA-256. Only the hash and minimal metadata are stored on Ethereum (Sepolia). No raw files are written to the blockchain.

### Off-Chain Storage

Files remain in external storage (e.g., Supabase or equivalent). Metadata such as file hash, transaction hash, URI, issuer, and timestamp may be stored off-chain for indexing and retrieval.

### Role-Based Workflows

Admins authorize issuers.  
Issuers register assets.  
Verifiers perform read-only validation without requiring gas fees.

### Revocation Support

Assets are never deleted. Status transitions (Active, Revoked, Superseded) are stored immutably for auditability and transparency.

### Verification UX

Users can upload a file or paste a hash. The client recomputes SHA-256 and checks the smart contract for authenticity and status.

---

## Smart Contracts

Located in `contracts/`.

Core contracts include:

- `DocumentVerification.sol`
- `DatasetVerification.sol`
- `MediaVerification.sol`
- `Revocation.sol` (if separate)

### Core Entry Points

`registerAsset(bytes32 assetId, bytes32 assetHash, string uri)`  
Stores the fingerprint of an asset. Reverts on duplicates or unauthorized issuers.

`verifyAsset(bytes32 assetId, bytes32 assetHash)`  
Returns whether the provided hash matches the stored record.

`revokeAsset(bytes32 assetId)`  
Updates lifecycle state to revoked (admin or authorized issuer only).

---

## Deployment with Hardhat

### Install Dependencies

```bash
npm install
```

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

---

## Local Deployment

```bash
npx hardhat node
npm run deploy:local
```

---

## Sepolia Deployment

Ensure your `.env` file contains:

```bash
ALCHEMY_SEPOLIA_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
```

Then run:

```bash
npm run deploy:sepolia
```

After deployment, update the contract address in:

```
frontend/js/config.js
```

---

## Frontend (frontend/)

Primary pages:

- `index.html` – Landing page  
- `create.html` – Asset registration (issuer-only)  
- `verify.html` – Public verification page  
- `login.html` – Role-based authentication  

Client-side hashing is performed using the Web Crypto API before any blockchain interaction.

### Local Testing

Open `frontend/index.html` directly in your browser  

or run:

```bash
npx serve frontend
```

MetaMask (Sepolia network) is required for issuer actions.  
Verification is read-only and does not require a wallet connection.

---

## Off-Chain Storage & Database Setup (Optional)

If using Supabase or similar backend:

1. Configure project credentials in `frontend/js/config.js`
2. Create a storage bucket for issued files
3. Create metadata tables containing:
   - `asset_id`
   - `asset_hash`
   - `tx_hash`
   - `issuer`
   - `timestamp`
   - `status`
4. Apply role-based policies:
   - Issuers: insert/select their records  
   - Verifiers: read-only access  

Files remain off-chain; only hashes are stored on Ethereum.

---

## GitHub Pages Deployment

The GitHub Actions workflow located in:

```
.github/workflows/
```

Publishes the `frontend/` directory on push to `main`.

Before deployment:

- Ensure Pages source is set to **GitHub Actions**
- Update the deployed contract address
- Do not expose private keys or sensitive environment variables

Push to `main` to trigger automatic deployment.

---

## Reproducibility Checklist

- Contracts compile successfully  
- Contracts deploy locally and to Sepolia  
- Frontend connects to deployed contracts  
- SHA-256 hashing is deterministic  
- Revocation updates reflect immediately  
- Read-only verification works without gas  

---


## Summary

1. Deploy the smart contracts (local or Sepolia).
2. Update the frontend configuration with the deployed contract address.
3. Configure optional backend storage if applicable.
4. Serve `frontend/` via GitHub Pages.
5. Connect MetaMask as an authorized issuer to register assets.
6. Verifiers upload files to confirm authenticity instantly.

Only SHA-256 hashes are stored on-chain.  
All original files remain off-chain yet are cryptographically verifiable by anyone holding a copy.
