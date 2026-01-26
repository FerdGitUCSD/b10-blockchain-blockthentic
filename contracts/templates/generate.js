const fs = require('fs');
const path = require('path');

// Load template and placeholders
const template = fs.readFileSync(path.join(__dirname, 'RevocationRegistryTemplate.sol'), 'utf8');
const placeholders = JSON.parse(fs.readFileSync(path.join(__dirname, 'placeholders.json'), 'utf8'));

function generateContract(options) {
  const { contractName, category, batchEnabled } = options;

  // Validate inputs
  if (!contractName || !category) {
    throw new Error('contractName and category are required');
  }

  if (!placeholders.categories[category]) {
    throw new Error(`Invalid category: ${category}. Must be one of: documents, images, datasets`);
  }

  let output = template;

  // Replace contract name
  output = output.replace(/\{\{CONTRACT_NAME\}\}/g, contractName);

  // Replace category comment
  output = output.replace(/\{\{CATEGORY\}\}/g, category);

  // Replace batch enabled comment
  output = output.replace(/\{\{BATCH_ENABLED\}\}/g, batchEnabled ? 'Yes' : 'No');

  // Replace enum
  output = output.replace(/\{\{REVOCATION_REASONS_ENUM\}\}/g, placeholders.categories[category].enum);

  // Replace batch operations
  if (batchEnabled) {
    output = output.replace(/\{\{BATCH_EVENTS\}\}/g, placeholders.batchOperations.events);
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, placeholders.batchOperations.registerFunction);
    output = output.replace(/\{\{BATCH_REVOKE_FUNCTION\}\}/g, placeholders.batchOperations.revokeFunction);
  } else {
    output = output.replace(/\{\{BATCH_EVENTS\}\}/g, '');
    output = output.replace(/\{\{BATCH_REGISTER_FUNCTION\}\}/g, '');
    output = output.replace(/\{\{BATCH_REVOKE_FUNCTION\}\}/g, '');
  }

  return output;
}

// Example usage - generate a contract
const options = {
  contractName: 'ImageRevocationRegistry',
  category: 'images',
  batchEnabled: false
};

const generatedContract = generateContract(options);

// Write to output file
const outputPath = path.join(__dirname, '../contracts/generated', `${options.contractName}.sol`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, generatedContract);

console.log(`Generated contract: ${outputPath}`);

// Export for use in other scripts
module.exports = { generateContract };