const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocumentVerification", function () {
  let registry;
  let docVerification;
  let owner;
  let randomUser;

  // Sample hashes
  const hash1 = ethers.keccak256(ethers.toUtf8Bytes("diploma1"));
  const hash2 = ethers.keccak256(ethers.toUtf8Bytes("diploma2"));
  const hash3 = ethers.keccak256(ethers.toUtf8Bytes("diploma3"));

  // Revocation reasons
  const Reason = {
    NONE: 0,
    FRAUD: 1,
    EXPIRED: 2,
    SUPERSEDED: 3,
    OWNER_REQUEST: 4,
    OTHER: 5
  };

  beforeEach(async function () {
    [owner, randomUser] = await ethers.getSigners();

    // Deploy RevocationRegistry
    const Registry = await ethers.getContractFactory("RevocationRegistry");
    registry = await Registry.deploy();
    await registry.waitForDeployment();

    // Deploy DocumentVerification with registry address
    const DocVerification = await ethers.getContractFactory("DocumentVerification");
    docVerification = await DocVerification.deploy(await registry.getAddress());
    await docVerification.waitForDeployment();

    // Link registry to verification contract
    await registry.setVerificationContract(await docVerification.getAddress());
  });

  // ============================================
  // DEPLOYMENT TESTS
  // ============================================

  describe("Deployment", function () {
    it("should set the deployer as owner", async function () {
      expect(await docVerification.owner()).to.equal(owner.address);
    });

    it("should set the registry address", async function () {
      expect(await docVerification.revocationRegistry()).to.equal(await registry.getAddress());
    });

    it("should reject zero address for registry", async function () {
      const DocVerification = await ethers.getContractFactory("DocumentVerification");
      await expect(
        DocVerification.deploy(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid registry address");
    });
  });

  // ============================================
  // VERIFY DOCUMENT TESTS
  // ============================================

  describe("verifyDocument", function () {
    it("should verify a document and register it", async function () {
      await docVerification.verifyDocument(hash1);
      expect(await registry.isRegistered(hash1)).to.equal(true);
    });

    it("should emit DocumentVerified event", async function () {
      await expect(docVerification.verifyDocument(hash1))
        .to.emit(docVerification, "DocumentVerified");
    });

    it("should not allow non-owner to verify", async function () {
      await expect(
        docVerification.connect(randomUser).verifyDocument(hash1)
      ).to.be.revertedWith("Not owner");
    });

    it("should not allow duplicate verification", async function () {
      await docVerification.verifyDocument(hash1);
      await expect(
        docVerification.verifyDocument(hash1)
      ).to.be.revertedWith("Already registered");
    });
  });

  // ============================================
  // BATCH VERIFY TESTS
  // ============================================

  describe("verifyDocumentBatch", function () {
    it("should verify multiple documents", async function () {
      await docVerification.verifyDocumentBatch([hash1, hash2, hash3]);

      expect(await registry.isRegistered(hash1)).to.equal(true);
      expect(await registry.isRegistered(hash2)).to.equal(true);
      expect(await registry.isRegistered(hash3)).to.equal(true);
    });

    it("should emit BatchVerified event", async function () {
      await expect(docVerification.verifyDocumentBatch([hash1, hash2]))
        .to.emit(docVerification, "BatchVerified");
    });

    it("should not allow non-owner to batch verify", async function () {
      await expect(
        docVerification.connect(randomUser).verifyDocumentBatch([hash1, hash2])
      ).to.be.revertedWith("Not owner");
    });
  });

  // ============================================
  // VALIDITY CHECK TESTS
  // ============================================

  describe("isDocumentValid", function () {
    it("should return true for verified document", async function () {
      await docVerification.verifyDocument(hash1);
      expect(await docVerification.isDocumentValid(hash1)).to.equal(true);
    });

    it("should return false for unverified document", async function () {
      expect(await docVerification.isDocumentValid(hash1)).to.equal(false);
    });

    it("should return false for revoked document", async function () {
      await docVerification.verifyDocument(hash1);
      await registry.revoke(hash1, Reason.FRAUD);
      expect(await docVerification.isDocumentValid(hash1)).to.equal(false);
    });
  });

  // ============================================
  // FULL WORKFLOW TEST
  // ============================================

  describe("Full Workflow", function () {
    it("should handle complete verify → check → revoke → check flow", async function () {
      // Step 1: Verify document
      await docVerification.verifyDocument(hash1);
      expect(await docVerification.isDocumentValid(hash1)).to.equal(true);

      // Step 2: Document is valid
      expect(await registry.isRegistered(hash1)).to.equal(true);
      expect(await registry.isRevoked(hash1)).to.equal(false);

      // Step 3: Revoke document (owner calls registry directly)
      await registry.revoke(hash1, Reason.FRAUD);

      // Step 4: Document is no longer valid
      expect(await docVerification.isDocumentValid(hash1)).to.equal(false);
      expect(await registry.isRevoked(hash1)).to.equal(true);
      expect(await registry.getRevocationReason(hash1)).to.equal(Reason.FRAUD);
    });
  });
});