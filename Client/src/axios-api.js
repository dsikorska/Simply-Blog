import Axios from 'axios';

export function options(token) {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

const instance = Axios.create({
    baseURL: 'https://simplyblog.azurewebsites.net'
});

export default instance;