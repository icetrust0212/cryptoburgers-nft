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

contract BurgerNFT is ERC721Enumerable, Pausable, Ownable {
    using SafeMath for uint256;

    mapping(uint256 => uint8 ) public boxTypeById;

    uint256[] public boxPriceBNB = [1e17, 2 * 1e17, 3 * 1e18];
    uint256 public whitelistPrice = 0.04 ether;
    uint256 public price = 0.05 ether;
    string public strBaseTokenURI;

    bool public whitelistActive = true;
    bytes32 private root =
        0x786cc6a5c4201b7672450409f6a717d0e33e88369e82ed52b453ec0cfcc4b23d;

    event MintNFT(
        address indexed _to,
        uint256 indexed _id,
        uint8 indexed _boxType
    );

    constructor(string memory _strBaseTokenURI) ERC721("Burger", "BURGER") {
        strBaseTokenURI = _strBaseTokenURI;
        // _pause();
    }

    function mintWhitelist(
        // uint256 amount,
        bytes32 leaf,
        bytes32[] memory proof
    ) external payable whenNotPaused {
        require(whitelistActive, "Whitelist is not active");
        require(msg.value >= boxPriceBNB[2], "Not enought BNB");

        bool isWhitelisted = verifyWhitelist(leaf, proof);

        if (isWhitelisted) {
            mint(2);
        } else {
            revert("Not whitelisted");
        }

        payable(msg.sender).transfer(msg.value - boxPriceBNB[2]);
    }

    function mintNormal(uint8 boxType) external payable whenNotPaused {
        require(!whitelistActive, "Whitelist is active");
        require(msg.value >= boxPriceBNB[boxType], "Not enought BNB");
        mint(boxType);
    }

    function mint(uint8 boxType) internal {
        _safeMint(msg.sender, totalSupply() + 1);
        boxTypeById[totalSupply() + 1] = boxType;

        // emit MintNFT(msg.sender, totalSupply() +1, boxType);
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

    function changePrice(uint256 newPrice) external onlyOwner {
        price = newPrice;
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
}
