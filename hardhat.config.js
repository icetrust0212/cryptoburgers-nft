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
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      { version: "0.5.12", settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      } },
      { version: "0.6.8", settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      } },
      { version: "0.7.4", settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      } },
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
      url: process.env.MAINNET_HTTP_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    },
    testnet: {
      url: process.env.TESTNET_HTTP_URL,
      accounts: [`0x${ACCOUNT_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
