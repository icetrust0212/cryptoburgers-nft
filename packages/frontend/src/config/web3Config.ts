import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
// const REACT_APP_API_URL_MAINNET = "https://bsc-dataseed1.ninicoin.io"
// const REACT_APP_API_URL_TESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"

// const REACT_APP_WSS_URL_MAINNET = "wss://bsc-ws-node.nariox.org:443"
// const REACT_APP_WSS_URL_TESTNET = "wss://bsc-ws-node.nariox.org:443"

const REACT_APP_API_URL_MAINNET = "https://eth-mainnet.alchemyapi.io/v2/OFNLvE3zh5eHRiBh30_DNaiPDVdyhXO0"
const REACT_APP_API_URL_TESTNET = "https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3"

const REACT_APP_WSS_URL_MAINNET = "wss://eth-mainnet.alchemyapi.io/v2/OFNLvE3zh5eHRiBh30_DNaiPDVdyhXO0"
const REACT_APP_WSS_URL_TESTNET = "wss://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3"

const REACT_APP_ACCOUNT_PUBLIC_KEY = "0xc09eAC15f9Ba6462e8E4612af7C431E1cfe08b87";

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



  export const config = {
    MAINNET_API_URL: REACT_APP_API_URL_MAINNET,
    TESTNET_API_URL: REACT_APP_API_URL_TESTNET,

    MAINNET_WSS_URL: REACT_APP_WSS_URL_MAINNET,
    TESTNET_WSS_URL: REACT_APP_WSS_URL_TESTNET,
    
    PUBLIC_KEY: REACT_APP_ACCOUNT_PUBLIC_KEY,
  }