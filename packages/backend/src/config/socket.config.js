const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
module.exports = {
    SOCKET_PORT: dotenv.SOCKET_PORT,
};
