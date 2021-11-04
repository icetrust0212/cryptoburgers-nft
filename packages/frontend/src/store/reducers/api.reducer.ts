import { apiConstants } from "../constants"

const initialState = {
    metadata: ''
}

export const apiReducer = (state: any = initialState, {type, payload}: any) => {
    switch(type) {
        case apiConstants.SET_METADATA:
            return {
                ...state,
                metadata: payload
            }
        default:
            return state;
    }
}

export const getSavedMetadata = (state: any) => {
    return state.apiReducer.metadata;
}