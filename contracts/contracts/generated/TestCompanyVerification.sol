// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ============================================
// TEMPLATE: TestCompanyVerification
// Category: general
// Batch Operations: Yes
// Generated for: Test Company
// ============================================

interface IRevocationRegistry {
    function register(bytes32 hash) external;
    function registerBatch(bytes32[] calldata hashes) external;
    function isValid(bytes32 hash) external view returns (bool);
    function isRevoked(bytes32 hash) external view returns (bool);
    function getStatus(bytes32 hash) external view returns (bool exists, bool valid, uint8 reason);
}

contract TestCompanyVerification {

    // ============================================
    // STRUCTS
    // ============================================

    struct Document {
        bytes32 docHash;
        address issuer;
        uint256 issuedAt;
        string uri;
    }

    // ============================================
    // STATE
    // ============================================

    address public owner;
    address public admin;
    IRevocationRegistry public revocationRegistry;

    mapping(bytes32 => Document) private documents;
    bytes32[] private documentIds;

    // ============================================
    // EVENTS
    // ============================================

    event DocumentRegistered(
        bytes32 indexed docId,
        bytes32 indexed docHash,
        address indexed issuer,
        string uri,
        uint256 timestamp
    );
    event BatchDocumentsRegistered(
        bytes32[] docIds,
        bytes32[] docHashes,
        address indexed issuer,
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

    function registerDocument(
        bytes32 docId,
        bytes32 docHash,
        string calldata uri
    ) external onlyOwner {
        require(documents[docId].issuedAt == 0, "Document already registered");
        require(docHash != bytes32(0), "Invalid document hash");

        documents[docId] = Document({
            docHash: docHash,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            uri: uri
        });

        documentIds.push(docId);
        revocationRegistry.register(docId);

        emit DocumentRegistered(docId, docHash, msg.sender, uri, block.timestamp);
    }

    function registerDocumentBatch(
        bytes32[] calldata docIds,
        bytes32[] calldata docHashes,
        string[] calldata uris
    ) external onlyOwner {
        require(docIds.length == docHashes.length, "Array length mismatch");
        require(docIds.length == uris.length, "Array length mismatch");
        require(docIds.length > 0, "Empty arrays");

        for (uint256 i = 0; i < docIds.length; i++) {
            require(documents[docIds[i]].issuedAt == 0, "Document already registered");
            require(docHashes[i] != bytes32(0), "Invalid document hash");

            documents[docIds[i]] = Document({
                docHash: docHashes[i],
                issuer: msg.sender,
                issuedAt: block.timestamp,
                uri: uris[i]
            });

            documentIds.push(docIds[i]);
        }

        revocationRegistry.registerBatch(docIds);
        emit BatchDocumentsRegistered(docIds, docHashes, msg.sender, block.timestamp);
    }

    // ============================================
    // VERIFICATION
    // ============================================

    function verifyDocument(bytes32 docId, bytes32 docHash) external view returns (bool) {
        Document memory doc = documents[docId];
        
        if (doc.issuedAt == 0 || doc.docHash != docHash) {
            return false;
        }

        return revocationRegistry.isValid(docId);
    }

    function isDocumentValid(bytes32 docId) external view returns (bool) {
        if (documents[docId].issuedAt == 0) {
            return false;
        }
        return revocationRegistry.isValid(docId);
    }

    function isDocumentRevoked(bytes32 docId) external view returns (bool) {
        return revocationRegistry.isRevoked(docId);
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    function getDocument(bytes32 docId) external view returns (
        bytes32 docHash,
        address issuer,
        uint256 issuedAt,
        string memory uri,
        bool isValid
    ) {
        Document memory doc = documents[docId];
        require(doc.issuedAt != 0, "Document not found");

        return (
            doc.docHash,
            doc.issuer,
            doc.issuedAt,
            doc.uri,
            revocationRegistry.isValid(docId)
        );
    }

    function getDocumentStatus(bytes32 docId) external view returns (
        bool exists,
        bool valid,
        bool revoked,
        uint256 issuedAt
    ) {
        Document memory doc = documents[docId];
        exists = doc.issuedAt != 0;
        
        if (exists) {
            valid = revocationRegistry.isValid(docId);
            revoked = revocationRegistry.isRevoked(docId);
            issuedAt = doc.issuedAt;
        }
    }

    function getDocumentCount() external view returns (uint256) {
        return documentIds.length;
    }

    function getDocumentIdAtIndex(uint256 index) external view returns (bytes32) {
        require(index < documentIds.length, "Index out of bounds");
        return documentIds[index];
    }
}
