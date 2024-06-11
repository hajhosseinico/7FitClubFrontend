import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.133.158.10:3000', // Change this to your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
