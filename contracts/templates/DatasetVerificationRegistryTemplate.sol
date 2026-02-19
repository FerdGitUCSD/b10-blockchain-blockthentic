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


    {{DATASET_STRUCT}}


    // ============================================
    // STATE
    // ============================================


    address public owner;
    address public admin;
    IRevocationRegistry public revocationRegistry;


    mapping(bytes32 => Dataset) private datasets;
    bytes32[] private datasetIds;


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


    function isDatasetValid(bytes32 datasetId) external view returns (bool) {
        if (datasets[datasetId].registeredAt == 0) {
            return false;
        }
        return revocationRegistry.isValid(datasetId);
    }


    function isDatasetRevoked(bytes32 datasetId) external view returns (bool) {
        return revocationRegistry.isRevoked(datasetId);
    }


    // ============================================
    // VIEW FUNCTIONS
    // ============================================


    {{GET_DATASET_FUNCTION}}


    function getDatasetStatus(bytes32 datasetId) external view returns (
        bool exists,
        bool valid,
        bool revoked,
        uint256 registeredAt
    ) {
        Dataset memory ds = datasets[datasetId];
        exists = ds.registeredAt != 0;
        
        if (exists) {
            valid = revocationRegistry.isValid(datasetId);
            revoked = revocationRegistry.isRevoked(datasetId);
            registeredAt = ds.registeredAt;
        }
    }


    function getDatasetCount() external view returns (uint256) {
        return datasetIds.length;
    }


    function getDatasetIdAtIndex(uint256 index) external view returns (bytes32) {
        require(index < datasetIds.length, "Index out of bounds");
        return datasetIds[index];
    }
}