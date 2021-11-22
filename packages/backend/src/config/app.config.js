const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv-flow').config().parsed

console.log(env);
console.log(process.env.PORT);
console.log(dotenv.APP_PORT);

module.exports = {
    ...dotenv,
    ENV: env,
    APP_PORT: process.env.PORT || dotenv.APP_PORT,
    logging: true,
}