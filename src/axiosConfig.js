import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.224.63.224/:3000',
});

export default api;
