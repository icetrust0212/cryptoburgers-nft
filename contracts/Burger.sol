/*
CRYPTOBURGERS
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/security/Pausable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/security/ReentrancyGuard.sol";

contract Burger is ERC721Enumerable, Pausable, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    mapping(uint256 => uint8) private boxTypeById;

    uint256[] public boxPriceBNB = [1e16, 2 * 1e16, 3 * 1e16];
    uint256 public whitelistPrice = 2 * 1e16;
    // string public strBaseTokenURI =
    //     "https://backend.cryptoburgers.io/metadata/";
    string public strBaseTokenURI = 
            "http://localhost:8080/api/metadta/";

    // Change to true in the mainnet deploy.
    bool public whitelistActive = false;
    bytes32 private root =
        0xa2fc709bf2f4b9cb44b8a9114485d12d4877bb1beedd81f62f4f85a8056480ee;

    event MintNFT(
        address indexed _to,
        uint256 indexed _id,
        uint8 indexed _boxType
    );

    constructor() ERC721("Burger", "BURGER") {
        // Uncomment if we want deploy paused
        // _pause();
    }

    function mintWhitelist(bytes32 leaf, bytes32[] memory proof)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        require(whitelistActive, "Whitelist is not active");
        require(msg.value >= boxPriceBNB[1], "Not enought BNB");

        bool isWhitelisted = verifyWhitelist(leaf, proof);

        if (isWhitelisted) {
            mint(msg.sender, 2);
        } else {
            revert("Not whitelisted");
        }

        payable(msg.sender).transfer(msg.value - boxPriceBNB[1]);
    }

    function mintOwner(address _to, uint8 boxType)
        external
        onlyOwner
        returns (uint256)
    {
        return mint(_to, boxType);
    }

    function mintNormal(uint8 boxType)
        external
        payable
        whenNotPaused
        nonReentrant
        returns (uint256)
    {
        require(!whitelistActive, "Whitelist is active");
        require(msg.value >= boxPriceBNB[boxType], "Not enough BNB");
        uint256 idMinted = mint(msg.sender, boxType);
        payable(msg.sender).transfer(msg.value - boxPriceBNB[boxType]);
        return idMinted;
    }

    function mint(address _to, uint8 boxType) internal returns (uint256) {
        _safeMint(_to, totalSupply());
        boxTypeById[totalSupply()] = boxType;

        emit MintNFT(_to, totalSupply(), boxType);

        return totalSupply();
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function changeBaseTokenURI(string memory newBaseTokenURI)
        external
        onlyOwner
    {
        strBaseTokenURI = newBaseTokenURI;
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

    function updateBoxPricesBNB(uint256[] memory _newBoxPricesBNB)
        external
        onlyOwner
        returns (bool)
    {
        boxPriceBNB = _newBoxPricesBNB;
        return true;
    }

    function _baseURI() internal view override returns (string memory) {
        return strBaseTokenURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "Token does not exist");
        return string(abi.encodePacked(_baseURI(), Strings.toString(_tokenId)));
    }

    function getboxTypeById(uint256 _tokenId) external view returns (uint8) {
        require(_exists(_tokenId), "Token does not exist");
        return boxTypeById[_tokenId];
    }

    function pause() external onlyOwner returns (bool) {
        _pause();
        return true;
    }

    function unpause() external onlyOwner returns (bool) {
        _unpause();
        return true;
    }
}
