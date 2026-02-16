// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DatasetVerificationRegistry {
    struct Dataset {
        bytes32 dataHash;
        address issuer;
        uint256 registeredAt;
        string uri;
    }

    address public owner;
    mapping(bytes32 => Dataset) private datasets;
    bytes32[] private datasetIds;

    event DatasetRegistered(bytes32 indexed id, bytes32 indexed dataHash, address indexed issuer, uint256 timestamp);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        address prev = owner;
        owner = newOwner;
        emit OwnershipTransferred(prev, newOwner);
    }

    function registerDataset(bytes32 id, bytes32 dataHash, string calldata uri) external onlyOwner {
        require(datasets[id].registeredAt == 0, "Already registered");
        require(dataHash != bytes32(0), "Invalid hash");
        datasets[id] = Dataset({
            dataHash: dataHash,
            issuer: msg.sender,
            registeredAt: block.timestamp,
            uri: uri
        });
        datasetIds.push(id);
        emit DatasetRegistered(id, dataHash, msg.sender, block.timestamp);
    }

    function registerDatasetBatch(
        bytes32[] calldata ids,
        bytes32[] calldata hashes,
        string[] calldata uris
    ) external onlyOwner {
        require(ids.length == hashes.length && ids.length == uris.length && ids.length > 0, "Bad lengths");
        for (uint256 i = 0; i < ids.length; i++) {
            require(datasets[ids[i]].registeredAt == 0, "Already registered");
            require(hashes[i] != bytes32(0), "Invalid hash");
            datasets[ids[i]] = Dataset({
                dataHash: hashes[i],
                issuer: msg.sender,
                registeredAt: block.timestamp,
                uri: uris[i]
            });
            datasetIds.push(ids[i]);
            emit DatasetRegistered(ids[i], hashes[i], msg.sender, block.timestamp);
        }
    }

    function verifyDataset(bytes32 id, bytes32 dataHash) external view returns (bool) {
        Dataset memory d = datasets[id];
        return d.registeredAt != 0 && d.dataHash == dataHash;
    }

    function getDataset(bytes32 id) external view returns (bytes32 dataHash, address issuer, uint256 registeredAt, string memory uri) {
        Dataset memory d = datasets[id];
        require(d.registeredAt != 0, "Not found");
        return (d.dataHash, d.issuer, d.registeredAt, d.uri);
    }

    function isRegistered(bytes32 id) external view returns (bool) {
        return datasets[id].registeredAt != 0;
    }

    function getDatasetCount() external view returns (uint256) {
        return datasetIds.length;
    }

    function getDatasetIdAtIndex(uint256 index) external view returns (bytes32) {
        require(index < datasetIds.length, "Out of bounds");
        return datasetIds[index];
    }
}
