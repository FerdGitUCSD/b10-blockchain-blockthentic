const hre = require("hardhat");

async function main() {
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Configuration - UPDATE THESE FOR YOUR DEPLOYMENT
  const ADMIN_ADDRESS = deployer.address; // Blockthentic admin address (change for production)

  console.log("\n--- Deploying Image Verification Contract Pair ---\n");

  // Step 1: Deploy RevocationRegistry
  console.log("1. Deploying RevocationRegistry...");
  const RevocationRegistry = await hre.ethers.getContractFactory("RevocationRegistry");
  const revocationRegistry = await RevocationRegistry.deploy();
  await revocationRegistry.waitForDeployment();
  const revocationAddress = await revocationRegistry.getAddress();
  console.log("   RevocationRegistry deployed to:", revocationAddress);

  // Step 2: Deploy ImageVerificationRegistry
  console.log("2. Deploying ImageVerificationRegistry...");
  const VerificationRegistry = await hre.ethers.getContractFactory("ImageVerificationRegistry");
  const verificationRegistry = await VerificationRegistry.deploy(revocationAddress, ADMIN_ADDRESS);
  await verificationRegistry.waitForDeployment();
  const verificationAddress = await verificationRegistry.getAddress();
  console.log("   ImageVerificationRegistry deployed to:", verificationAddress);

  // Step 3: Link contracts
  console.log("3. Linking contracts...");
  const linkTx = await revocationRegistry.setVerificationContract(verificationAddress);
  await linkTx.wait();
  console.log("   Contracts linked successfully");

  // Summary
  console.log("\n--- Deployment Complete ---\n");
  console.log("Contract Addresses:");
  console.log("  RevocationRegistry:         ", revocationAddress);
  console.log("  ImageVerificationRegistry:  ", verificationAddress);
  console.log("  Admin:                      ", ADMIN_ADDRESS);
  console.log("  Owner:                      ", deployer.address);

  console.log("\n--- Frontend Configuration ---\n");
  console.log("Add these to your frontend config:\n");
  console.log(`export const IMAGE_CONTRACT_ADDRESSES = {`);
  console.log(`  revocationRegistry: "${revocationAddress}",`);
  console.log(`  verificationRegistry: "${verificationAddress}",`);
  console.log(`};`);

  // Verify on Etherscan (if not localhost)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n--- Verifying Contracts on Etherscan ---\n");

    // Wait for Etherscan to index the contracts
    console.log("Waiting 30 seconds for Etherscan to index...");
    await new Promise(resolve => setTimeout(resolve, 30000));

    try {
      console.log("Verifying RevocationRegistry...");
      await hre.run("verify:verify", {
        address: revocationAddress,
        constructorArguments: [],
      });
      console.log("RevocationRegistry verified!");
    } catch (error) {
      console.log("RevocationRegistry verification failed:", error.message);
    }

    try {
      console.log("Verifying ImageVerificationRegistry...");
      await hre.run("verify:verify", {
        address: verificationAddress,
        constructorArguments: [revocationAddress, ADMIN_ADDRESS],
      });
      console.log("ImageVerificationRegistry verified!");
    } catch (error) {
      console.log("ImageVerificationRegistry verification failed:", error.message);
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
