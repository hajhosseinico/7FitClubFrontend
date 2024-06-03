import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://7fitclub.com', // fallback to your domain
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
