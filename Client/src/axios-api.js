import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://simplyblog.azurewebsites.net',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
});

export default instance;