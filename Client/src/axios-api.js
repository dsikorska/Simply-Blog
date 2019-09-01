import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://simplyblog.azurewebsites.net/api/'
});

export default instance;