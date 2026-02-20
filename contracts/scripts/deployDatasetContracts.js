const hre = require("hardhat");

async function main() {


  const baseName = process.env.CONTRACT_BASE_NAME || null;

  const revocationContractName = baseName
    ? `${baseName}Revocation`
    : "RevocationRegistry";

  const verificationContractName = baseName
    ? `${baseName}Verification`
    : "DatasetVerificationRegistry";

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Network:", hre.network.name);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS || deployer.address;

  console.log("\n--- Deploying Dataset Contract Pair ---\n");
  console.log(`  Revocation contract:    ${revocationContractName}`);
  console.log(`  Verification contract:  ${verificationContractName}`);
  console.log(`  Admin:                  ${ADMIN_ADDRESS}`);
  console.log("");

  // Step 1: Deploy Revocation contract
  console.log("1. Deploying", revocationContractName, "...");
  const RevocationRegistry = await hre.ethers.getContractFactory(revocationContractName);
  const revocationRegistry = await RevocationRegistry.deploy();
  await revocationRegistry.waitForDeployment();
  const revocationAddress = await revocationRegistry.getAddress();
  console.log("  ", revocationContractName, "deployed to:", revocationAddress);

  // Step 2: Deploy Verification contract
  console.log("2. Deploying", verificationContractName, "...");
  const VerificationRegistry = await hre.ethers.getContractFactory(verificationContractName);
  const verificationRegistry = await VerificationRegistry.deploy(revocationAddress, ADMIN_ADDRESS);
  await verificationRegistry.waitForDeployment();
  const verificationAddress = await verificationRegistry.getAddress();
  console.log("  ", verificationContractName, "deployed to:", verificationAddress);

  // Step 3: Link contracts
  console.log("3. Linking contracts...");
  const linkTx = await revocationRegistry.setVerificationContract(verificationAddress);
  await linkTx.wait();
  console.log("   Contracts linked successfully");

  // Summary
  console.log("\n--- Deployment Complete ---\n");
  console.log("Network:                       ", hre.network.name);
  console.log("Contract Addresses:");
  console.log(`  ${revocationContractName}:`, " ".repeat(Math.max(0, 28 - revocationContractName.length)), revocationAddress);
  console.log(`  ${verificationContractName}:`, " ".repeat(Math.max(0, 28 - verificationContractName.length)), verificationAddress);
  console.log("  Admin:                       ", ADMIN_ADDRESS);
  console.log("  Owner:                       ", deployer.address);

  console.log("\n--- Frontend Configuration ---\n");
  console.log("Add these to your frontend config:\n");
  console.log(`export const DATASET_CONTRACT_ADDRESSES = {`);
  console.log(`  revocationRegistry: "${revocationAddress}",`);
  console.log(`  verificationRegistry: "${verificationAddress}",`);
  console.log(`};`);

  // Determine the correct block explorer name
  const isPolygon = ["polygon", "amoy"].includes(hre.network.name);
  const explorerName = isPolygon ? "Polygonscan" : "Etherscan";

  // Verify on block explorer (if not localhost)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log(`\n--- Verifying Contracts on ${explorerName} ---\n`);

    const waitTime = isPolygon ? 15 : 30;
    console.log(`Waiting ${waitTime} seconds for ${explorerName} to index...`);
    await new Promise(resolve => setTimeout(resolve, waitTime * 1000));

    try {
      console.log(`Verifying ${revocationContractName}...`);
      await hre.run("verify:verify", {
        address: revocationAddress,
        constructorArguments: [],
      });
      console.log(`${revocationContractName} verified!`);
    } catch (error) {
      console.log(`${revocationContractName} verification failed:`, error.message);
    }

    try {
      console.log(`Verifying ${verificationContractName}...`);
      await hre.run("verify:verify", {
        address: verificationAddress,
        constructorArguments: [revocationAddress, ADMIN_ADDRESS],
      });
      console.log(`${verificationContractName} verified!`);
    } catch (error) {
      console.log(`${verificationContractName} verification failed:`, error.message);
    }
  }

  return {
    revocationRegistry: revocationAddress,
    verificationRegistry: verificationAddress,
    admin: ADMIN_ADDRESS,
    owner: deployer.address
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });