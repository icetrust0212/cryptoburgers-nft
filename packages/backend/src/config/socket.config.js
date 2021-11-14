const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv-flow').config().parsed

module.exports = {
    SOCKET_PORT: process.env.SOCKET_PORT || dotenv.SOCKET_PORT,
};
