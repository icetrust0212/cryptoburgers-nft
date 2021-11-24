require("@nomiclabs/hardhat-waffle");
// import('hardhat/config').HardhatUserConfig;
require('dotenv').config();
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

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
      {
        version: "0.7.6", settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],

  },

  paths: {
    artifacts: "./packages/frontend/src/artifacts"
  },

  namedAccounts: {
    deployer: 0,
  },

  defaultNetwork: "hardhat",

  networks: {

    hardhat: {
      forking: {
        url: "https://speedy-nodes-nyc.moralis.io/63842bcca9982a74b2a9fd41/bsc/mainnet",
      },
      accounts: [
        {
          privateKey: `0x${process.env.ACCOUNT_PRIVATE_KEY}`,
          balance: "1000000000000000000000"
        }
      ],
    },

    mainnet: {
      url: process.env.MAINNET_HTTP_URL,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },

    rinkeby: {
      url: process.env.TESTNET_HTTP_URL,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    }
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },

  bscscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  }

};
