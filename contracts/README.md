# Blockthentic Smart Contracts

Smart contracts for blockchain-based document verification.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A wallet with testnet ETH for deployment (get from [Sepolia Faucet](https://sepoliafaucet.com/))

## Installation

```bash
# Navigate to contracts folder
cd contracts

# Install dependencies
npm install
```

### Dependencies

The following packages are required (installed via `npm install`):

```json
{
  "devDependencies": {
    "hardhat": "^2.28.0",
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "dotenv": "^16.0.0"
  }
}
```

If any are missing, install manually:

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
```

## Project Structure

```
contracts/
├── contracts/                              # Solidity contracts
│   ├── DocumentVerificationRegistry.sol    # Document verification contract
│   ├── RevocationRegistry.sol              # Revocation handling contract
│   └── generated/                          # Generated contract pairs (gitignored)
├── scripts/
│   └── deployDocumentContracts.js          # Deployment script
├── templates/                              # Contract generation templates
│   ├── DocumentVerificationRegistryTemplate.sol
│   ├── documentVerificationPlaceholders.json
│   ├── RevocationRegistryTemplate.sol
│   ├── placeholders.json
│   └── generateDocumentContractPair.js
├── test/
│   └── DocumentVerification.test.js        # Test suite (58 tests)
├── .env.example                            # Environment variables template
├── hardhat.config.js                       # Hardhat configuration
└── README.md
```

## Quick Start

### 1. Compile Contracts

```bash
npx hardhat compile
```

### 2. Run Tests

```bash
npx hardhat test
```

Expected output: `58 passing`

### 3. Deploy Locally (for testing)

```bash
npx hardhat run scripts/deployDocumentContracts.js
```

## Generating Contract Pairs

Generate customized contract pairs for different use cases:

```bash
node templates/generateDocumentContractPair.js <baseName> <category> <batchEnabled> [issuerName]
```

### Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `baseName` | Yes | Base name for the contracts (e.g., "StateUniversity") |
| `category` | Yes | One of: `academic`, `legal`, `medical`, `general` |
| `batchEnabled` | Yes | `true` or `false` — enable batch operations |
| `issuerName` | No | Display name for the issuer |

### Categories

| Category | Use Case | Extra Fields |
|----------|----------|--------------|
| `academic` | Diplomas, transcripts, certificates | `credentialType` |
| `legal` | Contracts, legal documents | `documentType`, `expiresAt` |
| `medical` | Medical records | `recordType`, `patientIdHash` |
| `general` | Basic document verification | — |

### Examples

```bash
# Academic institution
node templates/generateDocumentContractPair.js StateUniversity academic true "State University"

# Law firm
node templates/generateDocumentContractPair.js SmithLaw legal true "Smith & Associates"

# Hospital
node templates/generateDocumentContractPair.js CityHospital medical true "City Hospital"

# General business
node templates/generateDocumentContractPair.js AcmeCorp general true "Acme Corporation"
```

### Output

Generated files are saved to `contracts/generated/`:
- `<baseName>Verification.sol`
- `<baseName>Revocation.sol`

After generating, compile to verify:

```bash
npx hardhat compile
```

## Deploying to Testnet (Sepolia)

### 1. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```dotenv
# Get from https://www.alchemy.com/
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Your wallet private key (NEVER share this!)
PRIVATE_KEY=your_wallet_private_key_here

# Get from https://etherscan.io/apis
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. Update Hardhat Config

Ensure `hardhat.config.js` includes Sepolia network:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};
```

### 3. Deploy

```bash
npx hardhat run scripts/deployDocumentContracts.js --network sepolia
```

### 4. Output

The script will output:
- Contract addresses
- Frontend configuration snippet
- Automatic Etherscan verification (if API key provided)

## Contract Overview

### DocumentVerificationRegistry

Stores document metadata and handles verification.

**Key Functions:**
| Function | Access | Description |
|----------|--------|-------------|
| `registerDocument(docId, docHash, uri)` | Owner | Register a new document |
| `registerDocumentBatch(docIds, docHashes, uris)` | Owner | Register multiple documents |
| `verifyDocument(docId, docHash)` | Public | Verify document authenticity |
| `getDocument(docId)` | Public | Get document details |
| `getDocumentStatus(docId)` | Public | Get document status |
| `isDocumentValid(docId)` | Public | Check if document is valid |
| `transferOwnership(newOwner)` | Owner | Transfer contract ownership |

### RevocationRegistry

Handles document revocation.

**Key Functions:**
| Function | Access | Description |
|----------|--------|-------------|
| `revoke(hash, reason)` | Owner | Revoke a document |
| `revokeBatch(hashes, reason)` | Owner | Revoke multiple documents |
| `isRevoked(hash)` | Public | Check if revoked |
| `isValid(hash)` | Public | Check if valid (registered + not revoked) |
| `getRevocationReason(hash)` | Public | Get revocation reason |

**Revocation Reasons:**
| Code | Reason |
|------|--------|
| 0 | NONE |
| 1 | FRAUD |
| 2 | EXPIRED |
| 3 | SUPERSEDED |
| 4 | OWNER_REQUEST |
| 5 | OTHER |

## Access Control

| Role | Register | Revoke | Update Admin |
|------|----------|--------|--------------|
| Owner (Issuer) | ✓ | Via RevocationRegistry | ✗ |
| Admin (Blockthentic) | ✗ | ✗ | ✓ |

## Gas Costs (Estimates)

| Operation | Gas |
|-----------|-----|
| Deploy VerificationRegistry | ~2.29M |
| Deploy RevocationRegistry | ~1.35M |
| Register single document | ~195K |
| Register batch (3 docs) | ~473K |
| Revoke single | ~73K |
| Revoke batch (3 docs) | ~171K |

## Commands Reference

| Command | Description |
|---------|-------------|
| `npx hardhat compile` | Compile contracts |
| `npx hardhat test` | Run test suite |
| `npx hardhat clean` | Clear build artifacts |
| `npx hardhat run scripts/deployDocumentContracts.js` | Deploy locally |
| `npx hardhat run scripts/deployDocumentContracts.js --network sepolia` | Deploy to Sepolia |
| `node templates/generateDocumentContractPair.js ...` | Generate contract pair |

## Troubleshooting

### "Missing dependencies" error
```bash
npm install
```

### "Cannot find module 'dotenv'" error
```bash
npm install --save-dev dotenv
```

### Compilation errors with generated contracts
Ensure template files are in `templates/` folder, not `contracts/` folder. Hardhat only compiles files in `contracts/`.

### "Insufficient funds" on testnet
Get free Sepolia ETH from [sepoliafaucet.com](https://sepoliafaucet.com/)

## Security Notes

- Never commit `.env` file (contains private keys)
- Always verify contract source on Etherscan after deployment
- Test thoroughly on Sepolia before mainnet deployment
- Contracts are immutable once deployed — review carefully

## License

MIT