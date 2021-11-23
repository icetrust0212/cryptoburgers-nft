const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
console.log('path: ', process.cwd())
console.log('dotenv: ', dotenv)
module.exports = {
    ...dotenv,
    APP_PORT: process.env.PORT || dotenv.APP_PORT,
    logging: true,
}