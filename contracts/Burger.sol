//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Burger is ERC721URIStorage, ERC721Enumerable, Ownable, Pausable {
    uint256 price = 0.000001 ether;
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    Counters.Counter private _tokenIds;
    address VERIFIED_ADDRESS = 0xc09eAC15f9Ba6462e8E4612af7C431E1cfe08b87;
    bool public whitelistActive = true;
    bytes32 private root =
        0x786cc6a5c4201b7672450409f6a717d0e33e88369e82ed52b453ec0cfcc4b23d;

    event NFTMintEvent(address indexed _to, string tokenURI, uint256 id);

    constructor() ERC721("Burger", "BURGER") {}

    modifier verified(bytes32 tokenUriHash, bytes memory signature) {
        require(_verify(tokenUriHash, signature), "Denied!");
        _;
    }

    function setVerifiedAddress(address _verifiedAddress) external onlyOwner {
        VERIFIED_ADDRESS = _verifiedAddress;
    }

    function getVerfiedAddress() external view returns (address) {
        return VERIFIED_ADDRESS;
    }

    function mintWhitelist(
        address _to,
        string memory tokenUri,
        bytes32 tokenUriHash,
        bytes memory signature,
        bytes32 leaf,
        bytes32[] memory proof
    ) external payable verified(tokenUriHash, signature) returns (uint256){
        require(whitelistActive, "Whitelist is not active");

        bool isWhitelisted = verifyWhitelist(leaf, proof);

        if (isWhitelisted) {
            return mintNFT(_to, tokenUri);
        } else {
            revert("Not whitelisted");
        }
    }

    function mint(
        address _to,
        string memory tokenUri,
        bytes32 tokenUriHash,
        bytes memory signature
    ) public payable verified(tokenUriHash, signature) returns (uint256) {
        return mintNFT(_to, tokenUri);
    }

    function mintNFT(address recipient, string memory _tokenURI)
        internal
        returns (uint256)
    {
        require(!paused(), "Minting is paused!");
        require(msg.value >= price, "Ether is not enough to mint NFT");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit NFTMintEvent(msg.sender, _tokenURI, newItemId);

        return newItemId;
    }

    function _verify(bytes32 messageHash, bytes memory signature)
        internal
        view
        returns (bool)
    {
        return messageHash.recover(signature) == VERIFIED_ADDRESS;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721Enumerable, ERC721) {
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721URIStorage, ERC721)
    {
        ERC721URIStorage._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, ERC721)
        returns (bool)
    {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function pause() external onlyOwner returns (bool) {
        _pause();
        return true;
    }

    function unpause() external onlyOwner returns (bool) {
        _unpause();
        return true;
    }

    function changeWhitelistState(bool newState) external onlyOwner {
        whitelistActive = newState;
    }

    function changeRoot(bytes32 newRoot) external onlyOwner {
        root = newRoot;
    }

    function verifyWhitelist(bytes32 leaf, bytes32[] memory proof)
        public
        view
        returns (bool)
    {
        bytes32 computedHash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash < proofElement) {
                // Hash(current computed hash + current element of the proof)
                computedHash = keccak256(
                    abi.encodePacked(computedHash, proofElement)
                );
            } else {
                // Hash(current element of the proof + current computed hash)
                computedHash = keccak256(
                    abi.encodePacked(proofElement, computedHash)
                );
            }
        }

        // Check if the computed hash (root) is equal to the provided root
        return computedHash == root;
    }
}
