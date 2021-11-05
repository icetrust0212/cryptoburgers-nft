import Web3 from 'web3';

const init = () => {
  const CONTRACT_INFO = require('../../contracts.json');

  const CONTRACT_ABI = CONTRACT_INFO.contracts.Burger.abi;
  const CONTRACT_ADDRESS = CONTRACT_INFO.contracts.Burger.address;
  
  const web3Instance = new Web3(window.ethereum);
  const nftContractInstance =  new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  return {web3Instance, nftContractInstance}
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: undefined,
  chainId: undefined,
  ...init()
}

export function web3(state=initialState, action) {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      return initialState;
  }
}

export const getProvider = (state) => {
  return state.web3.provider;
}
export const getWeb3Provider = (state) => {
  return state.web3.web3Provider;
}
export const getAddress = (state) => {
  return state.web3.address;
}
export const getChainId = (state) => {
  return state.web3.chainId;
}

export const getWeb3Instance = (state) => {
  return state.web3.web3Instance;
}

export const getContractAddress = (state) => {
  return state.web3.CONTRACT_ADDRESS;
}

export const getNFTContractInstance = (state) => {
  return state.web3.nftContractInstance;
}

export const getContractABI = (state) => {
  return state.web3.CONTRACT_ABI;
}