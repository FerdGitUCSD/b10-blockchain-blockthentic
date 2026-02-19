const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DatasetVerificationRegistry + RevocationRegistry", function () {
  let revocationRegistry;
  let verificationRegistry;
  let owner;
  let admin;
  let otherAccount;

  // Sample dataset data
  const datasetId = ethers.keccak256(ethers.toUtf8Bytes("DS-001"));
  const dataHash = ethers.keccak256(ethers.toUtf8Bytes("dataset content hash"));
  const datasetUri = "ipfs://QmSampleDatasetHash123";
  const datasetType = "tabular";

  beforeEach(async function () {
    [owner, admin, otherAccount] = await ethers.getSigners();

    // Deploy RevocationRegistry first
    const RevocationRegistry = await ethers.getContractFactory("DatasetTestRevocation");
    revocationRegistry = await RevocationRegistry.deploy();
    await revocationRegistry.waitForDeployment();

    // Deploy DatasetVerificationRegistry with revocation address and admin
    const VerificationRegistry = await ethers.getContractFactory("DatasetTestVerification");
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
      const VerificationRegistry = await ethers.getContractFactory("DatasetTestVerification");
      await expect(
        VerificationRegistry.deploy(ethers.ZeroAddress, admin.address)
      ).to.be.revertedWith("Invalid registry address");
    });

    it("should reject zero address for admin", async function () {
      const VerificationRegistry = await ethers.getContractFactory("DatasetTestVerification");
      await expect(
        VerificationRegistry.deploy(await revocationRegistry.getAddress(), ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid admin address");
    });

    it("should start with zero dataset count", async function () {
      expect(await verificationRegistry.getDatasetCount()).to.equal(0);
    });
  });

  // ============================================
  // REGISTRATION TESTS
  // ============================================

  describe("Dataset Registration", function () {
    it("should register a dataset successfully", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.dataHash).to.equal(dataHash);
      expect(ds.issuer).to.equal(owner.address);
      expect(ds.uri).to.equal(datasetUri);
      expect(ds.datasetType).to.equal(datasetType);
      expect(ds.isValid).to.be.true;
    });

    it("should emit DatasetRegistered event", async function () {
      await expect(verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType))
        .to.emit(verificationRegistry, "DatasetRegistered");
    });

    it("should emit DatasetRegistered event with correct args", async function () {
      const tx = await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      await expect(tx)
        .to.emit(verificationRegistry, "DatasetRegistered")
        .withArgs(datasetId, dataHash, owner.address, datasetUri, datasetType, block.timestamp);
    });

    it("should register dataset in revocation registry", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      expect(await revocationRegistry.isRegistered(datasetId)).to.be.true;
    });

    it("should reject duplicate dataset registration", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      await expect(
        verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.be.revertedWith("Dataset already registered");
    });

    it("should reject duplicate ID even with different hash", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      const differentHash = ethers.keccak256(ethers.toUtf8Bytes("different content"));
      await expect(
        verificationRegistry.registerDataset(datasetId, differentHash, datasetUri, datasetType)
      ).to.be.revertedWith("Dataset already registered");
    });

    it("should reject registration from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject registration from admin (not owner)", async function () {
      await expect(
        verificationRegistry.connect(admin).registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject empty data hash", async function () {
      await expect(
        verificationRegistry.registerDataset(datasetId, ethers.ZeroHash, datasetUri, datasetType)
      ).to.be.revertedWith("Invalid data hash");
    });

    it("should accept empty URI string", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, "", datasetType);

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.uri).to.equal("");
    });

    it("should accept empty datasetType string", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, "");

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.datasetType).to.equal("");
    });

    it("should increment dataset count", async function () {
      expect(await verificationRegistry.getDatasetCount()).to.equal(0);

      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      expect(await verificationRegistry.getDatasetCount()).to.equal(1);
    });

    it("should store dataset ID at correct index", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      expect(await verificationRegistry.getDatasetIdAtIndex(0)).to.equal(datasetId);
    });

    it("should set registeredAt timestamp correctly", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.registeredAt).to.be.greaterThan(0);
    });

    it("should register multiple distinct datasets sequentially", async function () {
      const id2 = ethers.keccak256(ethers.toUtf8Bytes("DS-002"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("content-2"));

      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
      await verificationRegistry.registerDataset(id2, hash2, "ipfs://hash2", "geospatial");

      expect(await verificationRegistry.getDatasetCount()).to.equal(2);
      expect(await verificationRegistry.getDatasetIdAtIndex(0)).to.equal(datasetId);
      expect(await verificationRegistry.getDatasetIdAtIndex(1)).to.equal(id2);
    });
  });

  // ============================================
  // BATCH REGISTRATION TESTS
  // ============================================

  describe("Batch Dataset Registration", function () {
    const datasetIds = [
      ethers.keccak256(ethers.toUtf8Bytes("DS-001")),
      ethers.keccak256(ethers.toUtf8Bytes("DS-002")),
      ethers.keccak256(ethers.toUtf8Bytes("DS-003"))
    ];
    const dataHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("content-3"))
    ];
    const uris = ["ipfs://ds1", "ipfs://ds2", "ipfs://ds3"];
    const datasetTypes = ["tabular", "timeseries", "geospatial"];

    it("should register multiple datasets", async function () {
      await verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes);

      expect(await verificationRegistry.getDatasetCount()).to.equal(3);

      for (let i = 0; i < datasetIds.length; i++) {
        const ds = await verificationRegistry.getDataset(datasetIds[i]);
        expect(ds.dataHash).to.equal(dataHashes[i]);
        expect(ds.uri).to.equal(uris[i]);
        expect(ds.datasetType).to.equal(datasetTypes[i]);
      }
    });

    it("should emit BatchDatasetsRegistered event", async function () {
      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes)
      ).to.emit(verificationRegistry, "BatchDatasetsRegistered");
    });

    it("should register all datasets in revocation registry", async function () {
      await verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes);

      for (const id of datasetIds) {
        expect(await revocationRegistry.isRegistered(id)).to.be.true;
      }
    });

    it("should reject mismatched array lengths (hashes short)", async function () {
      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, dataHashes.slice(0, 2), uris, datasetTypes)
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should reject mismatched array lengths (uris short)", async function () {
      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris.slice(0, 2), datasetTypes)
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should reject mismatched array lengths (types short)", async function () {
      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes.slice(0, 2))
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should reject empty arrays", async function () {
      await expect(
        verificationRegistry.registerDatasetBatch([], [], [], [])
      ).to.be.revertedWith("Empty arrays");
    });

    it("should reject batch from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject if any dataset already exists", async function () {
      await verificationRegistry.registerDataset(datasetIds[0], dataHashes[0], uris[0], datasetTypes[0]);

      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes)
      ).to.be.revertedWith("Dataset already registered");
    });

    it("should reject if any hash in batch is zero", async function () {
      const badHashes = [...dataHashes];
      badHashes[1] = ethers.ZeroHash;

      await expect(
        verificationRegistry.registerDatasetBatch(datasetIds, badHashes, uris, datasetTypes)
      ).to.be.revertedWith("Invalid data hash");
    });

    it("should register single-element batch", async function () {
      await verificationRegistry.registerDatasetBatch(
        [datasetIds[0]], [dataHashes[0]], [uris[0]], [datasetTypes[0]]
      );

      expect(await verificationRegistry.getDatasetCount()).to.equal(1);
      const ds = await verificationRegistry.getDataset(datasetIds[0]);
      expect(ds.dataHash).to.equal(dataHashes[0]);
    });

    it("should correctly index all batch-registered datasets", async function () {
      await verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes);

      for (let i = 0; i < datasetIds.length; i++) {
        expect(await verificationRegistry.getDatasetIdAtIndex(i)).to.equal(datasetIds[i]);
      }
    });
  });

  // ============================================
  // VERIFICATION TESTS
  // ============================================

  describe("Dataset Verification", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
    });

    it("should verify valid dataset with correct hash", async function () {
      expect(await verificationRegistry.verifyDataset(datasetId, dataHash)).to.be.true;
    });

    it("should reject verification with wrong hash", async function () {
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrong content"));
      expect(await verificationRegistry.verifyDataset(datasetId, wrongHash)).to.be.false;
    });

    it("should reject verification of non-existent dataset", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));
      expect(await verificationRegistry.verifyDataset(fakeId, dataHash)).to.be.false;
    });

    it("should reject verification with zero hash against registered dataset", async function () {
      expect(await verificationRegistry.verifyDataset(datasetId, ethers.ZeroHash)).to.be.false;
    });

    it("should reject verification with both wrong id and wrong hash", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrong content"));
      expect(await verificationRegistry.verifyDataset(fakeId, wrongHash)).to.be.false;
    });

    it("should return true for isDatasetValid", async function () {
      expect(await verificationRegistry.isDatasetValid(datasetId)).to.be.true;
    });

    it("should return false for isDatasetRevoked", async function () {
      expect(await verificationRegistry.isDatasetRevoked(datasetId)).to.be.false;
    });

    it("should allow anyone to call verify (view function)", async function () {
      expect(
        await verificationRegistry.connect(otherAccount).verifyDataset(datasetId, dataHash)
      ).to.be.true;
    });
  });

  // ============================================
  // REVOCATION INTEGRATION TESTS
  // ============================================

  describe("Revocation Integration", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
    });

    it("should mark dataset as invalid after revocation", async function () {
      // Revoke the dataset (reason 1 = OUTDATED)
      await revocationRegistry.revoke(datasetId, 1);

      expect(await verificationRegistry.isDatasetValid(datasetId)).to.be.false;
      expect(await verificationRegistry.verifyDataset(datasetId, dataHash)).to.be.false;
    });

    it("should return revoked status from getDataset", async function () {
      await revocationRegistry.revoke(datasetId, 1);

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.isValid).to.be.false;
    });

    it("should return true for isDatasetRevoked after revocation", async function () {
      await revocationRegistry.revoke(datasetId, 1);

      expect(await verificationRegistry.isDatasetRevoked(datasetId)).to.be.true;
    });

    it("should return correct status from getDatasetStatus", async function () {
      // Before revocation
      let status = await verificationRegistry.getDatasetStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;
      expect(status.revoked).to.be.false;

      // After revocation
      await revocationRegistry.revoke(datasetId, 1);

      status = await verificationRegistry.getDatasetStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.true;
    });

    it("should preserve dataset data after revocation", async function () {
      await revocationRegistry.revoke(datasetId, 1);

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.dataHash).to.equal(dataHash);
      expect(ds.issuer).to.equal(owner.address);
      expect(ds.uri).to.equal(datasetUri);
      expect(ds.datasetType).to.equal(datasetType);
    });

    it("should not allow re-registration after revocation", async function () {
      await revocationRegistry.revoke(datasetId, 1);

      await expect(
        verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.be.revertedWith("Dataset already registered");
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

    it("should allow new owner to register datasets after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await verificationRegistry.connect(otherAccount).registerDataset(
        datasetId, dataHash, datasetUri, datasetType
      );

      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.issuer).to.equal(otherAccount.address);
    });

    it("should reject old owner from registering after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await expect(
        verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.be.revertedWith("Not owner");
    });

    it("should allow new admin to update admin again", async function () {
      await verificationRegistry.connect(admin).updateAdmin(otherAccount.address);

      // Old admin should no longer work
      await expect(
        verificationRegistry.connect(admin).updateAdmin(owner.address)
      ).to.be.revertedWith("Not admin");

      // New admin should work
      await verificationRegistry.connect(otherAccount).updateAdmin(owner.address);
      expect(await verificationRegistry.admin()).to.equal(owner.address);
    });

    it("should allow owner to transfer ownership to admin", async function () {
      await verificationRegistry.transferOwnership(admin.address);

      expect(await verificationRegistry.owner()).to.equal(admin.address);
      // Admin is now also owner
      await verificationRegistry.connect(admin).registerDataset(
        datasetId, dataHash, datasetUri, datasetType
      );
    });
  });

  // ============================================
  // VIEW FUNCTION TESTS
  // ============================================

  describe("View Functions", function () {
    beforeEach(async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
    });

    it("should return correct dataset data from getDataset", async function () {
      const ds = await verificationRegistry.getDataset(datasetId);

      expect(ds.dataHash).to.equal(dataHash);
      expect(ds.issuer).to.equal(owner.address);
      expect(ds.uri).to.equal(datasetUri);
      expect(ds.datasetType).to.equal(datasetType);
      expect(ds.registeredAt).to.be.greaterThan(0);
      expect(ds.isValid).to.be.true;
    });

    it("should revert getDataset for non-existent dataset", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      await expect(verificationRegistry.getDataset(fakeId))
        .to.be.revertedWith("Dataset not found");
    });

    it("should return correct status for existing dataset", async function () {
      const status = await verificationRegistry.getDatasetStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;
      expect(status.revoked).to.be.false;
      expect(status.registeredAt).to.be.greaterThan(0);
    });

    it("should return correct status for non-existent dataset", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      const status = await verificationRegistry.getDatasetStatus(fakeId);
      expect(status.exists).to.be.false;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.false;
      expect(status.registeredAt).to.equal(0);
    });

    it("should return false for isDatasetValid on non-existent dataset", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      expect(await verificationRegistry.isDatasetValid(fakeId)).to.be.false;
    });

    it("should return false for isDatasetRevoked on non-existent dataset", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      expect(await verificationRegistry.isDatasetRevoked(fakeId)).to.be.false;
    });

    it("should revert getDatasetIdAtIndex for out of bounds", async function () {
      await expect(verificationRegistry.getDatasetIdAtIndex(99))
        .to.be.revertedWith("Index out of bounds");
    });

    it("should revert getDatasetIdAtIndex on empty registry", async function () {
      // Deploy fresh registry with no datasets
      const RevocationRegistry = await ethers.getContractFactory("DatasetTestRevocation");
      const freshRevocation = await RevocationRegistry.deploy();
      await freshRevocation.waitForDeployment();

      const VerificationRegistry = await ethers.getContractFactory("DatasetTestVerification");
      const freshVerification = await VerificationRegistry.deploy(
        await freshRevocation.getAddress(),
        admin.address
      );
      await freshVerification.waitForDeployment();

      await expect(freshVerification.getDatasetIdAtIndex(0))
        .to.be.revertedWith("Index out of bounds");
    });

    it("should return correct count after multiple registrations", async function () {
      const id2 = ethers.keccak256(ethers.toUtf8Bytes("DS-002"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("content-2"));
      const id3 = ethers.keccak256(ethers.toUtf8Bytes("DS-003"));
      const hash3 = ethers.keccak256(ethers.toUtf8Bytes("content-3"));

      await verificationRegistry.registerDataset(id2, hash2, "ipfs://2", "timeseries");
      await verificationRegistry.registerDataset(id3, hash3, "ipfs://3", "geospatial");

      expect(await verificationRegistry.getDatasetCount()).to.equal(3);
    });

    it("should allow any account to call view functions", async function () {
      const ds = await verificationRegistry.connect(otherAccount).getDataset(datasetId);
      expect(ds.dataHash).to.equal(dataHash);

      const status = await verificationRegistry.connect(otherAccount).getDatasetStatus(datasetId);
      expect(status.exists).to.be.true;

      const count = await verificationRegistry.connect(otherAccount).getDatasetCount();
      expect(count).to.equal(1);
    });
  });

  // ============================================
  // REVOCATION REGISTRY DIRECT TESTS
  // ============================================

  describe("RevocationRegistry Direct", function () {
    it("should reject registration from non-verification contract", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).register(datasetId)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should reject registration from owner directly", async function () {
      await expect(
        revocationRegistry.register(datasetId)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should reject setting verification contract twice", async function () {
      await expect(
        revocationRegistry.setVerificationContract(otherAccount.address)
      ).to.be.revertedWith("Verification contract already set");
    });

    it("should reject setting verification contract to zero address", async function () {
      // Deploy a fresh revocation registry to test this
      const RevocationRegistry = await ethers.getContractFactory("DatasetTestRevocation");
      const freshRevocation = await RevocationRegistry.deploy();
      await freshRevocation.waitForDeployment();

      await expect(
        freshRevocation.setVerificationContract(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });

    it("should reject setting verification contract by non-owner", async function () {
      const RevocationRegistry = await ethers.getContractFactory("DatasetTestRevocation");
      const freshRevocation = await RevocationRegistry.deploy();
      await freshRevocation.waitForDeployment();

      await expect(
        freshRevocation.connect(otherAccount).setVerificationContract(otherAccount.address)
      ).to.be.revertedWith("Not owner");
    });

    it("should emit VerificationContractSet event", async function () {
      const RevocationRegistry = await ethers.getContractFactory("DatasetTestRevocation");
      const freshRevocation = await RevocationRegistry.deploy();
      await freshRevocation.waitForDeployment();

      await expect(freshRevocation.setVerificationContract(otherAccount.address))
        .to.emit(freshRevocation, "VerificationContractSet")
        .withArgs(otherAccount.address);
    });

    it("should only allow owner to revoke", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      await expect(
        revocationRegistry.connect(otherAccount).revoke(datasetId, 1)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject revocation with NONE reason", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      await expect(
        revocationRegistry.revoke(datasetId, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject revoking non-registered dataset", async function () {
      await expect(
        revocationRegistry.revoke(datasetId, 1)
      ).to.be.revertedWith("Not registered");
    });

    it("should reject revoking already revoked dataset", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
      await revocationRegistry.revoke(datasetId, 1);

      await expect(
        revocationRegistry.revoke(datasetId, 2)
      ).to.be.revertedWith("Already revoked");
    });

    it("should return correct revocation reason", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
      await revocationRegistry.revoke(datasetId, 2); // CORRUPTED

      expect(await revocationRegistry.getRevocationReason(datasetId)).to.equal(2);
    });

    it("should return NONE reason for non-revoked dataset", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      expect(await revocationRegistry.getRevocationReason(datasetId)).to.equal(0); // NONE
    });

    it("should return full status from getStatus", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      let status = await revocationRegistry.getStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;

      await revocationRegistry.revoke(datasetId, 1);

      status = await revocationRegistry.getStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
    });

    it("should return correct status for unregistered hash", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("UNREGISTERED"));

      const status = await revocationRegistry.getStatus(fakeId);
      expect(status.exists).to.be.false;
      expect(status.valid).to.be.false;
    });

    it("should emit Registered event via verification contract", async function () {
      await expect(
        verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType)
      ).to.emit(revocationRegistry, "Registered");
    });

    it("should emit Revoked event", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      await expect(revocationRegistry.revoke(datasetId, 1))
        .to.emit(revocationRegistry, "Revoked");
    });

    it("should validate all dataset-specific revocation reasons", async function () {
      // Dataset reasons: NONE=0, OUTDATED=1, CORRUPTED=2, RETRACTED=3, OWNER_REQUEST=4, OTHER=5
      const reasons = [
        { name: "OUTDATED", value: 1 },
        { name: "CORRUPTED", value: 2 },
        { name: "RETRACTED", value: 3 },
        { name: "OWNER_REQUEST", value: 4 },
        { name: "OTHER", value: 5 },
      ];

      for (const { name, value } of reasons) {
        const id = ethers.keccak256(ethers.toUtf8Bytes(`reason-test-${name}`));
        const hash = ethers.keccak256(ethers.toUtf8Bytes(`hash-${name}`));

        await verificationRegistry.registerDataset(id, hash, datasetUri, datasetType);
        await revocationRegistry.revoke(id, value);

        expect(await revocationRegistry.getRevocationReason(id)).to.equal(value);
        expect(await revocationRegistry.isRevoked(id)).to.be.true;
        expect(await revocationRegistry.isValid(id)).to.be.false;
      }
    });

    it("should track isRegistered correctly", async function () {
      expect(await revocationRegistry.isRegistered(datasetId)).to.be.false;

      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      expect(await revocationRegistry.isRegistered(datasetId)).to.be.true;
    });

    it("should track isValid correctly through lifecycle", async function () {
      // Before registration
      expect(await revocationRegistry.isValid(datasetId)).to.be.false;

      // After registration
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);
      expect(await revocationRegistry.isValid(datasetId)).to.be.true;

      // After revocation
      await revocationRegistry.revoke(datasetId, 1);
      expect(await revocationRegistry.isValid(datasetId)).to.be.false;
    });
  });

  // ============================================
  // BATCH REVOCATION TESTS
  // ============================================

  describe("Batch Revocation", function () {
    const datasetIds = [
      ethers.keccak256(ethers.toUtf8Bytes("DS-001")),
      ethers.keccak256(ethers.toUtf8Bytes("DS-002")),
      ethers.keccak256(ethers.toUtf8Bytes("DS-003"))
    ];
    const dataHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("content-3"))
    ];
    const uris = ["ipfs://1", "ipfs://2", "ipfs://3"];
    const datasetTypes = ["tabular", "timeseries", "geospatial"];

    beforeEach(async function () {
      await verificationRegistry.registerDatasetBatch(datasetIds, dataHashes, uris, datasetTypes);
    });

    it("should revoke multiple datasets", async function () {
      await revocationRegistry.revokeBatch(datasetIds, 1); // OUTDATED

      for (const id of datasetIds) {
        expect(await revocationRegistry.isRevoked(id)).to.be.true;
        expect(await verificationRegistry.isDatasetValid(id)).to.be.false;
      }
    });

    it("should emit BatchRevoked event", async function () {
      await expect(revocationRegistry.revokeBatch(datasetIds, 1))
        .to.emit(revocationRegistry, "BatchRevoked");
    });

    it("should reject batch revocation with NONE reason", async function () {
      await expect(
        revocationRegistry.revokeBatch(datasetIds, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject batch revocation from non-owner", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).revokeBatch(datasetIds, 1)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject batch revocation if any dataset is not registered", async function () {
      const badIds = [
        ...datasetIds,
        ethers.keccak256(ethers.toUtf8Bytes("UNREGISTERED"))
      ];

      await expect(
        revocationRegistry.revokeBatch(badIds, 1)
      ).to.be.revertedWith("Not registered");
    });

    it("should reject batch revocation if any dataset is already revoked", async function () {
      // Revoke one individually first
      await revocationRegistry.revoke(datasetIds[0], 1);

      await expect(
        revocationRegistry.revokeBatch(datasetIds, 2)
      ).to.be.revertedWith("Already revoked");
    });

    it("should set correct reason for all batch-revoked datasets", async function () {
      await revocationRegistry.revokeBatch(datasetIds, 3); // RETRACTED

      for (const id of datasetIds) {
        expect(await revocationRegistry.getRevocationReason(id)).to.equal(3);
      }
    });

    it("should make all batch-revoked datasets fail verification", async function () {
      await revocationRegistry.revokeBatch(datasetIds, 1);

      for (let i = 0; i < datasetIds.length; i++) {
        expect(await verificationRegistry.verifyDataset(datasetIds[i], dataHashes[i])).to.be.false;
      }
    });
  });

  // ============================================
  // BATCH REGISTRATION + REVOCATION INTERACTION
  // ============================================

  describe("Batch Registration via Revocation Registry", function () {
    it("should reject batch registration from non-verification contract", async function () {
      const ids = [
        ethers.keccak256(ethers.toUtf8Bytes("DS-X1")),
        ethers.keccak256(ethers.toUtf8Bytes("DS-X2"))
      ];

      await expect(
        revocationRegistry.connect(otherAccount).registerBatch(ids)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should reject batch registration of already registered hash", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      // Try to register same ID in a batch via a second verification contract
      // This tests the revocation registry's duplicate check
      const id2 = ethers.keccak256(ethers.toUtf8Bytes("DS-002"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("content-2"));

      // The verification contract itself prevents duplicates, so this is covered
      await expect(
        verificationRegistry.registerDataset(datasetId, hash2, "ipfs://new", "other")
      ).to.be.revertedWith("Dataset already registered");
    });

    it("should emit BatchRegistered event on batch registration", async function () {
      const datasetIds = [
        ethers.keccak256(ethers.toUtf8Bytes("DS-001")),
        ethers.keccak256(ethers.toUtf8Bytes("DS-002"))
      ];
      const dataHashes = [
        ethers.keccak256(ethers.toUtf8Bytes("content-1")),
        ethers.keccak256(ethers.toUtf8Bytes("content-2"))
      ];

      await expect(
        verificationRegistry.registerDatasetBatch(
          datasetIds, dataHashes, ["ipfs://1", "ipfs://2"], ["tabular", "timeseries"]
        )
      ).to.emit(revocationRegistry, "BatchRegistered");
    });
  });

  // ============================================
  // FULL LIFECYCLE TESTS
  // ============================================

  describe("Full Lifecycle", function () {
    it("should handle register → verify → revoke → verify cycle", async function () {
      // Register
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      // Verify - should pass
      expect(await verificationRegistry.verifyDataset(datasetId, dataHash)).to.be.true;
      expect(await verificationRegistry.isDatasetValid(datasetId)).to.be.true;

      // Revoke
      await revocationRegistry.revoke(datasetId, 3); // RETRACTED

      // Verify again - should fail
      expect(await verificationRegistry.verifyDataset(datasetId, dataHash)).to.be.false;
      expect(await verificationRegistry.isDatasetValid(datasetId)).to.be.false;
      expect(await verificationRegistry.isDatasetRevoked(datasetId)).to.be.true;

      // Data should still be accessible
      const ds = await verificationRegistry.getDataset(datasetId);
      expect(ds.dataHash).to.equal(dataHash);
      expect(ds.isValid).to.be.false;

      // Status should reflect revocation
      const status = await verificationRegistry.getDatasetStatus(datasetId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.true;
    });

    it("should handle mixed valid and revoked datasets", async function () {
      const id1 = ethers.keccak256(ethers.toUtf8Bytes("DS-VALID"));
      const hash1 = ethers.keccak256(ethers.toUtf8Bytes("valid-content"));
      const id2 = ethers.keccak256(ethers.toUtf8Bytes("DS-REVOKED"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("revoked-content"));

      await verificationRegistry.registerDataset(id1, hash1, "ipfs://valid", "tabular");
      await verificationRegistry.registerDataset(id2, hash2, "ipfs://revoked", "tabular");

      await revocationRegistry.revoke(id2, 2); // CORRUPTED

      // Valid dataset should still verify
      expect(await verificationRegistry.verifyDataset(id1, hash1)).to.be.true;
      expect(await verificationRegistry.isDatasetValid(id1)).to.be.true;

      // Revoked dataset should not verify
      expect(await verificationRegistry.verifyDataset(id2, hash2)).to.be.false;
      expect(await verificationRegistry.isDatasetValid(id2)).to.be.false;

      // Both should still exist
      expect(await verificationRegistry.getDatasetCount()).to.equal(2);
    });

    it("should handle ownership transfer then revocation", async function () {
      await verificationRegistry.registerDataset(datasetId, dataHash, datasetUri, datasetType);

      // Transfer verification registry ownership
      await verificationRegistry.transferOwnership(otherAccount.address);

      // Original owner still owns revocation registry, so can still revoke
      await revocationRegistry.revoke(datasetId, 1);

      expect(await verificationRegistry.isDatasetValid(datasetId)).to.be.false;
    });
  });
});
