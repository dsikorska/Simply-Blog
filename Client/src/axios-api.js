import Axios from 'axios';

export function options(token) {
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

const instance = Axios.create({
    baseURL: 'https://localhost:5001'
});
//    baseURL: 'https://simplyblog.azurewebsites.net'
export default instance;