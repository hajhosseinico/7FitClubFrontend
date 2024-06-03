import axios from 'axios';

const api = axios.create({
    baseURL: 'http://7fitclub.com:3000',
});

export default api;
