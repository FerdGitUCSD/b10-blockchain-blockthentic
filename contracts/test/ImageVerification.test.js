const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ImageVerificationRegistry + RevocationRegistry", function () {
  let revocationRegistry;
  let verificationRegistry;
  let owner;
  let admin;
  let otherAccount;

  // Sample image data
  const imageId = ethers.keccak256(ethers.toUtf8Bytes("IMG-001"));
  const imageHash = ethers.keccak256(ethers.toUtf8Bytes("image file content hash"));
  const metadataHash = ethers.keccak256(ethers.toUtf8Bytes("exif metadata hash"));
  const imageUri = "ipfs://QmSampleImageHash123";
  const imageType = "photograph";
  const perceptualHash = ethers.keccak256(ethers.toUtf8Bytes("phash-content"));

  beforeEach(async function () {
    [owner, admin, otherAccount] = await ethers.getSigners();

    // Deploy RevocationRegistry first
    const RevocationRegistry = await ethers.getContractFactory("ImageTestRevocation");
    revocationRegistry = await RevocationRegistry.deploy();
    await revocationRegistry.waitForDeployment();

    // Deploy ImageVerificationRegistry with revocation address and admin
    const VerificationRegistry = await ethers.getContractFactory("ImageTestVerification");
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
      const VerificationRegistry = await ethers.getContractFactory("ImageTestVerification");
      await expect(
        VerificationRegistry.deploy(ethers.ZeroAddress, admin.address)
      ).to.be.revertedWith("Invalid registry address");
    });

    it("should reject zero address for admin", async function () {
      const VerificationRegistry = await ethers.getContractFactory("ImageTestVerification");
      await expect(
        VerificationRegistry.deploy(await revocationRegistry.getAddress(), ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid admin address");
    });
  });

  // ============================================
  // REGISTRATION TESTS
  // ============================================

  describe("Image Registration", function () {
    it("should register an image successfully", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      const img = await verificationRegistry.getImage(imageId);
      expect(img.imageHash).to.equal(imageHash);
      expect(img.metadataHash).to.equal(metadataHash);
      expect(img.registrant).to.equal(owner.address);
      expect(img.uri).to.equal(imageUri);
      expect(img.imageType).to.equal(imageType);
    });

    it("should store extended data correctly", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      const ext = await verificationRegistry.getImageExtended(imageId);
      expect(ext.perceptualHash).to.equal(perceptualHash);
      expect(ext.isValid).to.be.true;
    });

    it("should emit ImageRegistered event", async function () {
      await expect(
        verificationRegistry.registerImage(
          imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
        )
      ).to.emit(verificationRegistry, "ImageRegistered");
    });

    it("should register image in revocation registry", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      expect(await revocationRegistry.isRegistered(imageId)).to.be.true;
    });

    it("should reject duplicate image registration", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      await expect(
        verificationRegistry.registerImage(
          imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
        )
      ).to.be.revertedWith("Image already registered");
    });

    it("should reject registration from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerImage(
          imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
        )
      ).to.be.revertedWith("Not owner");
    });

    it("should reject empty image hash", async function () {
      await expect(
        verificationRegistry.registerImage(
          imageId, ethers.ZeroHash, metadataHash, imageUri, imageType, perceptualHash
        )
      ).to.be.revertedWith("Invalid image hash");
    });

    it("should accept zero metadataHash (optional field)", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, ethers.ZeroHash, imageUri, imageType, perceptualHash
      );

      const img = await verificationRegistry.getImage(imageId);
      expect(img.metadataHash).to.equal(ethers.ZeroHash);
    });

    it("should accept zero perceptualHash (optional field)", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, ethers.ZeroHash
      );

      const ext = await verificationRegistry.getImageExtended(imageId);
      expect(ext.perceptualHash).to.equal(ethers.ZeroHash);
    });

    it("should increment image count", async function () {
      expect(await verificationRegistry.getImageCount()).to.equal(0);

      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      expect(await verificationRegistry.getImageCount()).to.equal(1);
    });

    it("should store image ID at correct index", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      expect(await verificationRegistry.getImageIdAtIndex(0)).to.equal(imageId);
    });
  });

  // ============================================
  // BATCH REGISTRATION TESTS
  // ============================================

  describe("Batch Image Registration", function () {
    const imageIds = [
      ethers.keccak256(ethers.toUtf8Bytes("IMG-001")),
      ethers.keccak256(ethers.toUtf8Bytes("IMG-002")),
      ethers.keccak256(ethers.toUtf8Bytes("IMG-003"))
    ];
    const imageHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("image-content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("image-content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("image-content-3"))
    ];
    const metadataHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("meta-1")),
      ethers.keccak256(ethers.toUtf8Bytes("meta-2")),
      ethers.keccak256(ethers.toUtf8Bytes("meta-3"))
    ];
    const uris = ["ipfs://img1", "ipfs://img2", "ipfs://img3"];
    const imageTypes = ["photograph", "screenshot", "illustration"];
    const perceptualHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("phash-1")),
      ethers.keccak256(ethers.toUtf8Bytes("phash-2")),
      ethers.keccak256(ethers.toUtf8Bytes("phash-3"))
    ];

    it("should register multiple images", async function () {
      await verificationRegistry.registerImageBatch(
        imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
      );

      expect(await verificationRegistry.getImageCount()).to.equal(3);

      for (let i = 0; i < imageIds.length; i++) {
        const img = await verificationRegistry.getImage(imageIds[i]);
        expect(img.imageHash).to.equal(imageHashes[i]);
        expect(img.uri).to.equal(uris[i]);
        expect(img.imageType).to.equal(imageTypes[i]);
      }
    });

    it("should emit BatchImagesRegistered event", async function () {
      await expect(
        verificationRegistry.registerImageBatch(
          imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
        )
      ).to.emit(verificationRegistry, "BatchImagesRegistered");
    });

    it("should register all images in revocation registry", async function () {
      await verificationRegistry.registerImageBatch(
        imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
      );

      for (const id of imageIds) {
        expect(await revocationRegistry.isRegistered(id)).to.be.true;
      }
    });

    it("should reject mismatched array lengths", async function () {
      await expect(
        verificationRegistry.registerImageBatch(
          imageIds, imageHashes.slice(0, 2), metadataHashes, uris, imageTypes, perceptualHashes
        )
      ).to.be.revertedWith("Array length mismatch");
    });

    it("should reject empty arrays", async function () {
      await expect(
        verificationRegistry.registerImageBatch([], [], [], [], [], [])
      ).to.be.revertedWith("Empty arrays");
    });

    it("should reject batch from non-owner", async function () {
      await expect(
        verificationRegistry.connect(otherAccount).registerImageBatch(
          imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
        )
      ).to.be.revertedWith("Not owner");
    });

    it("should reject if any image already exists", async function () {
      await verificationRegistry.registerImage(
        imageIds[0], imageHashes[0], metadataHashes[0], uris[0], imageTypes[0], perceptualHashes[0]
      );

      await expect(
        verificationRegistry.registerImageBatch(
          imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
        )
      ).to.be.revertedWith("Image already registered");
    });
  });

  // ============================================
  // VERIFICATION TESTS
  // ============================================

  describe("Image Verification", function () {
    beforeEach(async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );
    });

    it("should verify valid image with correct hash", async function () {
      expect(await verificationRegistry.verifyImage(imageId, imageHash)).to.be.true;
    });

    it("should reject verification with wrong hash", async function () {
      const wrongHash = ethers.keccak256(ethers.toUtf8Bytes("wrong content"));
      expect(await verificationRegistry.verifyImage(imageId, wrongHash)).to.be.false;
    });

    it("should reject verification of non-existent image", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));
      expect(await verificationRegistry.verifyImage(fakeId, imageHash)).to.be.false;
    });

    it("should return true for isImageValid", async function () {
      expect(await verificationRegistry.isImageValid(imageId)).to.be.true;
    });

    it("should return false for isImageRevoked", async function () {
      expect(await verificationRegistry.isImageRevoked(imageId)).to.be.false;
    });
  });

  // ============================================
  // REVOCATION INTEGRATION TESTS
  // ============================================

  describe("Revocation Integration", function () {
    beforeEach(async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );
    });

    it("should mark image as invalid after revocation", async function () {
      // Revoke the image (reason 1 = COPYRIGHT)
      await revocationRegistry.revoke(imageId, 1);

      expect(await verificationRegistry.isImageValid(imageId)).to.be.false;
      expect(await verificationRegistry.verifyImage(imageId, imageHash)).to.be.false;
    });

    it("should return revoked status from getImageExtended", async function () {
      await revocationRegistry.revoke(imageId, 1);

      const ext = await verificationRegistry.getImageExtended(imageId);
      expect(ext.isValid).to.be.false;
    });

    it("should return true for isImageRevoked after revocation", async function () {
      await revocationRegistry.revoke(imageId, 1);

      expect(await verificationRegistry.isImageRevoked(imageId)).to.be.true;
    });

    it("should return correct status from getImageStatus", async function () {
      // Before revocation
      let status = await verificationRegistry.getImageStatus(imageId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;
      expect(status.revoked).to.be.false;

      // After revocation
      await revocationRegistry.revoke(imageId, 1);

      status = await verificationRegistry.getImageStatus(imageId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.true;
    });

    it("should preserve image data after revocation", async function () {
      await revocationRegistry.revoke(imageId, 1);

      const img = await verificationRegistry.getImage(imageId);
      expect(img.imageHash).to.equal(imageHash);
      expect(img.metadataHash).to.equal(metadataHash);
      expect(img.registrant).to.equal(owner.address);
      expect(img.uri).to.equal(imageUri);
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

    it("should allow new owner to register images after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await verificationRegistry.connect(otherAccount).registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      const img = await verificationRegistry.getImage(imageId);
      expect(img.registrant).to.equal(otherAccount.address);
    });

    it("should reject old owner from registering after transfer", async function () {
      await verificationRegistry.transferOwnership(otherAccount.address);

      await expect(
        verificationRegistry.registerImage(
          imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
        )
      ).to.be.revertedWith("Not owner");
    });
  });

  // ============================================
  // VIEW FUNCTION TESTS
  // ============================================

  describe("View Functions", function () {
    beforeEach(async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );
    });

    it("should return correct image data from getImage", async function () {
      const img = await verificationRegistry.getImage(imageId);

      expect(img.imageHash).to.equal(imageHash);
      expect(img.metadataHash).to.equal(metadataHash);
      expect(img.registrant).to.equal(owner.address);
      expect(img.uri).to.equal(imageUri);
      expect(img.imageType).to.equal(imageType);
      expect(img.registeredAt).to.be.greaterThan(0);
    });

    it("should return correct extended data from getImageExtended", async function () {
      const ext = await verificationRegistry.getImageExtended(imageId);

      expect(ext.perceptualHash).to.equal(perceptualHash);
      expect(ext.isValid).to.be.true;
    });

    it("should revert getImage for non-existent image", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      await expect(verificationRegistry.getImage(fakeId))
        .to.be.revertedWith("Image not found");
    });

    it("should revert getImageExtended for non-existent image", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      await expect(verificationRegistry.getImageExtended(fakeId))
        .to.be.revertedWith("Image not found");
    });

    it("should return correct status for non-existent image", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      const status = await verificationRegistry.getImageStatus(fakeId);
      expect(status.exists).to.be.false;
      expect(status.valid).to.be.false;
      expect(status.revoked).to.be.false;
      expect(status.registeredAt).to.equal(0);
    });

    it("should return false for isImageValid on non-existent image", async function () {
      const fakeId = ethers.keccak256(ethers.toUtf8Bytes("FAKE-001"));

      expect(await verificationRegistry.isImageValid(fakeId)).to.be.false;
    });

    it("should revert getImageIdAtIndex for out of bounds", async function () {
      await expect(verificationRegistry.getImageIdAtIndex(99))
        .to.be.revertedWith("Index out of bounds");
    });
  });

  // ============================================
  // REVOCATION REGISTRY DIRECT TESTS
  // ============================================

  describe("RevocationRegistry Direct", function () {
    it("should reject registration from non-verification contract", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).register(imageId)
      ).to.be.revertedWith("Not verification contract");
    });

    it("should reject setting verification contract twice", async function () {
      await expect(
        revocationRegistry.setVerificationContract(otherAccount.address)
      ).to.be.revertedWith("Verification contract already set");
    });

    it("should only allow owner to revoke", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      await expect(
        revocationRegistry.connect(otherAccount).revoke(imageId, 1)
      ).to.be.revertedWith("Not owner");
    });

    it("should reject revocation with NONE reason", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      await expect(
        revocationRegistry.revoke(imageId, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject revoking non-registered image", async function () {
      await expect(
        revocationRegistry.revoke(imageId, 1)
      ).to.be.revertedWith("Not registered");
    });

    it("should reject revoking already revoked image", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );
      await revocationRegistry.revoke(imageId, 1);

      await expect(
        revocationRegistry.revoke(imageId, 2)
      ).to.be.revertedWith("Already revoked");
    });

    it("should return correct revocation reason", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );
      await revocationRegistry.revoke(imageId, 2); // MISATTRIBUTION

      expect(await revocationRegistry.getRevocationReason(imageId)).to.equal(2);
    });

    it("should return full status from getStatus", async function () {
      await verificationRegistry.registerImage(
        imageId, imageHash, metadataHash, imageUri, imageType, perceptualHash
      );

      let status = await revocationRegistry.getStatus(imageId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.true;

      await revocationRegistry.revoke(imageId, 1);

      status = await revocationRegistry.getStatus(imageId);
      expect(status.exists).to.be.true;
      expect(status.valid).to.be.false;
    });

    it("should validate all image-specific revocation reasons", async function () {
      // Image reasons: NONE=0, COPYRIGHT=1, MISATTRIBUTION=2, ALTERED=3, OWNER_REQUEST=4, OTHER=5
      const reasons = [
        { name: "COPYRIGHT", value: 1 },
        { name: "MISATTRIBUTION", value: 2 },
        { name: "ALTERED", value: 3 },
        { name: "OWNER_REQUEST", value: 4 },
        { name: "OTHER", value: 5 },
      ];

      for (const { name, value } of reasons) {
        const id = ethers.keccak256(ethers.toUtf8Bytes(`reason-test-${name}`));
        const hash = ethers.keccak256(ethers.toUtf8Bytes(`hash-${name}`));

        await verificationRegistry.registerImage(
          id, hash, metadataHash, imageUri, imageType, perceptualHash
        );
        await revocationRegistry.revoke(id, value);

        expect(await revocationRegistry.getRevocationReason(id)).to.equal(value);
      }
    });
  });

  // ============================================
  // BATCH REVOCATION TESTS
  // ============================================

  describe("Batch Revocation", function () {
    const imageIds = [
      ethers.keccak256(ethers.toUtf8Bytes("IMG-001")),
      ethers.keccak256(ethers.toUtf8Bytes("IMG-002")),
      ethers.keccak256(ethers.toUtf8Bytes("IMG-003"))
    ];
    const imageHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("image-content-1")),
      ethers.keccak256(ethers.toUtf8Bytes("image-content-2")),
      ethers.keccak256(ethers.toUtf8Bytes("image-content-3"))
    ];
    const metadataHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("meta-1")),
      ethers.keccak256(ethers.toUtf8Bytes("meta-2")),
      ethers.keccak256(ethers.toUtf8Bytes("meta-3"))
    ];
    const uris = ["ipfs://img1", "ipfs://img2", "ipfs://img3"];
    const imageTypes = ["photograph", "screenshot", "illustration"];
    const perceptualHashes = [
      ethers.keccak256(ethers.toUtf8Bytes("phash-1")),
      ethers.keccak256(ethers.toUtf8Bytes("phash-2")),
      ethers.keccak256(ethers.toUtf8Bytes("phash-3"))
    ];

    beforeEach(async function () {
      await verificationRegistry.registerImageBatch(
        imageIds, imageHashes, metadataHashes, uris, imageTypes, perceptualHashes
      );
    });

    it("should revoke multiple images", async function () {
      await revocationRegistry.revokeBatch(imageIds, 1); // COPYRIGHT

      for (const id of imageIds) {
        expect(await revocationRegistry.isRevoked(id)).to.be.true;
        expect(await verificationRegistry.isImageValid(id)).to.be.false;
      }
    });

    it("should emit BatchRevoked event", async function () {
      await expect(revocationRegistry.revokeBatch(imageIds, 1))
        .to.emit(revocationRegistry, "BatchRevoked");
    });

    it("should reject batch revocation with NONE reason", async function () {
      await expect(
        revocationRegistry.revokeBatch(imageIds, 0)
      ).to.be.revertedWith("Must provide reason");
    });

    it("should reject batch revocation from non-owner", async function () {
      await expect(
        revocationRegistry.connect(otherAccount).revokeBatch(imageIds, 1)
      ).to.be.revertedWith("Not owner");
    });
  });
});