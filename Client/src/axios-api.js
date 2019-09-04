import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://simplyblog.azurewebsites.net'
});

export default instance;