
import { getBurgers } from '../../lib/nftutils';
import {apiService} from '../../services';
import { apiConstants } from '../constants';

function requestMetadata(boxId, onSuccess = undefined, onFailer = undefined) {
    return dispatch => {
        apiService.getMetadata(boxId)
            .then(
                data => {
                    console.log('metadta: ', data);
                    if (onSuccess) {
                        onSuccess(data.metadata);
                    }
                    dispatch(setMetadata(data.metadata));
                },
                error => {
                    if (onFailer) {
                        onFailer(error);
                    }
                }
            );
    };
}

const setMetadata = (metadata) => {
    return {
        type: apiConstants.SET_METADATA,
        payload: metadata
    }
}

export const apiAction = {
    requestMetadata,
}