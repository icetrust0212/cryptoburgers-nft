const dotenv = require('dotenv').config({path: __dirname + '../../../../../.env'}).parsed;

const REACT_APP_API_URL="http://localhost:8080/api"
const REACT_APP_SOCKET_SERVER_URL = "ws://localhost:3000/"
export const appConfig = {
    API_URL: REACT_APP_API_URL,
    SOCKET_URL: REACT_APP_SOCKET_SERVER_URL
}