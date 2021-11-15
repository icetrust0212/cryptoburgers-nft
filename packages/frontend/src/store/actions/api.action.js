import { enableWhitelistMode, getBurgers, mintWhiteListMode } from '../../lib/nftutils';
import {apiService} from '../../services';
import { apiConstants } from '../constants';
import {mintNFT as mint} from '../../lib/nftutils';

function mintNFT(boxId, nftContractInstance, address, onMintFail) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
       
        mint(nftContractInstance,  address, boxId, onMintFail);
    };
}

function getTokensPerAddress(nftContractInstance, address) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        });
        getBurgers(nftContractInstance, address).then(data => {
            dispatch({
                type: apiConstants.SET_TOKENLIST,
                payload: data
            });
        }, err => {
            dispatch({
                type: apiConstants.ERROR,
                payload: err
            });
        })
        
    };
}

const setLoading = (isLoading) => {
    return {
        type: apiConstants.SET_LOADING,
        payload: isLoading
    }
}

const setWhitelistMode = (nftContractInstance, address, value) => {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
        enableWhitelistMode(nftContractInstance, address, value).then(data => {
            dispatch({
                type: apiConstants.SET_LOADING,
                payload: false
            });
        }, err => {
            dispatch({
                type: apiConstants.ERROR,
                payload: err
            });
        })
        
    }; 
}

const mintWhiteList = (nftContractInstance, address, onMintFail) => {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
        apiService.getWhiteListInfo(address).then(data => {
            const {proof} = data;
            const {verified} = data;
            const {leaf} = data;
            if (!verified) {
                dispatch({
                    type: apiConstants.ERROR,
                    payload: "You are not whitelist member!"
                });
                return;
            }
            mintWhiteListMode(nftContractInstance,  address, proof, onMintFail)
        }, err => {
            dispatch({
                type: apiConstants.ERROR,
                payload: err
            });
        })
    };
}

export const apiAction = {
    mintNFT,
    setLoading,
    getTokensPerAddress,
    setWhitelistMode,
    mintWhiteList
}