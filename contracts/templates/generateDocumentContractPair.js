const fs = require('fs');
const path = require('path');

// Load templates
const verificationTemplate = fs.readFileSync(path.join(__dirname, 'DocumentVerificationRegistryTemplate.sol'), 'utf8');
const revocationTemplate = fs.readFileSync(path.join(__dirname, 'RevocationRegistryTemplate.sol'), 'utf8');

// Load placeholders
const verificationPlaceholders = JSON.parse(fs.readFileSync(path.join(__dirname, 'documentVerificationPlaceholders.json'), 'utf8'));
const revocationPlaceholders = JSON.parse(fs.readFileSync(path.join(__dirname, 'placeholders.json'), 'utf8'));

// Map verification categories to revocation categories
const categoryMapping = {
  academic: 'documents',
  legal: 'documents',
  medical: 'documents',
  general: 'documents'
};

function generateVerificationContract(options) {
  const { contractName, category, batchEnabled, issuerName } = options;

  if (!verificationPlaceholders.categories[category]) {
    throw new Error(`Invalid verification category: ${category}. Must be one of: ${Object.keys(verificationPlaceholders.categories).join(', ')}`);
  }

  const categoryConfig = verificationPlaceholders.categories[category];
  let output = verificationTemplate;

  // Replace contract metadata
  output = output.replace(/\{\{CONTRACT_NAME\}\}/g, contractName);
  output = output.replace(/\{\{CATEGORY\}\}/g, category);
  output = output.replace(/\{\{BATCH_ENABLED\}\}/g, batchEnabled ? 'Yes' : 'No');
  output = output.replace(/\{\{ISSUER_NAME\}\}/g, issuerName || 'Not specified');

  // Replace struct
  output = output.replace(/\{\{DOCUMENT_STRUCT\}\}/g, categoryConfig.struct);

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

  // Replace get document function
  output = output.replace(/\{\{GET_DOCUMENT_FUNCTION\}\}/g, categoryConfig.getDocumentFunction);

  return output;
}

function generateRevocationContract(options) {
  const { contractName, category, batchEnabled } = options;

  // Map verification category to revocation category
  const revocationCategory = categoryMapping[category] || 'documents';

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
  const { baseName, category, batchEnabled, issuerName } = options;

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
    issuerName
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
    console.log('Usage: node generateContractPair.js <baseName> <category> [batchEnabled] [issuerName]');
    console.log('');
    console.log('This generates a matched pair of contracts:');
    console.log('  - <baseName>Verification.sol (document verification)');
    console.log('  - <baseName>Revocation.sol (revocation registry)');
    console.log('');
    console.log('Categories: academic, legal, medical, general');
    console.log('');
    console.log('Examples:');
    console.log('  node generateContractPair.js StateUniversity academic true "State University"');
    console.log('  node generateContractPair.js SmithLaw legal true "Smith & Associates"');
    console.log('  node generateContractPair.js CityHospital medical true "City Hospital"');
    console.log('  node generateContractPair.js AcmeCorp general false "Acme Corp"');
    process.exit(1);
  }

  const options = {
    baseName: args[0],
    category: args[1],
    batchEnabled: args[2] !== 'false', // Default to true
    issuerName: args[3] || 'Not specified'
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
    console.log('✓ Generated contract pair:');
    console.log('');
    console.log(`  Verification: ${contracts.verification.name}.sol`);
    console.log(`  Revocation:   ${contracts.revocation.name}.sol`);
    console.log('');
    console.log(`  Category:         ${options.category}`);
    console.log(`  Batch operations: ${options.batchEnabled ? 'Enabled' : 'Disabled'}`);
    console.log(`  Issuer:           ${options.issuerName}`);
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