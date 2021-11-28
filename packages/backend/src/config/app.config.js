<<<<<<< HEAD
const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv-flow').config().parsed

console.log(env);
console.log(process.env.PORT);
console.log(dotenv.APP_PORT);

=======
const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;
console.log('path: ', process.cwd())
console.log('dotenv: ', dotenv)
>>>>>>> proxy
module.exports = {
    ...dotenv,
    APP_PORT: process.env.PORT || dotenv.APP_PORT,
    logging: true,
}