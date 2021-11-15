require('dotenv').config();

export const appConfig = {
    API_URL: process.env.REACT_APP_API_URL,
    SOCKET_URL: process.env.REACT_APP_SOCKET_SERVER_URL
}