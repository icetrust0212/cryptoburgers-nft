import { getBurgers } from '../../lib/nftutils';
import {apiService} from '../../services';
import { apiConstants } from '../constants';
import {mintNFT as mint} from '../../lib/nftutils';

function mintNFT(boxId, web3Instance, nftContractInstance, address, onMintSuccess, onMintFail) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
        apiService.getMetadata(boxId)
            .then(
                async (data) => {
                    console.log('metadta: ', data);
                    let metadata = data.metadata;
                    await mint(web3Instance, nftContractInstance,  address, metadata, onMintSuccess, onMintFail);
                    dispatch({
                        type: apiConstants.SET_LOADING,
                        payload: false
                    })
                },
                error => {
                    if (onMintFail) {
                        onMintFail(error);
                        dispatch({
                            type: apiConstants.SET_LOADING,
                            payload: false
                        })
                    }
                }
            );
    };
}

function getTokensPerAddress(nftContractInstance, address) {
    return dispatch => {
        dispatch({
            type: apiConstants.SET_LOADING,
            payload: true
        })
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

export const apiAction = {
    mintNFT,
    setLoading,
    getTokensPerAddress
}