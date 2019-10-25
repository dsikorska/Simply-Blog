import Axios from 'axios';
import { toast } from 'react-toastify';

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
// baseURL: 'https://localhost:5001'
export default instance;

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    if (error.response) {
        toast(error.response.data.Error, { type: toast.TYPE.ERROR });
    } else {
        toast("Sorry, there is server connection problem.", { type: toast.TYPE.ERROR });
    }
    return Promise.reject(error);
});