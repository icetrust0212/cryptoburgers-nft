require("@nomiclabs/hardhat-waffle");
// import('hardhat/config').HardhatUserConfig;
require('dotenv').config();
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      { version: "0.5.12", settings: {} },
      { version: "0.6.8", settings: {} },
      { version: "0.7.4", settings: {} },
    ],
  },
  paths: {
    artifacts: "./packages/frontend/src/artifacts"
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    mainnet: {
      url: process.env.API_URL_MAINNET,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    testnet: {
      url: process.env.API_URL_TESTNET,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: "X2WHYR6AHQNZAUN9HX9J65CGVNN15JPZD2"
  }
};
