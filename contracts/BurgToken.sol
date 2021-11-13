/*
CRYPTOBURGERS
Web: https://cryptoburgers.io
Telegram: https://t.me/cryptoburgersnft
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract BurgToken is ERC20Capped, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using Address for address;

    constructor() ERC20("BURG Token", "BURG") ERC20Capped(100 * 1e6 * 1e18) {
        _mint(msg.sender, 10000 * 1e18);
    }

    function burn(address _account, uint256 _amount) external returns (bool) {
        _burn(_account, _amount);
        return true;
    }

    function mint(address _account, uint256 _amount)
        external
        onlyOwner
        returns (bool)
    {
        _mint(_account, _amount);
        return true;
    }
}
