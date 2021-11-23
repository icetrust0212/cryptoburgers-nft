const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(dotenv.TESTNET_HTTP_URL);
const wssWeb3 = createAlchemyWeb3(dotenv.TESTNET_WSS_URL);

module.exports = {
    web3,
    wssWeb3
};
