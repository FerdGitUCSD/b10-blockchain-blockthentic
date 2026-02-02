// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ============================================
// TEMPLATE: {{CONTRACT_NAME}}
// Category: {{CATEGORY}}
// Batch Operations: {{BATCH_ENABLED}}
// Generated for: {{ISSUER_NAME}}
// ============================================

interface IRevocationRegistry {
    function register(bytes32 hash) external;
    {{BATCH_INTERFACE}}
    function isValid(bytes32 hash) external view returns (bool);
    function isRevoked(bytes32 hash) external view returns (bool);
    function getStatus(bytes32 hash) external view returns (bool exists, bool valid, uint8 reason);
}

contract {{CONTRACT_NAME}} {

    // ============================================
    // STRUCTS
    // ============================================

    {{DOCUMENT_STRUCT}}

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

    {{EVENTS}}
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

    {{REGISTER_FUNCTION}}

    {{BATCH_REGISTER_FUNCTION}}

    // ============================================
    // VERIFICATION
    // ============================================

    {{VERIFY_FUNCTION}}

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

    {{GET_DOCUMENT_FUNCTION}}

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
