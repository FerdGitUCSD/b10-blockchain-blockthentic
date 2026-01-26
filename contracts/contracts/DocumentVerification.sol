// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRevocationRegistry {
    function register(bytes32 hash) external;
    function registerBatch(bytes32[] calldata hashes) external;
    function isValid(bytes32 hash) external view returns (bool);
    function isRevoked(bytes32 hash) external view returns (bool);
    function getStatus(bytes32 hash) external view returns (bool exists, bool valid, uint8 reason);
}

contract DocumentVerification {

    address public owner;
    IRevocationRegistry public revocationRegistry;

    event DocumentVerified(bytes32 indexed hash, uint256 timestamp);
    event BatchVerified(bytes32[] hashes, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _revocationRegistry) {
        require(_revocationRegistry != address(0), "Invalid registry address");
        owner = msg.sender;
        revocationRegistry = IRevocationRegistry(_revocationRegistry);
    }

    function verifyDocument(bytes32 hash) external onlyOwner {
        revocationRegistry.register(hash);
        emit DocumentVerified(hash, block.timestamp);
    }

    function verifyDocumentBatch(bytes32[] calldata hashes) external onlyOwner {
        revocationRegistry.registerBatch(hashes);
        emit BatchVerified(hashes, block.timestamp);
    }

    function isDocumentValid(bytes32 hash) external view returns (bool) {
        return revocationRegistry.isValid(hash);
    }
}