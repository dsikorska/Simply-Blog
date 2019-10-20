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
    console.log(error);
    return Promise.reject(error);
});