// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// ============================================
// TEMPLATE: DatasetTestVerification
// Category: general
// Batch Operations: Yes
// Generated for: Dataset Test
// ============================================


interface IRevocationRegistry {
    function register(bytes32 hash) external;
    function registerBatch(bytes32[] calldata hashes) external;
    function isValid(bytes32 hash) external view returns (bool);
    function isRevoked(bytes32 hash) external view returns (bool);
    function getStatus(bytes32 hash) external view returns (bool exists, bool valid, uint8 reason);
}


contract DatasetTestVerification {


    // ============================================
    // STRUCTS
    // ============================================


    struct Dataset {
        bytes32 dataHash;
        address issuer;
        uint256 registeredAt;
        string uri;
        string datasetType;
    }


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


    event DatasetRegistered(
        bytes32 indexed datasetId,
        bytes32 indexed dataHash,
        address indexed issuer,
        string uri,
        string datasetType,
        uint256 timestamp
    );
    event BatchDatasetsRegistered(
        bytes32[] datasetIds,
        bytes32[] dataHashes,
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


    function registerDataset(
        bytes32 datasetId,
        bytes32 dataHash,
        string calldata uri,
        string calldata datasetType
    ) external onlyOwner {
        require(datasets[datasetId].registeredAt == 0, "Dataset already registered");
        require(dataHash != bytes32(0), "Invalid data hash");

        datasets[datasetId] = Dataset({
            dataHash: dataHash,
            issuer: msg.sender,
            registeredAt: block.timestamp,
            uri: uri,
            datasetType: datasetType
        });

        datasetIds.push(datasetId);
        revocationRegistry.register(datasetId);

        emit DatasetRegistered(datasetId, dataHash, msg.sender, uri, datasetType, block.timestamp);
    }


    function registerDatasetBatch(
        bytes32[] calldata _datasetIds,
        bytes32[] calldata dataHashes,
        string[] calldata uris,
        string[] calldata datasetTypes
    ) external onlyOwner {
        require(_datasetIds.length == dataHashes.length, "Array length mismatch");
        require(_datasetIds.length == uris.length, "Array length mismatch");
        require(_datasetIds.length == datasetTypes.length, "Array length mismatch");
        require(_datasetIds.length > 0, "Empty arrays");

        for (uint256 i = 0; i < _datasetIds.length; i++) {
            require(datasets[_datasetIds[i]].registeredAt == 0, "Dataset already registered");
            require(dataHashes[i] != bytes32(0), "Invalid data hash");

            datasets[_datasetIds[i]] = Dataset({
                dataHash: dataHashes[i],
                issuer: msg.sender,
                registeredAt: block.timestamp,
                uri: uris[i],
                datasetType: datasetTypes[i]
            });

            datasetIds.push(_datasetIds[i]);
        }

        revocationRegistry.registerBatch(_datasetIds);
        emit BatchDatasetsRegistered(_datasetIds, dataHashes, msg.sender, block.timestamp);
    }


    // ============================================
    // VERIFICATION
    // ============================================


    function verifyDataset(bytes32 datasetId, bytes32 dataHash) external view returns (bool) {
        Dataset memory ds = datasets[datasetId];
        
        if (ds.registeredAt == 0 || ds.dataHash != dataHash) {
            return false;
        }

        return revocationRegistry.isValid(datasetId);
    }


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


    function getDataset(bytes32 datasetId) external view returns (
        bytes32 dataHash,
        address issuer,
        uint256 registeredAt,
        string memory uri,
        string memory datasetType,
        bool isValid
    ) {
        Dataset memory ds = datasets[datasetId];
        require(ds.registeredAt != 0, "Dataset not found");

        return (
            ds.dataHash,
            ds.issuer,
            ds.registeredAt,
            ds.uri,
            ds.datasetType,
            revocationRegistry.isValid(datasetId)
        );
    }


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