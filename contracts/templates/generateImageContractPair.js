const fs = require('fs');
const path = require('path');

// Load templates
const verificationTemplate = fs.readFileSync(path.join(__dirname, 'ImageVerificationRegistryTemplate.sol'), 'utf8');
const revocationTemplate = fs.readFileSync(path.join(__dirname, 'RevocationRegistryTemplate.sol'), 'utf8');

// Load placeholders
const verificationPlaceholders = JSON.parse(fs.readFileSync(path.join(__dirname, 'imageVerificationPlaceholders.json'), 'utf8'));
const revocationPlaceholders = JSON.parse(fs.readFileSync(path.join(__dirname, 'revocationPlaceholders.json'), 'utf8'));

// Map image verification categories to revocation categories
const categoryMapping = {
  photography: 'images',
  media: 'images',
  nft: 'images',
  general: 'images'
};

function generateVerificationContract(options) {
  const { contractName, category, batchEnabled, registrantName } = options;

  if (!verificationPlaceholders.categories[category]) {
    throw new Error(`Invalid verification category: ${category}. Must be one of: ${Object.keys(verificationPlaceholders.categories).join(', ')}`);
  }

  const categoryConfig = verificationPlaceholders.categories[category];
  let output = verificationTemplate;

  // Replace contract metadata
  output = output.replace(/\{\{CONTRACT_NAME\}\}/g, contractName);
  output = output.replace(/\{\{CATEGORY\}\}/g, category);
  output = output.replace(/\{\{BATCH_ENABLED\}\}/g, batchEnabled ? 'Yes' : 'No');
  output = output.replace(/\{\{REGISTRANT_NAME\}\}/g, registrantName || 'Not specified');

  // Replace struct
  output = output.replace(/\{\{IMAGE_STRUCT\}\}/g, categoryConfig.struct);

  // Replace events
  let events = categoryConfig.events;
  if (batchEnabled) {
    events += '\n    ' + categoryConfig.batchEvents;
  }
  output = output.replace(/\{\{EVENTS\}\}/g, events);

  // Replace interface batch function
  if (batchEnabled) {
    output = output.replace(/\{\{BATCH_INTERFACE\}\}/g, verificationPlaceholders.batchInterface);
  } else {
    output = output.replace(/\{\{BATCH_INTERFACE\}\}/g, '');
  }

  // Replace register function
  output = output.replace(/\{\{REGISTER_FUNCTION\}\}/g, categoryConfig.registerFunction);

  // Replace batch register function
  if (batchEnabled) {
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, categoryConfig.batchRegisterFunction);
  } else {
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, '');
  }

  // Replace verify function
  output = output.replace(/\{\{VERIFY_FUNCTION\}\}/g, categoryConfig.verifyFunction);

  // Replace get image function
  output = output.replace(/\{\{GET_IMAGE_FUNCTION\}\}/g, categoryConfig.getImageFunction);

  return output;
}

function generateRevocationContract(options) {
  const { contractName, category, batchEnabled } = options;

  // Map image verification category to revocation category
  const revocationCategory = categoryMapping[category] || 'images';

  if (!revocationPlaceholders.categories[revocationCategory]) {
    throw new Error(`Invalid revocation category: ${revocationCategory}`);
  }

  let output = revocationTemplate;

  // Replace contract name
  output = output.replace(/\{\{CONTRACT_NAME\}\}/g, contractName);

  // Replace category comment
  output = output.replace(/\{\{CATEGORY\}\}/g, revocationCategory);

  // Replace batch enabled comment
  output = output.replace(/\{\{BATCH_ENABLED\}\}/g, batchEnabled ? 'Yes' : 'No');

  // Replace enum
  output = output.replace(/\{\{REVOCATION_REASONS_ENUM\}\}/g, revocationPlaceholders.categories[revocationCategory].enum);

  // Replace batch operations
  if (batchEnabled) {
    output = output.replace(/\{\{BATCH_EVENTS\}\}/g, revocationPlaceholders.batchOperations.events);
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, revocationPlaceholders.batchOperations.registerFunction);
    output = output.replace(/\{\{BATCH_REVOKE_FUNCTION\}\}/g, revocationPlaceholders.batchOperations.revokeFunction);
  } else {
    output = output.replace(/\{\{BATCH_EVENTS\}\}/g, '');
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, '');
    output = output.replace(/\{\{BATCH_REVOKE_FUNCTION\}\}/g, '');
  }

  return output;
}

