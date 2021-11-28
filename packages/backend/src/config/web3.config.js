const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
<<<<<<< HEAD
const web3 = createAlchemyWeb3(process.env.HTTP_URL);
const wssWeb3 = createAlchemyWeb3(process.env.WSS_URL);
=======
const web3 = createAlchemyWeb3(dotenv.TESTNET_HTTP_URL);
const wssWeb3 = createAlchemyWeb3(dotenv.TESTNET_WSS_URL);
>>>>>>> proxy

module.exports = {
    web3,
    wssWeb3
};
