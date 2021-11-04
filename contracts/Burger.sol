//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Burger is ERC721URIStorage, Ownable {
    uint256 price = 0.000001 ether;
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    Counters.Counter private _tokenIds;
    address VERIFIED_ADDRESS = 0xc09eAC15f9Ba6462e8E4612af7C431E1cfe08b87;

    event NFTMintEvent(address indexed _to , string tokenURI, uint256 id);

    constructor() ERC721("Burger", "BURGER") {}

    modifier verified (string memory tokenUri, bytes32 tokenUriHash, bytes memory signature) {
        require(_verify(tokenUriHash, signature), "Denied!");
        // require(keccak256(abi.encodePacked(tokenUri)) == tokenUriHash, "Denied!");
        _;
    }

    function setVerifiedAddress (address _verifiedAddress) external onlyOwner {
        VERIFIED_ADDRESS = _verifiedAddress;
    }

    function getVerfiedAddress() external view returns(address) {
        return VERIFIED_ADDRESS;
    }

    function mint(address _to, string memory tokenUri, bytes32 tokenURIHash, bytes memory signature) public payable verified(tokenUri, tokenURIHash, signature) {
        mintNFT(_to, tokenUri);
    }
    function mintNFT(address recipient, string memory tokenURI)
        public payable
        returns (uint256)
    {
        require(msg.value >= price, "Ether is not enough to mint NFT");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMintEvent(msg.sender, tokenURI,  newItemId);

        return newItemId;
    }

    function _verify(bytes32 data, bytes memory signature) public view returns (bool) {
        return data.recover(signature) == VERIFIED_ADDRESS;
    }

}
