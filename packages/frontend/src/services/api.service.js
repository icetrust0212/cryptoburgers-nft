import axios from './axios';

const getMetadata = async (boxId) => {
    try {
        let response = axios.get(`/getMetadata/${boxId}`)
            .then(res => {
                console.log('data: ', res)
                return res.data;
            }, err => {
                return Promise.reject(JSON.stringify(err.response.data.message));
            });
        return response;
    } catch (error) {
        console.log('loginerror: ', error)
        return Promise.reject(error.response.data.message);
    };
}

export const apiService = {
    getMetadata,
};