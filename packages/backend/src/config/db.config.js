const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
console.log('environment: ', dotenv.NODE_ENV);
module.exports = {
    HOST: "localhost",
    PORT: 27017,
    DB: dotenv.NODE_ENV === 'production' ? "cryptoburgers-dev" : "cryptoburgers"
};