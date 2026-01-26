const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RevocationRegistry", function () {
  let registry;
  let owner;
  let verificationContract;
  let randomUser;

  // Sample hashes for testing
  const hash1 = ethers.keccak256(ethers.toUtf8Bytes("document1"));
  const hash2 = ethers.keccak256(ethers.toUtf8Bytes("document2"));
  const hash3 = ethers.keccak256(ethers.toUtf8Bytes("document3"));

  // Enum values
  const Reason = {
    NONE: 0,
    FRAUD: 1,
    EXPIRED: 2,
    SUPERSEDED: 3,
    OWNER_REQUEST: 4,
    OTHER: 5
  };

  beforeEach(async function () {
    // Get signers
    [owner, verificationContract, randomUser] = await ethers.getSigners();

    // Deploy contract
    const Registry = await ethers.getContractFactory("RevocationRegistry");
    registry = await Registry.deploy();
    await registry.waitForDeployment();

    // Set verification contract
    await registry.setVerificationContract(verificationContract.address);
  });

  // ============================================
  // DEPLOYMENT TESTS
  // ============================================

  describe("Deployment", function () {
    it("should set the deployer as owner", async function () {
      expect(await registry.owner()).to.equal(owner.address);
    });

    it("should set the verification contract correctly", async function () {
      expect(await registry.verificationContract()).to.equal(verificationContract.address);
    });
  });

  // ============================================
  // VERIFICATION CONTRACT SETUP TESTS
  // ============================================

  describe("setVerificationContract", function () {
    it("should not allow setting verification contract twice", async function () {
      await expect(
        registry.setVerificationContract(randomUser.address)
      ).to.be.revertedWith("Verification contract already set");
    });

    it("should not allow non-owner to set verification contract", async function () {
      // Deploy fresh contract without verification contract set
      const Registry = await ethers.getContractFactory("RevocationRegistry");
      const freshRegistry = await Registry.deploy();
      await freshRegistry.waitForDeployment();

      await expect(
        freshRegistry.connect(randomUser).setVerificationContract(verificationContract.address)
      ).to.be.revertedWith("Not owner");
    });

    it("should not allow zero address", async function () {
      const Registry = await ethers.getContractFactory("RevocationRegistry");
      const freshRegistry = await Registry.deploy();
      await freshRegistry.waitForDeployment();

      await expect(
        freshRegistry.setVerificationContract(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });
  });

  // ============================================
  // REGISTRATION TESTS
  // ============================================

  describe("register", function () {
    it("should allow verification contract to register a hash", async function () {
      await registry.connect(verificationContract).register(hash1);
      expect(await registry.isRegistered(hash1)).to.equal(true);
    });

    it("should emit Registered event", async function () {
        await expect(registry.connect(verificationContract).register(hash1))
        .to.emit(registry, "Registered");
    });

    it("should not allow duplicate registration", async function () {
      await registry.connect(verificationContract).register(hash1);
      await expect(
        registry.connect(verificationContract).register(hash1)
      ).to.be.revertedWith("Already registered");
    });

    it("should not allow non-verification contract to register", async function () {
      await expect(
        registry.connect(randomUser).register(hash1)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should not allow owner to register directly", async function () {
      await expect(
        registry.connect(owner).register(hash1)
      ).to.be.revertedWith("Not verification contract");
    });
  });

  // ============================================
  // BATCH REGISTRATION TESTS
  // ============================================

  describe("registerBatch", function () {
    it("should register multiple hashes", async function () {
      await registry.connect(verificationContract).registerBatch([hash1, hash2, hash3]);
      
      expect(await registry.isRegistered(hash1)).to.equal(true);
      expect(await registry.isRegistered(hash2)).to.equal(true);
      expect(await registry.isRegistered(hash3)).to.equal(true);
    });

    it("should emit BatchRegistered event", async function () {
      await expect(registry.connect(verificationContract).registerBatch([hash1, hash2]))
        .to.emit(registry, "BatchRegistered");
    });

    it("should fail if any hash is already registered", async function () {
      await registry.connect(verificationContract).register(hash1);
      
      await expect(
        registry.connect(verificationContract).registerBatch([hash1, hash2])
      ).to.be.revertedWith("Already registered");
    });

    it("should not allow non-verification contract to batch register", async function () {
      await expect(
        registry.connect(randomUser).registerBatch([hash1, hash2])
      ).to.be.revertedWith("Not verification contract");
    });
  });

  // ============================================
  // REVOCATION TESTS
  // ============================================

  describe("revoke", function () {
    beforeEach(async function () {
      await registry.connect(verificationContract).register(hash1);
    });

    it("should allow owner to revoke a registered hash", async function () {
      await registry.revoke(hash1, Reason.FRAUD);
      expect(await registry.isRevoked(hash1)).to.equal(true);
    });

    it("should store the revocation reason", async function () {
      await registry.revoke(hash1, Reason.EXPIRED);
      expect(await registry.getRevocationReason(hash1)).to.equal(Reason.EXPIRED);
    });

    it("should emit Revoked event", async function () {
      await expect(registry.revoke(hash1, Reason.FRAUD))
        .to.emit(registry, "Revoked");
    });

    it("should not allow revoking unregistered hash", async function () {
      await expect(
        registry.revoke(hash2, Reason.FRAUD)
      ).to.be.revertedWith("Not registered");
    });

    it("should not allow revoking already revoked hash", async function () {
      await registry.revoke(hash1, Reason.FRAUD);
      await expect(
        registry.revoke(hash1, Reason.EXPIRED)
      ).to.be.revertedWith("Already revoked");
    });

    it("should not allow NONE as reason", async function () {
      await expect(
        registry.revoke(hash1, Reason.NONE)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should not allow non-owner to revoke", async function () {
      await expect(
        registry.connect(randomUser).revoke(hash1, Reason.FRAUD)
      ).to.be.revertedWith("Not owner");
    });
  });

  // ============================================
  // BATCH REVOCATION TESTS
  // ============================================

  describe("revokeBatch", function () {
    beforeEach(async function () {
      await registry.connect(verificationContract).registerBatch([hash1, hash2, hash3]);
    });

    it("should revoke multiple hashes", async function () {
      await registry.revokeBatch([hash1, hash2], Reason.FRAUD);
      
      expect(await registry.isRevoked(hash1)).to.equal(true);
      expect(await registry.isRevoked(hash2)).to.equal(true);
      expect(await registry.isRevoked(hash3)).to.equal(false);
    });

    it("should apply same reason to all", async function () {
      await registry.revokeBatch([hash1, hash2], Reason.SUPERSEDED);
      
      expect(await registry.getRevocationReason(hash1)).to.equal(Reason.SUPERSEDED);
      expect(await registry.getRevocationReason(hash2)).to.equal(Reason.SUPERSEDED);
    });

    it("should emit BatchRevoked event", async function () {
      await expect(registry.revokeBatch([hash1, hash2], Reason.FRAUD))
        .to.emit(registry, "BatchRevoked");
    });

    it("should fail if any hash is not registered", async function () {
      const unregisteredHash = ethers.keccak256(ethers.toUtf8Bytes("unregistered"));
      
      await expect(
        registry.revokeBatch([hash1, unregisteredHash], Reason.FRAUD)
      ).to.be.revertedWith("Not registered");
    });

    it("should fail if any hash is already revoked", async function () {
      await registry.revoke(hash1, Reason.FRAUD);
      
      await expect(
        registry.revokeBatch([hash1, hash2], Reason.EXPIRED)
      ).to.be.revertedWith("Already revoked");
    });

    it("should not allow NONE as reason", async function () {
      await expect(
        registry.revokeBatch([hash1, hash2], Reason.NONE)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should not allow non-owner to batch revoke", async function () {
      await expect(
        registry.connect(randomUser).revokeBatch([hash1, hash2], Reason.FRAUD)
      ).to.be.revertedWith("Not owner");
    });
  });

  // ============================================
  // VIEW FUNCTION TESTS
  // ============================================

  describe("View Functions", function () {
    beforeEach(async function () {
      await registry.connect(verificationContract).register(hash1);
    });

    describe("isValid", function () {
      it("should return true for registered, non-revoked hash", async function () {
        expect(await registry.isValid(hash1)).to.equal(true);
      });

      it("should return false for revoked hash", async function () {
        await registry.revoke(hash1, Reason.FRAUD);
        expect(await registry.isValid(hash1)).to.equal(false);
      });

      it("should return false for unregistered hash", async function () {
        expect(await registry.isValid(hash2)).to.equal(false);
      });
    });

    describe("getStatus", function () {
      it("should return correct status for valid hash", async function () {
        const [exists, valid, reason] = await registry.getStatus(hash1);
        
        expect(exists).to.equal(true);
        expect(valid).to.equal(true);
        expect(reason).to.equal(Reason.NONE);
      });

      it("should return correct status for revoked hash", async function () {
        await registry.revoke(hash1, Reason.FRAUD);
        const [exists, valid, reason] = await registry.getStatus(hash1);
        
        expect(exists).to.equal(true);
        expect(valid).to.equal(false);
        expect(reason).to.equal(Reason.FRAUD);
      });

      it("should return correct status for unregistered hash", async function () {
        const [exists, valid, reason] = await registry.getStatus(hash2);
        
        expect(exists).to.equal(false);
        expect(valid).to.equal(false);
        expect(reason).to.equal(Reason.NONE);
      });
    });
  });

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  async function getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
});