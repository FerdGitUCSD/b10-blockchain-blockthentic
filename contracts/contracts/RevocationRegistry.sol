// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RevocationRegistry {

    // ============================================
    // ENUMS
    // ============================================

    enum RevocationReason {
        NONE,
        FRAUD,
        EXPIRED,
        SUPERSEDED,
        OWNER_REQUEST,
        OTHER
    }

    // ============================================
    // STATE
    // ============================================

    address public owner;
    address public verificationContract;

    mapping(bytes32 => bool) private registered;
    mapping(bytes32 => bool) private revoked;
    mapping(bytes32 => RevocationReason) private revocationReasons;

    // ============================================
    // EVENTS
    // ============================================

    event Registered(bytes32 indexed hash, uint256 timestamp);
    event Revoked(bytes32 indexed hash, RevocationReason reason, uint256 timestamp);
    event BatchRegistered(bytes32[] hashes, uint256 timestamp);
    event BatchRevoked(bytes32[] hashes, RevocationReason reason, uint256 timestamp);
    event VerificationContractSet(address indexed contractAddress);

    // ============================================
    // MODIFIERS
    // ============================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyVerificationContract() {
        require(msg.sender == verificationContract, "Not verification contract");
        _;
    }

    // ============================================
    // CONSTRUCTOR
    // ============================================

    constructor() {
        owner = msg.sender;
    }

    // ============================================
    // CONFIGURATION
    // ============================================

    function setVerificationContract(address _verificationContract) external onlyOwner {
        require(verificationContract == address(0), "Verification contract already set");
        require(_verificationContract != address(0), "Invalid address");
        verificationContract = _verificationContract;
        emit VerificationContractSet(_verificationContract);
    }

    // ============================================
    // REGISTRATION (called by verification contract)
    // ============================================

    function register(bytes32 hash) external onlyVerificationContract {
        require(!registered[hash], "Already registered");
        registered[hash] = true;
        emit Registered(hash, block.timestamp);
    }

    function registerBatch(bytes32[] calldata hashes) external onlyVerificationContract {
        for (uint256 i = 0; i < hashes.length; i++) {
            require(!registered[hashes[i]], "Already registered");
            registered[hashes[i]] = true;
        }
        emit BatchRegistered(hashes, block.timestamp);
    }

    // ============================================
    // REVOCATION (called by owner)
    // ============================================

    function revoke(bytes32 hash, RevocationReason reason) external onlyOwner {
        require(registered[hash], "Not registered");
        require(!revoked[hash], "Already revoked");
        require(reason != RevocationReason.NONE, "Must provide reason");

        revoked[hash] = true;
        revocationReasons[hash] = reason;
        emit Revoked(hash, reason, block.timestamp);
    }

    function revokeBatch(bytes32[] calldata hashes, RevocationReason reason) external onlyOwner {
        require(reason != RevocationReason.NONE, "Must provide reason");

        for (uint256 i = 0; i < hashes.length; i++) {
            require(registered[hashes[i]], "Not registered");
            require(!revoked[hashes[i]], "Already revoked");

            revoked[hashes[i]] = true;
            revocationReasons[hashes[i]] = reason;
        }
        emit BatchRevoked(hashes, reason, block.timestamp);
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    function isRegistered(bytes32 hash) external view returns (bool) {
        return registered[hash];
    }

    function isRevoked(bytes32 hash) external view returns (bool) {
        return revoked[hash];
    }

    function isValid(bytes32 hash) external view returns (bool) {
        return registered[hash] && !revoked[hash];
    }

    function getRevocationReason(bytes32 hash) external view returns (RevocationReason) {
        return revocationReasons[hash];
    }

    function getStatus(bytes32 hash) external view returns (
        bool exists,
        bool valid,
        RevocationReason reason
    ) {
        exists = registered[hash];
        valid = exists && !revoked[hash];
        reason = revocationReasons[hash];
    }
}