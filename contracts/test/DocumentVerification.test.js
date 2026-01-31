const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocumentVerificationRegistry + RevocationRegistry", function () {
  let revocationRegistry;
  let verificationRegistry;
  let owner;
  let admin;
  let otherAccount;

  // Sample document data
  const docId = ethers.keccak256(ethers.toUtf8Bytes("DOC-001"));
  const docHash = ethers.keccak256(ethers.toUtf8Bytes("document content hash"));
  const docUri = "ipfs://QmSampleHash123";

  beforeEach(async function () {
    [owner, admin, otherAccount] = await ethers.getSigners();

    // Deploy RevocationRegistry first
    const RevocationRegistry = await ethers.getContractFactory("RevocationRegistry");
    revocationRegistry = await RevocationRegistry.deploy();
    await revocationRegistry.waitForDeployment();

    // Deploy DocumentVerificationRegistry with revocation address and admin
    const VerificationRegistry = await ethers.getContractFactory("DocumentVerificationRegistry");
    verificationRegistry = await VerificationRegistry.deploy(
      await revocationRegistry.getAddress(),
      admin.address
    );
    await verificationRegistry.waitForDeployment();

    // Link revocation registry to verification contract
    await revocationRegistry.setVerificationContract(await verificationRegistry.getAddress());
  });

  // ============================================
  // DEPLOYMENT TESTS
  // ============================================

  describe("Deployment", function () {
    it("should set the correct owner on verification registry", async function () {
      expect(await verificationRegistry.owner()).to.equal(owner.address);
    });

    it("should set the correct admin on verification registry", async function () {
      expect(await verificationRegistry.admin()).to.equal(admin.address);
    });

    it("should set the correct revocation registry address", async function () {
      expect(await verificationRegistry.revocationRegistry()).to.equal(
        await revocationRegistry.getAddress()
      );
    });

    it("should set the correct owner on revocation registry", async function () {
      expect(await revocationRegistry.owner()).to.equal(owner.address);
    });

    it("should link verification contract to revocation registry", async function () {
      expect(await revocationRegistry.verificationContract()).to.equal(
        await verificationRegistry.getAddress()
      );
    });

    it("should reject zero address for revocation registry", async function () {
      const VerificationRegistry = await ethers.getContractFactory("DocumentVerificationRegistry");
      await expect(
        VerificationRegistry.deploy(ethers.ZeroAddress, admin.address)
      ).to.be.revertedWith("Invalid registry address");
    });

    it("should reject zero address for admin", async function () {
      const VerificationRegistry = await ethers.getContractFactory("DocumentVerificationRegistry");
      await expect(
        VerificationRegistry.deploy(await revocationRegistry.getAddress(), ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid admin address");
    });
  });

  // ============================================
  // REGISTRATION TESTS
  // ============================================

  describe("Document Registration", function () {
    it("should register a document successfully", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      const doc = await verificationRegistry.getDocument(docId);
      expect(doc.docHash).to.equal(docHash);
      expect(doc.issuer).to.equal(owner.address);
      expect(doc.uri).to.equal(docUri);
      expect(doc.isValid).to.be.true;
    });

    it("should emit DocumentRegistered event", async function () {
      await expect(verificationRegistry.registerDocument(docId, docHash, docUri))
      .to.emit(verificationRegistry, "DocumentRegistered");
    });

    it("should register document in revocation registry", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      expect(await revocationRegistry.isRegistered(docId)).to.be.true;
    });

    it("should reject duplicate document registration", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      await expect(
        verificationRegistry.registerDocument(docId, docHash, docUri)
      ).to.be.revertedWith("Document already registered");
    });

    it("should reject registration from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerDocument(docId, docHash, docUri)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject empty document hash", async function () {
      await expect(
        verificationRegistry.registerDocument(docId, ethers.ZeroHash, docUri)
      ).to.be.revertedWith("Invalid document hash");
    });

    it("should increment document count", async function () {
      expect(await verificationRegistry.getDocumentCount()).to.equal(0);

      await verificationRegistry.registerDocument(docId, docHash, docUri);

      expect(await verificationRegistry.getDocumentCount()).to.equal(1);
    });

    it("should store document ID at correct index", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      expect(await verificationRegistry.getDocumentIdAtIndex(0)).to.equal(docId);
    });
  });

  // ============================================
  // BATCH REGISTRATION TESTS
  // ============================================

  describe("Batch Document Registration", function () {
    const docIds = [
      ethers.keccak256(ethers.toUtf8Bytes("DOC-001")),
      ethers.keccak256(ethers.toUtf8Bytes("DOC-002")),
      ethers.keccak256(ethers.toUtf8Bytes("DOC-003"))
    ];
    const docHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("content-3"))
    ];
    const uris = [
      "ipfs://hash1",
      "ipfs://hash2",
      "ipfs://hash3"
    ];

    it("should register multiple documents", async function () {
      await verificationRegistry.registerDocumentBatch(docIds, docHashes, uris);

      expect(await verificationRegistry.getDocumentCount()).to.equal(3);

      for (let i = 0; i < docIds.length; i++) {
        const doc = await verificationRegistry.getDocument(docIds[i]);
        expect(doc.docHash).to.equal(docHashes[i]);
        expect(doc.uri).to.equal(uris[i]);
      }
    });

    it("should emit BatchDocumentsRegistered event", async function () {
      await expect(verificationRegistry.registerDocumentBatch(docIds, docHashes, uris))
        .to.emit(verificationRegistry, "BatchDocumentsRegistered");
    });

    it("should register all documents in revocation registry", async function () {
      await verificationRegistry.registerDocumentBatch(docIds, docHashes, uris);

      for (const id of docIds) {
        expect(await revocationRegistry.isRegistered(id)).to.be.true;
      }
    });

    it("should reject mismatched array lengths", async function () {
      await expect(
        verificationRegistry.registerDocumentBatch(docIds, docHashes.slice(0, 2), uris)
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should reject empty arrays", async function () {
      await expect(
        verificationRegistry.registerDocumentBatch([], [], [])
      ).to.be.revertedWith("Empty arrays");
    });

    it("should reject batch from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerDocumentBatch(docIds, docHashes, uris)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject if any document already exists", async function () {
      await verificationRegistry.registerDocument(docIds[0], docHashes[0], uris[0]);

      await expect(
        verificationRegistry.registerDocumentBatch(docIds, docHashes, uris)
      ).to.be.revertedWith("Document already registered");
    });
  });

  // ============================================
  // VERIFICATION TESTS
  // ============================================

  describe("Document Verification", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);
    });

    it("should verify valid document with correct hash", async function () {
      expect(await verificationRegistry.verifyDocument(docId, docHash)).to.be.true;
    });

    it("should reject verification with wrong hash", async function () {
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrong content"));
      expect(await verificationRegistry.verifyDocument(docId, wrongHash)).to.be.false;
    });

    it("should reject verification of non-existent document", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));
      expect(await verificationRegistry.verifyDocument(fakeId, docHash)).to.be.false;
    });

    it("should return true for isDocumentValid", async function () {
      expect(await verificationRegistry.isDocumentValid(docId)).to.be.true;
    });

    it("should return false for isDocumentRevoked", async function () {
      expect(await verificationRegistry.isDocumentRevoked(docId)).to.be.false;
    });
  });

  // ============================================
  // REVOCATION INTEGRATION TESTS
  // ============================================

  describe("Revocation Integration", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);
    });

    it("should mark document as invalid after revocation", async function () {
      // Revoke the document (reason 1 = FRAUD)
      await revocationRegistry.revoke(docId, 1);

      expect(await verificationRegistry.isDocumentValid(docId)).to.be.false;
      expect(await verificationRegistry.verifyDocument(docId, docHash)).to.be.false;
    });

    it("should return revoked status from getDocument", async function () {
      await revocationRegistry.revoke(docId, 1);

      const doc = await verificationRegistry.getDocument(docId);
      expect(doc.isValid).to.be.false;
    });

    it("should return true for isDocumentRevoked after revocation", async function () {
      await revocationRegistry.revoke(docId, 1);

      expect(await verificationRegistry.isDocumentRevoked(docId)).to.be.true;
    });

    it("should return correct status from getDocumentStatus", async function () {
      // Before revocation
      let status = await verificationRegistry.getDocumentStatus(docId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;
      expect(status.revoked).to.be.false;

      // After revocation
      await revocationRegistry.revoke(docId, 1);

      status = await verificationRegistry.getDocumentStatus(docId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.true;
    });
  });

  // ============================================
  // ACCESS CONTROL TESTS
  // ============================================

  describe("Access Control", function () {
    it("should allow owner to transfer ownership", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      expect(await verificationRegistry.owner()).to.equal(otherAccount.address);
    });

    it("should emit OwnershipTransferred event", async function () {
      await expect(verificationRegistry.transferOwnership(otherAccount.address))
        .to.emit(verificationRegistry, "OwnershipTransferred")
        .withArgs(owner.address, otherAccount.address);
    });

    it("should reject ownership transfer from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).transferOwnership(otherAccount.address)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject ownership transfer to zero address", async function () {
      await expect(
        verificationRegistry.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });

    it("should allow admin to update admin", async function () {
      await verificationRegistry.connect(admin).updateAdmin(otherAccount.address);

      expect(await verificationRegistry.admin()).to.equal(otherAccount.address);
    });

    it("should emit AdminUpdated event", async function () {
      await expect(verificationRegistry.connect(admin).updateAdmin(otherAccount.address))
        .to.emit(verificationRegistry, "AdminUpdated")
        .withArgs(admin.address, otherAccount.address);
    });

    it("should reject admin update from non-admin", async function () {
      await expect(
        verificationRegistry.connect(owner).updateAdmin(otherAccount.address)
      ).to.be.revertedWith("Not admin");
    });

    it("should reject admin update to zero address", async function () {
      await expect(
        verificationRegistry.connect(admin).updateAdmin(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });

    it("should allow new owner to register documents after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await verificationRegistry.connect(otherAccount).registerDocument(docId, docHash, docUri);

      const doc = await verificationRegistry.getDocument(docId);
      expect(doc.issuer).to.equal(otherAccount.address);
    });

    it("should reject old owner from registering after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await expect(
        verificationRegistry.registerDocument(docId, docHash, docUri)
      ).to.be.revertedWith("Not owner");
    });
  });

  // ============================================
  // VIEW FUNCTION TESTS
  // ============================================

  describe("View Functions", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);
    });

    it("should return correct document data from getDocument", async function () {
      const doc = await verificationRegistry.getDocument(docId);

      expect(doc.docHash).to.equal(docHash);
      expect(doc.issuer).to.equal(owner.address);
      expect(doc.uri).to.equal(docUri);
      expect(doc.issuedAt).to.be.greaterThan(0);
      expect(doc.isValid).to.be.true;
    });

    it("should revert getDocument for non-existent document", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      await expect(verificationRegistry.getDocument(fakeId))
        .to.be.revertedWith("Document not found");
    });

    it("should return correct status for non-existent document", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      const status = await verificationRegistry.getDocumentStatus(fakeId);
      expect(status.exists).to.be.false;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.false;
      expect(status.issuedAt).to.equal(0);
    });

    it("should return false for isDocumentValid on non-existent document", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      expect(await verificationRegistry.isDocumentValid(fakeId)).to.be.false;
    });

    it("should revert getDocumentIdAtIndex for out of bounds", async function () {
      await expect(verificationRegistry.getDocumentIdAtIndex(99))
        .to.be.revertedWith("Index out of bounds");
    });
  });

  // ============================================
  // REVOCATION REGISTRY DIRECT TESTS
  // ============================================

  describe("RevocationRegistry Direct", function () {
    it("should reject registration from non-verification contract", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).register(docId)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should reject setting verification contract twice", async function () {
      await expect(
        revocationRegistry.setVerificationContract(otherAccount.address)
      ).to.be.revertedWith("Verification contract already set");
    });

    it("should only allow owner to revoke", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      await expect(
        revocationRegistry.connect(otherAccount).revoke(docId, 1)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject revocation with NONE reason", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      await expect(
        revocationRegistry.revoke(docId, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject revoking non-registered document", async function () {
      await expect(
        revocationRegistry.revoke(docId, 1)
      ).to.be.revertedWith("Not registered");
    });

    it("should reject revoking already revoked document", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);
      await revocationRegistry.revoke(docId, 1);

      await expect(
        revocationRegistry.revoke(docId, 2)
      ).to.be.revertedWith("Already revoked");
    });

    it("should return correct revocation reason", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);
      await revocationRegistry.revoke(docId, 2); // EXPIRED

      expect(await revocationRegistry.getRevocationReason(docId)).to.equal(2);
    });

    it("should return full status from getStatus", async function () {
      await verificationRegistry.registerDocument(docId, docHash, docUri);

      let status = await revocationRegistry.getStatus(docId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;

      await revocationRegistry.revoke(docId, 1);

      status = await revocationRegistry.getStatus(docId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
    });
  });

  // ============================================
  // BATCH REVOCATION TESTS
  // ============================================

  describe("Batch Revocation", function () {
    const docIds = [
      ethers.keccak256(ethers.toUtf8Bytes("DOC-001")),
      ethers.keccak256(ethers.toUtf8Bytes("DOC-002")),
      ethers.keccak256(ethers.toUtf8Bytes("DOC-003"))
    ];
    const docHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("content-3"))
    ];
    const uris = ["ipfs://1", "ipfs://2", "ipfs://3"];

    beforeEach(async function () {
      await verificationRegistry.registerDocumentBatch(docIds, docHashes, uris);
    });

    it("should revoke multiple documents", async function () {
      await revocationRegistry.revokeBatch(docIds, 1);

      for (const id of docIds) {
        expect(await revocationRegistry.isRevoked(id)).to.be.true;
        expect(await verificationRegistry.isDocumentValid(id)).to.be.false;
      }
    });

    it("should emit BatchRevoked event", async function () {
      await expect(revocationRegistry.revokeBatch(docIds, 1))
        .to.emit(revocationRegistry, "BatchRevoked");
    });

    it("should reject batch revocation with NONE reason", async function () {
      await expect(
        revocationRegistry.revokeBatch(docIds, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject batch revocation from non-owner", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).revokeBatch(docIds, 1)
      ).to.be.revertedWith("Not owner");
    });
  });
});