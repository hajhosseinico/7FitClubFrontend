import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.118.119.144/:3000',
});

export default api;