function generateContractPair(options) {
  const { baseName, category, batchEnabled, registrantName } = options;

  // Validate inputs
  if (!baseName || !category) {
    throw new Error('baseName and category are required');
  }

  // Generate contract names
  const verificationName = `${baseName}Verification`;
  const revocationName = `${baseName}Revocation`;

  // Generate both contracts
  const verificationContract = generateVerificationContract({
    contractName: verificationName,
    category,
    batchEnabled,
    registrantName
  });

  const revocationContract = generateRevocationContract({
    contractName: revocationName,
    category,
    batchEnabled
  });

  return {
    verification: {
      name: verificationName,
      content: verificationContract
    },
    revocation: {
      name: revocationName,
      content: revocationContract
    }
  };
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node generateImageContractPair.js <baseName> <category> [batchEnabled] [registrantName]');
    console.log('');
    console.log('This generates a matched pair of contracts:');
    console.log('  - <baseName>Verification.sol (image verification)');
    console.log('  - <baseName>Revocation.sol (revocation registry)');
    console.log('');
    console.log('Categories: photography, media, nft, general');
    console.log('');
    console.log('  photography - Professional photography with camera/EXIF provenance');
    console.log('  media       - News/journalism images with source attribution and AI detection flag');
    console.log('  nft         - Digital art / NFT images linked to token contracts');
    console.log('  general     - General-purpose image verification');
    console.log('');
    console.log('Examples:');
    console.log('  node generateImageContractPair.js StudioAlpha photography true "Studio Alpha"');
    console.log('  node generateImageContractPair.js DailyNews media true "Daily News Agency"');
    console.log('  node generateImageContractPair.js ArtCollective nft true "Art Collective DAO"');
    console.log('  node generateImageContractPair.js AcmeImages general false "Acme Corp"');
    process.exit(1);
  }

  const options = {
    baseName: args[0],
    category: args[1],
    batchEnabled: args[2] !== 'false', // Default to true
    registrantName: args[3] || 'Not specified'
  };

  try {
    const contracts = generateContractPair(options);

    // Create output directory
    const outputDir = path.join(__dirname, '../contracts/generated');
    fs.mkdirSync(outputDir, { recursive: true });

    // Write verification contract
    const verificationPath = path.join(outputDir, `${contracts.verification.name}.sol`);
    fs.writeFileSync(verificationPath, contracts.verification.content);

    // Write revocation contract
    const revocationPath = path.join(outputDir, `${contracts.revocation.name}.sol`);
    fs.writeFileSync(revocationPath, contracts.revocation.content);

    console.log('');
    console.log('✔ Generated image contract pair:');
    console.log('');
    console.log(`  Verification: ${contracts.verification.name}.sol`);
    console.log(`  Revocation:   ${contracts.revocation.name}.sol`);
    console.log('');
    console.log(`  Category:         ${options.category}`);
    console.log(`  Batch operations: ${options.batchEnabled ? 'Enabled' : 'Disabled'}`);
    console.log(`  Registrant:       ${options.registrantName}`);
    console.log('');
    console.log('Deployment order:');
    console.log(`  1. Deploy ${contracts.revocation.name}`);
    console.log(`  2. Deploy ${contracts.verification.name} with revocation address + admin address`);
    console.log(`  3. Call ${contracts.revocation.name}.setVerificationContract() with verification address`);
    console.log('');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = { generateContractPair, generateVerificationContract, generateRevocationContract };
