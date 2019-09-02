import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://localhost:5001/api/'
});
// 'https://simplyblog.azurewebsites.net/api/'
export default instance;