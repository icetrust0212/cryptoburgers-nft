// import('hardhat/config').HardhatUserConfig;

require("@nomiclabs/hardhat-waffle");
require('dotenv').config().parsed;
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


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

    defaultNetwork: "hardhat",

    networks: {

        hardhat: {
            forking: {
                url: "https://speedy-nodes-nyc.moralis.io/63842bcca9982a74b2a9fd41/bsc/mainnet",
            },
            accounts: [
                {
                    privateKey: process.env.ACCOUNT_PRIVATE_KEY,
                    balance: "1000000000000000000000"
                }
            ],
        },

        mainnet: {
            url: process.env.API_URL_MAINNET,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        },

        testnet: {
            url: process.env.API_URL_TESTNET,
            accounts: [process.env.ACCOUNT_PRIVATE_KEY],
        }

    },
    etherscan: {
        apiKey: "X2WHYR6AHQNZAUN9HX9J65CGVNN15JPZD2"
    },

    /*
    bscscan: {
        apiKey: config.apiKeyBsc
    },
    */

};
