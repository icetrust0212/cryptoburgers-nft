const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
let API_URL = "https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3";
const web3 = createAlchemyWeb3(API_URL);
const privateKey = "6e22bd008464f3c6a045b711fdc696d5afab7e95594ef299013a930a1a916f68"
module.exports = {
    web3,
    privateKey
};
