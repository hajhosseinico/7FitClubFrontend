import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.133.158.10:3001', // Update this to your new backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});
export default api;
