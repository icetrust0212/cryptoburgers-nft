const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv-flow').config().parsed
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.TESTNET_HTTP_URL);
const wssWeb3 = createAlchemyWeb3(process.env.TESTNET_WSS_URL);

module.exports = {
    web3,
    wssWeb3
};
