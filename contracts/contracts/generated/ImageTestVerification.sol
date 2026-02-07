// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ============================================
// TEMPLATE: ImageTestVerification
// Category: general
// Batch Operations: Yes
// Generated for: Image Company
// ============================================

interface IRevocationRegistry {
    function register(bytes32 hash) external;
    function registerBatch(bytes32[] calldata hashes) external;
    function isValid(bytes32 hash) external view returns (bool);
    function isRevoked(bytes32 hash) external view returns (bool);
    function getStatus(bytes32 hash) external view returns (bool exists, bool valid, uint8 reason);
}

contract ImageTestVerification {

    // ============================================
    // STRUCTS
    // ============================================

    struct Image {
        bytes32 imageHash;
        bytes32 metadataHash;
        address registrant;
        uint256 registeredAt;
        string uri;
        string imageType;
        bytes32 perceptualHash;
    }

    // ============================================
    // STATE
    // ============================================

    address public owner;
    address public admin;
    IRevocationRegistry public revocationRegistry;

    mapping(bytes32 => Image) private images;
    bytes32[] private imageIds;

    // ============================================
    // EVENTS
    // ============================================

    event ImageRegistered(
        bytes32 indexed imageId,
        bytes32 indexed imageHash,
        address indexed registrant,
        string uri,
        string imageType,
        uint256 timestamp
    );
    event BatchImagesRegistered(
        bytes32[] imageIds,
        bytes32[] imageHashes,
        address indexed registrant,
        uint256 timestamp
    );
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AdminUpdated(address indexed previousAdmin, address indexed newAdmin);

    // ============================================
    // MODIFIERS
    // ============================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || msg.sender == admin, "Not authorized");
        _;
    }

    // ============================================
    // CONSTRUCTOR
    // ============================================

    constructor(address _revocationRegistry, address _admin) {
        require(_revocationRegistry != address(0), "Invalid registry address");
        require(_admin != address(0), "Invalid admin address");
        
        owner = msg.sender;
        admin = _admin;
        revocationRegistry = IRevocationRegistry(_revocationRegistry);
    }

    // ============================================
    // ADMIN FUNCTIONS
    // ============================================

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        address previousOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }

    function updateAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        address previousAdmin = admin;
        admin = newAdmin;
        emit AdminUpdated(previousAdmin, newAdmin);
    }

    // ============================================
    // REGISTRATION
    // ============================================

    function registerImage(
        bytes32 imageId,
        bytes32 imageHash,
        bytes32 metadataHash,
        string calldata uri,
        string calldata imageType,
        bytes32 perceptualHash
    ) external onlyOwner {
        require(images[imageId].registeredAt == 0, "Image already registered");
        require(imageHash != bytes32(0), "Invalid image hash");

        images[imageId] = Image({
            imageHash: imageHash,
            metadataHash: metadataHash,
            registrant: msg.sender,
            registeredAt: block.timestamp,
            uri: uri,
            imageType: imageType,
            perceptualHash: perceptualHash
        });

        imageIds.push(imageId);
        revocationRegistry.register(imageId);

        emit ImageRegistered(imageId, imageHash, msg.sender, uri, imageType, block.timestamp);
    }

    function registerImageBatch(
        bytes32[] calldata _imageIds,
        bytes32[] calldata imageHashes,
        bytes32[] calldata metadataHashes,
        string[] calldata uris,
        string[] calldata imageTypes,
        bytes32[] calldata perceptualHashes
    ) external onlyOwner {
        require(_imageIds.length == imageHashes.length, "Array length mismatch");
        require(_imageIds.length == metadataHashes.length, "Array length mismatch");
        require(_imageIds.length == uris.length, "Array length mismatch");
        require(_imageIds.length == imageTypes.length, "Array length mismatch");
        require(_imageIds.length == perceptualHashes.length, "Array length mismatch");
        require(_imageIds.length > 0, "Empty arrays");

        for (uint256 i = 0; i < _imageIds.length; i++) {
            require(images[_imageIds[i]].registeredAt == 0, "Image already registered");
            require(imageHashes[i] != bytes32(0), "Invalid image hash");

            images[_imageIds[i]] = Image({
                imageHash: imageHashes[i],
                metadataHash: metadataHashes[i],
                registrant: msg.sender,
                registeredAt: block.timestamp,
                uri: uris[i],
                imageType: imageTypes[i],
                perceptualHash: perceptualHashes[i]
            });

            imageIds.push(_imageIds[i]);
        }

        revocationRegistry.registerBatch(_imageIds);
        emit BatchImagesRegistered(_imageIds, imageHashes, msg.sender, block.timestamp);
    }

    // ============================================
    // VERIFICATION
    // ============================================

    function verifyImage(bytes32 imageId, bytes32 imageHash) external view returns (bool) {
        Image memory img = images[imageId];
        
        if (img.registeredAt == 0 || img.imageHash != imageHash) {
            return false;
        }

        return revocationRegistry.isValid(imageId);
    }

    function isImageValid(bytes32 imageId) external view returns (bool) {
        if (images[imageId].registeredAt == 0) {
            return false;
        }
        return revocationRegistry.isValid(imageId);
    }

    function isImageRevoked(bytes32 imageId) external view returns (bool) {
        return revocationRegistry.isRevoked(imageId);
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    function getImage(bytes32 imageId) external view returns (
        bytes32 imageHash,
        bytes32 metadataHash,
        address registrant,
        uint256 registeredAt,
        string memory uri,
        string memory imageType
    ) {
        Image memory img = images[imageId];
        require(img.registeredAt != 0, "Image not found");

        return (
            img.imageHash,
            img.metadataHash,
            img.registrant,
            img.registeredAt,
            img.uri,
            img.imageType
        );
    }

    function getImageExtended(bytes32 imageId) external view returns (
        bytes32 perceptualHash,
        bool isValid
    ) {
        Image memory img = images[imageId];
        require(img.registeredAt != 0, "Image not found");

        return (
            img.perceptualHash,
            revocationRegistry.isValid(imageId)
        );
    }

    function getImageStatus(bytes32 imageId) external view returns (
        bool exists,
        bool valid,
        bool revoked,
        uint256 registeredAt
    ) {
        Image memory img = images[imageId];
        exists = img.registeredAt != 0;
        
        if (exists) {
            valid = revocationRegistry.isValid(imageId);
            revoked = revocationRegistry.isRevoked(imageId);
            registeredAt = img.registeredAt;
        }
    }

    function getImageCount() external view returns (uint256) {
        return imageIds.length;
    }

    function getImageIdAtIndex(uint256 index) external view returns (bytes32) {
        require(index < imageIds.length, "Index out of bounds");
        return imageIds[index];
    }
}
