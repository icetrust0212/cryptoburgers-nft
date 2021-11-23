
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
const dotenv = require('dotenv').config({path: __dirname + '../../../../.env'}).parsed;

console.log('dotenv: ', dotenv, __dirname)
export const web3ProviderOptions = {
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://bsc-dataseed1.ninicoin.io`,
    },
    package: WalletLink,
    connector: async (_:any, options: any) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

const TESTNET_WSS_URL = "wss://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3"
const TESTNET_HTTP_URL = "https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3";

const MAINNET_HTTP_URL = "https://eth-mainnet.alchemyapi.io/v2/OFNLvE3zh5eHRiBh30_DNaiPDVdyhXO0"
const MAINNET_WSS_URL = "wss://bsc-ws-node.nariox.org:443"

export const config = {
  MAINNET_HTTP_URL: MAINNET_HTTP_URL,
  TESTNET_HTTP_URL: TESTNET_HTTP_URL,

  MAINNET_WSS_URL: MAINNET_WSS_URL,
  TESTNET_WSS_URL: TESTNET_WSS_URL,
}